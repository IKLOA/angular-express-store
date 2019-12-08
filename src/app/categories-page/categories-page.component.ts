import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {Observable} from 'rxjs';
import {Category} from '../shared/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.sass']
})
export class CategoriesPageComponent implements OnInit {

  @Output() CategoryId: EventEmitter<string> = new EventEmitter<string>();
  categories$: Observable<Category[]>;
  image: File;
  imagePreview = null;


  constructor(private categoriesSerivce: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesSerivce.fetch();
  }

  getUrl(id: string): string {
    return `http://localhost:3000/${id}`;
  }


}
