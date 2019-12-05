import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MaterialService} from '../../shared/classes/material.service';
import {error} from 'util';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.sass']
})
export class AdminLoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.accessDenied) {
        MaterialService.toast('Для начала авторизуйтесь в системе');
      }
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.aSub = this.auth.adminLogin(this.form.value).subscribe(
        () => this.router.navigate(['AdminDashboard']),
        error => {
          MaterialService.toast(error.error.message);
        }
      );
    } else {
      MaterialService.toast('Корректно заполните  поля');
    }
  }
}
