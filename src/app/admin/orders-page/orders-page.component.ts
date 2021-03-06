import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialIstance, MaterialService} from '../../shared/classes/material.service';
import {Observable} from 'rxjs';
import {Order} from '../../shared/interfaces';
import {OrderService} from '../../shared/services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.sass']
})
export class OrdersPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  modal: MaterialIstance;
  orders$: Observable<Order[]>;
  order: Order;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onSelect(id: string) {
    this.orderService.getById(id).subscribe(order => this.order = order);
    this.modal.open();
  }

  onClose() {
    this.modal.close();
  }


}

