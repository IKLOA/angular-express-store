import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from '../shared/classes/material.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})


export class MainPageComponent implements AfterViewInit {

  @ViewChild('slider', {static: false}) sliderRef: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    MaterialService.initializeSlider(this.sliderRef);
  }

}
