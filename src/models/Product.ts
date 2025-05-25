/* eslint-disable no-unused-vars */
import { IProduct } from "../types";

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number
  ) {}
}
