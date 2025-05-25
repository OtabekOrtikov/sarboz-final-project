import { renderProducts } from '../src/app';
import { PRODUCTS } from '../src/app';

describe('renderProducts empty branch', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="product-list"></div>`;
  });

  it('shows "No items" when PRODUCTS is empty', () => {
    // Подменяем PRODUCTS на пустой массив
    (PRODUCTS as any).length = 0;
    renderProducts();
    const container = document.querySelector('#product-list')!;
    expect(container.textContent).toBe('No items');
  });
});
