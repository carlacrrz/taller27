#include "server.hpp"
#include "database.hpp"
#include <iostream>
#include <csignal>

static Taller27::HttpServer* g_server = nullptr;

void signalHandler(int signum) {
    std::cout << "\n[Taller-27] Cerrando servidor..." << std::endl;
    if (g_server) {
        g_server->stop();
    }
    exit(0);
}

int main(int argc, char* argv[]) {
    int port = 3000;
    if (argc > 1) {
        port = std::atoi(argv[1]);
    }

    std::cout << "=================================================" << std::endl;
    std::cout << "   TALLER-27 BORDADOS - SISTEMA C++ EN MACOS" << std::endl;
    std::cout << "=================================================" << std::endl;

    // Inicializar conexión con base de datos PostgreSQL
    Taller27::Database::instance().init();

    // Iniciar servidor HTTP en C++
    Taller27::HttpServer server(port, ".");
    g_server = &server;

    signal(SIGINT, signalHandler);
    signal(SIGTERM, signalHandler);

    if (!server.start()) {
        std::cerr << "[Error] No se pudo iniciar el servidor en el puerto " << port << std::endl;
        return 1;
    }

    std::cout << "[Info] Aplicación disponible en http://localhost:" << port << std::endl;
    std::cout << "[Info] Presione Ctrl+C para detener." << std::endl;

    server.wait();
    return 0;
}
