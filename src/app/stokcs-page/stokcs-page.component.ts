import {Component, OnInit} from '@angular/core';
import {PositionsService} from '../shared/services/positions.service';
import {Observable} from 'rxjs';
import {Category, Position} from '../shared/interfaces';
import {MaterialService} from '../shared/classes/material.service';
import {OrderService} from '../shared/services/order.service';
import {GetUrlService} from "../shared/classes/getUrl.service";

@Component({
  selector: 'app-stokcs-page',
  templateUrl: './stokcs-page.component.html',
  styleUrls: ['./stokcs-page.component.sass']
})
export class StokcsPageComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(private positionsService: PositionsService, private order: OrderService) {
  }

  ngOnInit() {
    this.positions$ = this.positionsService.getDiscount();
  }

  getUrl(id: string) {
    GetUrlService.getUrl(id);
  }

  addPosition(position: Position) {
    if (!position.quantity) {
      position.quantity = 1;
    }
    position.size = 'M';
    this.order.add(position);
    MaterialService.toast('Товар добавлен в корзину');
  }
}
