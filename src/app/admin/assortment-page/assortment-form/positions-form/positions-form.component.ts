import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from '../../../../shared/services/positions.service';
import {Position} from '../../../../shared/interfaces';
import {MaterialIstance, MaterialService} from '../../../../shared/classes/material.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetUrlService} from "../../../../shared/classes/getUrl.service";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.sass']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  @ViewChild('input', {static: false}) inputRef: ElementRef;
  form: FormGroup;
  positions: Position[] = [];
  loading = false;
  positionId = null;
  imagePreview = null;
  image: File;
  modal: MaterialIstance;

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      costWithDiscount: new FormControl(null)
    });

    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
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

  onAddPosition() {
    this.positionId = null;
    this.form.reset();
    this.imagePreview = null;
    this.modal.open();
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      description: position.description,
      cost: position.cost,
      costWithDiscount: position.costWithDiscount
    });
    this.imagePreview = GetUrlService.getUrl(position.imageSrc);
    this.modal.open();
    MaterialService.updateTextFields();
  }

  onCancel() {
    this.modal.close();
    this.imagePreview = null;
    this.form.reset();
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = confirm(`Удалить позицию ${position.name}`);
    if (decision) {
      this.positionsService.remove(position).subscribe(
        (response) => {
          const idx = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(idx, 1);
          MaterialService.toast(response.message);
        },
        error => MaterialService.toast(error.error.message)
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {

      if (this.positionId) {
        this.positionsService.update(this.positionId, this.categoryId, this.form.value.name, this.form.value.description, this.form.value.cost + '', this.image, this.form.value.costWithDiscount)
          .subscribe(
            position => {
              const idx = this.positions.findIndex(p => p._id === position._id);
              this.positions[idx] = position;
              MaterialService.toast('Позиция изменена');

            },
            error => MaterialService.toast(error.error.message),
            () => {
              this.modal.close();
              this.form.reset();
              this.imagePreview = null;
            }
          );
      } else {
        this.positionsService.create(this.form.value.name, this.form.value.description, this.form.value.cost + '', this.image, this.categoryId, this.form.value.costWithDiscount)
          .subscribe(
            position => {
              MaterialService.toast('Позиция создана');
              this.positions.push(position);
            },
            error => MaterialService.toast(error.error.message),
            () => {
              this.modal.close();
              this.form.reset();
              this.imagePreview = null;
            }
          );
      }


    } else {
      MaterialService.toast('Заполните поля формы');
    }
  }
}
