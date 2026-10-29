-- =====================================================================
-- TALLER-27 BORDADOS - DATOS INICIALES (SEED DATA)
-- Datos exactos extraídos del diseño en Figma
-- =====================================================================

-- 1. CLIENTES
INSERT INTO clientes (codigo, nombre, razon_social, tipo, rfc, regimen_fiscal, codigo_postal, uso_cfdi, telefono, correo, direccion_fiscal, contacto_nombre, tarifa_asignada, condicion_pago, saldo_pendiente, pedidos_totales, total_facturado, tecnica_habitual, especificaciones_taller)
VALUES 
('CP', 'CoffePoint México S.A.', 'CoffePoint México S.A. de C.V.', 'moral', 'CPM180422K90', '601', '03100', 'G03', '+52 55 4192 8840', 'compras@coffepoint.mx', 'Av. Insurgentes Sur 1480, Piso 4, Benito Juárez, CDMX', 'Puerta 2 Taller (Arq. Juan Pérez)', 'Tarifa Maquila B2B', 'Cuenta al corriente (Crédito 15 días)', 0.00, 14, 64850.00, 'Bordado Industrial', 'Especificaciones de taller: Exigen estricto uso de hilo Madeira Polyneon Negro #1800 y Rojo #1837. Requieren siempre factura mensual CFDI 4.0 al día siguiente de la entrega. Contacto autorizado de recepción: Arq. Juan Pérez.'),

('AZ', 'AutoZone Refacciones', 'AutoZone de México S. de R.L. de C.V.', 'moral', 'AZR091105PL1', '601', '64000', 'G01', '+52 81 8399 2000', 'adquisiciones@autozone.com.mx', 'Av. Constitución 2005, Centro, Monterrey, N.L.', 'Ing. Roberto Garza (Flotilla Oriente)', 'Tarifa Corporativa', 'Crédito 30 días', 1450.00, 28, 128400.00, 'DFT y Bordado 3D en gorras', 'Logotipos con borde en hilo naranja de seguridad. Cintas reflejantes aprobadas por norma STPS.'),

('CN', 'Club Náutico Marina Real', 'Club Náutico Marina Real A.C.', 'moral', 'CNM200114TR4', '601', '39867', 'G03', '+52 55 4819 2041', 'administracion@marinareal.mx', 'Paseo de la Marina 120, Acapulco / CDMX', 'Ing. Carlos V.', 'Tarifa Maquila B2B', '50% Anticipo + Saldo a entrega', 0.00, 6, 42300.00, 'Bordado en prendas náuticas', 'Uso de hilos marinos resistentes al sol y salinidad.'),

('CC', 'CandyCake Repostería', 'CandyCake Gourmet México S.A.', 'moral', 'CCR190803HJ8', '601', '06700', 'G03', '+52 55 2381 9920', 'contacto@candycake.com', 'Calle Colima 184, Roma Norte, Cuauhtémoc, CDMX', 'Laura Méndez', 'Tarifa Mostrador', 'Al corriente', 0.00, 9, 18900.00, 'Bordado en mandiles y filipinas', 'Hilo rosa pastel con tolerancias mínimas para tipografías caligráficas.'),

('CF', 'CrossFit Spartan Center', 'CrossFit Spartan Training Gym', 'moral', 'CFS2107119A3', '612', '03800', 'G03', '+52 55 7712 3490', 'admin@spartancenter.mx', 'Av. Revolución 450, San Pedro de los Pinos, CDMX', 'Coach Rodrigo', 'Tarifa Mayorista', '50% Anticipo', 2400.00, 12, 35800.00, 'Estampado DFT deportivo', 'Prendas 100% poliéster DryFit con curado a 150°C.'),

('LH', 'Luis Herrera', 'Luis Herrera López', 'fisica', 'HELL850212AB9', '612', '03020', 'G03', '+52 55 3344 5566', 'lherrera@gmail.com', 'Col. Narvarte Poniente, CDMX', 'Luis Herrera', 'Tarifa Mostrador', 'Contado', 450.00, 3, 3800.00, 'Bordado unitario', 'Cliente de mostrador.');

-- 2. INVENTARIO DE PRENDAS TEXTILES
INSERT INTO inventario_prendas (sku, marca, nombre, descripcion, color, desglose_tallas, stock_actual, stock_minimo, precio_mayoreo, estado, imagen_url)
VALUES 
('YZB-PL-001', 'YAZBECK', 'YAZBECK Polo Piqué 100% Algodón', 'Corte Clásico Masculino • 230 gr/m²', 'Negro Jet', 'S: 14 • M: 22 • L: 8 • XL: 4', 48, 25, 118.50, 'Disponible', 'assets/polo_yazbeck_negro.png'),

('YZB-CR-002', 'YAZBECK', 'YAZBECK Playera Cuello Redondo C0300', 'Prendas Heavy Weight • 200 gr/m²', 'Blanco Óptico', 'S: 2 • M: 3 • L: 5 • XL: 0', 10, 30, 64.00, 'Stock Bajo', 'assets/playera_blanco_yazbeck.png'),

('GLD-HD-104', 'GILDAN', 'GILDAN Heavy Blend Hoodie 18500', 'Felpa 50/50 • Interior perchado suave', 'Marino 32C', 'S: 8 • M: 16 • L: 14 • XL: 6', 44, 15, 245.00, 'Disponible', 'assets/sudadera_azul_gildan.png'),

('YPG-CP-088', 'YUPOONG', 'YUPOONG Gorra Clásica 6 Paneles', 'Corona rígida especial para bordado 3D', 'Rojo Carmín', 'Unitalla: 0', 0, 20, 92.00, 'Agotado', 'assets/gorra_yupoong_roja.png'),

('YZB-CH-502', 'YAZBECK', 'YAZBECK Chaleco Brigadista Alta Visibilidad', 'Cintas reflejantes 2" • Bolsa porta-radio', 'Neón / Cintas', 'M: 10 • L: 18 • XL: 12', 40, 15, 165.00, 'Disponible', 'assets/chaleco_yazbeck_amarillo.png');

-- 3. INSUMOS TÉCNICOS
INSERT INTO inventario_insumos (codigo, tipo, nombre, variante_color, unidad_medida, stock_actual, stock_minimo, alerta_critica, notas_tecnicas)
VALUES 
('INS-MAD-1801', 'Hilo Madeira', 'Madeira Polyneon 40', '#1801 Rojo Bandera', 'conos', 8, 4, FALSE, '5,000 mts/cono poliéster alta tenacidad'),
('INS-MAD-1800', 'Hilo Madeira', 'Madeira Polyneon 40', '#1800 Negro Puro', 'conos', 2, 6, TRUE, 'Stock crítico en piso de bordado'),
('INS-PEL-80G', 'Pelón', 'Pelón / Entretela Arrancable 80g', 'Blanco', 'metros', 120, 30, FALSE, 'Rollo 1.20m ancho especial polos piqué'),
('INS-VIN-WHT', 'Vinil', 'Vinil Textil Poliuretano', 'Blanco Mate (50cm x 25m)', 'rollos', 3.5, 2, FALSE, 'Termofijado 155°C, despegue en tibio');

-- 4. PEDIDOS & ÓRDENES
INSERT INTO pedidos (id, folio, cliente_id, cliente_nombre, cliente_razon_social, estado, prenda_base, color_prenda, cantidad_total, tipo_trabajo, fecha_pedido, fecha_entrega, operador, notas_tolerancia, colores_hilos)
VALUES 
(1, '#A91892', 1, 'CoffePoint', 'CoffePoint México S.A. de C.V.', 'En proceso', 'YAZBECK POLO', 'Negro', 10, 'Bordado', '2026-10-20', '2026-10-30', 'Juan Pérez', 'Tolerancia de bordados de 1-2 cm. Usar pelón arrancable 80g reforzado en tejido piqué. Archivo autorizado por Arq. Juan Pérez.', '[{"name":"Rojo","code":"#1801","hex":"#dc2626"},{"name":"Negro","code":"#1800","hex":"#111111"},{"name":"Azul","code":"#1842","hex":"#1d4ed8"}]'::jsonb),

(2, '#A91888', 2, 'AutoZone', 'AutoZone de México S. de R.L. de C.V.', 'Vencido', 'YAZBECK Gorra / Camisola', 'Negro', 10, 'DFT', '2026-10-14', '2026-10-24', 'Mariana S.', 'Entrega prioritaria demorada. Reordenar de inmediato.', '[{"name":"Blanco","code":"#1801","hex":"#ffffff"},{"name":"Rojo","code":"#1802","hex":"#ef4444"}]'::jsonb),

(3, '#A91889', 6, 'Luis Herrera', 'Luis Herrera López', 'Pendiente', 'YAZBECK Camisola', 'Negro', 10, 'DFT', '2026-10-18', '2026-10-28', 'Mariana S.', 'Pendiente autorización final del ponchado.', '[{"name":"Amarillo","code":"#1803","hex":"#facc15"}]'::jsonb),

(4, '#A91894', 3, 'Padel', 'Padel Club MX', 'En proceso', 'YAZBECK Toallas & Polos', 'Negro', 10, 'DFT', '2026-10-21', '2026-10-29', 'Juan Pérez', 'Bordado con hilo reflectivo en borde.', '[{"name":"Verde Neón","code":"#1890","hex":"#22c55e"}]'::jsonb),

(5, '#A91895', 5, 'CrossFit', 'CrossFit Spartan Training Gym', 'En proceso', 'YAZBECK DryFit', 'Negro', 10, 'DFT', '2026-10-22', '2026-10-31', 'Mariana S.', 'Estampado termotransferible DFT de alta elasticidad.', '[{"name":"Rojo","code":"#1801","hex":"#dc2626"}]'::jsonb),

(6, '#A91896', 4, 'CandyCake', 'CandyCake Gourmet México S.A.', 'En proceso', 'YAZBECK Mandiles', 'Negro', 10, 'DFT', '2026-10-23', '2026-11-01', 'Juan Pérez', 'Bordado fino en mandil con hilos resistentes al lavado con cloro.', '[{"name":"Rosa Pastel","code":"#1812","hex":"#f472b6"}]'::jsonb),

(7, '#A91893', 1, 'Emilia Arce', 'Emilia Arce (Diseño)', 'En proceso', 'YAZBECK POLO', 'Negro', 10, 'DFT', '2026-10-19', '2026-10-28', 'Mariana S.', 'Muestra aprobada vía WhatsApp.', '[{"name":"Negro","code":"#1800","hex":"#111111"}]'::jsonb);

-- 5. DESGLOSE DE TALLAS PARA COFFEPOINT (#A91892)
INSERT INTO pedido_tallas (pedido_id, talla, color, cantidad)
VALUES 
(1, 'S', 'Negro', 3),
(1, 'M', 'Negro', 3),
(1, 'L', 'Negro', 4);

-- 6. UBICACIONES TÉCNICAS PARA COFFEPOINT (#A91892)
INSERT INTO pedido_ubicaciones (pedido_id, punto_numero, nombre_ubicacion, medidas, archivo_diseno, muestra_imagen)
VALUES 
(1, 1, 'Pecho', '5 cm x 6 cm', 'GRUMEX_v2.EMB', 'assets/sample_embroidery_1.png'),
(1, 2, 'Brazo derecho', '5 cm x 6 cm', 'BANDERA_MEX.DST', 'assets/sample_embroidery_2.png');

-- 7. HISTORIAL DE VENTAS POS
INSERT INTO ventas_pos (folio, pedido_id, cliente_id, cliente_nombre, rfc, concepto, monto_total, monto_anticipo, saldo_pendiente, metodo_pago, modalidad_cobro, estado_pago, tipo_comprobante, caja_operador, fecha_hora)
VALUES 
('#V-1042', 1, 1, 'CoffePoint', 'COP920102-K21', '10pz Polo Yazbeck + Bordado Pecho', 2300.00, 1150.00, 1150.00, 'Tarjeta', '50%', 'Anticipo 50%', 'Emitida', 'Caja 01 | Mariana S.', '2026-10-28 14:22:00'),

('#V-1041', 2, 2, 'AutoZone', 'Flotilla Oriente', '25pz Gorras Yupoong DFT', 3850.00, 3850.00, 0.00, 'Transferencia', '100%', 'Liquidado', 'Emitida', 'Caja 01 | Mariana S.', '2026-10-28 12:45:00'),

('#V-1040', 6, 4, 'CandyCake Repostería', 'Laura Mendez', '8pz Mandiles con Bordado', 1600.00, 800.00, 800.00, 'Efectivo', '50%', 'Anticipo 50%', 'Ticket', 'Caja 01 | Mariana S.', '2026-10-28 11:10:00'),

('#V-1039', 3, 6, 'Luis Herrera', 'Cliente Mostrador', '1pz Camisola Mecánico', 450.00, 0.00, 450.00, 'Por definir', 'manual', 'Pendiente', 'Ticket', 'Caja 01 | Mariana S.', '2026-10-27 18:30:00'),

('#V-1038', 4, 3, 'Padel Club MX', 'Torneo de Primavera', '50pz Toallas Microfibra', 5250.00, 5250.00, 0.00, 'Transferencia', '100%', 'Liquidado', 'Emitida', 'Caja 01 | Mariana S.', '2026-10-27 16:15:00'),

('#V-1037', 5, 5, 'CrossFit Spartan', 'Coach Rodrigo', '30pz Tank Top DryFit', 4800.00, 2400.00, 2400.00, 'Tarjeta', '50%', 'Anticipo 50%', 'Emitida', 'Caja 01 | Mariana S.', '2026-10-27 13:00:00');

-- 8. ARQUEO DE CAJA
INSERT INTO arqueos_caja (caja_nombre, operador, fondo_base, entradas_total, salidas_total, efectivo_en_caja, corte_turno, estado)
VALUES ('Caja Principal 01', 'Mariana S.', 2000.00, 10500.00, 400.00, 12150.00, '19:30:00', 'Abierto');
