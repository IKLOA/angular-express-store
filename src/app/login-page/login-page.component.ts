import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MaterialService} from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        MaterialService.toast('Теперь вы можете зайти в систему');
      } else if (params.accessDenied) {
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
      this.aSub = this.auth.login(this.form.value).subscribe(
        () => this.router.navigate(['/home']),
        error => {
          MaterialService.toast(error.error.message);
        }
      );
    } else {
      MaterialService.toast('Заполните обязательные поля');
    }

  }
}
