import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Position} from '../../../shared/interfaces';
import {ActivatedRoute} from '@angular/router';
import {PositionsService} from '../../../shared/services/positions.service';

@Component({
  selector: 'app-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.sass']
})
export class PositionPageComponent implements OnInit, AfterViewInit {

  positionId: string;
  position: Position;
  categoryId: string;
  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize = '';
  preTarget = null;
  isLoading = false;


  constructor(private route: ActivatedRoute, private positionService: PositionsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.categoryId = this.route.params.value.id;
    this.positionId = this.route.params.value.positionId;
    this.positionService.getById(this.positionId).subscribe((pos: Position) => {
      if (pos) {
        this.position = pos;
        this.isLoading = false;
      }
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
}
