/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
    document.body.innerHTML = '';
  });
  
  describe('App functions (renderProducts, renderCart, setupOrderForm)', () => {
    it('renderProducts renders 3 product cards', () => {
      document.body.innerHTML = `<div id="product-list"></div>`;
      const { renderProducts } = require('../src/app');
      renderProducts();
      const cards = document.querySelectorAll('#product-list .product-card');
      expect(cards.length).toBe(3);
      expect(cards[0].textContent).toContain('Widget A');
    });
  
    it('renderCart shows "No items" when cart is empty', () => {
      document.body.innerHTML = `<div id="cart-list"></div>`;
      const { renderCart } = require('../src/app');
      renderCart();
      expect(document.querySelector('#cart-list')?.textContent).toBe('No items');
    });
  
    it('renderCart renders entries based on localStorage', () => {
      // Подготовим «корзину» в localStorage
      localStorage.setItem('cart', JSON.stringify({ 1: 2, 3: 1 }));
      document.body.innerHTML = `<div id="cart-list"></div>`;
      const { renderCart } = require('../src/app');
      renderCart();
      const items = document.querySelectorAll('#cart-list .cart-item');
      expect(items.length).toBe(2);
      // первый товар с id=1 — Widget A
      expect(items[0].textContent).toContain('Widget A');
    });
  
    it('setupOrderForm calls OrderService.submit with correct data', () => {
      // Подготовим корзину
      localStorage.setItem('cart', JSON.stringify({ 2: 3 }));
      // Вёрстка формы
      document.body.innerHTML = `
        <div id="cart-list"></div>
        <form id="orderForm">
          <input name="personName" value="Bob" />
          <textarea name="deliveryAddress">X Street</textarea>
          <input name="email" type="email" value="bob@example.com" />
          <textarea name="comment">No onions</textarea>
          <button type="submit">Order</button>
        </form>
      `;
      // Подменим OrderService.submit
      const OrderService = require('../src/models/OrderService').OrderService;
      const spy = jest.spyOn(OrderService, 'submit').mockImplementation();
      // Импорт и инициализация
      const { renderCart, setupOrderForm } = require('../src/app');
      renderCart();
      setupOrderForm();
      // Триггер сабмита
      document.querySelector<HTMLFormElement>('#orderForm')!
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      expect(spy).toHaveBeenCalledWith(
        {
          personName: 'Bob',
          deliveryAddress: 'X Street',
          email: 'bob@example.com',
          comment: 'No onions',
        },
        [{ productId: 2, quantity: 3 }]
      );
    });
  
    it('setupOrderForm alerts on missing required fields', () => {
      document.body.innerHTML = `
        <div id="cart-list"></div>
        <form id="orderForm">
          <input name="personName" value="" />
          <textarea name="deliveryAddress"></textarea>
          <input name="email" type="email" value="" />
          <button type="submit">Order</button>
        </form>
      `;
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      const { setupOrderForm } = require('../src/app');
      setupOrderForm();
      document.querySelector<HTMLFormElement>('#orderForm')!
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      expect(alertSpy).toHaveBeenCalledWith('Заполните все обязательные поля!');
    });
  });
  