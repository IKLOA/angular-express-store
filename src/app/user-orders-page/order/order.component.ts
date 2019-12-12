import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Observable} from 'rxjs';
import {Order} from '../../shared/interfaces';
import {MaterialIstance, MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  modal: MaterialIstance;
  orders$: Observable<Order[]>;
  order: Order;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders$ = this.orderService.getByUserId();
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
