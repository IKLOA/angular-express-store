import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../../shared/classes/material.service';
import {CategoriesService} from '../../../shared/services/categories.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Category} from '../../../shared/interfaces';
import {GetUrlService} from "../../../shared/classes/getUrl.service";


@Component({
  selector: 'app-assortment-form',
  templateUrl: './assortment-form.component.html',
  styleUrls: ['./assortment-form.component.sass']
})
export class AssortmentFormComponent implements OnInit {
  @ViewChild('input', {static: false}) inputRef: ElementRef;

  form: FormGroup;
  image: File;
  imagePreview = null;
  category: Category;
  isNew = true;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });


    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params.id) {
              this.isNew = false;
              return this.categoriesService.getById(params.id);
            }
            return of(null);
          }
        )
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({
              name: category.name
            });
            this.imagePreview = GetUrlService.getUrl(category.imageSrc);
            MaterialService.updateTextFields();
          }
        },
        error => MaterialService.toast(error.error.message)
      ); 
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const decision = confirm(`Вы хотите удалить категорию ${this.category.name}`);

    if (decision) {
      this.categoriesService.remove(this.category._id).subscribe(
        (response) => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['AdminDashboard', 'assortment'])
      );
    }
  }

  onSubmit() {

    if (this.form.valid) {

      let obs$;
      if (this.isNew) {
        obs$ = this.categoriesService.create(this.form.value.name, this.image);
      } else {
        obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
      }

      obs$.subscribe(
        category => {
          this.category = category;
          MaterialService.toast('Изменения сохранены');
          this.router.navigate(['AdminDashboard', 'assortment']);
        },
        error => MaterialService.toast(error.error.message)
      );

    } else {
      MaterialService.toast('Заполните обязательные поля');
    }
  }


}
