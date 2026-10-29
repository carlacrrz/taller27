#include "server.hpp"
#include "database.hpp"

#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>

namespace Taller27 {

static std::string getMimeType(const std::string& path) {
    if (path.rfind(".html") != std::string::npos) return "text/html; charset=utf-8";
    if (path.rfind(".css") != std::string::npos) return "text/css; charset=utf-8";
    if (path.rfind(".js") != std::string::npos) return "application/javascript; charset=utf-8";
    if (path.rfind(".json") != std::string::npos) return "application/json; charset=utf-8";
    if (path.rfind(".png") != std::string::npos) return "image/png";
    if (path.rfind(".jpg") != std::string::npos || path.rfind(".jpeg") != std::string::npos) return "image/jpeg";
    if (path.rfind(".svg") != std::string::npos) return "image/svg+xml";
    if (path.rfind(".woff2") != std::string::npos) return "font/woff2";
    if (path.rfind(".ttf") != std::string::npos) return "font/ttf";
    return "application/octet-stream";
}

static std::string escapeJson(const std::string& s) {
    std::ostringstream o;
    for (char c : s) {
        if (c == '"') o << "\\\"";
        else if (c == '\\') o << "\\\\";
        else if (c == '\b') o << "\\b";
        else if (c == '\f') o << "\\f";
        else if (c == '\n') o << "\\n";
        else if (c == '\r') o << "\\r";
        else if (c == '\t') o << "\\t";
        else o << c;
    }
    return o.str();
}

static std::string ordersToJson(const std::vector<Order>& orders) {
    std::ostringstream ss;
    ss << "[";
    for (size_t i = 0; i < orders.size(); ++i) {
        const auto& o = orders[i];
        if (i > 0) ss << ",";
        ss << "{"
           << "\"id\":\"" << escapeJson(o.id) << "\","
           << "\"folio\":\"" << escapeJson(o.folio) << "\","
           << "\"client\":\"" << escapeJson(o.client) << "\","
           << "\"clientFullName\":\"" << escapeJson(o.clientFullName) << "\","
           << "\"status\":\"" << escapeJson(o.status) << "\","
           << "\"badgeClass\":\"" << escapeJson(o.badgeClass) << "\","
           << "\"prenda\":\"" << escapeJson(o.prenda) << "\","
           << "\"color\":\"" << escapeJson(o.color) << "\","
           << "\"cantidad\":" << o.cantidad << ","
           << "\"tipoTrabajo\":\"" << escapeJson(o.tipoTrabajo) << "\","
           << "\"fechaPedido\":\"" << escapeJson(o.fechaPedido) << "\","
           << "\"fechaEntrega\":\"" << escapeJson(o.fechaEntrega) << "\","
           << "\"operador\":\"" << escapeJson(o.operador) << "\","
           << "\"notas\":\"" << escapeJson(o.notas) << "\","
           << "\"hilos\":[";
        for (size_t j = 0; j < o.hilos.size(); ++j) {
            if (j > 0) ss << ",";
            ss << "{\"name\":\"" << escapeJson(o.hilos[j].name) << "\","
               << "\"code\":\"" << escapeJson(o.hilos[j].code) << "\","
               << "\"hex\":\"" << escapeJson(o.hilos[j].hex) << "\"}";
        }
        ss << "],\"breakdown\":[";
        for (size_t j = 0; j < o.breakdown.size(); ++j) {
            if (j > 0) ss << ",";
            ss << "{\"prenda\":\"" << escapeJson(o.breakdown[j].prenda) << "\","
               << "\"color\":\"" << escapeJson(o.breakdown[j].color) << "\","
               << "\"talla\":\"" << escapeJson(o.breakdown[j].talla) << "\","
               << "\"cantidad\":" << o.breakdown[j].cantidad << "}";
        }
        ss << "],\"ubicaciones\":[";
        for (size_t j = 0; j < o.ubicaciones.size(); ++j) {
            if (j > 0) ss << ",";
            ss << "{\"punto\":\"" << escapeJson(o.ubicaciones[j].punto) << "\","
               << "\"nombre\":\"" << escapeJson(o.ubicaciones[j].nombre) << "\","
               << "\"medidas\":\"" << escapeJson(o.ubicaciones[j].medidas) << "\","
               << "\"archivo\":\"" << escapeJson(o.ubicaciones[j].archivo) << "\","
               << "\"sampleImg\":\"" << escapeJson(o.ubicaciones[j].sampleImg) << "\"}";
        }
        ss << "]}";
    }
    ss << "]";
    return ss.str();
}

static std::string salesToJson(const std::vector<Sale>& sales) {
    std::ostringstream ss;
    ss << "[";
    for (size_t i = 0; i < sales.size(); ++i) {
        const auto& s = sales[i];
        if (i > 0) ss << ",";
        ss << "{"
           << "\"folio\":\"" << escapeJson(s.folio) << "\","
           << "\"hora\":\"" << escapeJson(s.hora) << "\","
           << "\"cliente\":\"" << escapeJson(s.cliente) << "\","
           << "\"rfc\":\"" << escapeJson(s.rfc) << "\","
           << "\"vinculado\":\"" << escapeJson(s.vinculado) << "\","
           << "\"concepto\":\"" << escapeJson(s.concepto) << "\","
           << "\"total\":" << s.total << ","
           << "\"anticipo\":" << s.anticipo << ","
           << "\"saldo\":" << s.saldo << ","
           << "\"metodo\":\"" << escapeJson(s.metodo) << "\","
           << "\"estado\":\"" << escapeJson(s.estado) << "\","
           << "\"cfdi\":\"" << escapeJson(s.cfdi) << "\""
           << "}";
    }
    ss << "]";
    return ss.str();
}

static std::string customersToJson(const std::vector<Customer>& customers) {
    std::ostringstream ss;
    ss << "[";
    for (size_t i = 0; i < customers.size(); ++i) {
        const auto& c = customers[i];
        if (i > 0) ss << ",";
        ss << "{"
           << "\"id\":\"" << escapeJson(c.id) << "\","
           << "\"initials\":\"" << escapeJson(c.initials) << "\","
           << "\"name\":\"" << escapeJson(c.name) << "\","
           << "\"fullName\":\"" << escapeJson(c.fullName) << "\","
           << "\"tipo\":\"" << escapeJson(c.tipo) << "\","
           << "\"rfc\":\"" << escapeJson(c.rfc) << "\","
           << "\"telefono\":\"" << escapeJson(c.telefono) << "\","
           << "\"correo\":\"" << escapeJson(c.correo) << "\","
           << "\"direccion\":\"" << escapeJson(c.direccion) << "\","
           << "\"contacto\":\"" << escapeJson(c.contacto) << "\","
           << "\"totalFacturado\":\"" << escapeJson(c.totalFacturado) << "\","
           << "\"pedidosTotales\":\"" << escapeJson(c.pedidosTotales) << "\","
           << "\"saldoPendiente\":\"" << escapeJson(c.saldoPendiente) << "\","
           << "\"creditoInfo\":\"" << escapeJson(c.creditoInfo) << "\","
           << "\"tecnicaHabitual\":\"" << escapeJson(c.tecnicaHabitual) << "\","
           << "\"especificaciones\":\"" << escapeJson(c.especificaciones) << "\""
           << "}";
    }
    ss << "]";
    return ss.str();
}

static std::string inventoryToJson(const std::vector<InventoryItem>& items) {
    std::ostringstream ss;
    ss << "[";
    for (size_t i = 0; i < items.size(); ++i) {
        const auto& item = items[i];
        if (i > 0) ss << ",";
        ss << "{"
           << "\"sku\":\"" << escapeJson(item.sku) << "\","
           << "\"brand\":\"" << escapeJson(item.brand) << "\","
           << "\"name\":\"" << escapeJson(item.name) << "\","
           << "\"desc\":\"" << escapeJson(item.desc) << "\","
           << "\"color\":\"" << escapeJson(item.color) << "\","
           << "\"sizes\":\"" << escapeJson(item.sizes) << "\","
           << "\"stock\":" << item.stock << ","
           << "\"minStock\":" << item.minStock << ","
           << "\"price\":\"" << escapeJson(item.price) << "\","
           << "\"status\":\"" << escapeJson(item.status) << "\","
           << "\"statusClass\":\"" << escapeJson(item.statusClass) << "\","
           << "\"img\":\"" << escapeJson(item.img) << "\""
           << "}";
    }
    ss << "]";
    return ss.str();
}

HttpServer::HttpServer(int port, const std::string& publicDir)
    : m_port(port), m_publicDir(publicDir) {}

HttpServer::~HttpServer() {
    stop();
}

bool HttpServer::start() {
    if (m_running) return true;

    m_serverFd = socket(AF_INET, SOCK_STREAM, 0);
    if (m_serverFd < 0) {
        std::cerr << "[Server] Error creando socket" << std::endl;
        return false;
    }

    int opt = 1;
    setsockopt(m_serverFd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
#ifdef SO_REUSEPORT
    setsockopt(m_serverFd, SOL_SOCKET, SO_REUSEPORT, &opt, sizeof(opt));
#endif

    sockaddr_in address;
    std::memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(m_port);

    if (bind(m_serverFd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        std::cerr << "[Server] Error en bind puerto " << m_port << std::endl;
        close(m_serverFd);
        m_serverFd = -1;
        return false;
    }

    if (listen(m_serverFd, 30) < 0) {
        std::cerr << "[Server] Error en listen" << std::endl;
        close(m_serverFd);
        m_serverFd = -1;
        return false;
    }

    m_running = true;
    m_thread = std::thread(&HttpServer::listenLoop, this);
    std::cout << "[Server] Taller-27 HTTP Backend iniciado en http://localhost:" << m_port << std::endl;
    return true;
}

void HttpServer::stop() {
    if (!m_running) return;
    m_running = false;
    if (m_serverFd >= 0) {
        shutdown(m_serverFd, SHUT_RDWR);
        close(m_serverFd);
        m_serverFd = -1;
    }
    if (m_thread.joinable()) {
        m_thread.join();
    }
    std::cout << "[Server] Servidor detenido." << std::endl;
}

void HttpServer::wait() {
    if (m_thread.joinable()) {
        m_thread.join();
    }
}

void HttpServer::listenLoop() {
    while (m_running) {
        sockaddr_in clientAddr;
        socklen_t clientLen = sizeof(clientAddr);
        int clientSock = accept(m_serverFd, (struct sockaddr*)&clientAddr, &clientLen);
        if (clientSock < 0) {
            if (!m_running) break;
            continue;
        }

        std::thread(&HttpServer::handleClient, this, clientSock).detach();
    }
}

void HttpServer::handleClient(int clientSocket) {
    char buffer[8192];
    ssize_t bytesRead = read(clientSocket, buffer, sizeof(buffer) - 1);
    if (bytesRead <= 0) {
        close(clientSocket);
        return;
    }
    buffer[bytesRead] = '\0';

    std::string request(buffer, bytesRead);
    std::istringstream reqStream(request);
    std::string method, path, version;
    reqStream >> method >> path >> version;

    // Remove query params
    std::string cleanPath = path;
    size_t qPos = cleanPath.find('?');
    if (qPos != std::string::npos) {
        cleanPath = cleanPath.substr(0, qPos);
    }

    std::string response;

    // 1. API ROUTES
    if (cleanPath == "/api/status") {
        std::string json = "{\"status\":\"ok\",\"postgres\":" + std::string(Database::instance().isConnectedToPostgres() ? "true" : "false") + ",\"db_message\":\"" + escapeJson(Database::instance().getStatusMessage()) + "\"}";
        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: " + std::to_string(json.length()) + "\r\nConnection: close\r\n\r\n" + json;
    }
    else if (cleanPath == "/api/orders" && method == "GET") {
        std::string json = ordersToJson(Database::instance().getOrders());
        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: " + std::to_string(json.length()) + "\r\nConnection: close\r\n\r\n" + json;
    }
    else if (cleanPath == "/api/sales" && method == "GET") {
        std::string json = salesToJson(Database::instance().getSales());
        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: " + std::to_string(json.length()) + "\r\nConnection: close\r\n\r\n" + json;
    }
    else if (cleanPath == "/api/customers" && method == "GET") {
        std::string json = customersToJson(Database::instance().getCustomers());
        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: " + std::to_string(json.length()) + "\r\nConnection: close\r\n\r\n" + json;
    }
    else if (cleanPath == "/api/inventory" && method == "GET") {
        std::string json = inventoryToJson(Database::instance().getInventory());
        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: " + std::to_string(json.length()) + "\r\nConnection: close\r\n\r\n" + json;
    }
    // 2. STATIC FILES SERVING
    else {
        if (cleanPath == "/" || cleanPath.empty()) {
            cleanPath = "/index.html";
        }

        std::string filePath = m_publicDir + cleanPath;
        std::ifstream file(filePath, std::ios::binary);

        if (file.is_open()) {
            std::ostringstream ss;
            ss << file.rdbuf();
            std::string content = ss.str();
            std::string mime = getMimeType(filePath);

            response = "HTTP/1.1 200 OK\r\nContent-Type: " + mime + "\r\nContent-Length: " + std::to_string(content.size()) + "\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n" + content;
        } else {
            std::string notFound = "<h1>404 No Encontrado - Taller 27</h1>";
            response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\nContent-Length: " + std::to_string(notFound.length()) + "\r\nConnection: close\r\n\r\n" + notFound;
        }
    }

    write(clientSocket, response.c_str(), response.length());
    close(clientSocket);
}

} // namespace Taller27
