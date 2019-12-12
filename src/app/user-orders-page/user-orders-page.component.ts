import {Component, OnInit} from '@angular/core';
import {OrderService} from '../shared/services/order.service';

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.sass']
})
export class UserOrdersPageComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {

  }

}
