import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category, Position} from '../../shared/interfaces';
import {PositionsService} from '../../shared/services/positions.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.sass']
})
export class PositionsPageComponent implements OnInit {

  categoryId: string;
  category: Category;
  positions$: Observable<Position[]>;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.categoryId = this.route.params.value.id;
    this.categoriesService.getById(this.categoryId).subscribe((category: Category) => {
      this.category = category;
    });

    this.positions$ = this.positionsService.fetch(this.categoryId);

  }


  getUrl(id: string): string {
    return `http://localhost:3000/${id}`;
  }

}
