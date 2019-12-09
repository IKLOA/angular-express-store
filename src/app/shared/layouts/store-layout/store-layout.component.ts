import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {Category} from '../../interfaces';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.sass']
})
export class StoreLayoutComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private auth: AuthService, private categoriesSerivce: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesSerivce.fetch();
  }

}
