/**
 * @jest-environment jsdom
 */

describe('DOMContentLoaded handler in app.ts', () => {
    beforeEach(() => {
      // Reset DOM and module cache
      document.body.innerHTML = '';
      jest.resetModules();
    });
  
    it('renders 3 product cards when #product-list exists', () => {
      // Arrange
      document.body.innerHTML = '<div id="product-list"></div>';
      // Act: import app (registers the listener) and fire the event
      require('../src/app');
      document.dispatchEvent(new Event('DOMContentLoaded'));
      // Assert
      const cards = document.querySelectorAll('#product-list .product-card');
      expect(cards.length).toBe(3);
      expect(cards[0].textContent).toContain('Widget A');
    });
  
    it('renders "No items" in #cart-list when cart is empty', () => {
      // Arrange
      document.body.innerHTML = '<div id="cart-list"></div><form id="orderForm"></form>';
      // Act
      require('../src/app');
      document.dispatchEvent(new Event('DOMContentLoaded'));
      // Assert
      const container = document.querySelector('#cart-list')!;
      expect(container.textContent).toBe('No items');
    });
  });
  