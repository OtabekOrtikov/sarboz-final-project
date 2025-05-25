// src/app.ts
import { IOrderForm } from "./types";
import { Product } from "./models/Product";
import { Cart } from "./models/Cart";
import { OrderService } from "./models/OrderService";
import "bootstrap/dist/css/bootstrap.min.css";

// Демо-товары
export const PRODUCTS: Product[] = [
  new Product(1, "Widget A", "High-quality widget", 9.99),
  new Product(2, "Widget B", "Advanced widget", 14.99),
  new Product(3, "Widget C", "Premium widget", 19.99),
];

const cart = new Cart();

// Рендер списка товаров
export function renderProducts(): void {
  const container = document.querySelector<HTMLDivElement>("#product-list")!;
  container.innerHTML = "";
  if (!PRODUCTS.length) {
    container.textContent = "No items";
    return;
  }
  PRODUCTS.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    col.classList.add("product-card");

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text flex-grow-1">${p.description}</p>
          <p class="fw-bold mb-3">$${p.price.toFixed(2)}</p>
          <button class="btn btn-primary mt-auto" data-id="${p.id}">
            Add to Basket
          </button>
        </div>
      </div>
    `;

    const btn = col.querySelector<HTMLButtonElement>("button")!;
    btn.addEventListener("click", () => {
      cart.add(p.id);
      btn.textContent = "Added";
      setTimeout(() => (btn.textContent = "Add to Basket"), 800);
    });

    container.appendChild(col);
  });
}

// Рендер корзины
export function renderCart(): void {
  const container = document.querySelector<HTMLDivElement>("#cart-list")!;
  container.innerHTML = "";
  const entries = cart.getEntries();

  if (!entries.length) {
    container.textContent = "No items";
    return;
  }

  entries.forEach(({ productId, quantity }) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const item = document.createElement("div");
    item.className = "list-group-item d-flex align-items-center cart-item";

    item.innerHTML = `
      <div class="flex-grow-1">
        <h6 class="mb-1">${product.name}</h6>
        <small class="text-muted">${product.description}</small>
        <p class="mb-1 fw-bold">$${product.price.toFixed(2)}</p>
      </div>
      <div class="me-3">
        <input
          type="number"
          min="1"
          value="${quantity}"
          class="form-control"
          style="width: 80px;"
          data-id="${productId}"
        />
      </div>
      <button class="btn btn-outline-danger btn-sm" data-id="${productId}">Delete</button>
    `;

    const input = item.querySelector<HTMLInputElement>("input")!;
    input.addEventListener("change", () => {
      const val = parseInt(input.value, 10);
      cart.update(productId, val);
    });
    item.querySelector("button")!.addEventListener("click", () => {
      cart.remove(productId);
      renderCart();
    });

    container.appendChild(item);
  });
}

// Настройка формы заказа
export function setupOrderForm(): void {
  const form = document.querySelector<HTMLFormElement>("#orderForm")!;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data: IOrderForm = {
      personName: fd.get("personName") as string,
      deliveryAddress: fd.get("deliveryAddress") as string,
      email: fd.get("email") as string,
      comment: (fd.get("comment") as string) || undefined,
    };
    if (!data.personName || !data.deliveryAddress || !data.email) {
      alert("Заполните все обязательные поля!");
      return;
    }
    OrderService.submit(data, cart.getEntries());
    cart.clear();
    window.location.href = "index.html";
  });
}

// Автоинициализация на странице
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#product-list")) {
    renderProducts();
  }
  if (document.querySelector("#cart-list")) {
    renderCart();
    setupOrderForm();
  }
});
