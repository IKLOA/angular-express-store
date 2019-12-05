import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token');
    const potentialAdminToken = localStorage.getItem('admin-token');

    if (potentialToken) {
      this.auth.setToken(potentialToken);
    }

    if (potentialAdminToken) {
      this.auth.setAdminToken(potentialAdminToken);
    }
  }
}
