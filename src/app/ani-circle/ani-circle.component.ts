import { Component, OnInit, Renderer2, ElementRef, Input, OnChanges, SimpleChange, HostListener, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ani-circle',
  templateUrl: './ani-circle.component.html',
  styleUrls: ['./ani-circle.component.scss']
})
export class AniCircleComponent implements OnInit, OnChanges {
  native: Element;
  @Input('start-x') startX: number = -99999;
  @Input('start-y') startY: number = -99999;
  @Input('home-x') homeX: number;
  @Input('home-y') homeY: number;
  @Input('grid-col') col: number;
  @Input('grid-row') row: number;
  @Input('grid-center') gc: boolean = true;
  @Input('delay') delay: number = 500;
  @Input('duration') duration: number = 1500;
  @Input('front-image') frontImage: any;
  @Input('main-text') mainText: string;
  @Input('back-image') backImage: any;
  @Input('back-text') subText: string;
  @Input('idx') idx: number = -1;
  @Input('park-class') parkClass: string;
  @Input('park-time') parkTime: number;
  @Input('mouse-event') mouseEvent: Function;


  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.onResize();
  }
  @HostListener('orientationchange', ['$event'])
  onorientationchange(event) {
    this.onResize();
  }

  private rend: Renderer2;
  private el: ElementRef;

  ngStyle: any;
  ngStyles: Array<string> = new Array<string>();
  inYoFaceBezier: string = 'cubic-bezier(0,1.33,.55,.99)';
  homeBezier: string = 'cubic-bezier(1,.01,1,-0.17)';
  resizeBezier: string = 'linear';
  areaSize: number;
  circleSize: number;
  maxImageSize: number;
  bufferSize: number;
  vwCalc: number;
  vhCalc: number;
  ttid: string;
  ttidTag: string;

  constructor(
    private r: Renderer2,
    private e: ElementRef
  ) {
    this.rend = r;
    this.el = e;
  }

  // alternate way of getting host clicks
  // ngAfterViewInit() {
  //   this.rend.listen(this.el.nativeElement, 'click', () => {
  //     
  //   })
  // }

  ngOnInit() {
    this.initializeScreenSize();
    this.initialize();
    this.iniitializeLater();
  }

  ngOnChanges(e: any) {

  }

  hostClicked(e: any) {
    
  }

  onResize() {
    this.initializeScreenSize();
    this.setImages();
    this.resetHome();
  }

  initialize() {
    if (!(this.el && this.el.nativeElement)) {
      return;
    }
    const n = this.el.nativeElement;
    this.rend.setStyle(n, 'top', this.startY + 'px');
    this.rend.setStyle(n, 'left', this.startX + 'px');
    this.rend.setStyle(n, 'position', 'absolute');
    this.rend.setStyle(n, 'opacity', '0.0');

    this.rend.setStyle(n, 'webkitTransition', 'top left bottom right width height opacity transform');
    this.rend.setStyle(n, 'webkitTransitionDuration', this.duration + 'ms');
    this.rend.setStyle(n, 'transition', 'top left bottom right width height opacity transform');
    this.rend.setStyle(n, 'transitionDuration', this.duration + 'ms');
    // this.addEventListener(n);

    if (this.idx % 2 === 0) {
      const flip = n.children[0];
      if (flip) {
        this.rend.addClass(flip, 'flip-vertical');
      }
    }

    this.setImages();
    this.ttid = 'tt' + this.idx;
    this.ttidTag = '#tt' + this.idx;

    this.removeTooltip();

    setTimeout(() => {
      this.inYourFace();
    }, this.delay)

  }

  iniitializeLater() {
    setTimeout(() => {

      this.setHome();

    }, 150);
  }

  initializeScreenSize() {
    this.vhCalc = screen.height / 100;
    this.vwCalc = screen.width / 100;
    const w = window.innerWidth;
    this.circleSize = w * 0.18;
    this.bufferSize = this.circleSize * 0.1;
    this.areaSize = this.circleSize + this.bufferSize;
    this.maxImageSize = this.circleSize * 0.5;

  }

  // remove bootstrap tooltip if there's nothing to show in it.  (The bootstrap 
  //   tooltip still shows an empty bubble if there's no text -- irritating!)
  removeTooltip() {
    if (!this.subText) {
      const child = this.el.nativeElement.children[0];
      if (child) {
        const gChildren = child.children;
        for (let i = 0; i < gChildren.length; i++) {
          if (gChildren[i].classList.contains('tooltip')) {
            this.rend.removeChild(child, gChildren[i]);
            if (gChildren[i - 1].getAttribute('ng-reflect-tooltip')) {
              this.rend.setAttribute(gChildren[i - 1], 'ng-reflect-tooltip', '');
            }
          }
        }
      }
    }
  }

  setHome() {
    if (this.col > -11 && this.col < 11) {
      let center = window.innerWidth / 2;
      const front = this.el.nativeElement.children[0].children[0];
      if (this.gc) { center = center - ((front.offsetWidth / 2) + (this.bufferSize / 2)); }
      this.homeX = (center + (this.col * this.areaSize));
      this.homeY = this.areaSize * this.row;
    }

  }

  resetHome() {
    const holdBezier = this.el.nativeElement.style.transitionTimingFunction ? this.el.nativeElement.style.transitionTimingFunction : this.el.nativeElement.style.webkitTransformTimingFunction;
    const holdDuration = this.el.nativeElement.style.transitionDuration ? this.el.nativeElement.style.transitionDuration : this.el.nativeElement.style.webkitTransformDuration;
    const holdDelay = this.el.nativeElement.style.transitionDelay ? this.el.nativeElement.style.transitionDelay : this.el.nativeElement.style.webkitTransitionDelay;
    this.rend.setStyle(this.el.nativeElement, 'transitionTimingFunction', 'ease-in');
    this.rend.setStyle(this.el.nativeElement, 'transitionDuration', '500ms');
    this.rend.setStyle(this.el.nativeElement, 'transitionDelay', 'none');
    this.rend.setStyle(this.el.nativeElement, 'webkitTransformTimingFunction', 'ease-in');
    this.rend.setStyle(this.el.nativeElement, 'webkitTransformDuration', '500ms');
    this.rend.setStyle(this.el.nativeElement, 'webkitTransitionDelay', 'none');
    this.setHome();
    this.goHome();
    this.rend.setStyle(this.el.nativeElement, 'transitionTimingFunction', holdBezier);
    this.rend.setStyle(this.el.nativeElement, 'transitionDuration', holdDuration);
    this.rend.setStyle(this.el.nativeElement, 'transitionDelay', holdDelay);
    this.rend.setStyle(this.el.nativeElement, 'webkitTransformTimingFunction', holdBezier);
    this.rend.setStyle(this.el.nativeElement, 'webkitTransformDuration', holdDuration);
    this.rend.setStyle(this.el.nativeElement, 'webkitTransitionDelay', holdDelay);
  }

  centerText() {
    const title = document.getElementById('circleTitle' + this.idx);
    const pe = this.rend.parentNode(title);
    const w = pe.getBoundingClientRect().width;
    const tw = title.clientWidth;
    let tnw = (tw > (w * .66)) ? (w * .66) : tw;
    tnw = (w - tnw) / 2;
    this.rend.setStyle(title, 'left', tnw + 'px');
  }

  setImages() {
    if (this.frontImage) {
      if (!this.frontImage.originalX) {
        this.frontImage.originalX = this.frontImage.sizeX;
      }
      if (!this.frontImage.originalY) {
        this.frontImage.originalY = this.frontImage.sizeY;
      }
      this.frontImage.sizeX = (this.frontImage.originalX && this.frontImage.originalX <= 20 ? (this.frontImage.originalX * this.maxImageSize) : this.maxImageSize);
      this.frontImage.sizeY = (this.frontImage.originalY && this.frontImage.originalY <= 20 ? (this.frontImage.originalY * this.maxImageSize) : this.maxImageSize);
      const f = this.el.nativeElement.children[0].children[0];  // gets "front" div

      const imgSize = this.frontImage.sizeX + 'px ' + this.frontImage.sizeY + 'px';
      if (f) {
        this.rend.setStyle(f, 'background-image', 'url(' + this.frontImage.path + ')');
        this.rend.setStyle(f, 'background-size', imgSize);
        this.rend.setStyle(f, 'background-position', 'center');
        this.rend.setStyle(f, 'background-repeat', 'no-repeat');
      }
    }
    if (this.backImage) {
      this.setBackImage();
    }
  }

  setBackImage() {
    const b = this.el.nativeElement.children[0].children[1];  // gets "back" div
    if (b) {
      const imgSize = this.maxImageSize + 'px auto'
      this.rend.setStyle(b, 'background-image', 'url(' + this.backImage + ')');
      this.rend.setStyle(b, 'background-size', imgSize);
      this.rend.setStyle(b, 'background-repeat', 'no-repeat');
      this.rend.setStyle(b, 'background-position', 'center center');
    }
  }

  inYourFace() {
    if (!(this.el && this.el.nativeElement)) {
      return;
    }
    const n = this.el.nativeElement;
    const flip = n.children[0];
    const f = flip.children[0];
    const frame = this.rend.parentNode(n);
    const t = ((window.innerHeight / 2) - frame.offsetTop) + window.scrollY;
    this.rend.setStyle(n, 'transitionTimingFunction', this.inYoFaceBezier);
    this.rend.setStyle(n, 'left', ((window.innerWidth / 2) - (f.offsetWidth / 2)) + 'px');
    this.rend.setStyle(n, 'top', t + 'px');
    this.rend.setStyle(n, 'opacity', '');
    const color = flip.style.backgroundColor;
    // this.rend.setStyle(f, 'background-color', color.replace(/rgba\((\d{1,3}\,\s{0,1}\d{1,3}\,\d{1,3}\,\s{0,1})\d{1,3}\.{0,1}\d{1,3}\)/, 'rgba($11)'));

    // The first timeout block increases the object's size by 50% as soon as it's 
    // done moving (i.e., when the transition above is done).
    // The second timeout block sends the object to its "home" location.
    const _this = this;
    const popTransform = 300;
    setTimeout(() => {
      _this.rend.setStyle(f, 'webkitTransformDuration', popTransform + 'px');
      _this.rend.setStyle(f, 'webkitTransform', 'scale(1.5, 1.5)');
      _this.rend.setStyle(f, 'transformDuration', popTransform + 'px');
      _this.rend.setStyle(f, 'transform', 'scale(1.5, 1.5)');
      setTimeout(() => {
        _this.goHome();
      }, popTransform);
    }, (_this.duration));
  }

  goHome() {
    if (!(this.el && this.el.nativeElement)) {
      return;
    }
    const n = this.el.nativeElement;
    const f = n.children[0].children[0];
    if (this.homeX || this.homeY) {
      this.rend.setStyle(n, 'left', this.homeX + 'px');
      this.rend.setStyle(n, 'top', this.homeY + 'px');
    }
    this.rend.setStyle(n, 'transitionTimingFunction', this.homeBezier);
    this.rend.setStyle(f, 'transform', 'scale(1, 1)');
    this.rend.setStyle(n, 'opacity', '');
    this.park(n);
  }

  park(n: Element) {
    if (this.parkClass && this.parkTime > 0) {
      setTimeout((args) => {
        const n = args[0];
        const classes = this.parkClass.split(' ');
        for (let i = 0; i < classes.length; i++) {
          this.rend.addClass(n, classes[i]);
        }
      }, this.parkTime, [n]);
    }
    else if (this.parkClass) {
      this.rend.addClass(n, this.parkClass);
    }
  }

  addBuildNgStyle(newStyle: any) {
    this.ngStyles.push(newStyle);
    let styleString = "";
    this.ngStyles.forEach(s => {
      styleString += s + ',';
    });
    styleString = "{ " + styleString + " }";
    return styleString;
  }

  toggleFlip() {
    
    const n = this.el.nativeElement;
    if (n.classList.contains('flipped')) {
      this.rend.removeClass(n, 'flipped');
    }
    else {
      this.rend.addClass(n, 'flipped');
    }
  }
}
