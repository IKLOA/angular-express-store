import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.sass']
})
export class AdminDashboardPageComponent implements OnInit {

  links = [
    {url: 'assortment', name: 'Ассортимент'},
    {url: 'orders', name: 'Заказы'}
  ];

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

}
