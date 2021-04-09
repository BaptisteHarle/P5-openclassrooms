document.addEventListener('DOMContentLoaded', async () => {
  // localStorage.clear();
  // Récupération des données depuis le serveur
  const url = window.location.href;
  const id = url.split('product/')[1];
  // console.log(id);
  const camera = await NetworkInterface.get(`http://localhost:3000/api/cameras/${id}`);
  injectCamera(camera);
});
function injectCamera(camera) {
  const container = document.getElementById('product-container');
  console.log(camera.lenses.map(lense => `<option value="${lense}">${lense}</option>`))
  container.innerHTML = `
    <img src="${camera.imageUrl}" alt="${camera.name}" class="preview" />
    <section class="description-container">
      <h1 class="description-title">${camera.name} ${camera.price / 100}€</h1>
      <select name="lenses" id="lenses-select">
      <option value="">Choissisez une lentille</option>
       ${camera.lenses.map(lense => `<option value="${lense}">${lense}</option>`)}
      </select>
      <p class="description-body">
        ${camera.description}
      </p>
      <button id="order-btn" class="basket-add">Ajouter au panier</button>
    </section>
  `;
  document.getElementById('order-btn').addEventListener('click', () => {
    const storage = localStorage.getItem('basket');
    const basket = storage ? JSON.parse(storage) : [];
    basket.push(camera);
    localStorage.setItem('basket', JSON.stringify(basket));
    alert('Article ajouté au panier.');
    window.location.href = '/;
  });
}