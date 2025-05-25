import { Cart } from '../src/models/Cart';

describe('Cart model', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes empty when no data in storage', () => {
    const cart = new Cart();
    expect(cart.getEntries()).toEqual([]);
  });

  it('adds items correctly', () => {
    const cart = new Cart();
    cart.add(1);
    cart.add(1);
    cart.add(2);
    // order of entries may vary, так что сортируем по productId
    const entries = cart.getEntries().sort((a, b) => a.productId - b.productId);
    expect(entries).toEqual([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ]);
  });

  it('updates item quantity', () => {
    const cart = new Cart();
    cart.add(1);
    cart.update(1, 5);
    expect(cart.getEntries()).toEqual([{ productId: 1, quantity: 5 }]);
  });

  it('removes item completely', () => {
    const cart = new Cart();
    cart.add(1);
    cart.remove(1);
    expect(cart.getEntries()).toEqual([]);
  });

  it('clears all items', () => {
    const cart = new Cart();
    cart.add(1);
    cart.add(2);
    cart.clear();
    expect(cart.getEntries()).toEqual([]);
  });
});
