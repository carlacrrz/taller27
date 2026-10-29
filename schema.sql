-- =====================================================================
-- TALLER-27 BORDADOS - BASE DE DATOS RELACIONAL POSTGRESQL
-- Esquema oficial para Sistema de Producción, Punto de Venta (POS) y Clientes
-- =====================================================================

-- Extensión para generación de UUIDs si es requerida
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: CLIENTES & EXPEDIENTES FISCALES CFDI 4.0
DROP TABLE IF EXISTS pedido_tallas CASCADE;
DROP TABLE IF EXISTS pedido_ubicaciones CASCADE;
DROP TABLE IF EXISTS ventas_partidas CASCADE;
DROP TABLE IF EXISTS ventas_pos CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS inventario_insumos CASCADE;
DROP TABLE IF EXISTS inventario_prendas CASCADE;
DROP TABLE IF EXISTS arqueos_caja CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    razon_social VARCHAR(200),
    tipo VARCHAR(50) DEFAULT 'moral', -- 'moral' (Cuenta corporativa B2B) o 'fisica' (Particular)
    rfc VARCHAR(20) NOT NULL,
    regimen_fiscal VARCHAR(10) DEFAULT '601', -- '601' Personas Morales, '612' Act. Empresarial, '626' RESICO
    codigo_postal VARCHAR(10) NOT NULL,
    uso_cfdi VARCHAR(10) DEFAULT 'G03', -- 'G03' Gastos en general, 'G01' Mercancias
    telefono VARCHAR(50) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    direccion_fiscal TEXT,
    contacto_nombre VARCHAR(150),
    tarifa_asignada VARCHAR(50) DEFAULT 'Tarifa Maquila B2B',
    condicion_pago VARCHAR(50) DEFAULT '50% Anticipo + Saldo a entrega',
    saldo_pendiente NUMERIC(12,2) DEFAULT 0.00,
    pedidos_totales INTEGER DEFAULT 0,
    total_facturado NUMERIC(12,2) DEFAULT 0.00,
    tecnica_habitual VARCHAR(100) DEFAULT 'Bordado Industrial',
    especificaciones_taller TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clientes_rfc ON clientes(rfc);
CREATE INDEX idx_clientes_nombre ON clientes(nombre);

-- 2. TABLA: INVENTARIO DE PRENDAS TEXTILES
CREATE TABLE inventario_prendas (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(30) UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL, -- 'YAZBECK', 'GILDAN', 'YUPOONG'
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    color VARCHAR(50) NOT NULL,
    desglose_tallas VARCHAR(150), -- Resumen legible de tallas
    stock_actual INTEGER NOT NULL DEFAULT 0,
    stock_minimo INTEGER NOT NULL DEFAULT 15,
    precio_mayoreo NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    estado VARCHAR(30) DEFAULT 'Disponible', -- 'Disponible', 'Stock Bajo', 'Agotado'
    imagen_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prendas_sku ON inventario_prendas(sku);
CREATE INDEX idx_prendas_marca ON inventario_prendas(marca);

-- 3. TABLA: INSUMOS TÉCNICOS DE TALLER
CREATE TABLE inventario_insumos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'Hilo Madeira', 'Pelon', 'Vinil', 'Agujas'
    nombre VARCHAR(150) NOT NULL,
    variante_color VARCHAR(100),
    unidad_medida VARCHAR(50) NOT NULL, -- 'conos', 'metros', 'rollos'
    stock_actual NUMERIC(10,2) NOT NULL DEFAULT 0,
    stock_minimo NUMERIC(10,2) NOT NULL DEFAULT 5,
    alerta_critica BOOLEAN DEFAULT FALSE,
    notas_tecnicas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA: PEDIDOS Y ÓRDENES DE PRODUCCIÓN
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    folio VARCHAR(20) UNIQUE NOT NULL, -- e.g. '#A91892'
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
    cliente_nombre VARCHAR(150) NOT NULL,
    cliente_razon_social VARCHAR(200),
    estado VARCHAR(30) DEFAULT 'En proceso', -- 'En proceso', 'Pendiente', 'Vencido', 'Entregado'
    prenda_base VARCHAR(150) NOT NULL,
    color_prenda VARCHAR(50) NOT NULL,
    cantidad_total INTEGER NOT NULL DEFAULT 1,
    tipo_trabajo VARCHAR(50) NOT NULL DEFAULT 'Bordado Computarizado', -- 'Bordado', 'DFT', 'Serigrafia'
    fecha_pedido DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_entrega DATE NOT NULL,
    operador VARCHAR(100) DEFAULT 'Juan Pérez',
    notas_tolerancia TEXT DEFAULT 'Tolerancia de bordados de 1-2 cm estándar.',
    colores_hilos JSONB, -- Colores Pantone / Madeira: [{"name":"Rojo","code":"#1801","hex":"#dc2626"}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pedidos_folio ON pedidos(folio);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_pedidos_fecha_entrega ON pedidos(fecha_entrega);

-- 5. TABLA: DESGLOSE DE TALLAS POR PEDIDO
CREATE TABLE pedido_tallas (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
    talla VARCHAR(20) NOT NULL, -- 'XS', 'S', 'M', 'L', 'XL', '2XL', 'Unitalla'
    color VARCHAR(50) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX idx_tallas_pedido ON pedido_tallas(pedido_id);

-- 6. TABLA: UBICACIONES Y ESQUEMAS TÉCNICOS DE BORDADO/ESTAMPADO
CREATE TABLE pedido_ubicaciones (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
    punto_numero INTEGER NOT NULL DEFAULT 1,
    nombre_ubicacion VARCHAR(100) NOT NULL, -- 'Pecho izquierdo', 'Brazo derecho', 'Espalda'
    medidas VARCHAR(50) NOT NULL, -- '5 cm x 6 cm'
    archivo_diseno VARCHAR(100), -- 'GRUMEX_v2.EMB', 'BANDERA_MEX.DST'
    muestra_imagen VARCHAR(255)
);

CREATE INDEX idx_ubicaciones_pedido ON pedido_ubicaciones(pedido_id);

-- 7. TABLA: VENTAS DE MOSTRADOR Y PUNTO DE VENTA (POS)
CREATE TABLE ventas_pos (
    id SERIAL PRIMARY KEY,
    folio VARCHAR(20) UNIQUE NOT NULL, -- e.g. '#V-1043'
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE SET NULL,
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
    cliente_nombre VARCHAR(150) NOT NULL,
    rfc VARCHAR(20),
    concepto TEXT NOT NULL,
    monto_total NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    monto_anticipo NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    saldo_pendiente NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    metodo_pago VARCHAR(50) NOT NULL DEFAULT 'Tarjeta', -- 'Tarjeta', 'Efectivo', 'Transferencia'
    modalidad_cobro VARCHAR(50) NOT NULL DEFAULT '50%', -- '50%', 'manual', '100%'
    estado_pago VARCHAR(50) NOT NULL DEFAULT 'Anticipo 50%', -- 'Liquidado', 'Anticipo 50%', 'Pendiente'
    tipo_comprobante VARCHAR(30) DEFAULT 'Ticket', -- 'Ticket', 'Emitida' (CFDI 4.0)
    caja_operador VARCHAR(100) DEFAULT 'Caja Principal 01 | Mariana S.',
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ventas_folio ON ventas_pos(folio);
CREATE INDEX idx_ventas_estado ON ventas_pos(estado_pago);

-- 8. TABLA: ARQUEOS Y CORTES DE TURNO
CREATE TABLE arqueos_caja (
    id SERIAL PRIMARY KEY,
    caja_nombre VARCHAR(50) DEFAULT 'Caja Principal 01',
    operador VARCHAR(100) DEFAULT 'Mariana S.',
    fondo_base NUMERIC(10,2) DEFAULT 2000.00,
    entradas_total NUMERIC(10,2) DEFAULT 10500.00,
    salidas_total NUMERIC(10,2) DEFAULT 400.00,
    efectivo_en_caja NUMERIC(10,2) DEFAULT 12150.00,
    corte_turno TIME DEFAULT '19:30:00',
    estado VARCHAR(30) DEFAULT 'Cerrado',
    fecha_corte TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
