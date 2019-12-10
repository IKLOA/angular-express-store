import {AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category, Position} from '../../shared/interfaces';
import {PositionsService} from '../../shared/services/positions.service';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.sass']
})
export class PositionsPageComponent implements OnInit {

  querySubscription: Subscription;
  categoryId: string;
  category: Category;
  positions$: Observable<Position[]>;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private positionsService: PositionsService, private router: Router) {
  }

  ngOnInit() {
    this.querySubscription = this.route.params.subscribe((queryParam: any) => {
      this.categoryId = queryParam.id;
      this.categoriesService.getById(this.categoryId).subscribe((category: Category) => {
        this.category = category;
      });
    });

    this.positions$ = this.positionsService.fetch(this.categoryId);


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.querySubscription = this.route.params.subscribe((queryParam: any) => {
          this.categoryId = queryParam.id;
          this.categoriesService.getById(this.categoryId).subscribe((category: Category) => {
            this.category = category;
          });
        });

        this.positions$ = this.positionsService.fetch(this.categoryId);
      }
    });

  }

  getUrl(id: string): string {
    return `http://localhost:3000/${id}`;
  }

}
