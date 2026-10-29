#include "database.hpp"
#include <iostream>
#include <algorithm>
#include <cstdlib>

#ifdef HAVE_LIBPQ
#include <libpq-fe.h>
#endif

namespace Taller27 {

Database& Database::instance() {
    static Database db;
    return db;
}

Database::Database() {
    seedMemoryDefaults();
}

Database::~Database() {
#ifdef HAVE_LIBPQ
    if (m_pgConn) {
        PQfinish(static_cast<PGconn*>(m_pgConn));
        m_pgConn = nullptr;
    }
#endif
}

bool Database::init(const std::string& conninfo) {
    std::lock_guard<std::mutex> lock(m_mutex);

    std::string connStr = conninfo;
    if (connStr.empty()) {
        const char* envUrl = std::getenv("DATABASE_URL");
        if (envUrl) {
            connStr = envUrl;
        } else {
            connStr = "dbname=taller27 host=localhost port=5432 user=postgres";
        }
    }

#ifdef HAVE_LIBPQ
    PGconn* conn = PQconnectdb(connStr.c_str());
    if (PQstatus(conn) == CONNECTION_OK) {
        m_pgConn = conn;
        m_hasPg = true;
        m_statusMsg = "PostgreSQL Conectado (" + connStr + ")";
        std::cout << "[DB] " << m_statusMsg << std::endl;
        return true;
    } else {
        std::string err = PQerrorMessage(conn);
        PQfinish(conn);
        m_pgConn = nullptr;
        m_hasPg = false;
        m_statusMsg = "PostgreSQL offline: " + err + " -> Modo de contingencia en memoria activo.";
        std::cout << "[DB] " << m_statusMsg << std::endl;
        return false;
    }
#else
    m_hasPg = false;
    m_statusMsg = "Modo autónomo C++ con sincronización en memoria. Para conectar PostgreSQL nativo, instale libpq (brew install libpq).";
    std::cout << "[DB] " << m_statusMsg << std::endl;
    return true;
#endif
}

bool Database::isConnectedToPostgres() const {
    return m_hasPg;
}

std::string Database::getStatusMessage() const {
    return m_statusMsg;
}

void Database::seedMemoryDefaults() {
    // 1. Clientes
    m_customers = {
        {
            "CP", "CP", "CoffePoint México S.A.", "CoffePoint México S.A. de C.V.",
            "Cuenta corporativa (B2B)", "CPM180422K90", "+52 55 4192 8840", "compras@coffepoint.mx",
            "Av. Insurgentes Sur 1480, Piso 4, Benito Juárez, CDMX", "Puerta 2 Taller (Arq. Juan Pérez)",
            "$64,850.00 MXN", "14 órdenes (1 en proceso · 13 entregadas)", "$0.00 MXN",
            "Cuenta al corriente (Crédito 15 días)", "Bordado Industrial (85% Bordado · 15% Impresión DFT)",
            "Especificaciones de taller: Exigen estricto uso de hilo Madeira Polyneon Negro #1800 y Rojo #1837. Requieren siempre factura mensual CFDI 4.0 al día siguiente de la entrega. Contacto autorizado de recepción: Arq. Juan Pérez."
        },
        {
            "AZ", "AZ", "AutoZone Refacciones", "AutoZone de México S. de R.L. de C.V.",
            "Cuenta corporativa B2B", "AZR091105PL1", "+52 81 8399 2000", "adquisiciones@autozone.com.mx",
            "Av. Constitución 2005, Centro, Monterrey, N.L.", "Ing. Roberto Garza (Flotilla Oriente)",
            "$128,400.00 MXN", "28 órdenes", "$1,450.00 MXN",
            "Saldo vencido ayer (#A91888)", "DFT y Bordado 3D en gorras",
            "Logotipos con borde en hilo naranja de seguridad. Cintas reflejantes aprobadas por norma STPS."
        },
        {
            "CN", "CN", "Club Náutico Marina Real", "Club Náutico Marina Real A.C.",
            "Cuenta corporativa B2B", "CNM200114TR4", "+52 55 4819 2041", "administracion@marinareal.mx",
            "Paseo de la Marina 120, Acapulco / CDMX", "Ing. Carlos V.",
            "$42,300.00 MXN", "6 órdenes", "$0.00 MXN",
            "Al corriente (Pago 50% anticipo)", "Bordado en prendas náuticas",
            "Uso de hilos marinos resistentes al sol y salinidad."
        },
        {
            "CC", "CC", "CandyCake Repostería", "CandyCake Gourmet México S.A.",
            "Cuenta Pyme", "CCR190803HJ8", "+52 55 2381 9920", "contacto@candycake.com",
            "Calle Colima 184, Roma Norte, Cuauhtémoc, CDMX", "Laura Méndez",
            "$18,900.00 MXN", "9 órdenes", "$0.00 MXN",
            "Al corriente", "Bordado en mandiles y filipinas",
            "Hilo rosa pastel con tolerancias mínimas para tipografías caligráficas."
        },
        {
            "CF", "CF", "CrossFit Spartan Center", "CrossFit Spartan Training Gym",
            "Gimnasio / Pyme", "CFS2107119A3", "+52 55 7712 3490", "admin@spartancenter.mx",
            "Av. Revolución 450, San Pedro de los Pinos, CDMX", "Coach Rodrigo",
            "$35,800.00 MXN", "12 órdenes", "$2,400.00 MXN",
            "Anticipo 50% cubierto", "Estampado DFT deportivo",
            "Prendas 100% poliéster DryFit con curado a 150°C."
        },
        {
            "LH", "LH", "Luis Herrera", "Luis Herrera López",
            "Particular", "HELL850212AB9", "+52 55 3344 5566", "lherrera@gmail.com",
            "Col. Narvarte Poniente, CDMX", "Luis Herrera",
            "$3,800.00 MXN", "3 órdenes", "$450.00 MXN",
            "Pendiente de cobro", "Bordado unitario",
            "Cliente de mostrador."
        }
    };

    // 2. Inventario
    m_inventory = {
        { "YZB-PL-001", "YAZBECK", "YAZBECK Polo Piqué 100% Algodón", "Corte Clásico Masculino • 230 gr/m²", "Negro Jet", "S: 14 • M: 22 • L: 8 • XL: 4", 48, 25, "$118.50", "Disponible", "bg-emerald-100 text-emerald-800 border-emerald-300", "assets/polo_yazbeck_negro.png" },
        { "YZB-CR-002", "YAZBECK", "YAZBECK Playera Cuello Redondo C0300", "Prendas Heavy Weight • 200 gr/m²", "Blanco Óptico", "S: 2 • M: 3 • L: 5 • XL: 0", 10, 30, "$64.00", "Stock Bajo", "bg-amber-100 text-amber-800 border-amber-300 font-bold", "assets/playera_blanco_yazbeck.png" },
        { "GLD-HD-104", "GILDAN", "GILDAN Heavy Blend Hoodie 18500", "Felpa 50/50 • Interior perchado suave", "Marino 32C", "S: 8 • M: 16 • L: 14 • XL: 6", 44, 15, "$245.00", "Disponible", "bg-emerald-100 text-emerald-800 border-emerald-300", "assets/sudadera_azul_gildan.png" },
        { "YPG-CP-088", "YUPOONG", "YUPOONG Gorra Clásica 6 Paneles", "Corona rígida especial para bordado 3D", "Rojo Carmín", "Unitalla: 0", 0, 20, "$92.00", "Agotado", "bg-red-100 text-red-800 border-red-300 font-bold", "assets/gorra_yupoong_roja.png" },
        { "YZB-CH-502", "YAZBECK", "YAZBECK Chaleco Brigadista Alta Visibilidad", "Cintas reflejantes 2\" • Bolsa porta-radio", "Neón / Cintas", "M: 10 • L: 18 • XL: 12", 40, 15, "$165.00", "Disponible", "bg-emerald-100 text-emerald-800 border-emerald-300", "assets/chaleco_yazbeck_amarillo.png" }
    };

    // 3. Pedidos
    m_orders = {
        {
            "A91892", "#A91892", "CoffePoint", "CoffePoint México S.A. de C.V.",
            "En proceso", "bg-emerald-100 text-emerald-800 border-emerald-300",
            "YAZBECK POLO", "Negro", 10, "Bordado", "20/10/2026", "30/10/2026", "Juan Pérez",
            { {"Rojo", "#1801", "#dc2626"}, {"Negro", "#1800", "#111111"}, {"Azul", "#1842", "#1d4ed8"} },
            { {"YAZBECK POLO", "Negro", "S", 3}, {"YAZBECK POLO", "Negro", "M", 3}, {"YAZBECK POLO", "Negro", "L", 4} },
            { {"1", "Pecho", "5 cm x 6 cm", "GRUMEX_v2.EMB", "assets/sample_embroidery_1.png"}, {"2", "Brazo derecho", "5 cm x 6 cm", "BANDERA_MEX.DST", "assets/sample_embroidery_2.png"} },
            "Tolerancia de bordados de 1-2 cm. Usar pelón arrancable 80g reforzado en tejido piqué. Archivo autorizado por Arq. Juan Pérez."
        },
        {
            "A91888", "#A91888", "AutoZone", "AutoZone Refacciones (Flotilla Oriente)",
            "Vencido", "bg-red-100 text-red-800 border-red-300",
            "YAZBECK Gorra / Camisola", "Negro", 10, "DFT", "14/10/2026", "24/10/2026", "Mariana S.",
            { {"Blanco", "#1801", "#ffffff"}, {"Rojo", "#1802", "#ef4444"} },
            { {"YAZBECK", "Negro", "M", 5}, {"YAZBECK", "Negro", "L", 5} },
            { {"1", "Frente", "10 cm x 5 cm", "AUTOZONE.DST", "assets/sample_embroidery_1.png"} },
            "Entrega prioritaria demorada. Reordenar de inmediato."
        },
        {
            "A91889", "#A91889", "Luis Herrera", "Luis Herrera (Mostrador)",
            "Pendiente", "bg-amber-100 text-amber-800 border-amber-300",
            "YAZBECK Camisola", "Negro", 10, "DFT", "18/10/2026", "28/10/2026", "Mariana S.",
            { {"Amarillo", "#1803", "#facc15"} },
            { {"YAZBECK", "Negro", "L", 10} },
            { {"1", "Espalda", "20 cm x 10 cm", "HERRERA.DFT", "assets/sample_embroidery_shirt.png"} },
            "Pendiente autorización final del ponchado."
        },
        {
            "A91894", "#A91894", "Padel", "Padel Club MX",
            "En proceso", "bg-emerald-100 text-emerald-800 border-emerald-300",
            "YAZBECK Toallas & Polos", "Negro", 10, "DFT", "21/10/2026", "29/10/2026", "Juan Pérez",
            { {"Verde Neón", "#1890", "#22c55e"} },
            { {"YAZBECK", "Negro", "M", 5}, {"YAZBECK", "Negro", "L", 5} },
            { {"1", "Pecho", "8 cm x 4 cm", "PADEL_MX.DST", "assets/sample_embroidery_shirt.png"} },
            "Bordado con hilo reflectivo en borde."
        },
        {
            "A91895", "#A91895", "CrossFit", "CrossFit Spartan Center",
            "En proceso", "bg-emerald-100 text-emerald-800 border-emerald-300",
            "YAZBECK DryFit", "Negro", 10, "DFT", "22/10/2026", "31/10/2026", "Mariana S.",
            { {"Rojo", "#1801", "#dc2626"} },
            { {"YAZBECK", "Negro", "L", 6}, {"YAZBECK", "Negro", "XL", 4} },
            { {"1", "Pecho", "12 cm x 8 cm", "SPARTAN.DFT", "assets/sample_embroidery_shirt.png"} },
            "Estampado termotransferible DFT de alta elasticidad."
        },
        {
            "A91896", "#A91896", "CandyCake", "CandyCake Repostería",
            "En proceso", "bg-emerald-100 text-emerald-800 border-emerald-300",
            "YAZBECK Mandiles", "Negro", 10, "DFT", "23/10/2026", "01/11/2026", "Juan Pérez",
            { {"Rosa Pastel", "#1812", "#f472b6"} },
            { {"YAZBECK", "Negro", "Unitalla", 10} },
            { {"1", "Pecho Mandil", "15 cm x 10 cm", "CANDYCAKE.DST", "assets/sample_embroidery_shirt.png"} },
            "Bordado fino en mandil con hilos resistentes al lavado con cloro."
        },
        {
            "A91893", "#A91893", "Emilia Arce", "Emilia Arce (Diseño)",
            "En proceso", "bg-emerald-100 text-emerald-800 border-emerald-300",
            "YAZBECK POLO", "Negro", 10, "DFT", "19/10/2026", "28/10/2026", "Mariana S.",
            { {"Negro", "#1800", "#111111"} },
            { {"YAZBECK", "Negro", "S", 5}, {"YAZBECK", "Negro", "M", 5} },
            { {"1", "Cuello posterior", "4 cm x 4 cm", "EMILIA.DST", "assets/sample_embroidery_shirt.png"} },
            "Muestra aprobada vía WhatsApp."
        }
    };

    // 4. Ventas
    m_sales = {
        { "#V-1042", "Hoy, 14:22", "CoffePoint", "COP920102-K21", "#A91892", "10pz Polo Yazbeck + Bordado Pecho", 2300, 1150, 1150, "Tarjeta", "Anticipo 50%", "Emitida" },
        { "#V-1041", "Hoy, 12:45", "AutoZone", "Flotilla Oriente", "#A91888", "25pz Gorras Yupoong DFT", 3850, 3850, 0, "Transfer.", "Liquidado", "Emitida" },
        { "#V-1040", "Hoy, 11:10", "CandyCake Repostería", "Laura Mendez", "#A91880", "8pz Mandiles con Bordado", 1600, 800, 800, "Efectivo", "Anticipo 50%", "Ticket" },
        { "#V-1039", "Ayer, 18:30", "Luis Herrera", "Cliente Mostrador", "#A91875", "1pz Camisola Mecánico", 450, 0, 450, "Por definir", "Pendiente", "Ticket" },
        { "#V-1038", "Ayer, 16:15", "Padel Club MX", "Torneo de Primavera", "#A91866", "50pz Toallas Microfibra", 5250, 5250, 0, "Transfer.", "Liquidado", "Emitida" },
        { "#V-1037", "Ayer, 13:00", "CrossFit Spartan", "Coach Rodrigo", "#A91850", "30pz Tank Top DryFit", 4800, 2400, 2400, "Tarjeta", "Anticipo 50%", "Emitida" }
    };
}

std::vector<Order> Database::getOrders() {
    std::lock_guard<std::mutex> lock(m_mutex);
    return m_orders;
}

bool Database::saveOrder(const Order& order) {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_orders.insert(m_orders.begin(), order);
    return true;
}

bool Database::markOrderDelivered(const std::string& id) {
    std::lock_guard<std::mutex> lock(m_mutex);
    for (auto& o : m_orders) {
        if (o.id == id || o.folio == id) {
            o.status = "Entregado";
            o.badgeClass = "bg-blue-100 text-blue-800 border-blue-300";
            return true;
        }
    }
    return false;
}

std::vector<Sale> Database::getSales() {
    std::lock_guard<std::mutex> lock(m_mutex);
    return m_sales;
}

bool Database::saveSale(const Sale& sale) {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_sales.insert(m_sales.begin(), sale);
    return true;
}

std::vector<Customer> Database::getCustomers() {
    std::lock_guard<std::mutex> lock(m_mutex);
    return m_customers;
}

bool Database::saveCustomer(const Customer& customer) {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_customers.insert(m_customers.begin(), customer);
    return true;
}

std::vector<InventoryItem> Database::getInventory() {
    std::lock_guard<std::mutex> lock(m_mutex);
    return m_inventory;
}

bool Database::adjustStock(const std::string& sku, int delta) {
    std::lock_guard<std::mutex> lock(m_mutex);
    for (auto& item : m_inventory) {
        if (item.sku == sku) {
            item.stock = std::max(0, item.stock + delta);
            if (item.stock == 0) {
                item.status = "Agotado";
                item.statusClass = "bg-red-100 text-red-800 border-red-300 font-bold";
            } else if (item.stock < item.minStock) {
                item.status = "Stock Bajo";
                item.statusClass = "bg-amber-100 text-amber-800 border-amber-300 font-bold";
            } else {
                item.status = "Disponible";
                item.statusClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
            }
            return true;
        }
    }
    return false;
}

} // namespace Taller27
