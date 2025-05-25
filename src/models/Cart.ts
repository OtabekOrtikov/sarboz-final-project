import { ICartEntry } from "../types";

export class Cart {
  private static readonly STORAGE_KEY = "cart";
  private items: Record<number, number>;

  constructor() {
    this.items = this.load();
  }

  private load(): Record<number, number> {
    const raw = localStorage.getItem(Cart.STORAGE_KEY);
    try {
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private save(): void {
    localStorage.setItem(Cart.STORAGE_KEY, JSON.stringify(this.items));
  }

  add(productId: number): void {
    this.items[productId] = (this.items[productId] || 0) + 1;
    this.save();
  }

  remove(productId: number): void {
    delete this.items[productId];
    this.save();
  }

  update(productId: number, quantity: number): void {
    if (quantity < 1) return;
    this.items[productId] = quantity;
    this.save();
  }

  clear(): void {
    this.items = {};
    this.save();
  }

  getEntries(): ICartEntry[] {
    return Object.entries(this.items).map(([id, qty]) => ({
      productId: Number(id),
      quantity: qty,
    }));
  }
}
