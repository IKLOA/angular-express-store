import {ElementRef} from '@angular/core';

declare var M;

export interface MaterialIstance {
  open?(): void;

  close?(): void;

  destroy?(): void;
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message, classes: 'rounded brown'});
  }

  static initializeSlider(ref: ElementRef) {
    M.Slider.init(ref.nativeElement, {
      height: 700,
      fullWidth: true,
      indicators: false
    });
  }

  static updateTextFields() {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterialIstance {
    return M.Modal.init(ref.nativeElement);
  }


}
