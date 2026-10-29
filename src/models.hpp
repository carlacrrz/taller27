#pragma once

#include <string>
#include <vector>
#include <sstream>
#include <iomanip>

namespace Taller27 {

struct ThreadColor {
    std::string name;
    std::string code;
    std::string hex;
};

struct SizeBreakdown {
    std::string prenda;
    std::string color;
    std::string talla;
    int cantidad;
};

struct EmbroideryLocation {
    std::string punto;
    std::string nombre;
    std::string medidas;
    std::string archivo;
    std::string sampleImg;
};

struct Order {
    std::string id;
    std::string folio;
    std::string client;
    std::string clientFullName;
    std::string status;
    std::string badgeClass;
    std::string prenda;
    std::string color;
    int cantidad;
    std::string tipoTrabajo;
    std::string fechaPedido;
    std::string fechaEntrega;
    std::string operador;
    std::vector<ThreadColor> hilos;
    std::vector<SizeBreakdown> breakdown;
    std::vector<EmbroideryLocation> ubicaciones;
    std::string notas;
};

struct Customer {
    std::string id;
    std::string initials;
    std::string name;
    std::string fullName;
    std::string tipo;
    std::string rfc;
    std::string telefono;
    std::string correo;
    std::string direccion;
    std::string contacto;
    std::string totalFacturado;
    std::string pedidosTotales;
    std::string saldoPendiente;
    std::string creditoInfo;
    std::string tecnicaHabitual;
    std::string especificaciones;
};

struct Sale {
    std::string folio;
    std::string hora;
    std::string cliente;
    std::string rfc;
    std::string vinculado;
    std::string concepto;
    double total;
    double anticipo;
    double saldo;
    std::string metodo;
    std::string estado;
    std::string cfdi;
};

struct InventoryItem {
    std::string sku;
    std::string brand;
    std::string name;
    std::string desc;
    std::string color;
    std::string sizes;
    int stock;
    int minStock;
    std::string price;
    std::string status;
    std::string statusClass;
    std::string img;
};

} // namespace Taller27
