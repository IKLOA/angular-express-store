import {Injectable} from '@angular/core';
import {Order, OrderPosition, Position} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class OrderService {

  public list: OrderPosition[] = [];
  public price = 0;

  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order);
  }

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: +position.cost,
      size: position.size,
      quantity: position.quantity,
      costWithDiscount: position.costWithDiscount ? position.costWithDiscount : null,
      _id: position._id
    });

    const candidate = this.list.find(item => item._id === position._id && item.size === position.size);

    if (candidate) {
      candidate.quantity++;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();

  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.computePrice();
  }


  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }
}
