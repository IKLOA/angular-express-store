import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Position} from '../../../shared/interfaces';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PositionsService} from '../../../shared/services/positions.service';
import {Subscription} from 'rxjs';
import {MaterialService} from '../../../shared/classes/material.service';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.sass']
})
export class PositionPageComponent implements OnInit {

  positionId: string;
  position: Position;
  categoryId: string;
  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize = '';
  preTarget = null;
  isLoading = false;
  querySubscription: Subscription;


  constructor(private route: ActivatedRoute, private positionService: PositionsService, private order: OrderService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.querySubscription = this.route.params.subscribe((queryParam: any) => {
      this.categoryId = queryParam.id;
      this.positionId = queryParam.positionId;
      this.positionService.getById(this.positionId).subscribe((pos: Position) => {
        if (pos) {
          this.position = pos;
          this.isLoading = false;
        }
      });
    });
  }

//rofl))))
  selectSize(size: string, event: any) {
    if (this.preTarget) {
      this.preTarget.classList.remove('size_selected');
    }
    this.selectedSize = size;
    this.preTarget = event.target;
    event.target.classList.add('size_selected');
  }


  addPosition(position: Position) {
    if (this.selectedSize) {
      if (!position.quantity) {
        position.quantity = 1;
      }
      position.size = this.selectedSize;
      this.order.add(position);
      MaterialService.toast('Товар добавлен в корзину');
    } else {
      MaterialService.toast('Выберите размер');
    }
  }

}
