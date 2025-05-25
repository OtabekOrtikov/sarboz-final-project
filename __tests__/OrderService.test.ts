// __tests__/OrderService.test.ts
import { OrderService } from '../src/models/OrderService';
import { IOrderForm } from '../src/types';

describe('OrderService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs and alerts on submit', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    const form: IOrderForm = {
      personName: 'Alice',
      deliveryAddress: '123 Main St',
      email: 'alice@example.com',
      comment: 'Please deliver ASAP',
    };
    const cartItems = [{ productId: 1, quantity: 2 }];

    OrderService.submit(form, cartItems);

    expect(consoleSpy).toHaveBeenCalledWith('Order submitted:', form, cartItems);
    expect(alertSpy).toHaveBeenCalledWith('Спасибо за заказ!');
  });
});
