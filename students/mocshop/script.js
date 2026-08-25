const products = [
  { id:1, name:'Everyday Gel Pens', category:'Stationery', price:6.50, icon:'🖊️', tag:'BESTSELLER', visual:'#e9f5b9', tilt:'-8deg' },
  { id:2, name:'Campus Notebook', category:'Notebooks', price:8.90, icon:'📓', tag:'STUDENT PICK', visual:'#ffe4c9', tilt:'5deg' },
  { id:3, name:'Scientific Calculator', category:'Maths', price:24.90, icon:'🔢', tag:'ESSENTIAL', visual:'#dce9e4', tilt:'-4deg' },
  { id:4, name:'Pastel Highlighter Set', category:'Stationery', price:9.50, icon:'🖍️', tag:'NEW', visual:'#f9dbe4', tilt:'7deg' },
  { id:5, name:'A4 Sketch Pad', category:'Art', price:7.90, icon:'🎨', tag:'CREATIVE', visual:'#e6def4', tilt:'-5deg' },
  { id:6, name:'Mechanical Pencil', category:'Stationery', price:4.50, icon:'✏️', tag:'BUDGET PICK', visual:'#f4e8c9', tilt:'-12deg' },
  { id:7, name:'Study Planner', category:'Notebooks', price:11.90, icon:'🗓️', tag:'POPULAR', visual:'#d8e8f7', tilt:'4deg' },
  { id:8, name:'Geometry Set', category:'Maths', price:6.90, icon:'📐', tag:'ESSENTIAL', visual:'#dcefc9', tilt:'-6deg' },
  { id:9, name:'Acrylic Paint Kit', category:'Art', price:15.90, icon:'🖌️', tag:'CREATIVE', visual:'#f6dfd1', tilt:'8deg' },
  { id:10, name:'Campus Backpack', category:'Bags', price:39.90, icon:'🎒', tag:'TOP PICK', visual:'#e0e0d7', tilt:'-3deg' },
  { id:11, name:'Sticky Note Stack', category:'Stationery', price:5.90, icon:'🗒️', tag:'HANDY', visual:'#f5efb8', tilt:'5deg' },
  { id:12, name:'Subject Divider Pack', category:'Notebooks', price:5.50, icon:'📚', tag:'ORGANISE', visual:'#e7dcef', tilt:'-7deg' }
];

let activeCategory = 'All';
let cart = JSON.parse(localStorage.getItem('studySupplyCart') || '{}');
const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${value.toFixed(2)}`;

function renderProducts() {
  const query = $('#searchInput').value.trim().toLowerCase();
  const sort = $('#sortSelect').value;
  let visible = products.filter(p => {
    const categoryMatch = activeCategory === 'All' || p.category === activeCategory;
    const queryMatch = `${p.name} ${p.category}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });

  if (sort === 'low') visible.sort((a,b) => a.price - b.price);
  if (sort === 'high') visible.sort((a,b) => b.price - a.price);
  if (sort === 'name') visible.sort((a,b) => a.name.localeCompare(b.name));

  $('#productGrid').innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-visual" style="--visual:${p.visual};--tilt:${p.tilt}">
        <span class="product-tag">${p.tag}</span>
        <span class="product-icon" aria-hidden="true">${p.icon}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3>${p.name}</h3>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add-button" type="button" data-add="${p.id}">Add to bag</button>
        </div>
      </div>
    </article>`).join('');

  $('#emptyState').hidden = visible.length !== 0;
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => addToCart(Number(button.dataset.add))));
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  const product = products.find(p => p.id === id);
  showToast(`${product.name} added to your bag`);
}

function updateQuantity(id, change) {
  cart[id] = (cart[id] || 0) + change;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
}

function saveCart() {
  localStorage.setItem('studySupplyCart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const entries = Object.entries(cart).map(([id, quantity]) => ({ product: products.find(p => p.id === Number(id)), quantity })).filter(x => x.product);
  const count = entries.reduce((sum, x) => sum + x.quantity, 0);
  const total = entries.reduce((sum, x) => sum + x.product.price * x.quantity, 0);
  $('#cartCount').textContent = count;
  $('#cartTotal').textContent = money(total);
  $('#cartEmpty').style.display = entries.length ? 'none' : 'flex';
  $('#cartItems').style.display = entries.length ? 'block' : 'none';
  $('#cartItems').innerHTML = entries.map(({product, quantity}) => `
    <div class="cart-item">
      <div class="cart-thumb">${product.icon}</div>
      <div>
        <h3>${product.name}</h3>
        <small>${money(product.price)} each</small>
        <div class="qty">
          <button type="button" data-qty="${product.id}" data-change="-1" aria-label="Decrease quantity">−</button>
          <strong>${quantity}</strong>
          <button type="button" data-qty="${product.id}" data-change="1" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove" type="button" data-remove="${product.id}">Remove</button>
      </div>
      <strong>${money(product.price * quantity)}</strong>
    </div>`).join('');

  document.querySelectorAll('[data-qty]').forEach(btn => btn.addEventListener('click', () => updateQuantity(Number(btn.dataset.qty), Number(btn.dataset.change))));
  document.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => { delete cart[btn.dataset.remove]; saveCart(); }));
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll('.filter').forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
  renderProducts();
  if (category !== 'All') document.querySelector('#catalogue').scrollIntoView({ behavior:'smooth', block:'start' });
}

function openCart() {
  $('#overlay').hidden = false;
  $('#cartDrawer').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden','true');
  $('#overlay').hidden = true;
  document.body.style.overflow = '';
}
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => setCategory(button.dataset.category)));
$('#searchInput').addEventListener('input', renderProducts);
$('#sortSelect').addEventListener('change', renderProducts);
$('#cartButton').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#overlay').addEventListener('click', closeCart);
$('#checkoutButton').addEventListener('click', () => {
  if (!Object.keys(cart).length) return showToast('Your bag is empty — add a few supplies first.');
  showToast('Demo checkout: no payment was taken.');
});

document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });
renderProducts();
renderCart();
