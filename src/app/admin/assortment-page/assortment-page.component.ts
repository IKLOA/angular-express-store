import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-assortment-page',
  templateUrl: './assortment-page.component.html',
  styleUrls: ['./assortment-page.component.sass']
})
export class AssortmentPageComponent implements OnInit {


  categories$: Observable<Category[]>;

  constructor(private categoriesSerivce: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesSerivce.fetch();
  }

}
