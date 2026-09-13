/* ============================================================
   CAFETERÍA MOL PLAZA — datos y lógica
   ============================================================
   CARTA REAL, transcrita del PDF oficial del propio local
   ("Menu_Mol_plaza_2022_.pdf", que Matías consiguió el 12-09-2026).
   67 productos en 8 categorías, con los precios tal cual aparecen ahí.

   ⚠️ OJO CON LA FECHA: ese PDF es de 2022. Los precios son REALES pero
   pueden estar desactualizados, así que la sección Carta lo dice a la
   vista del visitante, no solo acá. Apenas el local confirme la carta
   nueva, se reemplazan los montos y se borra esa nota.
   Nada inventado: lo que no estaba en el PDF no está en la página.
   ============================================================ */

const MENU = {
  "cafeteria": {
    label: "Cafetería",
    items: [
      { n: "Capuccino", p: 2490 },
      { n: "Mocaccino", p: 2490 },
      { n: "Cortado", p: 2490 },
      { n: "Late", p: 2490 },
      { n: "Americano", p: 2200 },
      { n: "Chocolate caliente", p: 2200 },
      { n: "Té o café con leche", p: 2000 },
      { n: "Leche caliente", p: 2000 },
      { n: "Expreso simple", p: 1500 },
      { n: "Expreso doble", p: 2000 },
      { n: "Tazón de té", p: 2000 },
      { n: "Té o café", p: 1500 },
    ]
  },
  "sandwiches": {
    label: "Sándwiches",
    items: [
      { n: "Ave palta", p: 4000 },
      { n: "Ave mayo", p: 4000 },
      { n: "Ave sola", p: 3890 },
      { n: "Ave pimentón", p: 4000 },
      { n: "Ave luco", p: 5500 },
      { n: "Ave chacarera", p: 5500 },
      { n: "Ave italiana", p: 5500 },
      { n: "Quesillo vegetariano", p: 3800 },
      { n: "Churrasco barros luco", p: 5500 },
      { n: "Churrasco italiano", p: 5500, d: "Destacado del menú en su propia ficha de Google" },
      { n: "Churrasco chacarero", p: 5500 },
      { n: "Churrasco solo", p: 4500 },
      { n: "Mechada sola", p: 5000 },
      { n: "Mechada italiana", p: 5990 },
      { n: "Mechada chacarera", p: 5990 },
      { n: "Mechada luco", p: 5990 },
    ]
  },
  "carta": {
    label: "Carta Mol Plaza",
    items: [
      { n: "Lomo", p: 7990 },
      { n: "Pechuga grillé", p: 6990 },
      { n: "Plateada", p: 6990 },
      { n: "Mechada", p: 6990 },
      { n: "Par de chuletas", p: 6990 },
      { n: "Reineta", p: 6990 },
      { n: "Salmón", p: 7990 },
      { n: "Extra agregado", p: 2000 },
      { n: "Papa frita x1", p: 2000 },
      { n: "Papa frita x2", p: 4000 },
    ]
  },
  "pobre": {
    label: "A lo pobre",
    items: [
      { n: "Lomo a lo pobre", p: 9900, d: "Destacado del menú en su propia ficha de Google" },
      { n: "Pechuga grillé a lo pobre", p: 9900 },
      { n: "Plateada a lo pobre", p: 9900 },
      { n: "Mechada a lo pobre", p: 9900 },
      { n: "Par de chuletas a lo pobre", p: 9900 },
      { n: "Reineta a lo pobre", p: 9900 },
      { n: "Salmón a lo pobre", p: 9900, d: "Destacado del menú en su propia ficha de Google" },
    ]
  },
  "gelateria": {
    label: "Gelatería",
    items: [
      { n: "Copa Urmeneta", p: 2990 },
      { n: "Copa Max", p: 3990 },
      { n: "Crepes con helado", p: 4990 },
      { n: "Crepes con fruta", p: 4990 },
      { n: "Crepes con salsa", p: 3990 },
      { n: "Banana split", p: 3890 },
      { n: "Brownie", p: 4990 },
      { n: "Volcán de chocolate", p: 4990 },
      { n: "Waffle con fruta", p: 4990 },
      { n: "Café helado 500 cc", p: 4000 },
    ]
  },
  "pasteleria": {
    label: "Pastelería",
    items: [
      { n: "Porción de torta", p: 3000 },
      { n: "Tartaletas", p: 1990 },
      { n: "Cheesecake", p: 3000 },
    ]
  },
  "ensaladas": {
    label: "Ensaladas",
    items: [
      { n: "Palmito palta", p: 3000 },
      { n: "Chilena x1", p: 2000 },
      { n: "Chilena x2", p: 4000 },
      { n: "Surtida x1", p: 2000 },
      { n: "Surtida x2", p: 4000 },
    ]
  },
  "bebidas": {
    label: "Bebidas",
    items: [
      { n: "Jugo natural", p: 3500 },
      { n: "Bebida 500 cc", p: 1500 },
      { n: "Bebida en lata", p: 1000 },
      { n: "Agua mineral", p: 1000 },
    ]
  }
};

const money = n => '$' + n.toLocaleString('es-CL');

const tabsEl   = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

Object.keys(MENU).forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.textContent = MENU[key].label;
  tab.dataset.key = key;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  tab.addEventListener('click', () => showTab(key));
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + key;

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  MENU[key].items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item reveal';

    if (item.img) {
      // La clase cf-thumb la necesita el grid de .menu-item para ubicarla en
      // su columna; sin ella la miniatura caia fuera de las areas y abria
      // una fila extra.
      const cont = document.createElement('div');
      cont.className = 'cf-thumb';
      const im = document.createElement('img');
      im.src = 'fotos/' + item.img; im.alt = item.n; im.loading = 'lazy';
      im.style.cssText = 'width:58px;height:58px;object-fit:cover;border-radius:12px;';
      cont.appendChild(im);
      row.appendChild(cont);
    }

    const texto = document.createElement('div');
    texto.className = 'menu-item-text';
    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = item.n;
    texto.appendChild(nombre);

    if (item.d) {
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = item.d;
      texto.appendChild(desc);
    }

    // Sin precio publicado: "Consultar", nunca un monto inventado.
    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = item.p ? money(item.p) : 'Consultar';

    row.appendChild(texto);
    row.appendChild(precio);
    grid.appendChild(row);
  });

  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    const activo = t.dataset.key === key;
    t.classList.toggle('active', activo);
    t.setAttribute('aria-selected', activo ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + key);
  });
  initScrollReveal();
}

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */
const navLinks = document.getElementById('navLinks');

function goToTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.tabPanel === tabId);
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === tabId);
  });
  navLinks.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); goToTab(el.dataset.tab); });
});

document.getElementById('navToggle').addEventListener('click', function () {
  const abierto = navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

/* ---------- INDICADOR ABIERTO / CERRADO ----------
   ⚠️ Google confirma que CIERRA a las 20:00. Una búsqueda externa indicaba Lu-Vi 10:00-19:30 y Sáb 11:00-16:00, pero NO está confirmado por el local: se usa 10:00-20:00 como estimación y así se declara en Visítanos. */
function horarioDeHoy() {
  return [10 * 60, 20 * 60];
}

function actualizarEstado(dotId, textId) {
  const dot  = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if (!dot || !text) return;
  const ahora   = new Date();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const h       = horarioDeHoy();
  if (!h) {
    // Sin horario publicado: se esconde la pildora entera en vez de
    // afirmar que esta cerrado, cosa que no nos consta.
    const caja = text.closest('.pill, .status-line') || text.parentElement;
    if (caja) caja.hidden = true;
    return;
  }
  const abierto = minutos >= h[0] && minutos < h[1];
  text.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !abierto);
}

actualizarEstado('statusDot', 'statusText');
actualizarEstado('statusDot2', 'statusText2');
actualizarEstado('statusDot3', 'statusText3');

/* ---------- SCROLL REVEAL (con red de seguridad) ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 55) + 'ms';
    io.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 1200);
}
initScrollReveal();

window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 320);
});

// Marca en la lista de horario el día de hoy. La lista es estática en el
// HTML a propósito: si el JS falla, el horario igual se lee.
function marcarDiaDeHoy() {
  const hoy = new Date().getDay();
  document.querySelectorAll('.horario-semana li[data-dia]').forEach(function (li) {
    li.classList.toggle('hs-hoy', Number(li.dataset.dia) === hoy);
  });
}
marcarDiaDeHoy();
