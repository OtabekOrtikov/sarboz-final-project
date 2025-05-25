export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  export interface ICartEntry {
    productId: number;
    quantity: number;
  }
  
  export interface IOrderForm {
    personName: string;
    deliveryAddress: string;
    email: string;
    comment?: string;
  }
  