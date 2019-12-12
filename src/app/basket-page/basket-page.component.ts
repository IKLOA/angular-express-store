import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../shared/services/order.service';
import {Order, OrderPosition} from '../shared/interfaces';
import {MaterialIstance, MaterialService} from '../shared/classes/material.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.sass']
})
export class BasketPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  modal: MaterialIstance;
  form: FormGroup;
  aSub: Subscription;


  constructor(private order: OrderService, private auth: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      adress: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required)
    });

  }

  ngOnDestroy() {
    this.modal.destroy();

    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  removePosition(item: OrderPosition) {
    this.order.remove(item);
  }

  clearBasket() {
    this.order.list = [];
  }

  confirmOrder() {
    if (this.auth.isAuthenticated()) {
      this.modal.open();
    } else {
      MaterialService.toast('Для оформления заказа надо авторизоваться');
    }

  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {

    if (this.form.valid) {

      const newOrder: Order = {
        list: this.order.list.map(item => {
          delete item._id;
          return item;
        }),
        adress: this.form.value.adress,
        phone: this.form.value.phone
      };

      this.aSub = this.order.create(newOrder).subscribe(
        order => {
          MaterialService.toast(`Заказ №${order.order} добавлен`);
        },
        error => MaterialService.toast(error.error.message),
        () => {
          this.modal.close();
          this.clearBasket();
        }
      );

    } else {
      MaterialService.toast('Заполните поля');
    }
  }
}
