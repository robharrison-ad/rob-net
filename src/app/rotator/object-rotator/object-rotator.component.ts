import {
  Component, OnInit, Renderer2, ElementRef, Input, OnChanges, SimpleChange, HostListener, AfterViewInit,
  ComponentFactory, NgModule, Type, Compiler, ViewChild, ViewContainerRef, ComponentRef
} from '@angular/core';
import { GlobalFunctionsService } from '../../shared/global-functions.service';
import { RotatorTemplateComponent } from '../rotator-template/rotator-template.component';

@Component({
  selector: 'object-rotator',
  templateUrl: './object-rotator.component.html',
  styleUrls: ['./object-rotator.component.scss']
})
export class ObjectRotatorComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  @Input('r-config') rConfig: RConfig = new RConfig();
  @Input('r-template') templateParam: string;

  native: Element;
  saveClasses: Array<kvp> = new Array<kvp>();
  moveTimer: any;
  escapeHatch: boolean = false;
  runTimeElapsed: boolean = false;
  restTime: boolean = false;
  restTimer: any;
  unrestTimer: any;
  endTimer: any;

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.onResize();
  }
  @HostListener('orientationchange', ['$event'])
  onorientationchange(event) {
    this.onResize();
  }

  // objectTemplate: string = '<div style="color: blue, font-size: 20px"> ** This is the template ** </div>';


  private rend: Renderer2;
  private el: ElementRef;

  constructor(
    private r: Renderer2,
    private e: ElementRef,
    private globalFunmctions: GlobalFunctionsService,
    private compiler: Compiler
  ) {
    this.rend = r;
    this.el = e;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initialize();
  }

  ngOnChanges(e: any) {

  }

  onResize() {

  }

  initialize() {
    if (!(this.el && this.el.nativeElement)) {
      return;
    }
    const pClass = this.rConfig.positionClassPrefix;
    const oClass = this.rConfig.objectClassPrefix;
    const n = this.el.nativeElement;
    for (let i = 0; i < this.rConfig.numberOfObjects; i++) {
      const count = i + 1;

      // create and configure the template element
      //    The template element is the "container" that gets moved around
      //    It's class is the "positioning" class.
      let template: RotatorTemplateComponent = this.rend.createElement('app-object-rotator-template');
      // add a standard class to all container objects for common styling
      this.rend.addClass(template, 'rotator-container');
      this.rend.setAttribute(template, 'id', 'r-' + (count));
      this.rend.setAttribute(template, 'data-num', count.toString());
      this.rend.addClass(template, pClass + '-' + count.toString());

      // create and configure the div that will contain all the styling
      //    This div is the "object" inside the "template" (a.k.a., "container")
      const div = this.rend.createElement('div');
      this.rend.addClass(div, oClass + '-' + count.toString());
      // standard class for all object elementes
      this.rend.addClass(div, 'rotator-object');

      // add the div to the template and the template to the main container
      this.rend.appendChild(template, div);
      this.rend.appendChild(n, template);
    }
    this.setMoveTimer();
    this.setRestTimer();
    this.setEndTimer();
  }

  rotateClasses(classIn: string = "") {
    for (let i = 0; i < this.rConfig.numberOfObjects; i++) {
      let classNum: number;
      const objectNum = i + 1;
      const el = document.getElementById('r-' + objectNum.toString());
      const currentClassAttribute = el.getAttribute('data-num');
      if (currentClassAttribute) {
        classNum = Number.parseInt(currentClassAttribute);
      }
      const pClass = this.rConfig.positionClassPrefix;
      let nextClass: number;
      if (!classIn) {
        nextClass = (classNum + 1 <= this.rConfig.numberOfObjects) ? classNum + 1 : 1;
        el.setAttribute('data-num', nextClass.toString());
        this.globalFunmctions.swapClass('r-' + objectNum, pClass + '-' + nextClass.toString(), pClass + '-' + classNum);
        // console.log('r-' + objectNum, pClass + '-' + nextClass.toString(), pClass + '-' + classNum);
      }
      else {
        const o = {
          k: el.attributes['id'].value,
          v: pClass + '-' + classNum
        };
        this.saveClasses.push(o);
        this.globalFunmctions.swapClass('r-' + objectNum, classIn, pClass + '-' + classNum);
        // console.log(objectNum, classIn, pClass + '-' + classNum);
      }
    }
  }

  setRestClass(remove: boolean = false) {
    for (let i = 0; i < this.rConfig.numberOfObjects; i++) {
      const idNum = i + 1;
      const el = document.getElementById('r-' + idNum.toString());
      if (el) {
        if (remove) {
          el.classList.remove(this.rConfig.restPositionClass);
        }
        else {
          el.classList.add(this.rConfig.restPositionClass);
        }
      }
    }
  }

  setEndClass(remove: boolean = false) {
    for (let i = 0; i < this.rConfig.numberOfObjects; i++) {
      const idNum = i + 1;
      const el = document.getElementById('r-' + idNum.toString());
      if (el) {
        if (remove) {
          el.classList.remove(this.rConfig.endPositionClass);
        }
        else {
          el.classList.add(this.rConfig.endPositionClass);
        }
      }
    }
  }

  setRestTimer() {
    if (!this.rConfig.restInterval) { return; }
    if (this.rConfig.restInterval < 5) {
      console.warn('Invalid rest interval (' + this.rConfig.restInterval + ').  Must be 5 or greater.  Rest interval ignored.');
      return;
    }
    const restInterval = this.rConfig.restInterval * 1000;
    this.restTimer = setTimeout(() => {
      this.restAction();
    }, restInterval);
  }

  restAction() {
    clearTimeout(this.restTimer);
    clearTimeout(this.moveTimer);
    this.restTime = true;
    this.setRestClass();
    this.setUnrestTimer();
  }

  setUnrestTimer() {
    // console.log('unrest');
    // if we have a restInterval number, meaning we want to rest, it seems like 
    // not having a duration number (thereby causing it to stop indefinitely)
    // has to be a mistake, so we'll set a default.
    if (!this.rConfig.restDuration) {
      this.rConfig.restDuration = 30;
    }
    const restDuration = this.rConfig.restDuration * 1000;

    // need to apply rest classes here.  Will probably be anouther function 
    // similar to rotateClasses function.
    this.unrestTimer = setTimeout(() => {
      clearTimeout(this.unrestTimer);
      this.restTime = false;
      this.resumeAfterRest();
    }, restDuration);
  }

  setEndTimer() {
    if (!this.rConfig.runTime) {
      return;
    }
    const runtime = this.rConfig.runTime * 1000;
    this.endTimer = setTimeout(() => {
      console.log('end');
      let id = Number.parseInt(setTimeout(() => { }, 0).toString());
      while (id-- > 0) {
        if (id != this.endTimer) {
          clearTimeout(id);
        }
      }
      clearTimeout(this.moveTimer);
      clearTimeout(this.restTimer);
      clearTimeout(this.endTimer);
      this.setEndClass();
    }, runtime);
  }

  kickMoveCycle() {
    this.rotateClasses();
    this.setMoveTimer();
  }

  resumeAfterRest() {
    this.setRestClass(true);
    this.setMoveTimer();
    this.setRestTimer();
  }

  setMoveTimer(run: boolean = true) {
    // console.log('move', this.restTime);
    const pause = this.rConfig.positionPauseLength * 1000;
    if (this.restTime) {
      return;
    }
    else {
      this.moveTimer = setTimeout(() => {
        clearTimeout(this.moveTimer);
        this.rotateClasses();
        if (this.restTime) {
          // need to apply rest classes here.  Will probably be anouther function 
          // similar to rotateClasses function.
          this.setUnrestTimer();
        }
        else {
          this.setMoveTimer();
        }
      }, pause)
    }
  }

  // debugTimer: any;
  // setDebugTimer() {
  //   this.debugTimer = setTimeout(() => {
  //     console.log('moveTimer', this.moveTimer, 'restTime', this.restTime, 'runTimeElapsed', this.runTimeElapsed, 'endTimer', this.endTimer, 'escapeHatch', this.escapeHatch);
  //     clearTimeout(this.debugTimer);
  //     this.setDebugTimer();
  //   }, 1000);
  // }

}

export class kvp {
  k: string;
  v: string;
}


export class RConfig {
  numberOfObjects: number = 11;
  positionClassPrefix: string = "r-container";
  objectClassPrefix: string = "r-object"
  positionChangeDuration: number = 2500; //ms
  positionPauseLength: number = 4; // seconds
  positionClassOrder: [1, 2, 7, 6, 3, 5, 6];
  runTime?: number = 900; // seconds
  endPositionClass?: string = "r-end";
  restInterval?: 0; // number = 90; // seconds - minimum 5
  restDuration?: number = 30; // seconds
  restPositionClass?: string = "r-rest";
  // classPaths: {
  //   step: 0, 
  //   moves: [
  //     {
  //       from: 0, to: 
  //     }
  //     }
  //   ]
  // }
  
  constructor(private rConfig?: RConfig) {
    if (rConfig) {
      const keys = Object.keys(rConfig);
      for (let i = 0; i < keys.length; i++) {
        const inKey = keys[i];
        if (this.hasOwnProperty(inKey)) {
          this[inKey] = rConfig[inKey]; 
        }
      }

    }
  }
}
