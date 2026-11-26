import { OpenMakeup, MORPH_CONTROLS } from './src/index.js';

const $ = (id) => document.getElementById(id);
const MP = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619';
const mk = new OpenMakeup({
  video: $('video'),
  renderCanvas: $('renderCanvas'),
  assetsBaseUrl: '/assets',
  mediapipeBaseUrl: MP,
  aiColor: async () => '#c21f4d',
});

const product = (groupId, effect, brand, name, type, shades, finish, pattern, shadeImages = {}) => ({
  groupId, effect, brand, name, type,
  shades: shades.map(([shade, hex]) => ({ name: shade, hex, image: shadeImages[shade] || null })),
  finish, pattern,
});

const batonImage = (filename) => `./assets/batons/${encodeURI(filename)}`;
const blushImage = (filename) => `./assets/blushes/${encodeURI(filename)}`;
const macLogo = './assets/logos/MAC-Cosmetics-logo.png';
const narsLogo = './assets/logos/NARS_Cosmetics_logo.png';
const maybellineLogo = './assets/logos/Maybelline-Cosmetics-logo.png';
const oboticarioLogo = './assets/logos/Oboticario-logo.png';

function renderBrand(container, brand, useLogo = true) {
  container.replaceChildren();
  if (useLogo && (brand === 'MAC' || brand === 'NARS' || brand === 'Maybelline' || brand === 'O Boticário')) {
    const logo = document.createElement('img');
    logo.className = 'brand-logo';
    logo.src = brand === 'MAC' ? macLogo
      : brand === 'NARS' ? narsLogo
        : brand === 'Maybelline' ? maybellineLogo
          : oboticarioLogo;
    logo.alt = `${brand} Cosmetics`;
    container.appendChild(logo);
  } else {
    container.textContent = brand;
  }
}

const GROUPS = [
  {
    id: 'labios', label: 'Lábios', products: [
      product('labios', 'lipstick', 'MAC', 'Ruby Woo', 'Matte Lipstick', [['Ruby Woo', '#c41e3a'], ['Russian Red', '#b01030'], ['Velvet Teddy', '#c48a7a'], ['Twig Twist', '#b87868']], 'glossy', null, {
        'Ruby Woo': batonImage('MAC Matte Lipstick, Ruby Woo.png'),
        'Russian Red': batonImage('Ruby Woo Matte Lipstick, Russian Red.jpg'),
        'Velvet Teddy': batonImage('Ruby Woo Matte Lipstick, Velvet Teddy.jpg'),
        'Twig Twist': batonImage('Ruby Woo Matte Lipstick, Twig Twist.png'),
      }),
      product('labios', 'lipstick', 'MAC', 'Lustre Lipstick', 'Lipstick', [['See Sheer', '#d47070'], ['Cockney', '#d04050'], ['Lady Bug', '#c03040']], 'glossy', null, {
        'See Sheer': batonImage('MAC Lustre Lipstick, See Sheer.png'),
        Cockney: batonImage('MAC Lustre Lipstick, Cockney.png'),
        'Lady Bug': batonImage('MAC Lustre Lipstick, Lady Bug.png'),
      }),
      product('labios', 'lipstick', 'NARS', 'Audacious', 'Lipstick', [['Dragon Girl', '#c01030'], ['Heat Wave', '#e04030'], ['Barbara', '#c08070'], ['Anna', '#b07080']], 'glossy'),
      product('labios', 'lipstick', 'Maybelline', 'SuperStay Matte', 'Liquid Lipstick', [['Lover', '#b03040'], ['Pioneer', '#c02030'], ['Seductress', '#c07060'], ['Amazonian', '#a05040']], 'glossy'),
      product('labios', 'lipstick', 'O Boticário', 'Make B. Batom', 'Lipstick', [['Vermelho Clássico', '#c41e3a'], ['Rosa', '#d48090'], ['Nude', '#c8a090']], 'glossy'),
      product('labios', 'lipstick', 'Quem Disse, Berenice?', 'Batom Matte', 'Lipstick', [['Vermelho', '#c41e3a'], ['Rosa Choque', '#e04070'], ['Nude', '#c8a090'], ['Roxo', '#8a2be2']], 'glossy'),
    ],
  },
  {
    id: 'blush', label: 'Blush', products: [
      product('blush', 'blush', 'NARS', 'Orgasm', 'Blush', [['Orgasm Rush', '#b34d58'], ['Orgasm X', '#e95a64'], ['Deep Throat', '#d78187']], 'matte', null, {
        'Orgasm Rush': blushImage('NARS Blush Orgasm Rush.png'),
        'Orgasm X': blushImage('NARS Blush Orgasm X.png'),
        'Deep Throat': blushImage('NARS Blush Deep Throat.png'),
      }),
      product('blush', 'blush', 'MAC', 'Mineralize Blush', 'Blush', [['Gentle', '#d98f9f'], ['Like Me, Love Me', '#e98569'], ['Love Thing', '#bd6473']], 'matte', null, {
        Gentle: blushImage('MAC Blush Gentle.png'),
        'Like Me, Love Me': blushImage('MAC Blush Like Me, Love Me.png'),
        'Love Thing': blushImage('MAC Blush Love Thing.png'),
      }),
      product('blush', 'blush', 'Quem Disse, Berenice?', 'Blush Cremoso', 'Blush', [['Rosa', '#e8a0a8'], ['Pêssego', '#f0c0a0'], ['Vermelho', '#d47070']], 'matte'),
    ],
  },
  {
    id: 'pele', label: 'Pele', products: [
      product('pele', 'foundation', 'MAC', 'Studio Fix Fluid', 'Foundation', [['NC15', '#f5e0d3'], ['NC25', '#edc9b0'], ['NC35', '#d9a87c'], ['NC45', '#b87d54'], ['NC55', '#8a5a3a']], 'matte'),
      product('pele', 'foundation', 'NARS', 'Light Reflecting', 'Foundation', [['Siberia', '#f7e6d9'], ['Punjab', '#e8c9a8'], ['Barcelona', '#d4a87c'], ['New Orleans', '#a87b5a'], ['Benares', '#6e4f38']], 'matte'),
      product('pele', 'foundation', 'Maybelline', 'Fit Me Matte', 'Foundation', [['110', '#f7e4d6'], ['220', '#e8c4a8'], ['310', '#c89878'], ['355', '#9e6e4e'], ['360', '#7a5038']], 'matte'),
      product('pele', 'foundation', 'O Boticário', 'Make B. Base', 'Foundation', [['Bege Claro', '#f0dbc8'], ['Bege Médio', '#deb89a'], ['Bege Escuro', '#b88864']], 'matte'),
      product('pele', 'foundation', 'NARS', 'Radiant Creamy', 'Concealer', [['Chantilly', '#f5e6d8'], ['Vanilla', '#efd5bc'], ['Custard', '#e0ba98'], ['Caramel', '#c49a6c'], ['Cacao', '#7a5038']], 'matte'),
      product('pele', 'foundation', 'Maybelline', 'Fit Me Concealer', 'Concealer', [['10 Light', '#f7e4d6'], ['25 Medium', '#e8c4a8'], ['40 Caramel', '#c89878']], 'matte'),
      product('pele', 'foundation', 'O Boticário', 'Make B. Corretivo', 'Concealer', [['Claro', '#f0dbc8'], ['Médio', '#deb89a'], ['Escuro', '#b88864']], 'matte'),
    ],
  },
];

const PRODUCT_PRICES = new Map([
  ['MAC|Ruby Woo', 128.00],
  ['MAC|Lustre Lipstick', 134.90],
  ['NARS|Audacious', 189.50],
  ['Maybelline|SuperStay Matte', 77.81],
  ['O Boticário|Make B. Batom', 58.80],
  ['Quem Disse, Berenice?|Batom Matte', 49.90],
  ['NARS|Orgasm', 329.49],
  ['MAC|Mineralize Blush', 289.00],
  ['Quem Disse, Berenice?|Blush Cremoso', 67.90],
  ['MAC|Studio Fix Fluid', 267.90],
  ['NARS|Light Reflecting', 878.07],
  ['Maybelline|Fit Me Matte', 55.20],
  ['O Boticário|Make B. Base', 104.99],
  ['NARS|Radiant Creamy', 252.86],
  ['Maybelline|Fit Me Concealer', 85.93],
  ['O Boticário|Make B. Corretivo', 48.90],
]);
GROUPS.forEach(({ products }) => products.forEach((item) => {
  item.price = PRODUCT_PRICES.get(`${item.brand}|${item.name}`);
}));
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const state = {
  tab: 'try',
  group: 'labios',
  item: null,
  shadeIndex: 0,
  appliedByEffect: {},
  filter: 'todos',
  sheet: 'open',
  ready: false,
  loading: false,
  intensity: 94,
  intensityByEffect: {},
  cart: [],
};
const sliders = [];
const stage = $('stage');
const welcome = $('welcome');
const tryon = $('tryon');
const rightPanel = $('rightPanel');

const itemsFor = (groupId) => GROUPS.find((group) => group.id === groupId)?.products || [];
const currentShade = () => state.item.shades[state.shadeIndex];
const groupFor = (groupId) => GROUPS.find((group) => group.id === groupId);

function setTab(tab) {
  state.tab = tab;
  $('tabs').style.setProperty('--i', tab === 'try' ? 0 : 1);
  $('tabs').querySelectorAll('button[data-tab]').forEach((button) => {
    button.setAttribute('aria-selected', String(button.dataset.tab === tab));
  });
  $('panelTry').classList.toggle('active', tab === 'try');
  $('panelCatalog').classList.toggle('active', tab === 'catalog');
  $('hint').classList.toggle('show', false);
  if (tab === 'catalog') renderCatalog();
}

function renderPills() {
  const pills = $('groupPills');
  pills.replaceChildren();
  pills.appendChild(document.createElement('span')).className = 'thumb';
  GROUPS.forEach((group) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = group.label;
    button.dataset.group = group.id;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(group.id === state.group));
    pills.appendChild(button);
  });
  pills.style.setProperty('--n', GROUPS.length);
  pills.style.setProperty('--i', GROUPS.findIndex((group) => group.id === state.group));
}

function renderSheetInfo() {
  const shade = currentShade();
  const item = state.item;
  $('selSwatch').style.background = shade.hex;
  const photo = $('selPhoto');
  photo.hidden = !shade.image;
  if (shade.image) {
    photo.src = shade.image;
    photo.alt = `${item.name}, ${shade.name}`;
  }
  renderBrand($('selBrand'), item.brand);
  $('selName').textContent = item.name;
  $('selMeta').textContent = `${item.type}, ${shade.name}`;
  const applied = Boolean(state.appliedByEffect[item.effect]);
  $('intensityWrap').classList.toggle('off', !applied);
  const intensity = state.intensityByEffect[item.effect] ?? state.intensity;
  state.intensity = intensity;
  $('intensity').value = intensity;
  $('intensityOut').textContent = `${intensity}%`;
  const button = $('applyBtn');
  button.textContent = applied ? 'Remover' : 'Aplicar';
  button.classList.toggle('is-on', applied);
  button.classList.toggle('is-off', !applied);
  $('shadeRow').classList.toggle('hidden', item.shades.length < 2);
  $('shadeRow').replaceChildren(...item.shades.map((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `shade-dot${index === state.shadeIndex ? ' active' : ''}`;
    button.setAttribute('role', 'option');
    button.setAttribute('aria-label', option.name);
    button.setAttribute('aria-selected', String(index === state.shadeIndex));
    button.innerHTML = '<i></i>';
    button.querySelector('i').style.background = option.hex;
    button.addEventListener('click', () => selectShade(index));
    return button;
  }));
  renderCarousel();
}

function optionsFor(item, color) {
  const options = { color };
  if (item.finish) options.finish = item.finish;
  if (item.pattern != null) options.pattern = item.pattern;
  return options;
}

function applyItem(item = state.item, shade = currentShade()) {
  state.appliedByEffect[item.effect] = true;
  state.intensityByEffect[item.effect] ??= state.intensity;
  mk.setIntensity(item.effect, state.intensityByEffect[item.effect] / 100);
  void mk.apply(item.effect, optionsFor(item, shade.hex));
  renderSheetInfo();
}

function selectItem(item, scroll = true, apply = true) {
  state.item = item;
  state.group = item.groupId;
  state.shadeIndex = 0;
  renderPills();
  renderSheetInfo();
  if (apply) applyItem(item, currentShade());
  renderCarousel(scroll);
}

function selectShade(index) {
  state.shadeIndex = index;
  renderSheetInfo();
  if (state.appliedByEffect[state.item.effect]) applyItem();
}

function renderCarousel(scroll = false) {
  const carousel = $('carousel');
  carousel.replaceChildren();
  itemsFor(state.group).slice(0, 5).forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `car-item${item === state.item ? ' selected' : ''}`;
    button.setAttribute('aria-label', `${item.brand} ${item.name}`);
    const swatch = document.createElement('span');
    swatch.className = 'car-swatch';
    swatch.style.background = item.shades[0].hex;
    const brand = document.createElement('span');
    brand.className = 'car-brand';
    renderBrand(brand, item.brand);
    const name = document.createElement('span');
    name.className = 'car-name';
    name.textContent = item.name;
    button.append(swatch, brand, name);
    button.addEventListener('click', () => selectItem(item));
    carousel.appendChild(button);
  });
  if (scroll) {
    const selected = carousel.querySelector('.selected');
    selected?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }
}

function setGroup(groupId, autoSelect = true) {
  state.group = groupId;
  renderPills();
  renderCarousel();
  if (autoSelect) selectItem(itemsFor(groupId)[0], false, true);
}

function renderCatalog() {
  const chips = $('catalogChips');
  if (!chips.childElementCount) {
    [{ id: 'todos', label: 'Todos' }, ...GROUPS].forEach((group) => {
      const button = document.createElement('button');
      button.className = 'chip';
      button.type = 'button';
      button.textContent = group.label;
      button.dataset.filter = group.id;
      button.addEventListener('click', () => {
        state.filter = group.id;
        renderCatalog();
      });
      chips.appendChild(button);
    });
  }
  chips.querySelectorAll('.chip').forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === state.filter);
  });
  const groups = state.filter === 'todos' ? GROUPS : GROUPS.filter((group) => group.id === state.filter);
  const list = $('catalogList');
  list.replaceChildren();
  groups.forEach((group) => {
    const section = document.createElement('section');
    section.className = 'list-section';
    if (state.filter === 'todos') {
      const heading = document.createElement('h3');
      heading.className = 'list-heading';
      heading.textContent = group.label;
      section.appendChild(heading);
    }
    group.products.forEach((item) => {
      const row = document.createElement('button');
      row.className = 'row';
      row.type = 'button';
      const swatch = document.createElement('span');
      swatch.className = 'row-swatch';
      swatch.style.background = item.shades[0].hex;
      const text = document.createElement('span');
      text.className = 'row-text';
      const name = document.createElement('span');
      name.className = 'row-name';
      name.textContent = item.name;
      const type = document.createElement('span');
      type.className = 'row-type';
      type.textContent = item.type;
      text.append(name, document.createElement('br'), type);
      const end = document.createElement('span');
      end.className = 'row-end';
      const brand = document.createElement('span');
      brand.className = 'row-brand';
      renderBrand(brand, item.brand, false);
      end.appendChild(brand);
      row.append(swatch, text, end);
      row.addEventListener('click', () => {
        selectItem(item, false, true);
        setTab('try');
      });
      section.appendChild(row);
    });
    list.appendChild(section);
  });
}

function clearAll() {
  mk.clearAll();
  state.appliedByEffect = {};
  renderSheetInfo();
}

function renderCart() {
  const list = $('cartList');
  const count = state.cart.reduce((total, entry) => total + entry.quantity, 0);
  const total = state.cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  $('cartCount').textContent = String(count);
  $('cartCount').classList.toggle('hidden', count === 0);
  $('cartTotal').textContent = currency.format(total);
  list.replaceChildren();
  if (!state.cart.length) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Seu carrinho está vazio.';
    list.appendChild(empty);
    return;
  }
  state.cart.forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    const swatch = document.createElement('span');
    swatch.className = 'row-swatch';
    swatch.style.background = entry.shade.hex;
    const text = document.createElement('span');
    text.className = 'row-text';
    const name = document.createElement('span');
    name.className = 'row-name';
    name.textContent = `${entry.item.brand} ${entry.item.name}`;
    const shade = document.createElement('span');
    shade.className = 'row-type';
    shade.textContent = entry.shade.name;
    text.append(name, document.createElement('br'), shade);
    const quantity = document.createElement('span');
    quantity.className = 'cart-quantity';
    quantity.textContent = `Qtd. ${entry.quantity}`;
    const price = document.createElement('span');
    price.className = 'cart-price';
    price.textContent = `${currency.format(entry.item.price)} / un.`;
    const remove = document.createElement('button');
    remove.className = 'cart-remove';
    remove.type = 'button';
    remove.setAttribute('aria-label', `Remover ${entry.item.name} do carrinho`);
    remove.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>';
    remove.addEventListener('click', () => {
      state.cart.splice(index, 1);
      renderCart();
    });
    row.append(swatch, text, quantity, price, remove);
    list.appendChild(row);
  });
}

function setCartOpen(open) {
  $('cartPanel').classList.toggle('is-open', open);
  $('cartPanel').setAttribute('aria-hidden', String(!open));
  $('cartToggle').setAttribute('aria-expanded', String(open));
  $('cartToggle').setAttribute('aria-label', open ? 'Fechar carrinho' : 'Abrir carrinho');
}

function makeSlider(name, about) {
  const row = document.createElement('label');
  row.className = 'slider';
  row.innerHTML = `<span>${name}${about ? ` — <i>${about}</i>` : ''}</span><input type="range" min="-1" max="1.5" step="0.05" value="0"><output>0.00</output>`;
  const input = row.querySelector('input');
  const output = row.querySelector('output');
  input.addEventListener('input', () => {
    output.textContent = Number(input.value).toFixed(2);
    mk.setMorph(name, Number(input.value));
  });
  $('morph-panel').appendChild(row);
  sliders.push({ input, output });
}

function buildMorphSliders() {
  const friendly = {};
  for (const [name, config] of Object.entries(MORPH_CONTROLS || {})) {
    friendly[config.target] = { name, about: config.about };
  }
  const targets = mk.getMorphTargets();
  if (targets.length) {
    targets.forEach((target) => {
      const control = friendly[target];
      makeSlider(control ? control.name : target, control ? control.about : `raw target (${target})`);
    });
  } else {
    for (const [name, config] of Object.entries(MORPH_CONTROLS || {})) makeSlider(name, config.about);
  }
}

async function startCamera() {
  if (state.loading) return;
  $('stageError').classList.add('gone');
  $('stageLoading').classList.remove('gone');
  $('hint').textContent = 'Preparando reconhecimento facial…';
  $('hint').classList.add('show');
  state.loading = true;
  try {
    if (!state.ready) {
      await mk.init();
      state.ready = true;
      buildMorphSliders();
    } else {
      mk.start();
    }
    stage.classList.add('live');
    $('stageLoading').classList.add('gone');
    $('hint').textContent = 'Centralize seu rosto na câmera';
  } catch (error) {
    $('stageLoading').classList.add('gone');
    const messages = {
      NotAllowedError: ['Permita o acesso à câmera', 'Ative a câmera nas configurações do navegador para ver a maquiagem no seu rosto.'],
      NotFoundError: ['Nenhuma câmera encontrada', 'Conecte uma câmera ou abra o Studio Blush em outro aparelho.'],
      NotReadableError: ['A câmera está em uso', 'Feche outros aplicativos que estejam usando a câmera e tente de novo.'],
    };
    const [title, body] = messages[error.name] || ['Câmera indisponível', error.message || 'Não foi possível iniciar a câmera. Verifique as permissões e tente de novo.'];
    $('errTitle').textContent = title;
    $('errBody').textContent = body;
    $('stageError').classList.remove('gone');
  } finally {
    state.loading = false;
  }
}

function openApp() {
  welcome.classList.add('leaving');
  welcome.classList.remove('playing');
  setTimeout(() => {
    welcome.classList.remove('active', 'leaving');
    tryon.classList.add('active');
    startCamera();
  }, 760);
}

function goWelcome() {
  tryon.classList.remove('active');
  welcome.classList.add('active', 'playing');
  if (state.ready) mk.stop();
}

function setSheet(sheet) {
  state.sheet = sheet;
  rightPanel.dataset.state = sheet;
}

$('btnStart').addEventListener('click', openApp);
$('btnRetry').addEventListener('click', startCamera);
$('camBack').addEventListener('click', goWelcome);
$('studioLogo').addEventListener('click', goWelcome);
$('cartAdd').addEventListener('click', () => {
  const item = state.item;
  const shade = currentShade();
  const existing = state.cart.find((entry) => entry.item === item && entry.shade === shade);
  if (existing) existing.quantity += 1;
  else state.cart.push({ item, shade, quantity: 1 });
  renderCart();
  setCartOpen(true);
});
$('cartToggle').addEventListener('click', () => {
  setCartOpen(!$('cartPanel').classList.contains('is-open'));
});
$('cartClose').addEventListener('click', () => setCartOpen(false));
$('applyBtn').addEventListener('click', () => {
  if (state.appliedByEffect[state.item.effect]) {
    mk.clear(state.item.effect);
    state.appliedByEffect[state.item.effect] = false;
    renderSheetInfo();
  } else {
    applyItem();
  }
});
$('clear').addEventListener('click', clearAll);
$('tabs').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-tab]');
  if (button) setTab(button.dataset.tab);
});
$('groupPills').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-group]');
  if (button && button.dataset.group !== state.group) setGroup(button.dataset.group);
});
$('intensity').addEventListener('input', (event) => {
  state.intensity = Number(event.target.value);
  if (state.item) {
    state.intensityByEffect[state.item.effect] = state.intensity;
    mk.setIntensity(state.item.effect, state.intensity / 100);
  }
  $('intensityOut').textContent = `${state.intensity}%`;
});
$('reset-morph').addEventListener('click', () => {
  mk.resetMorph();
  sliders.forEach(({ input, output }) => { input.value = 0; output.textContent = '0.00'; });
});
$('wireframe').addEventListener('change', (event) => mk.setWireframe(event.target.checked));
$('blur').addEventListener('change', (event) => mk.setBlur(event.target.checked));
$('sheetHandle').addEventListener('click', () => setSheet(state.sheet === 'open' ? 'min' : 'open'));
$('sheetHandle').addEventListener('pointerdown', (event) => { $('sheetHandle').dataset.startY = event.clientY; });
$('sheetHandle').addEventListener('pointerup', (event) => {
  const startY = Number($('sheetHandle').dataset.startY);
  const delta = event.clientY - startY;
  if (delta > 20) setSheet('min');
  if (delta < -20) setSheet('open');
});

renderPills();
selectItem(itemsFor('labios')[0], false, false);
renderCatalog();
renderCart();
window.mk = mk;