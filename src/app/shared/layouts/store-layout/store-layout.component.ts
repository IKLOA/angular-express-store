import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.sass']
})
export class StoreLayoutComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

}
