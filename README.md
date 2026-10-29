# Taller-27 Bordados | Sistema de Producción & Punto de Venta (POS)

Sistema integral de gestión de taller textil, órdenes de bordado/DFT, inventario y punto de venta en mostrador diseñado a partir de las especificaciones de Figma. Desarrollado en **C++17** para **macOS**, con base de datos relacional **PostgreSQL** y ventana nativa de escritorio Cocoa/WebKit.

---

## 🛠️ Arquitectura Técnica

1. **Lenguaje Base**: C++17 compilado con Apple Clang (`clang++`).
2. **Base de Datos**: PostgreSQL (`schema.sql` y `seed.sql`).
   - Conector nativo `libpq` con motor de persistencia y contingencia sincronizado en memoria.
3. **Interfaz Gráfica macOS**:
   - Ventana nativa de Mac compilada con `-framework Cocoa -framework WebKit` (`src/mac_app.mm`).
   - Servidor HTTP y API REST integrado de alto rendimiento en C++ (`src/server.cpp`).
   - Interfaz visual con tokens de diseño exactos de Figma, diseño adaptable (Flexbox/Grid), iconografía Lucide y tipografías oficiales.

---

## 📁 Estructura del Proyecto

```
Taller27/
├── bin/                        # Binarios compilados en Mac
│   ├── Taller27                # Aplicación nativa de escritorio macOS
│   └── taller27_server         # Servidor C++ de producción / backend CLI
├── src/                        # Código fuente C++
│   ├── database.hpp / .cpp     # Capa de datos y conector PostgreSQL (libpq)
│   ├── models.hpp              # Estructuras de datos (Pedidos, Clientes, Ventas, Inventario)
│   ├── server.hpp / .cpp       # Servidor HTTP multihilo y endpoints REST API
│   ├── mac_app.mm              # Ventana nativa de escritorio para macOS (Cocoa + WebKit)
│   └── main.cpp                # Punto de entrada para servidor en consola
├── schema.sql                  # Estructura completa de PostgreSQL (tablas, índices, llaves)
├── seed.sql                    # Datos iniciales exactos de las pantallas de Figma
├── Makefile                    # Configuración de compilación con clang++
├── run_mac.sh                  # Script de ejecución con un solo clic para Mac
├── index.html                  # Interfaz de usuario (vistas, modales y navegación)
├── styles.css                  # Tokens visuales, jerarquía tipográfica y scrollbars
├── app.js                      # Controlador interactivo de la interfaz
└── assets/                     # Logotipo oficial, mockups y fotos de catálogo
    ├── logo.png                # Logotipo "TALLER-27 BORDADOS" transparente
    ├── sample_embroidery_shirt.png # Diagrama técnico de polo
    ├── sample_embroidery_1.png     # Muestra bordado GRUMEX
    ├── sample_embroidery_2.png     # Parche bordado Bandera de México
    ├── polo_yazbeck_negro.png
    ├── playera_blanco_yazbeck.png
    ├── sudadera_azul_gildan.png
    ├── gorra_yupoong_roja.png
    └── chaleco_yazbeck_amarillo.png
```

---

## 🗄️ Base de Datos PostgreSQL

### 1. Tablas Relacionales Incluidas:
- **`clientes`**: Catálogo con clasificación (Empresas B2B / Personas Físicas), datos fiscales **SAT CFDI 4.0** (RFC, Régimen 601, Uso de CFDI G03, CP, domicilio), condiciones de crédito a 15/30 días y notas de taller.
- **`pedidos`**: Registro de órdenes con folio (ej. `#A91892`), cliente, técnica (Bordado, DFT), fecha de ingreso, fecha límite de entrega, operador y colores de hilo.
- **`pedido_tallas`**: Desglose por talla (XS, S, M, L, XL, 2XL) y cantidades.
- **`pedido_ubicaciones`**: Puntos de aplicación técnica (Pecho izquierdo, Manga derecha, Espalda) con medidas en centímetros y archivo ponchado asignado (`.DST` / `.EMB`).
- **`inventario_prendas`**: Catálogo de prendas base (Yazbeck, Gildan, Yupoong) con SKU, existencias por variante, umbrales mínimos y alertas de stock crítico.
- **`inventario_insumos`**: Consumibles de taller (hilos Madeira Polyneon, rollos de pelón arrancable 80g, vinil textil, agujas).
- **`ventas_pos`**: Historial de mostrador (#V-1043), modalidades de cobro (50% anticipo, anticipo manual libre, 100% liquidado), métodos de pago y estado de timbrado fiscal.
- **`arqueos_caja`**: Cortes de turno (19:30), fondos de caja y balance de efectivo.

### 2. Para importar en PostgreSQL:
```bash
# Crear base de datos
createdb taller27

# Importar esquema y datos de prueba
psql -d taller27 -f schema.sql
psql -d taller27 -f seed.sql
```

---

## 🚀 Cómo Ejecutar en Mac

### Opción A: Aplicación Nativa de Escritorio (Recomendado)
Abre la terminal en la carpeta del proyecto y ejecuta:
```bash
./run_mac.sh
```
O directamente con `make`:
```bash
make run
```
Esto abrirá una **ventana nativa de macOS** con la aplicación completa corriendo a través del motor C++.

### Opción B: Servidor C++ en Consola
Si deseas correr únicamente el servidor backend:
```bash
./bin/taller27_server 3000
```
Y luego abre `http://localhost:3000` en Safari o Chrome.

---

## 💡 Preguntas Frecuentes & Especificaciones de Diseño

1. **¿Debes adjuntar las fuentes que usaste (Futura)?**
   - La interfaz utiliza principalmente **`Plus Jakarta Sans`** (para toda la base de datos, botones, inputs y tablas) y **`Bebas Neue`**, ambas cargadas automáticamente desde Google Fonts.
   - Para **`Futura`**: Está configurada con fallbacks de sistema y de diseñador (`'Futura', 'Futura PT', 'Plus Jakarta Sans', sans-serif`). Si tienes los archivos originales de la fuente (`.woff2`, `.ttf` u `.otf`), **puedes colocarlos en una carpeta `fonts/` para máxima fidelidad nativa**, pero no es estrictamente obligatorio ya que los fallbacks visuales ya están configurados.
2. **¿Debes adjuntar el logotipo?**
   - **No es obligatorio**: El archivo oficial `logo.png` con transparencia (`TALLER-27 BORDADOS`) fue extraído directamente del Figma y ya se encuentra integrado en la barra de navegación y tickets de venta. Si cuentas con el archivo vectorial original `.svg`, puedes sustituirlo opcionalmente para nitidez infinita.
3. **Muestra amarilla de identidad**:
   - Como solicitaste, la imagen amarilla de muestra de identidad de marca **no se incluyó en la interfaz de la aplicación**; únicamente se tomaron de ella los valores de color de marca (`#f5c518` / CMYK C0 M22 Y94 K0) y lineamientos de bases blanco/negro.
4. **Contenedores scrollables e información oculta**:
   - Se integraron todos los datos de los contenedores con scroll identificados en el Figma:
     - El expediente técnico completo de pedido con desglose de tallas (S, M, L), medidas de bordado (5x6 cm), hilos Madeira y diagrama de prenda.
     - El formulario modal completo de **Nuevo Pedido** con 4 secciones navegables.
     - El modal flotante de **Nueva Venta en Mostrador** con anticipo manual y desglose de servicios técnicos.
     - El directorio y ficha **Master-Detail de Clientes** con información fiscal CFDI 4.0.
     - La tabla bento de **Inventario** con desglose de tallas por SKU e insumos técnicos de taller.
