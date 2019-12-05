import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {
    router.navigate(['admin', 'login']);
  }

  ngOnInit() {

  }

}
