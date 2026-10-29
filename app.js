/**
 * Taller-27 Bordados - Core Application Logic
 * Implements full interactive POS, production orders, client dossiers, inventory, and modals.
 */

// Global State
const state = {
  activeView: 'pedidos',
  activeOrderFilter: 'todos',
  selectedOrderId: 'A91892', // Default: CoffePoint
  selectedCustomerId: 'CP', // Default: CoffePoint
  
  // Orders List Data
  orders: [
    {
      id: 'A91892',
      folio: '#A91892',
      client: 'CoffePoint',
      clientFullName: 'CoffePoint México S.A. de C.V.',
      status: 'En proceso',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      prenda: 'YAZBECK POLO',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'Bordado',
      fechaPedido: '20/10/2026',
      fechaEntrega: '30/10/2026',
      operador: 'Juan Pérez',
      hilos: [
        { name: 'Rojo', code: '#1801', hex: '#dc2626' },
        { name: 'Negro', code: '#1800', hex: '#111111' },
        { name: 'Azul', code: '#1842', hex: '#1d4ed8' }
      ],
      breakdown: [
        { prenda: 'YAZBECK POLO', color: 'Negro', talla: 'S', cantidad: 3 },
        { prenda: 'YAZBECK POLO', color: 'Negro', talla: 'M', cantidad: 3 },
        { prenda: 'YAZBECK POLO', color: 'Negro', talla: 'L', cantidad: 4 }
      ],
      ubicaciones: [
        { punto: '1', nombre: 'Pecho Izquierdo', medidas: '5 cm x 6 cm', archivo: 'GRUMEX_v2.EMB', x: 55, y: 38, sampleImg: 'assets/sample_embroidery_1.png' },
        { punto: '2', nombre: 'Brazo derecho', medidas: '5 cm x 6 cm', archivo: 'BANDERA_MEX.DST', x: 18, y: 42, sampleImg: 'assets/sample_embroidery_2.png' }
      ],
      notas: 'Tolerancia de bordados de 1-2 cm. Usar pelón arrancable 80g reforzado en tejido piqué. Archivo autorizado por Arq. Juan Pérez.'
    },
    {
      id: 'A91888',
      folio: '#A91888',
      client: 'AutoZone',
      clientFullName: 'AutoZone Refacciones (Flotilla Oriente)',
      status: 'Vencido',
      badgeClass: 'bg-red-100 text-red-800 border-red-300',
      prenda: 'YAZBECK Gorra / Camisola',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'DFT',
      fechaPedido: '14/10/2026',
      fechaEntrega: '24/10/2026',
      operador: 'Mariana S.',
      hilos: [{ name: 'Blanco', code: '#1801', hex: '#ffffff' }, { name: 'Rojo', code: '#1802', hex: '#ef4444' }],
      breakdown: [
        { prenda: 'YAZBECK', color: 'Negro', talla: 'M', cantidad: 5 },
        { prenda: 'YAZBECK', color: 'Negro', talla: 'L', cantidad: 5 }
      ],
      ubicaciones: [
        { punto: '1', nombre: 'Frente Pecho', medidas: '10 cm x 5 cm', archivo: 'AUTOZONE.DST', x: 50, y: 36, sampleImg: 'assets/sample_embroidery_1.png' },
        { punto: '2', nombre: 'Manga Derecha', medidas: '6 cm x 4 cm', archivo: 'AZ_REFAC.DST', x: 18, y: 42, sampleImg: 'assets/sample_embroidery_2.png' }
      ],
      notas: 'Entrega prioritaria demorada. Reordenar de inmediato.'
    },
    {
      id: 'A91889',
      folio: '#A91889',
      client: 'Luis Herrera',
      clientFullName: 'Luis Herrera (Mostrador)',
      status: 'Pendiente',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      prenda: 'YAZBECK Camisola',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'DFT',
      fechaPedido: '18/10/2026',
      fechaEntrega: '28/10/2026',
      operador: 'Mariana S.',
      hilos: [{ name: 'Amarillo', code: '#1803', hex: '#facc15' }],
      breakdown: [
        { prenda: 'YAZBECK', color: 'Negro', talla: 'L', cantidad: 10 }
      ],
      ubicaciones: [
        { punto: '1', nombre: 'Espalda', medidas: '20 cm x 10 cm', archivo: 'HERRERA.DFT', x: 50, y: 55, sampleImg: 'assets/sample_embroidery_shirt.png' },
        { punto: '2', nombre: 'Pecho Izquierdo', medidas: '7 cm x 5 cm', archivo: 'HERRERA_LOGO.DFT', x: 55, y: 38, sampleImg: 'assets/sample_embroidery_1.png' }
      ],
      notas: 'Pendiente autorización final del ponchado.'
    },
    {
      id: 'A91894',
      folio: '#A91894',
      client: 'Padel',
      clientFullName: 'Padel Club MX',
      status: 'En proceso',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      prenda: 'YAZBECK Toallas & Polos',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'DFT',
      fechaPedido: '21/10/2026',
      fechaEntrega: '29/10/2026',
      operador: 'Juan Pérez',
      hilos: [{ name: 'Verde Neón', code: '#1890', hex: '#22c55e' }],
      breakdown: [{ prenda: 'YAZBECK', color: 'Negro', talla: 'M', cantidad: 5 }, { prenda: 'YAZBECK', color: 'Negro', talla: 'L', cantidad: 5 }],
      ubicaciones: [
        { punto: '1', nombre: 'Pecho Izquierdo', medidas: '8 cm x 4 cm', archivo: 'PADEL_MX.DST', x: 55, y: 38, sampleImg: 'assets/sample_embroidery_shirt.png' },
        { punto: '2', nombre: 'Manga Izquierda', medidas: '6 cm x 4 cm', archivo: 'PADEL_LOGO.DST', x: 82, y: 42, sampleImg: 'assets/sample_embroidery_2.png' }
      ],
      notas: 'Bordado con hilo reflectivo en borde.'
    },
    {
      id: 'A91895',
      folio: '#A91895',
      client: 'CrossFit',
      clientFullName: 'CrossFit Spartan Center',
      status: 'En proceso',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      prenda: 'YAZBECK DryFit',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'DFT',
      fechaPedido: '22/10/2026',
      fechaEntrega: '31/10/2026',
      operador: 'Mariana S.',
      hilos: [{ name: 'Rojo', code: '#1801', hex: '#dc2626' }],
      breakdown: [{ prenda: 'YAZBECK', color: 'Negro', talla: 'L', cantidad: 6 }, { prenda: 'YAZBECK', color: 'Negro', talla: 'XL', cantidad: 4 }],
      ubicaciones: [
        { punto: '1', nombre: 'Pecho Central', medidas: '12 cm x 8 cm', archivo: 'SPARTAN.DFT', x: 50, y: 38, sampleImg: 'assets/sample_embroidery_shirt.png' },
        { punto: '2', nombre: 'Hombro Derecho', medidas: '5 cm x 5 cm', archivo: 'SPARTAN_BADGE.DFT', x: 20, y: 30, sampleImg: 'assets/sample_embroidery_1.png' }
      ],
      notas: 'Estampado termotransferible DFT de alta elasticidad.'
    },
    {
      id: 'A91896',
      folio: '#A91896',
      client: 'CandyCake',
      clientFullName: 'CandyCake Repostería',
      status: 'En proceso',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      prenda: 'YAZBECK Mandiles',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'DFT',
      fechaPedido: '23/10/2026',
      fechaEntrega: '01/11/2026',
      operador: 'Juan Pérez',
      hilos: [{ name: 'Rosa Pastel', code: '#1812', hex: '#f472b6' }],
      breakdown: [{ prenda: 'YAZBECK', color: 'Negro', talla: 'Unitalla', cantidad: 10 }],
      ubicaciones: [
        { punto: '1', nombre: 'Pecho Mandil', medidas: '15 cm x 10 cm', archivo: 'CANDYCAKE.DST', x: 50, y: 38, sampleImg: 'assets/sample_embroidery_shirt.png' },
        { punto: '2', nombre: 'Bolsillo Lateral', medidas: '7 cm x 5 cm', archivo: 'CAKE_ICON.DST', x: 65, y: 65, sampleImg: 'assets/sample_embroidery_2.png' }
      ],
      notas: 'Bordado fino en mandil con hilos resistentes al lavado con cloro.'
    },
    {
      id: 'A91893',
      folio: '#A91893',
      client: 'Emilia Arce',
      clientFullName: 'Emilia Arce (Diseño)',
      status: 'En proceso',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      prenda: 'YAZBECK POLO',
      color: 'Negro',
      cantidad: 10,
      tipoTrabajo: 'DFT',
      fechaPedido: '19/10/2026',
      fechaEntrega: '28/10/2026',
      operador: 'Mariana S.',
      hilos: [{ name: 'Negro', code: '#1800', hex: '#111111' }],
      breakdown: [{ prenda: 'YAZBECK', color: 'Negro', talla: 'S', cantidad: 5 }, { prenda: 'YAZBECK', color: 'Negro', talla: 'M', cantidad: 5 }],
      ubicaciones: [
        { punto: '1', nombre: 'Cuello Posterior', medidas: '4 cm x 4 cm', archivo: 'EMILIA.DST', x: 50, y: 22, sampleImg: 'assets/sample_embroidery_shirt.png' },
        { punto: '2', nombre: 'Pecho Izquierdo', medidas: '6 cm x 5 cm', archivo: 'ARCE_BRAND.DST', x: 55, y: 38, sampleImg: 'assets/sample_embroidery_1.png' }
      ],
      notas: 'Muestra aprobada vía WhatsApp.'
    }
  ],

  // Sales (POS) History
  sales: [
    { folio: '#V-1042', hora: 'Hoy, 14:22', cliente: 'CoffePoint', rfc: 'COP920102-K21', vinculado: '#A91892', concepto: '10pz Polo Yazbeck + Bordado Pecho', total: 2300, anticipo: 1150, saldo: 1150, metodo: 'Tarjeta', estado: 'Anticipo 50%', cfdi: 'Emitida' },
    { folio: '#V-1041', hora: 'Hoy, 12:45', cliente: 'AutoZone', rfc: 'Flotilla Oriente', vinculado: '#A91888', concepto: '25pz Gorras Yupoong DFT', total: 3850, anticipo: 3850, saldo: 0, metodo: 'Transfer.', estado: 'Liquidado', cfdi: 'Emitida' },
    { folio: '#V-1040', hora: 'Hoy, 11:10', cliente: 'CandyCake Repostería', rfc: 'Laura Mendez', vinculado: '#A91880', concepto: '8pz Mandiles con Bordado', total: 1600, anticipo: 800, saldo: 800, metodo: 'Efectivo', estado: 'Anticipo 50%', cfdi: 'Ticket' },
    { folio: '#V-1039', hora: 'Ayer, 18:30', cliente: 'Luis Herrera', rfc: 'Cliente Mostrador', vinculado: '#A91875', concepto: '1pz Camisola Mecánico', total: 450, anticipo: 0, saldo: 450, metodo: 'Por definir', estado: 'Pendiente', cfdi: 'Ticket' },
    { folio: '#V-1038', hora: 'Ayer, 16:15', cliente: 'Padel Club MX', rfc: 'Torneo de Primavera', vinculado: '#A91866', concepto: '50pz Toallas Microfibra', total: 5250, anticipo: 5250, saldo: 0, metodo: 'Transfer.', estado: 'Liquidado', cfdi: 'Emitida' },
    { folio: '#V-1037', hora: 'Ayer, 13:00', cliente: 'CrossFit Spartan', rfc: 'Coach Rodrigo', vinculado: '#A91850', concepto: '30pz Tank Top DryFit', total: 4800, anticipo: 2400, saldo: 2400, metodo: 'Tarjeta', estado: 'Anticipo 50%', cfdi: 'Emitida' }
  ],

  // Customers Data
  customers: [
    {
      id: 'CP',
      initials: 'CP',
      name: 'CoffePoint México S.A.',
      fullName: 'CoffePoint México S.A. de C.V.',
      tipo: 'Cuenta corporativa (B2B)',
      rfc: 'CPM180422K90',
      telefono: '+52 55 4192 8840',
      correo: 'compras@coffepoint.mx',
      direccion: 'Av. Insurgentes Sur 1480, Piso 4, Benito Juárez, CDMX',
      contacto: 'Puerta 2 Taller (Arq. Juan Pérez)',
      totalFacturado: '$64,850.00 MXN',
      pedidosTotales: '14 órdenes (1 en proceso · 13 entregadas)',
      saldoPendiente: '$0.00 MXN',
      creditoInfo: 'Cuenta al corriente (Crédito 15 días)',
      tecnicaHabitual: 'Bordado Industrial (85% Bordado · 15% Impresión DFT)',
      especificaciones: 'Especificaciones de taller: Exigen estricto uso de hilo Madeira Polyneon Negro #1800 y Rojo #1837. Requieren siempre factura mensual CFDI 4.0 al día siguiente de la entrega. Contacto autorizado de recepción: Arq. Juan Pérez.'
    },
    {
      id: 'AZ',
      initials: 'AZ',
      name: 'AutoZone Refacciones',
      fullName: 'AutoZone de México S. de R.L. de C.V.',
      tipo: 'Cuenta corporativa B2B',
      rfc: 'AZR091105PL1',
      telefono: '+52 81 8399 2000',
      correo: 'adquisiciones@autozone.com.mx',
      direccion: 'Av. Constitución 2005, Centro, Monterrey, N.L.',
      contacto: 'Ing. Roberto Garza',
      totalFacturado: '$128,400.00 MXN',
      pedidosTotales: '28 órdenes',
      saldoPendiente: '$1,450.00 MXN',
      creditoInfo: 'Saldo vencido ayer (#A91888)',
      tecnicaHabitual: 'DFT y Bordado 3D en gorras',
      especificaciones: 'Logotipos con borde en hilo naranja de seguridad. Cintas reflejantes aprobadas por norma STPS.'
    },
    {
      id: 'CN',
      initials: 'CN',
      name: 'Club Náutico Marina Real',
      fullName: 'Club Náutico Marina Real A.C.',
      tipo: 'Cuenta corporativa B2B',
      rfc: 'CNM200114TR4',
      telefono: '+52 55 4819 2041',
      correo: 'administracion@marinareal.mx',
      direccion: 'Paseo de la Marina 120, Acapulco / CDMX',
      contacto: 'Ing. Carlos V.',
      totalFacturado: '$42,300.00 MXN',
      pedidosTotales: '6 órdenes',
      saldoPendiente: '$0.00 MXN',
      creditoInfo: 'Al corriente (Pago 50% anticipo)',
      tecnicaHabitual: 'Bordado en prendas náuticas',
      especificaciones: 'Uso de hilos marinos resistentes al sol y salinidad.'
    },
    {
      id: 'CC',
      initials: 'CC',
      name: 'CandyCake Repostería',
      fullName: 'CandyCake Gourmet México S.A.',
      tipo: 'Cuenta Pyme',
      rfc: 'CCR190803HJ8',
      telefono: '+52 55 2381 9920',
      correo: 'contacto@candycake.com',
      direccion: 'Calle Colima 184, Roma Norte, Cuauhtémoc, CDMX',
      contacto: 'Laura Méndez',
      totalFacturado: '$18,900.00 MXN',
      pedidosTotales: '9 órdenes',
      saldoPendiente: '$0.00 MXN',
      creditoInfo: 'Al corriente',
      tecnicaHabitual: 'Bordado en mandiles y filipinas',
      especificaciones: 'Hilo rosa pastel con tolerancias mínimas para tipografías caligráficas.'
    },
    {
      id: 'CF',
      initials: 'CF',
      name: 'CrossFit Spartan Center',
      fullName: 'CrossFit Spartan Training Gym',
      tipo: 'Gimnasio / Pyme',
      rfc: 'CFS2107119A3',
      telefono: '+52 55 7712 3490',
      correo: 'admin@spartancenter.mx',
      direccion: 'Av. Revolución 450, San Pedro de los Pinos, CDMX',
      contacto: 'Coach Rodrigo',
      totalFacturado: '$35,800.00 MXN',
      pedidosTotales: '12 órdenes',
      saldoPendiente: '$2,400.00 MXN',
      creditoInfo: 'Anticipo 50% cubierto',
      tecnicaHabitual: 'Estampado DFT deportivo',
      especificaciones: 'Prendas 100% poliéster DryFit con curado a 150°C.'
    },
    {
      id: 'LH',
      initials: 'LH',
      name: 'Luis Herrera',
      fullName: 'Luis Herrera López',
      tipo: 'Particular',
      rfc: 'HELL850212AB9',
      telefono: '+52 55 3344 5566',
      correo: 'lherrera@gmail.com',
      direccion: 'Col. Narvarte Poniente, CDMX',
      contacto: 'Luis Herrera',
      totalFacturado: '$3,800.00 MXN',
      pedidosTotales: '3 órdenes',
      saldoPendiente: '$450.00 MXN',
      creditoInfo: 'Pendiente de cobro',
      tecnicaHabitual: 'Bordado unitario',
      especificaciones: 'Cliente de mostrador.'
    }
  ],

  // Inventory Table Data
  inventory: [
    {
      sku: 'YZB-PL-001',
      brand: 'YAZBECK',
      name: 'YAZBECK Polo Piqué 100% Algodón',
      desc: 'Corte Clásico Masculino • 230 gr/m²',
      color: 'Negro Jet',
      sizes: 'S: 14 • M: 22 • L: 8 • XL: 4',
      stock: 48,
      minStock: 25,
      price: '$118.50',
      status: 'Disponible',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      img: 'assets/polo_yazbeck_negro.png'
    },
    {
      sku: 'YZB-CR-002',
      brand: 'YAZBECK',
      name: 'YAZBECK Playera Cuello Redondo C0300',
      desc: 'Prendas Heavy Weight • 200 gr/m²',
      color: 'Blanco Óptico',
      sizes: 'S: 2 • M: 3 • L: 5 • XL: 0',
      stock: 10,
      minStock: 30,
      price: '$64.00',
      status: 'Stock Bajo',
      statusClass: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
      img: 'assets/playera_blanco_yazbeck.png'
    },
    {
      sku: 'GLD-HD-104',
      brand: 'GILDAN',
      name: 'GILDAN Heavy Blend Hoodie 18500',
      desc: 'Felpa 50/50 • Interior perchado suave',
      color: 'Marino 32C',
      sizes: 'S: 8 • M: 16 • L: 14 • XL: 6',
      stock: 44,
      minStock: 15,
      price: '$245.00',
      status: 'Disponible',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      img: 'assets/sudadera_azul_gildan.png'
    },
    {
      sku: 'YPG-CP-088',
      brand: 'YUPOONG',
      name: 'YUPOONG Gorra Clásica 6 Paneles',
      desc: 'Corona rígida especial para bordado 3D',
      color: 'Rojo Carmín',
      sizes: 'Unitalla: 0',
      stock: 0,
      minStock: 20,
      price: '$92.00',
      status: 'Agotado',
      statusClass: 'bg-red-100 text-red-800 border-red-300 font-bold',
      img: 'assets/gorra_yupoong_roja.png'
    },
    {
      sku: 'YZB-CH-502',
      brand: 'YAZBECK',
      name: 'YAZBECK Chaleco Brigadista Alta Visibilidad',
      desc: 'Cintas reflejantes 2" • Bolsa porta-radio',
      color: 'Neón / Cintas',
      sizes: 'M: 10 • L: 18 • XL: 12',
      stock: 40,
      minStock: 15,
      price: '$165.00',
      status: 'Disponible',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      img: 'assets/chaleco_yazbeck_amarillo.png'
    }
  ]
};

function safeCreateIcons() {
  if (typeof lucide !== 'undefined' && lucide && typeof lucide.createIcons === 'function') {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide warning:", e);
    }
  }
}

// LocalStorage Persistence
const STORAGE_KEY = 'taller27_app_state_v1';

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      orders: state.orders,
      sales: state.sales,
      customers: state.customers,
      inventory: state.inventory,
      selectedOrderId: state.selectedOrderId,
      selectedCustomerId: state.selectedCustomerId
    }));
  } catch (e) {
    console.warn("Storage save error:", e);
  }
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.orders && Array.isArray(data.orders) && data.orders.length > 0) state.orders = data.orders;
      if (data.sales && Array.isArray(data.sales) && data.sales.length > 0) state.sales = data.sales;
      if (data.customers && Array.isArray(data.customers) && data.customers.length > 0) state.customers = data.customers;
      if (data.inventory && Array.isArray(data.inventory) && data.inventory.length > 0) state.inventory = data.inventory;
      if (data.selectedOrderId && state.orders.some(o => o.id === data.selectedOrderId)) state.selectedOrderId = data.selectedOrderId;
      if (data.selectedCustomerId && state.customers.some(c => c.id === data.selectedCustomerId)) state.selectedCustomerId = data.selectedCustomerId;
    }
  } catch (e) {
    console.warn("Storage load error:", e);
  }
}

// Initialization on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    loadPersistedState();
    renderOrdersCards();
    renderSelectedOrderDetail();
    renderSalesTable();
    renderCustomersList();
    renderSelectedCustomerDossier();
    renderInventoryTable();
    safeCreateIcons();
  } catch (err) {
    console.error("Initialization error:", err);
  }
});

// View Navigation Switcher
function switchView(viewName, subTab = null) {
  state.activeView = viewName;

  // Update tabs highlight
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('bg-neutral-900', 'text-white');
    tab.classList.add('text-slate-600');
  });

  const activeTabBtn = document.getElementById(`nav-${viewName}`);
  if (activeTabBtn) {
    activeTabBtn.classList.remove('text-slate-600');
    activeTabBtn.classList.add('bg-neutral-900', 'text-white');
  }

  // Hide all view panels
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.add('hidden');
  });

  // Show active panel
  const targetPanel = document.getElementById(`view-${viewName}`);
  if (targetPanel) {
    targetPanel.classList.remove('hidden');
  }

  if (viewName === 'inventario' && subTab === 'insumos') {
    switchInventorySubTab('insumos');
  }

  // Refresh icons
  safeCreateIcons();
}

// -------------------------------------------------------------
// PEDIDOS MODULE LOGIC
// -------------------------------------------------------------
function renderOrdersCards() {
  const container = document.getElementById('orders-cards-container');
  if (!container) return;

  const filteredOrders = state.orders.filter(order => {
    if (state.activeOrderFilter === 'todos') return true;
    return order.status.toLowerCase() === state.activeOrderFilter.toLowerCase();
  });

  // Update active count text in yellow
  const badge = document.getElementById('orders-active-badge');
  if (badge) {
    const activeCount = state.orders.filter(o => o.status !== 'Entregado').length;
    badge.textContent = `${activeCount} activos`;
  }

  container.innerHTML = filteredOrders.map(order => {
    const isSelected = order.id === state.selectedOrderId;
    return `
      <div 
        onclick="selectOrder('${order.id}')"
        class="cursor-pointer shrink-0 w-56 p-3 rounded-xl border transition-all ${
          isSelected 
            ? 'bg-brandYellow/15 border-black ring-2 ring-black/10 shadow-sm' 
            : 'bg-white border-brandBorder hover:border-slate-400 hover:shadow-2xs'
        }"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-900 font-futura truncate">${order.client}</span>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded border ${order.badgeClass}">${order.status}</span>
        </div>
        
        <div class="mt-2 text-[11px] text-slate-600 space-y-0.5">
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Folio:</span>
            <span class="font-mono-code font-bold text-slate-800">${order.folio}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Prenda:</span>
            <span class="truncate max-w-[110px] font-medium">${order.prenda}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Cant:</span>
            <span class="font-mono-code font-bold">${order.cantidad} pz</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Técnica:</span>
            <span class="font-medium text-slate-900">${order.tipoTrabajo}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectOrder(orderId) {
  state.selectedOrderId = orderId;
  renderOrdersCards();
  renderSelectedOrderDetail();
}

function filterOrders(status, btnElement) {
  state.activeOrderFilter = status;
  
  document.querySelectorAll('.order-filter-btn').forEach(btn => {
    btn.classList.remove('bg-neutral-900', 'text-white', 'shadow-xs');
    btn.classList.add('bg-white', 'border', 'border-brandBorder', 'text-slate-600');
  });

  if (btnElement) {
    btnElement.classList.remove('bg-white', 'border', 'border-brandBorder', 'text-slate-600');
    btnElement.classList.add('bg-neutral-900', 'text-white', 'shadow-xs');
  }

  renderOrdersCards();
}

function renderSelectedOrderDetail() {
  const wrapper = document.getElementById('order-detail-wrapper');
  if (!wrapper) return;

  const order = state.orders.find(o => o.id === state.selectedOrderId);
  if (!order) {
    wrapper.innerHTML = `
      <div class="h-64 flex flex-col items-center justify-center text-slate-400 space-y-2">
        <i data-lucide="clipboard-x" class="w-10 h-10 stroke-1"></i>
        <p class="text-sm font-medium">Ningún pedido seleccionado.</p>
      </div>
    `;
    safeCreateIcons();
    return;
  }

  wrapper.innerHTML = `
    <div class="w-full space-y-6">
      
      <!-- Order Dossier Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brandBorder gap-3">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-slate-900 font-futura tracking-wide">${order.clientFullName}</h2>
            <span class="text-xs font-bold font-mono-code bg-black text-white px-2 py-0.5 rounded">${order.folio}</span>
            <span class="text-xs font-bold px-2 py-0.5 rounded border ${order.badgeClass}">${order.status}</span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Fecha de pedido: <strong class="text-slate-700 font-mono-code">${order.fechaPedido}</strong> • Fecha límite entrega: <strong class="text-slate-900 font-mono-code font-bold">${order.fechaEntrega}</strong> • Operador: <strong class="text-slate-700">${order.operador}</strong>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="editCurrentOrder('${order.id}')" class="px-3 py-1.5 rounded-lg border border-brandBorder hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 text-slate-700 transition-colors">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            <span>Editar</span>
          </button>
          <button onclick="deleteCurrentOrder('${order.id}')" class="px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 text-red-600 transition-colors">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            <span>Eliminar</span>
          </button>
          <button onclick="markOrderEntregado('${order.id}')" class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors">
            <i data-lucide="check" class="w-3.5 h-3.5"></i>
            <span>Marcar Entregado</span>
          </button>
        </div>
      </div>

      <!-- Bento Grid: Specs, Sizes Breakdown & Visual Mockup -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: General specs + Sizes breakdown table -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Garment & Technique Specs Card -->
          <div class="bg-slate-50 rounded-xl p-4 border border-brandBorder space-y-3">
            <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider font-futura">Especificaciones Técnicas</h3>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span class="text-slate-400 block">Tipo de Prenda:</span>
                <span class="font-bold text-slate-900">${order.prenda}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Color de Prenda:</span>
                <span class="font-bold text-slate-900">${order.color}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Cantidad Total:</span>
                <span class="font-bold font-mono-code text-slate-900">${order.cantidad} pz</span>
              </div>
              <div>
                <span class="text-slate-400 block">Tipo de Trabajo:</span>
                <span class="font-bold text-slate-900">${order.tipoTrabajo}</span>
              </div>
            </div>

            <!-- Thread Color Swatches -->
            <div class="pt-2 border-t border-brandBorder/60 flex items-center gap-3 text-xs">
              <span class="text-slate-500 font-medium">Colores de Hilo:</span>
              <div class="flex items-center gap-2 flex-wrap">
                ${order.hilos.map(h => `
                  <div class="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-brandBorder shadow-2xs">
                    <span class="w-3 h-3 rounded-full border border-black/10 shrink-0" style="background-color: ${h.hex}"></span>
                    <span class="font-bold text-slate-800 text-[11px]">${h.name}</span>
                    <span class="text-[9px] text-slate-400 font-mono-code">${h.code}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Breakdown Table (Tallas & Cantidades) -->
          <div class="border border-brandBorder rounded-xl overflow-hidden">
            <div class="px-4 py-2.5 bg-[#f7f6fd] border-b border-brandBorder flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800 uppercase tracking-wider font-futura">Desglose por Talla & Variantes</span>
              <span class="text-xs font-mono-code font-bold text-slate-700">Total: ${order.cantidad} prendas</span>
            </div>
            
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-brandBorder font-futura">
                <tr>
                  <th class="p-3">PRENDA / ARTÍCULO</th>
                  <th class="p-3">COLOR</th>
                  <th class="p-3">TALLA</th>
                  <th class="p-3 text-right">CANTIDAD</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-brandBorder">
                ${order.breakdown.map(item => `
                  <tr>
                    <td class="p-3 font-bold text-slate-900">${item.prenda}</td>
                    <td class="p-3 text-slate-600">${item.color}</td>
                    <td class="p-3 font-mono-code font-bold"><span class="bg-slate-100 px-2 py-0.5 rounded">${item.talla}</span></td>
                    <td class="p-3 text-right font-mono-code font-bold">${item.cantidad} pz</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Technical Notes Card -->
          <div class="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <div class="flex items-center gap-2 text-xs font-bold text-amber-900 font-futura">
              <i data-lucide="info" class="w-3.5 h-3.5"></i>
              <span>Notas Técnicas de Taller & Tolerancias:</span>
            </div>
            <p class="text-xs text-amber-800 leading-relaxed font-medium">
              ${order.notas}
            </p>
          </div>

        </div>

        <!-- Right Col: Technical Diagram & Embroidery Mockups -->
        <div class="space-y-4">
          
          <!-- Locations & Measures -->
          <div class="bg-white rounded-xl p-4 border border-brandBorder space-y-3">
            <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider font-futura flex items-center justify-between">
              <span>Ubicación de Bordado</span>
              <span class="text-[10px] font-mono-code text-slate-400">${order.ubicaciones.length} Aplicaciones</span>
            </h3>

            <!-- Interactive Shirt Schematic with dynamic pins -->
            <div class="relative bg-slate-50 p-4 rounded-xl border border-brandBorder flex items-center justify-center min-h-[220px]">
              <img src="assets/sample_embroidery_shirt.png" alt="Esquema Prenda" class="max-h-48 w-auto object-contain select-none">
              ${order.ubicaciones.map((u, i) => {
                const x = u.x !== undefined ? u.x : (i === 0 ? 55 : (i === 1 ? 18 : (i === 2 ? 82 : 50)));
                const y = u.y !== undefined ? u.y : (i === 0 ? 38 : (i === 1 ? 42 : (i === 2 ? 42 : 55)));
                return `
                  <div class="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-black/95 text-white text-[10px] font-bold w-6 h-6 rounded-full shadow-lg border border-brandYellow" style="top: ${y}%; left: ${x}%;" title="${u.punto}. ${u.nombre} (${u.medidas})">
                    <span>${u.punto}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Points list: Displays measures for Ubicación 1, 2, and all applications -->
            <div class="space-y-2 text-xs pt-1">
              ${order.ubicaciones.map(u => `
                <div class="p-3 rounded-lg bg-slate-50 border border-brandBorder/80 space-y-1.5 shadow-2xs">
                  <div class="flex items-center justify-between font-bold text-slate-900">
                    <span class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded bg-brandYellow text-black text-[10px] flex items-center justify-center font-bold">${u.punto}</span>
                      <span class="text-xs">${u.nombre}</span>
                    </span>
                    <span class="text-[10px] text-slate-500 font-mono-code bg-white px-1.5 py-0.5 rounded border border-brandBorder">${u.archivo || 'N/A'}</span>
                  </div>
                  <div class="flex items-center justify-between text-[11px] pt-1 border-t border-brandBorder/40">
                    <span class="text-slate-500 font-medium">Medidas técnicas:</span>
                    <strong class="text-slate-900 bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-mono-code">${u.medidas}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Muestra Visual del Bordado (Visual Samples Gallery) -->
          <div class="bg-white rounded-xl p-4 border border-brandBorder space-y-3">
            <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider font-futura">Muestra Visual del Bordado</h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="border border-brandBorder rounded-lg p-2 bg-black flex flex-col items-center justify-center">
                <img src="assets/sample_embroidery_1.png" alt="Muestra 1 GRUMEX" class="max-h-16 w-auto object-contain rounded">
                <span class="text-[9px] text-slate-300 font-mono-code mt-1.5">Logotipo Pecho</span>
              </div>
              <div class="border border-brandBorder rounded-lg p-2 bg-slate-50 flex flex-col items-center justify-center">
                <img src="assets/sample_embroidery_2.png" alt="Muestra 2 Bandera" class="max-h-16 w-auto object-contain rounded shadow-2xs">
                <span class="text-[9px] text-slate-500 font-mono-code mt-1.5">Parche Brazo</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  safeCreateIcons();
}

function deleteCurrentOrder(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;
  if (!confirm(`¿Está seguro de eliminar el pedido ${order.folio} de ${order.clientFullName}? Esta acción no se puede deshacer.`)) return;

  state.orders = state.orders.filter(o => o.id !== orderId);
  if (state.selectedOrderId === orderId) {
    state.selectedOrderId = state.orders.length > 0 ? state.orders[0].id : null;
  }
  persistState();
  renderOrdersCards();
  renderSelectedOrderDetail();
  showQuickAlert(`Pedido ${order.folio} eliminado del sistema.`);
}

function markOrderEntregado(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;
  order.status = 'Entregado';
  order.badgeClass = 'bg-blue-100 text-blue-800 border-blue-300';
  persistState();
  renderOrdersCards();
  renderSelectedOrderDetail();
  showQuickAlert(`Pedido ${order.folio} marcado como ENTREGADO.`);
}

function editCurrentOrder(orderId) {
  openNuevoPedidoModal(orderId);
}

// -------------------------------------------------------------
// VENTAS (POS) MODULE LOGIC
// -------------------------------------------------------------
function renderSalesTable() {
  const tbody = document.getElementById('sales-table-body');
  if (!tbody) return;

  tbody.innerHTML = state.sales.map(s => {
    const isLiquidado = s.saldo === 0;
    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3.5 px-4 font-mono-code font-bold text-slate-900">
          <div>${s.folio}</div>
          <div class="text-[10px] text-slate-400 font-normal">${s.hora}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-slate-900">${s.cliente}</div>
          <div class="text-[10px] text-slate-400 font-mono-code">${s.rfc}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-medium text-slate-800">${s.concepto}</div>
          <span class="text-[10px] text-brandYellowHover font-bold font-mono-code">${s.vinculado}</span>
        </td>
        <td class="py-3.5 px-4 font-mono-code font-extrabold text-slate-900">$${s.total.toLocaleString()}</td>
        <td class="py-3.5 px-4 font-mono-code text-emerald-600 font-bold">$${s.anticipo.toLocaleString()}</td>
        <td class="py-3.5 px-4 font-mono-code ${isLiquidado ? 'text-slate-400' : 'text-amber-600 font-bold'}">
          $${s.saldo.toLocaleString()}
        </td>
        <td class="py-3.5 px-4">
          <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">${s.metodo}</span>
        </td>
        <td class="py-3.5 px-4">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            isLiquidado 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-amber-100 text-amber-800'
          }">
            ${s.estado}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right">
          <button onclick="viewSalesTicket('${s.folio}')" class="text-xs text-slate-600 hover:text-black font-bold p-1 rounded hover:bg-slate-200" title="Ver Ticket">
            <i data-lucide="receipt" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Dynamically update POS summary metrics
  const totalSalesVal = state.sales.reduce((acc, s) => acc + s.total, 0);
  const totalCobradoVal = state.sales.reduce((acc, s) => acc + s.anticipo, 0);
  const totalPorCobrarVal = state.sales.reduce((acc, s) => acc + s.saldo, 0);
  const cashSalesVal = state.sales.filter(s => (s.metodo || '').toLowerCase().includes('efectivo')).reduce((acc, s) => acc + s.anticipo, 0);

  const elVentasHoy = document.getElementById('pos-stat-ventas-hoy');
  const elPorCobrar = document.getElementById('pos-stat-por-cobrar');
  const elAnticipos = document.getElementById('pos-stat-anticipos');
  const elCaja = document.getElementById('pos-stat-caja');
  const elTicketsCount = document.getElementById('pos-stat-tickets-count');

  if (elVentasHoy) elVentasHoy.textContent = `$${totalSalesVal.toLocaleString()}`;
  if (elPorCobrar) elPorCobrar.textContent = `$${totalPorCobrarVal.toLocaleString()}`;
  if (elAnticipos) elAnticipos.textContent = `$${totalCobradoVal.toLocaleString()}`;
  if (elCaja) elCaja.textContent = `$${(2000 + cashSalesVal).toLocaleString()}`;
  if (elTicketsCount) elTicketsCount.textContent = `${state.sales.length} tickets`;

  safeCreateIcons();
}

function filterSales(category, btn) {
  document.querySelectorAll('.sales-filter-btn').forEach(b => {
    b.classList.remove('bg-neutral-900', 'text-white');
    b.classList.add('bg-white', 'text-slate-600');
  });
  if (btn) {
    btn.classList.remove('bg-white', 'text-slate-600');
    btn.classList.add('bg-neutral-900', 'text-white');
  }

  const tbody = document.getElementById('sales-table-body');
  if (!tbody) return;

  const filtered = state.sales.filter(s => {
    if (category === 'todos') return true;
    if (category === 'Con Saldo') return s.saldo > 0;
    if (category === 'Liquidado') return s.saldo === 0;
    return true;
  });

  tbody.innerHTML = filtered.map(s => `
    <tr class="hover:bg-slate-50/80 transition-colors">
      <td class="py-3.5 px-4 font-mono-code font-bold text-slate-900">
        <div>${s.folio}</div>
        <div class="text-[10px] text-slate-400 font-normal">${s.hora}</div>
      </td>
      <td class="py-3.5 px-4">
        <div class="font-bold text-slate-900">${s.cliente}</div>
        <div class="text-[10px] text-slate-400 font-mono-code">${s.rfc}</div>
      </td>
      <td class="py-3.5 px-4">
        <div class="font-medium text-slate-800">${s.concepto}</div>
        <span class="text-[10px] text-brandYellowHover font-bold font-mono-code">${s.vinculado}</span>
      </td>
      <td class="py-3.5 px-4 font-mono-code font-extrabold text-slate-900">$${s.total.toLocaleString()}</td>
      <td class="py-3.5 px-4 font-mono-code text-emerald-600 font-bold">$${s.anticipo.toLocaleString()}</td>
      <td class="py-3.5 px-4 font-mono-code ${s.saldo === 0 ? 'text-slate-400' : 'text-amber-600 font-bold'}">
        $${s.saldo.toLocaleString()}
      </td>
      <td class="py-3.5 px-4"><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">${s.metodo}</span></td>
      <td class="py-3.5 px-4">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.saldo === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
          ${s.estado}
        </span>
      </td>
      <td class="py-3.5 px-4 text-right">
        <button onclick="viewSalesTicket('${s.folio}')" class="text-xs text-slate-600 hover:text-black font-bold p-1 rounded hover:bg-slate-200">
          <i data-lucide="receipt" class="w-4 h-4"></i>
        </button>
      </td>
    </tr>
  `).join('');

  safeCreateIcons();
}

// -------------------------------------------------------------
// CLIENTES MODULE LOGIC
// -------------------------------------------------------------
function renderCustomersList() {
  const container = document.getElementById('customers-list-container');
  if (!container) return;

  container.innerHTML = state.customers.map(c => {
    const isSelected = c.id === state.selectedCustomerId;
    return `
      <div 
        onclick="selectCustomer('${c.id}')"
        class="p-4 cursor-pointer transition-colors ${
          isSelected 
            ? 'bg-brandYellow/15 border-l-4 border-l-black' 
            : 'hover:bg-slate-50'
        }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-black text-brandYellow font-bold flex items-center justify-center text-xs font-mono-code">
              ${c.initials}
            </span>
            <div>
              <div class="text-xs font-bold text-slate-900 font-futura">${c.name}</div>
              <div class="text-[10px] text-slate-400 font-mono-code">${c.rfc}</div>
            </div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700">
            ${c.pedidosTotales.split(' ')[0]} ped.
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function selectCustomer(customerId) {
  state.selectedCustomerId = customerId;
  renderCustomersList();
  renderSelectedCustomerDossier();
}

function renderSelectedCustomerDossier() {
  const wrapper = document.getElementById('customer-dossier-wrapper');
  if (!wrapper) return;

  const c = state.customers.find(item => item.id === state.selectedCustomerId);
  if (!c) return;

  wrapper.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Top Dossier Card -->
      <div class="bg-white rounded-xl p-6 border border-brandBorder shadow-2xs space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-neutral-900 text-brandYellow text-xl font-bold flex items-center justify-center font-mono-code shadow-md">
              ${c.initials}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-bold text-slate-900 font-futura">${c.fullName}</h2>
                <span class="bg-brandYellow/20 text-black text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-code">${c.tipo}</span>
              </div>
              <p class="text-xs text-slate-500 font-mono-code mt-0.5">RFC: <strong class="text-slate-800">${c.rfc}</strong></p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="showQuickAlert('Abriendo chat de WhatsApp con ${c.telefono}')" class="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </button>
            <button onclick="openNuevoPedidoModal()" class="px-4 py-1.5 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5 text-brandYellow"></i>
              <span>Nuevo Pedido</span>
            </button>
          </div>
        </div>

        <!-- Contact & Fiscal Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brandBorder text-xs">
          <div>
            <span class="text-slate-400 block font-medium">Tel / WhatsApp:</span>
            <span class="font-bold text-slate-800 font-mono-code">${c.telefono}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-medium">Correo Electrónico:</span>
            <span class="font-bold text-slate-800">${c.correo}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-medium">Contacto / Recepción:</span>
            <span class="font-bold text-slate-800">${c.contacto}</span>
          </div>
          <div class="sm:col-span-3">
            <span class="text-slate-400 block font-medium">Dirección fiscal y entrega:</span>
            <span class="font-medium text-slate-700">${c.direccion}</span>
          </div>
        </div>

        <!-- Technical Specifications Banner -->
        <div class="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 text-xs">
          <span class="font-bold text-amber-900 block mb-0.5 font-futura">Especificaciones Técnicas Registradas:</span>
          <p class="text-amber-800 font-medium">${c.especificaciones}</p>
        </div>
      </div>

      <!-- Financial Metrics Bento -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-brandBorder shadow-2xs">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-futura">TOTAL FACTURADO</span>
          <div class="text-xl font-extrabold text-slate-900 font-mono-code mt-1">${c.totalFacturado}</div>
          <span class="text-[10px] text-emerald-600 font-medium">+18% vs trimestre ant.</span>
        </div>

        <div class="bg-white p-4 rounded-xl border border-brandBorder shadow-2xs">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-futura">PEDIDOS TOTALES</span>
          <div class="text-xl font-extrabold text-slate-900 font-mono-code mt-1">${c.pedidosTotales.split(' ')[0]}</div>
          <span class="text-[10px] text-slate-500 font-medium">${c.pedidosTotales}</span>
        </div>

        <div class="bg-white p-4 rounded-xl border border-brandBorder shadow-2xs">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-futura">SALDO POR COBRAR</span>
          <div class="text-xl font-extrabold text-slate-900 font-mono-code mt-1">${c.saldoPendiente}</div>
          <span class="text-[10px] text-slate-500 font-medium">${c.creditoInfo}</span>
        </div>

        <div class="bg-white p-4 rounded-xl border border-brandBorder shadow-2xs">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-futura">TÉCNICA HABITUAL</span>
          <div class="text-sm font-extrabold text-slate-900 mt-1 truncate">Bordado Industrial</div>
          <span class="text-[10px] text-slate-500 font-medium">85% Bordado • 15% DFT</span>
        </div>
      </div>

    </div>
  `;

  safeCreateIcons();
}

function filterCustomerList(query) {
  const q = query.toLowerCase();
  const filtered = state.customers.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.rfc.toLowerCase().includes(q) || 
    c.telefono.includes(q)
  );

  const container = document.getElementById('customers-list-container');
  if (!container) return;

  container.innerHTML = filtered.map(c => `
    <div 
      onclick="selectCustomer('${c.id}')"
      class="p-4 cursor-pointer transition-colors ${
        c.id === state.selectedCustomerId 
          ? 'bg-brandYellow/15 border-l-4 border-l-black' 
          : 'hover:bg-slate-50'
      }"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="w-7 h-7 rounded-lg bg-black text-brandYellow font-bold flex items-center justify-center text-xs font-mono-code">
            ${c.initials}
          </span>
          <div>
            <div class="text-xs font-bold text-slate-900 font-futura">${c.name}</div>
            <div class="text-[10px] text-slate-400 font-mono-code">${c.rfc}</div>
          </div>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700">
          ${c.pedidosTotales.split(' ')[0]} ped.
        </span>
      </div>
    </div>
  `).join('');
}

function filterCustomerCategory(category, btn) {
  document.querySelectorAll('.customer-filter-pill').forEach(b => {
    b.classList.remove('bg-neutral-900', 'text-white', 'shadow-xs');
    b.classList.add('bg-slate-100', 'text-slate-600');
  });
  if (btn) {
    btn.classList.remove('bg-slate-100', 'text-slate-600');
    btn.classList.add('bg-neutral-900', 'text-white', 'shadow-xs');
  }

  showQuickAlert(`Filtro aplicado: ${category}`);
}

// -------------------------------------------------------------
// INVENTARIO MODULE LOGIC
// -------------------------------------------------------------
function renderInventoryTable(items = state.inventory) {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;

  tbody.innerHTML = items.map((item, idx) => `
    <tr class="hover:bg-slate-50/80 transition-colors">
      <td class="py-3 px-4 font-mono-code font-bold text-slate-800">${item.sku}</td>
      <td class="py-3 px-4">
        <img src="${item.img}" alt="${item.name}" class="w-10 h-10 object-cover rounded-lg border border-brandBorder shadow-2xs">
      </td>
      <td class="py-3 px-4">
        <div class="font-bold text-slate-900 font-futura">${item.name}</div>
        <div class="text-[10px] text-slate-400">${item.desc}</div>
      </td>
      <td class="py-3 px-4">
        <span class="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">${item.color}</span>
      </td>
      <td class="py-3 px-4 font-mono-code text-[11px] text-slate-600">${item.sizes}</td>
      <td class="py-3 px-4 font-mono-code font-extrabold text-slate-900">${item.stock} pz</td>
      <td class="py-3 px-4 font-mono-code text-slate-400">${item.minStock}</td>
      <td class="py-3 px-4 font-mono-code font-bold text-slate-800">${item.price}</td>
      <td class="py-3 px-4">
        <span class="px-2 py-0.5 rounded text-[10px] border ${item.statusClass}">${item.status}</span>
      </td>
      <td class="py-3 px-4 text-right">
        <div class="flex items-center justify-end gap-1">
          <button onclick="adjustInventoryStock(${idx}, 1)" class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-black font-bold flex items-center justify-center font-mono-code" title="Sumar stock">+</button>
          <button onclick="adjustInventoryStock(${idx}, -1)" class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-black font-bold flex items-center justify-center font-mono-code" title="Restar stock">-</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function adjustInventoryStock(index, delta) {
  const item = state.inventory[index];
  if (!item) return;

  item.stock = Math.max(0, item.stock + delta);
  if (item.stock === 0) {
    item.status = 'Agotado';
    item.statusClass = 'bg-red-100 text-red-800 border-red-300 font-bold';
  } else if (item.stock < item.minStock) {
    item.status = 'Stock Bajo';
    item.statusClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
  } else {
    item.status = 'Disponible';
    item.statusClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  }

  renderInventoryTable();
  showQuickAlert(`Stock de ${item.sku} actualizado a ${item.stock} pz.`);
}

function handleInventorySearch(val) {
  const q = val.toLowerCase();
  const filtered = state.inventory.filter(i => 
    i.sku.toLowerCase().includes(q) || 
    i.name.toLowerCase().includes(q) || 
    i.desc.toLowerCase().includes(q)
  );
  renderInventoryTable(filtered);
}

function filterInventoryByBrand(brand) {
  if (brand === 'todas') {
    renderInventoryTable(state.inventory);
  } else {
    const filtered = state.inventory.filter(i => i.brand === brand);
    renderInventoryTable(filtered);
  }
}

function filterInventoryCritical() {
  const filtered = state.inventory.filter(i => i.stock <= i.minStock);
  renderInventoryTable(filtered);
  showQuickAlert(`Mostrando ${filtered.length} artículos con stock crítico.`);
}

function switchInventorySubTab(subTab) {
  const btnPrendas = document.getElementById('tab-inv-prendas');
  const btnInsumos = document.getElementById('tab-inv-insumos');

  if (subTab === 'prendas') {
    btnPrendas.classList.add('bg-neutral-900', 'text-white', 'shadow-xs');
    btnPrendas.classList.remove('text-slate-600');
    btnInsumos.classList.remove('bg-neutral-900', 'text-white', 'shadow-xs');
    btnInsumos.classList.add('text-slate-600');
    renderInventoryTable(state.inventory);
  } else {
    btnInsumos.classList.add('bg-neutral-900', 'text-white', 'shadow-xs');
    btnInsumos.classList.remove('text-slate-600');
    btnPrendas.classList.remove('bg-neutral-900', 'text-white', 'shadow-xs');
    btnPrendas.classList.add('text-slate-600');
    showQuickAlert('Vista de Insumos: Hilos Madeira Polyneon, Pelón Arrancable y Consumibles cargados.');
  }
}

// -------------------------------------------------------------
// MODALS LOGIC
// -------------------------------------------------------------
// Modal 1: Nuevo Pedido / Editar Pedido
let modalLocations = [
  { punto: 1, x: 55, y: 38, nombre: 'Pecho Izquierdo', medidas: '6 cm x 5 cm', archivo: 'GRUMEX_v2.EMB' },
  { punto: 2, x: 18, y: 42, nombre: 'Manga Derecha', medidas: '6 cm x 4 cm', archivo: 'BANDERA_MEX.DST' }
];
let editingOrderId = null;

function openNuevoPedidoModal(orderIdToEdit = null) {
  const modal = document.getElementById('modal-nuevo-pedido');
  if (!modal) return;
  const title = document.getElementById('modal-pedido-title');

  // ---------- Si se pasa un ID → modo edición ----------
  if (orderIdToEdit && typeof orderIdToEdit === 'string') {
    editingOrderId = orderIdToEdit;
    const order = state.orders.find(o => o.id === orderIdToEdit);
    if (order) {
      if (title) title.textContent = 'Editar Pedido de Producción';

      // Set client
      const clientSelect = document.getElementById('np-cliente-select');
      if (clientSelect) {
        let found = false;
        for (let opt of clientSelect.options) {
          if (opt.value === order.clientFullName) {
            clientSelect.value = order.clientFullName;
            found = true;
            break;
          }
        }
        if (!found) {
          const opt = document.createElement('option');
          opt.value = order.clientFullName;
          opt.textContent = order.clientFullName;
          clientSelect.appendChild(opt);
          clientSelect.value = order.clientFullName;
        }
      }

      if (document.getElementById('np-operador')) document.getElementById('np-operador').value = order.operador || 'Juan Pérez';
      if (document.getElementById('np-prenda-base')) document.getElementById('np-prenda-base').value = order.prenda || 'YAZBECK Polo Piqué 100% Algodón';
      if (document.getElementById('np-color-prenda')) document.getElementById('np-color-prenda').value = order.color || 'Negro';
      if (document.getElementById('np-tipo-trabajo')) document.getElementById('np-tipo-trabajo').value = order.tipoTrabajo || 'Bordado Computarizado';

      // Dates (convert DD/MM/YYYY to YYYY-MM-DD for input[type=date])
      if (document.getElementById('np-fecha-pedido') && order.fechaPedido) {
        const parts = order.fechaPedido.split('/');
        if (parts.length === 3) document.getElementById('np-fecha-pedido').value = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      if (document.getElementById('np-fecha-entrega') && order.fechaEntrega) {
        const parts = order.fechaEntrega.split('/');
        if (parts.length === 3) document.getElementById('np-fecha-entrega').value = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      if (document.getElementById('np-notas-tecnicas')) document.getElementById('np-notas-tecnicas').value = order.notas || '';

      // Sizes breakdown
      let s = 0, m = 0, l = 0, xl = 0, xxl = 0, xs = 0;
      if (order.breakdown) {
        order.breakdown.forEach(b => {
          if (b.talla === 'XS') xs += b.cantidad;
          if (b.talla === 'S') s += b.cantidad;
          if (b.talla === 'M') m += b.cantidad;
          if (b.talla === 'L') l += b.cantidad;
          if (b.talla === 'XL') xl += b.cantidad;
          if (b.talla === '2XL' || b.talla === 'XXL') xxl += b.cantidad;
        });
      }
      if (document.getElementById('size-xs')) document.getElementById('size-xs').value = xs;
      if (document.getElementById('size-s')) document.getElementById('size-s').value = s;
      if (document.getElementById('size-m')) document.getElementById('size-m').value = m;
      if (document.getElementById('size-l')) document.getElementById('size-l').value = l;
      if (document.getElementById('size-xl')) document.getElementById('size-xl').value = xl;
      if (document.getElementById('size-2xl')) document.getElementById('size-2xl').value = xxl;
      recalculateOrderSizes();

      // Locations
      modalLocations = (order.ubicaciones || []).map((u, i) => ({
        punto: i + 1,
        x: u.x !== undefined ? u.x : (i === 0 ? 55 : (i === 1 ? 18 : 50)),
        y: u.y !== undefined ? u.y : (i === 0 ? 38 : (i === 1 ? 42 : 55)),
        nombre: u.nombre || `Punto ${i + 1}`,
        medidas: u.medidas || '6 cm x 5 cm',
        archivo: u.archivo || `DISENO_${i + 1}.DST`
      }));
    }
  } else {
    // ---------- Modo **nuevo**: vaciar todo ----------
    editingOrderId = null;
    if (title) title.textContent = 'Nuevo Pedido de Producción';

    // Reset de puntos
    modalLocations = [
      { punto: 1, x: 55, y: 38, nombre: 'Pecho Izquierdo', medidas: '6 cm x 5 cm', archivo: 'GRUMEX_v2.EMB' },
      { punto: 2, x: 18, y: 42, nombre: 'Manga Derecha', medidas: '6 cm x 4 cm', archivo: 'BANDERA_MEX.DST' }
    ];

    // **Vaciar todos los campos del formulario**
    const clearIds = [
      'np-cliente-select','np-operador','np-prenda-base','np-color-prenda',
      'np-tipo-trabajo','np-fecha-pedido','np-fecha-entrega','np-notas-tecnicas',
      'size-xs','size-s','size-m','size-l','size-xl','size-2xl',
      'design-pending'   // checkbox “Diseño pendiente”
    ];
    clearIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.type === 'checkbox') el.checked = false;
      else if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });

    // Reiniciar cálculo de tallas
    recalculateOrderSizes();
  }

  renderModalEmbroideryLocations();
  modal.classList.remove('hidden');
  safeCreateIcons();
}

function closeNuevoPedidoModal() {
  document.getElementById('modal-nuevo-pedido').classList.add('hidden');
  editingOrderId = null;
}

// Interactive Mini Canvas & Locations Logic
function handleGarmentCanvasClick(e) {
  if (e.target.closest('.pin-delete-btn')) return;

  const canvas = document.getElementById('interactive-garment-canvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
  const y = Math.max(5, Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

  const num = modalLocations.length + 1;
  let name = `Punto ${num}`;
  if (x < 28 && y >= 25 && y <= 65) name = 'Manga Derecha';
  else if (x > 72 && y >= 25 && y <= 65) name = 'Manga Izquierda';
  else if (y < 25) name = 'Cuello / Espalda Alta';
  else if (x >= 45 && x <= 68 && y >= 25 && y <= 48) name = 'Pecho Izquierdo';
  else if (x < 45 && x >= 28 && y >= 25 && y <= 48) name = 'Pecho Derecho';
  else if (y > 48) name = 'Frente / Cintura';

  modalLocations.push({
    punto: num,
    x: x,
    y: y,
    nombre: name,
    medidas: '6 cm x 5 cm',
    archivo: `BORDADO_${num}.DST`
  });

  renderModalEmbroideryLocations();
  showQuickAlert(`Punto ${num} (${name}) colocado en la prenda.`);
}

function removeModalLocation(index) {
  if (index >= 0 && index < modalLocations.length) {
    modalLocations.splice(index, 1);
    modalLocations.forEach((loc, i) => {
      loc.punto = i + 1;
    });
    renderModalEmbroideryLocations();
    showQuickAlert('Punto de bordado eliminado.');
  }
}

function clearModalLocations() {
  if (modalLocations.length === 0) return;
  modalLocations = [];
  renderModalEmbroideryLocations();
  showQuickAlert('Todos los puntos de bordado fueron eliminados.');
}

function addModalLocationManual() {
  const num = modalLocations.length + 1;
  modalLocations.push({
    punto: num,
    x: 50,
    y: 35 + ((num * 8) % 35),
    nombre: `Bordado Aplicación ${num}`,
    medidas: '6 cm x 5 cm',
    archivo: `DISENO_${num}.DST`
  });
  renderModalEmbroideryLocations();
  showQuickAlert(`Punto ${num} añadido.`);
}

function updateModalLocation(index, field, value) {
  if (modalLocations[index]) {
    modalLocations[index][field] = value;
    if (field === 'nombre' || field === 'medidas') {
      const pinText = document.getElementById(`pin-label-${index}`);
      if (pinText) {
        pinText.textContent = `${modalLocations[index].punto}`;
      }
    }
  }
}

function renderModalEmbroideryLocations() {
  const pinsContainer = document.getElementById('interactive-garment-pins');
  const listContainer = document.getElementById('modal-locations-list');
  const countBadge = document.getElementById('modal-locations-count-badge');

  if (countBadge) {
    countBadge.textContent = `Puntos configurados: ${modalLocations.length}`;
  }

  if (pinsContainer) {
    pinsContainer.innerHTML = modalLocations.map((loc, idx) => `
      <div 
        class="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-black/95 text-white text-[10px] font-bold w-6 h-6 rounded-full shadow-lg border border-brandYellow pointer-events-auto cursor-pointer"
        style="top: ${loc.y}%; left: ${loc.x}%;"
        title="Punto ${loc.punto}: ${loc.nombre} (${loc.medidas})"
      >
        <span id="pin-label-${idx}">${loc.punto}</span>
        <button 
          type="button" 
          onclick="event.stopPropagation(); removeModalLocation(${idx})" 
          class="pin-delete-btn absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center hover:bg-red-700 transition-colors"
          title="Eliminar este punto"
        >×</button>
      </div>
    `).join('');
  }

  if (listContainer) {
    if (modalLocations.length === 0) {
      listContainer.innerHTML = `
        <div class="p-6 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 space-y-1">
          <p class="text-xs font-medium">No hay puntos de bordado configurados.</p>
          <p class="text-[11px] text-slate-500">Haz clic en la prenda a la izquierda para añadir un punto.</p>
        </div>
      `;
    } else {
      listContainer.innerHTML = modalLocations.map((loc, idx) => `
        <div class="p-3 bg-white border border-brandBorder rounded-xl space-y-2 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-bold text-slate-900">
              <span class="w-5 h-5 rounded bg-brandYellow text-black text-[10px] flex items-center justify-center font-bold">${loc.punto}</span>
              <input 
                type="text" 
                value="${loc.nombre}" 
                oninput="updateModalLocation(${idx}, 'nombre', this.value)" 
                class="p-1 text-xs border border-brandBorder rounded font-bold w-48 text-slate-900 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Nombre de ubicación"
              >
            </div>
            <button 
              type="button" 
              onclick="removeModalLocation(${idx})" 
              class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 flex items-center gap-1 text-[11px] font-semibold transition-colors"
              title="Eliminar punto"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Borrar</span>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <label class="text-slate-500 font-medium block">Medidas (Ancho x Alto):</label>
              <input 
                type="text" 
                value="${loc.medidas}" 
                oninput="updateModalLocation(${idx}, 'medidas', this.value)" 
                class="w-full p-1.5 border border-brandBorder rounded bg-slate-50 font-mono-code mt-0.5 text-slate-900 font-semibold focus:bg-white"
                placeholder="ej. 6 cm x 5 cm"
              >
            </div>
            <div>
              <label class="text-slate-500 font-medium block">Archivo / Ponchado:</label>
              <input 
                type="text" 
                value="${loc.archivo}" 
                oninput="updateModalLocation(${idx}, 'archivo', this.value)" 
                class="w-full p-1.5 border border-brandBorder rounded bg-slate-50 font-mono-code mt-0.5 text-slate-900 focus:bg-white"
                placeholder="ej. DISENO.DST"
              >
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  safeCreateIcons();
}

function recalculateOrderSizes() {
  const xs = parseInt(document.getElementById('size-xs')?.value) || 0;
  const s = parseInt(document.getElementById('size-s')?.value) || 0;
  const m = parseInt(document.getElementById('size-m')?.value) || 0;
  const l = parseInt(document.getElementById('size-l')?.value) || 0;
  const xl = parseInt(document.getElementById('size-xl')?.value) || 0;
  const xxl = parseInt(document.getElementById('size-2xl')?.value) || 0;
  const total = xs + s + m + l + xl + xxl;

  const badge = document.getElementById('np-total-piezas-badge');
  if (badge) badge.textContent = `${total} pz`;
}

function saveNuevoPedido(isDraft = false) {
  const clientName = document.getElementById('np-cliente-select') ? document.getElementById('np-cliente-select').value : 'Cliente';
  const prenda = document.getElementById('np-prenda-base') ? document.getElementById('np-prenda-base').value : 'YAZBECK Polo Piqué 100% Algodón';
  const color = document.getElementById('np-color-prenda') ? document.getElementById('np-color-prenda').value : 'Negro';
  const tipoTrabajo = document.getElementById('np-tipo-trabajo') ? document.getElementById('np-tipo-trabajo').value : 'Bordado Computarizado';
  const fechaPedidoInput = document.getElementById('np-fecha-pedido') ? document.getElementById('np-fecha-pedido').value : '';
  const fechaEntregaInput = document.getElementById('np-fecha-entrega') ? document.getElementById('np-fecha-entrega').value : '';
  const operador = document.getElementById('np-operador') ? document.getElementById('np-operador').value : 'Mariana S.';
  const notas = document.getElementById('np-notas-tecnicas') ? document.getElementById('np-notas-tecnicas').value : 'Tolerancia de 1-2 cm.';

  const xs = parseInt(document.getElementById('size-xs')?.value) || 0;
  const s = parseInt(document.getElementById('size-s')?.value) || 0;
  const m = parseInt(document.getElementById('size-m')?.value) || 0;
  const l = parseInt(document.getElementById('size-l')?.value) || 0;
  const xl = parseInt(document.getElementById('size-xl')?.value) || 0;
  const xxl = parseInt(document.getElementById('size-2xl')?.value) || 0;
  let total = xs + s + m + l + xl + xxl;
  if (total === 0) total = 10;

  // Format dates
  const formatDate = (isoStr) => {
    if (!isoStr) return '28/10/2026';
    const p = isoStr.split('-');
    return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : isoStr;
  };

  const fechaPedido = formatDate(fechaPedidoInput);
  const fechaEntrega = formatDate(fechaEntregaInput);

  // Ubicaciones from interactive canvas
  const ubicaciones = modalLocations.length > 0 ? modalLocations.map((loc, i) => ({
    punto: (i + 1).toString(),
    x: loc.x,
    y: loc.y,
    nombre: loc.nombre || `Ubicación ${i + 1}`,
    medidas: loc.medidas || '6 cm x 5 cm',
    archivo: loc.archivo || `BORDADO_${i + 1}.DST`,
    sampleImg: 'assets/sample_embroidery_shirt.png'
  })) : [
    { punto: '1', x: 55, y: 38, nombre: 'Pecho Izquierdo', medidas: '6 cm x 5 cm', archivo: 'BORDADO_1.DST', sampleImg: 'assets/sample_embroidery_shirt.png' },
    { punto: '2', x: 18, y: 42, nombre: 'Manga Derecha', medidas: '6 cm x 4 cm', archivo: 'BORDADO_2.DST', sampleImg: 'assets/sample_embroidery_shirt.png' }
  ];

  const breakdown = [];
  if (xs > 0) breakdown.push({ prenda, color, talla: 'XS', cantidad: xs });
  if (s > 0) breakdown.push({ prenda, color, talla: 'S', cantidad: s });
  if (m > 0) breakdown.push({ prenda, color, talla: 'M', cantidad: m });
  if (l > 0) breakdown.push({ prenda, color, talla: 'L', cantidad: l });
  if (xl > 0) breakdown.push({ prenda, color, talla: 'XL', cantidad: xl });
  if (xxl > 0) breakdown.push({ prenda, color, talla: '2XL', cantidad: xxl });
  if (breakdown.length === 0) {
    breakdown.push({ prenda, color, talla: 'M', cantidad: Math.floor(total / 2) });
    breakdown.push({ prenda, color, talla: 'L', cantidad: Math.ceil(total / 2) });
  }

  // Deduct inventory
  const firstWord = prenda.split(' ')[0].toLowerCase();
  const matchedInventory = state.inventory.find(inv => 
    inv.name.toLowerCase().includes(firstWord) || 
    prenda.toLowerCase().includes(inv.brand.toLowerCase())
  );
  if (matchedInventory && matchedInventory.stock > 0) {
    matchedInventory.stock = Math.max(0, matchedInventory.stock - total);
    if (matchedInventory.stock === 0) {
      matchedInventory.status = 'Agotado';
      matchedInventory.statusClass = 'bg-red-100 text-red-800 border-red-300 font-bold';
    } else if (matchedInventory.stock <= matchedInventory.minStock) {
      matchedInventory.status = 'Stock Bajo';
      matchedInventory.statusClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
    }
    renderInventoryTable();
  }

  if (editingOrderId) {
    const existing = state.orders.find(o => o.id === editingOrderId);
    if (existing) {
      existing.client = clientName.split(' ')[0];
      existing.clientFullName = clientName;
      existing.status = isDraft ? 'Pendiente' : 'En proceso';
      existing.badgeClass = isDraft ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300';
      existing.prenda = prenda;
      existing.color = color;
      existing.cantidad = total;
      existing.tipoTrabajo = tipoTrabajo;
      existing.fechaPedido = fechaPedido;
      existing.fechaEntrega = fechaEntrega;
      existing.operador = operador;
      existing.breakdown = breakdown;
      existing.ubicaciones = ubicaciones;
      existing.notas = notas;

      state.selectedOrderId = existing.id;
      persistState();
      renderOrdersCards();
      renderSelectedOrderDetail();
      closeNuevoPedidoModal();
      showQuickAlert(`Pedido ${existing.folio} actualizado exitosamente.`);
      editingOrderId = null;
      return;
    }
  }

  // New order registration
  const newFolioNumber = 1897 + state.orders.length;
  const newFolio = `#A${newFolioNumber}`;
  const newOrder = {
    id: `A${newFolioNumber}`,
    folio: newFolio,
    client: clientName.split(' ')[0],
    clientFullName: clientName,
    status: isDraft ? 'Pendiente' : 'En proceso',
    badgeClass: isDraft ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
    prenda: prenda,
    color: color,
    cantidad: total,
    tipoTrabajo: tipoTrabajo,
    fechaPedido: fechaPedido,
    fechaEntrega: fechaEntrega,
    operador: operador,
    hilos: [
      { name: 'Rojo', code: '#1801', hex: '#dc2626' },
      { name: 'Negro', code: '#1800', hex: '#111111' },
      { name: 'Dorado', code: '#1825', hex: '#eab308' }
    ],
    breakdown: breakdown,
    ubicaciones: ubicaciones,
    notas: notas
  };

  state.orders.unshift(newOrder);
  state.selectedOrderId = newOrder.id;

  persistState();
  renderOrdersCards();
  renderSelectedOrderDetail();
  closeNuevoPedidoModal();
  showQuickAlert(`Orden ${newFolio} registrada y enviada a taller para ${clientName}.`);
}

// Modal 2: Nueva Venta (POS)
let currentPosTotal = 3850;
let currentPosPayMode = '50';
let currentPosPayMethod = 'Tarjeta';
let posTicketItems = [
  { id: 1, type: 'prenda', desc: 'Polo Piqué Yazbeck Marino (Talla L)', qty: 15, unitPrice: 160.00, subtotal: 2400.00, subdesc: 'Almacén Central • 15 unidades de catálogo' },
  { id: 2, type: 'servicio', desc: 'Digitalización / Ponchado (Logo Náutico)', qty: 1, unitPrice: 350.00, subtotal: 350.00, subdesc: 'Matriz DST + EMB, 7,500 puntadas • Tarifa manual aprobada' },
  { id: 3, type: 'servicio', desc: 'Bordado Computarizado Pecho Izq', qty: 15, unitPrice: 73.33, subtotal: 1100.00, subdesc: '15 aplicaciones en polo • 7,500 pts • Precio acordado por volumen' }
];

function openNuevaVentaModal() {
  const modal = document.getElementById('modal-nueva-venta');
  if (!modal) return;
  modal.classList.remove('hidden');

  const nextNum = 1044 + state.sales.length - 6;
  const headerFolio = document.getElementById('pos-header-folio');
  if (headerFolio) headerFolio.textContent = `#V-${Math.max(1043, nextNum)}`;

  renderPosTicket();
  safeCreateIcons();
}

function closeNuevaVentaModal() {
  document.getElementById('modal-nueva-venta').classList.add('hidden');
}

function addGarmentToPosTicket() {
  const garmentSelect = document.getElementById('pos-add-garment');
  const qtyInput = document.getElementById('pos-garment-qty');
  if (!garmentSelect) return;

  const selectedOpt = garmentSelect.options[garmentSelect.selectedIndex];
  const garmentName = selectedOpt.value;
  const unitPrice = parseFloat(selectedOpt.getAttribute('data-price')) || 160.00;
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
  const subtotal = unitPrice * qty;

  posTicketItems.push({
    id: Date.now(),
    type: 'prenda',
    desc: garmentName,
    qty: qty,
    unitPrice: unitPrice,
    subtotal: subtotal,
    subdesc: 'Almacén Central • Salida directa de stock'
  });

  renderPosTicket();
  showQuickAlert(`${qty}pz ${garmentName.split(' - ')[0]} añadidas a la venta.`);
}

function addServiceToPosTicket() {
  const descInput = document.getElementById('pos-service-desc');
  const priceInput = document.getElementById('pos-service-price');
  const qtyInput = document.getElementById('pos-service-qty');

  const desc = descInput && descInput.value.trim() ? descInput.value.trim() : 'Servicio Técnico Textil';
  const unitPrice = parseFloat(priceInput ? priceInput.value : 350) || 350;
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
  const subtotal = unitPrice * qty;

  posTicketItems.push({
    id: Date.now(),
    type: 'servicio',
    desc: desc,
    qty: qty,
    unitPrice: unitPrice,
    subtotal: subtotal,
    subdesc: 'Servicio técnico especializado de taller'
  });

  renderPosTicket();
  showQuickAlert(`Servicio "${desc}" añadido a la venta.`);
}

function removePosItem(target) {
  if (typeof target === 'number') {
    posTicketItems.splice(target, 1);
  } else if (target && target.closest) {
    const tr = target.closest('tr');
    if (tr) {
      const idx = Array.from(tr.parentNode.children).indexOf(tr);
      if (idx !== -1) posTicketItems.splice(idx, 1);
    }
  }
  renderPosTicket();
}

function renderPosTicket() {
  const tbody = document.getElementById('pos-ticket-items');
  if (!tbody) return;

  if (posTicketItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-6 text-center text-slate-400">
          No hay artículos agregados al ticket actual. Selecciona una prenda o agrega un servicio arriba.
        </td>
      </tr>
    `;
    currentPosTotal = 0;
  } else {
    tbody.innerHTML = posTicketItems.map((item, idx) => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="p-3">
          <div class="font-bold text-slate-900">${item.desc}</div>
          <div class="text-[10px] text-slate-400">${item.subdesc}</div>
        </td>
        <td class="p-3 font-mono-code font-bold">${item.qty} ${item.type === 'servicio' ? 'serv' : 'pz'}</td>
        <td class="p-3 font-mono-code">$${item.unitPrice.toFixed(2)}</td>
        <td class="p-3 font-mono-code font-bold text-slate-900">$${item.subtotal.toFixed(2)}</td>
        <td class="p-3 text-right">
          <button type="button" onclick="removePosItem(${idx})" class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors" title="Eliminar partida">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `).join('');

    currentPosTotal = posTicketItems.reduce((acc, item) => acc + item.subtotal, 0);
  }

  // Financial breakdown calculation
  const subtotalEl = document.getElementById('pos-calc-subtotal');
  const ivaEl = document.getElementById('pos-calc-iva');
  const totalEl = document.getElementById('pos-calc-total');

  const ivaVal = currentPosTotal * 0.16 / 1.16;
  if (subtotalEl) subtotalEl.textContent = `$${currentPosTotal.toFixed(2)}`;
  if (ivaEl) ivaEl.textContent = `$${ivaVal.toFixed(2)} (incluido)`;
  if (totalEl) totalEl.textContent = `$${currentPosTotal.toFixed(2)} MXN`;

  updatePaymentMode(currentPosPayMode);
  safeCreateIcons();
}

function updatePaymentMode(mode) {
  currentPosPayMode = mode;
  const calcCobrar = document.getElementById('pos-calc-cobrar');
  const calcSaldo = document.getElementById('pos-calc-saldo');
  const submitText = document.getElementById('pos-submit-btn-text');

  if (mode === '50') {
    const half = currentPosTotal / 2;
    if (calcCobrar) calcCobrar.textContent = `$${half.toFixed(2)} MXN`;
    if (calcSaldo) calcSaldo.textContent = `$${half.toFixed(2)} MXN`;
    if (submitText) submitText.textContent = `Completar Venta y Cobro ($${half.toFixed(2)})`;
  } else if (mode === '100') {
    if (calcCobrar) calcCobrar.textContent = `$${currentPosTotal.toFixed(2)} MXN`;
    if (calcSaldo) calcSaldo.textContent = `$0.00 MXN (Liquidado)`;
    if (submitText) submitText.textContent = `Completar Venta y Cobro Total ($${currentPosTotal.toFixed(2)})`;
  } else if (mode === 'manual') {
    const manualVal = parseFloat(document.getElementById('input-anticipo-manual')?.value) || 0;
    const rem = Math.max(0, currentPosTotal - manualVal);
    if (calcCobrar) calcCobrar.textContent = `$${manualVal.toFixed(2)} MXN`;
    if (calcSaldo) calcSaldo.textContent = `$${rem.toFixed(2)} MXN`;
    const labelResta = document.getElementById('label-resta-manual');
    if (labelResta) labelResta.textContent = `Resta: $${rem.toFixed(2)}`;
    if (submitText) submitText.textContent = `Completar Cobro Anticipo ($${manualVal.toFixed(2)})`;
  }
}

function recalculateManualAnticipo(val) {
  const manualVal = parseFloat(val) || 0;
  const rem = Math.max(0, currentPosTotal - manualVal);
  const calcCobrar = document.getElementById('pos-calc-cobrar');
  const calcSaldo = document.getElementById('pos-calc-saldo');
  const labelResta = document.getElementById('label-resta-manual');
  const submitText = document.getElementById('pos-submit-btn-text');

  if (calcCobrar) calcCobrar.textContent = `$${manualVal.toFixed(2)} MXN`;
  if (calcSaldo) calcSaldo.textContent = `$${rem.toFixed(2)} MXN`;
  if (labelResta) labelResta.textContent = `Resta: $${rem.toFixed(2)}`;
  if (submitText) submitText.textContent = `Completar Cobro Anticipo ($${manualVal.toFixed(2)})`;
}

function selectPayMethod(method, btn) {
  currentPosPayMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach(b => {
    b.classList.remove('border-2', 'border-black');
    b.classList.add('border', 'border-brandBorder');
  });
  if (btn) {
    btn.classList.remove('border', 'border-brandBorder');
    btn.classList.add('border-2', 'border-black');
  }
}

function completePosSale() {
  if (posTicketItems.length === 0) {
    alert('Agregue al menos una prenda o servicio antes de completar la venta.');
    return;
  }

  const clientEl = document.getElementById('pos-cliente-select');
  const clientFull = clientEl ? clientEl.value : 'Cliente Mostrador';
  const clientName = clientFull.split(' (')[0].split(' •')[0];
  const newSaleNumber = 1043 + state.sales.length;
  const newFolio = `#V-${newSaleNumber}`;

  let anticipo = currentPosTotal / 2;
  let saldo = currentPosTotal / 2;
  let estado = 'Anticipo 50%';

  if (currentPosPayMode === '100') {
    anticipo = currentPosTotal;
    saldo = 0;
    estado = 'Liquidado';
  } else if (currentPosPayMode === 'manual') {
    anticipo = parseFloat(document.getElementById('input-anticipo-manual')?.value) || (currentPosTotal / 2);
    if (anticipo >= currentPosTotal) {
      anticipo = currentPosTotal;
      saldo = 0;
      estado = 'Liquidado';
    } else {
      saldo = Math.max(0, currentPosTotal - anticipo);
      estado = 'Anticipo Libre';
    }
  }

  // Build items summary concept
  const concepts = posTicketItems.map(it => `${it.qty}x ${it.desc.split(' (')[0].substring(0, 20)}`).join(' + ');

  const newSale = {
    folio: newFolio,
    hora: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cliente: clientName,
    rfc: clientFull.includes('RFC:') ? clientFull.split('RFC: ')[1].split(')')[0] : 'XAXX010101000',
    vinculado: `#A${1890 + state.sales.length}`,
    concepto: concepts.length > 50 ? concepts.substring(0, 47) + '...' : concepts,
    total: currentPosTotal,
    anticipo: anticipo,
    saldo: saldo,
    metodo: currentPosPayMethod,
    estado: estado,
    cfdi: document.getElementById('pos-cfdi-check')?.checked ? 'Emitida' : 'Ticket'
  };

  // Deduct inventory
  posTicketItems.forEach(item => {
    if (item.type === 'prenda') {
      const inv = state.inventory.find(i => 
        item.desc.toLowerCase().includes(i.brand.toLowerCase()) || 
        i.name.toLowerCase().includes(item.desc.toLowerCase().split(' ')[0])
      );
      if (inv && inv.stock > 0) {
        inv.stock = Math.max(0, inv.stock - item.qty);
        if (inv.stock === 0) {
          inv.status = 'Agotado';
          inv.statusClass = 'bg-red-100 text-red-800 border-red-300 font-bold';
        } else if (inv.stock <= inv.minStock) {
          inv.status = 'Stock Bajo';
          inv.statusClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
        }
      }
    }
  });

  state.sales.unshift(newSale);
  persistState();
  renderSalesTable();
  renderInventoryTable();
  closeNuevaVentaModal();

  viewSalesTicket(newFolio);
  showQuickAlert(`Venta ${newFolio} registrada y cobrada exitosamente ($${anticipo.toFixed(2)} MXN).`);
}

// Modal 3: Registrar Nuevo Cliente
function openNuevoClienteModal() {
  document.getElementById('modal-nuevo-cliente').classList.remove('hidden');
  safeCreateIcons();
}

function closeNuevoClienteModal() {
  document.getElementById('modal-nuevo-cliente').classList.add('hidden');
}

function switchCustomerModalTab(tabKey, btn) {
  document.querySelectorAll('.cust-tab-btn').forEach(b => {
    b.classList.remove('bg-black', 'text-white');
    b.classList.add('bg-white', 'text-slate-600');
  });
  if (btn) {
    btn.classList.remove('bg-white', 'text-slate-600');
    btn.classList.add('bg-black', 'text-white');
  }

  document.querySelectorAll('.cust-modal-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(`cust-section-${tabKey.toLowerCase()}`).classList.remove('hidden');
}

function saveNuevoCliente() {
  const nombre = document.getElementById('cust-nombre').value || 'Nuevo Cliente Textil S.A.';
  const rfc = document.getElementById('cust-rfc').value || 'NCT261028AB1';
  const telefono = document.getElementById('cust-telefono').value || '+52 55 1234 5678';
  const correo = document.getElementById('cust-correo').value || 'contacto@nuevocliente.com';
  const direccion = document.getElementById('cust-direccion').value || 'CDMX';

  const newCust = {
    id: `C${state.customers.length + 1}`,
    initials: nombre.substring(0, 2).toUpperCase(),
    name: nombre.split(' ')[0],
    fullName: nombre,
    tipo: 'Cuenta B2B',
    rfc: rfc.toUpperCase(),
    telefono: telefono,
    correo: correo,
    direccion: direccion,
    contacto: 'Encargado de compras',
    totalFacturado: '$0.00 MXN',
    pedidosTotales: '0 órdenes',
    saldoPendiente: '$0.00 MXN',
    creditoInfo: 'Contado / 50% Anticipo',
    tecnicaHabitual: 'Bordado Industrial',
    especificaciones: 'Cliente nuevo registrado en taller.'
  };

  state.customers.unshift(newCust);
  state.selectedCustomerId = newCust.id;

  renderCustomersList();
  renderSelectedCustomerDossier();
  closeNuevoClienteModal();

  showQuickAlert(`Cliente ${nombre} registrado en la cartera de Taller-27.`);
}

// Modal 4: Ticket Preview
function viewSalesTicket(folio) {
  const sale = state.sales.find(s => s.folio === folio) || state.sales[0];
  document.getElementById('ticket-folio').textContent = `FOLIO: ${sale.folio}`;
  
  document.getElementById('ticket-details').innerHTML = `
    <div class="flex justify-between"><span>Cliente:</span><strong class="text-right">${sale.cliente}</strong></div>
    <div class="flex justify-between"><span>Hora / Fecha:</span><span>${sale.hora}</span></div>
    <div class="flex justify-between"><span>Concepto:</span><span>${sale.concepto}</span></div>
    <div class="flex justify-between font-bold pt-2 border-t border-slate-200"><span>TOTAL:</span><span>$${sale.total.toLocaleString()} MXN</span></div>
    <div class="flex justify-between text-emerald-700 font-bold"><span>ANTICIPO:</span><span>$${sale.anticipo.toLocaleString()} MXN</span></div>
    <div class="flex justify-between text-amber-700 font-bold"><span>SALDO PENDIENTE:</span><span>$${sale.saldo.toLocaleString()} MXN</span></div>
    <div class="flex justify-between text-slate-500 pt-1"><span>Forma de Pago:</span><span>${sale.metodo}</span></div>
  `;

  document.getElementById('modal-ticket').classList.remove('hidden');
  safeCreateIcons();
}

function closeTicketModal() {
  document.getElementById('modal-ticket').classList.add('hidden');
}

function shareTicketWhatsApp() {
  const folio = document.getElementById('ticket-folio')?.textContent || '#V-1043';
  const text = encodeURIComponent(`Hola, le compartimos su comprobante oficial de compra de Taller-27 Bordados (${folio}). Puede presentarlo para recoger sus prendas.`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

function shareTicketEmail() {
  const folio = document.getElementById('ticket-folio')?.textContent || '#V-1043';
  const subject = encodeURIComponent(`Comprobante de Venta ${folio} - Taller-27 Bordados`);
  const body = encodeURIComponent(`Estimado cliente,\n\nAdjuntamos su comprobante de compra ${folio} de Taller-27 Bordados.\nGracias por su preferencia.`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Global Search
function handleGlobalSearch(query) {
  if (!query) return;
  const q = query.toLowerCase();

  // Switch to pedidos if query matches an order
  const matchedOrder = state.orders.find(o => 
    o.client.toLowerCase().includes(q) || 
    o.folio.toLowerCase().includes(q) || 
    o.prenda.toLowerCase().includes(q)
  );

  if (matchedOrder) {
    switchView('pedidos');
    selectOrder(matchedOrder.id);
    return;
  }

  // Switch to customer if query matches a customer
  const matchedCustomer = state.customers.find(c => 
    c.name.toLowerCase().includes(q) || 
    c.rfc.toLowerCase().includes(q)
  );

  if (matchedCustomer) {
    switchView('clientes');
    selectCustomer(matchedCustomer.id);
  }
}

function toggleMobileSearch() {
  const bar = document.getElementById('mobile-search-bar');
  bar.classList.toggle('hidden');
}

function openModalCorteCaja() {
  showQuickAlert('Arqueo exprés: Fondo $2,000 | Efectivo $12,150 | Total en caja: $14,150 MXN. Turno en orden.');
}

function openModalNuevoArticulo() {
  showQuickAlert('Formulario de alta rápida de SKU textil abierto.');
}

function openModalRegistrarConsumo() {
  showQuickAlert('Registro de consumo de bobinas e insumos abierto.');
}

// Toast Alert
function showQuickAlert(message) {
  const toast = document.getElementById('toast-alert');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}
