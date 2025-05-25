import { IOrderForm, ICartEntry } from "../types";

export class OrderService {
  static submit(form: IOrderForm, cart: ICartEntry[]): void {
    // Здесь можно отправить на сервер через fetch/axios
    console.log("Order submitted:", form, cart);
    alert("Спасибо за заказ!");
  }
}
