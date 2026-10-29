#pragma once

#include "models.hpp"
#include <string>
#include <vector>
#include <mutex>
#include <memory>

namespace Taller27 {

class Database {
public:
    static Database& instance();

    bool init(const std::string& conninfo = "");
    bool isConnectedToPostgres() const;
    std::string getStatusMessage() const;

    // Orders CRUD
    std::vector<Order> getOrders();
    bool saveOrder(const Order& order);
    bool markOrderDelivered(const std::string& id);

    // Sales CRUD
    std::vector<Sale> getSales();
    bool saveSale(const Sale& sale);

    // Customers CRUD
    std::vector<Customer> getCustomers();
    bool saveCustomer(const Customer& customer);

    // Inventory CRUD
    std::vector<InventoryItem> getInventory();
    bool adjustStock(const std::string& sku, int delta);

private:
    Database();
    ~Database();

    void seedMemoryDefaults();

    mutable std::mutex m_mutex;
    bool m_hasPg = false;
    std::string m_statusMsg;
#ifdef HAVE_LIBPQ
    void* m_pgConn = nullptr; // PGconn pointer if libpq is available
#endif

    // In-memory synchronized store (ensures 100% reliable operation & cache)
    std::vector<Order> m_orders;
    std::vector<Sale> m_sales;
    std::vector<Customer> m_customers;
    std::vector<InventoryItem> m_inventory;
};

} // namespace Taller27
