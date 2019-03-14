import { Component, OnInit, Input, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-rotator-template',
  template: `{{template}}`,
  styleUrls: ['./rotator-template.component.scss']
})
export class RotatorTemplateComponent implements OnInit {
  @Input('r-config')config: string;
  @Input('r-template')template: string;
  @ContentChild('firstItemTemplate') firstItemTemplate: TemplateRef<ElementRef>;

  public myTemplate: string = "<div></div>"
  constructor() { }

  ngOnInit() {
    var x = 1;
  }

}
