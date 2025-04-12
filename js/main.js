import { ENDPOINTS } from "./constants/apiEndpoints.js";
import { showLoader } from "./utils.js";


document.addEventListener("DOMContentLoaded", async ()=>{
    loadProducts();
})


async function loadProducts() {
    const parentEl = document.querySelector("#product-list");
    showLoader(parentEl);
    try {
        const res = await fetch(`${ENDPOINTS.PRODUCTS}?limit=20`);
        const data = await res.json();
        console.log(data);
        parentEl.innerHTML = data.map(product => renderProducts(product)).join('');
            
        } catch (error) {
        parentEl.innerHTML = `Failed to load products.`
    }
}

function renderProducts(product){
    return`
        <div class="col-md-3 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${product.image}" class="card-img-top p-3" style="height: 200px; object-fit: contain;">
            <div class="card-body">
              <h6 class="card-title">${product.title.slice(0, 20)}...</h6>
              <p class="card-text fw-bold">$${product.price}</p>
              <button class="btn btn-primary w-100">View</button>
            </div>
          </div>
        </div>
    `;
}