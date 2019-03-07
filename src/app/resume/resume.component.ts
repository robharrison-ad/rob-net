import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GlobalFunctionsService } from '../shared/global-functions.service';
import { GlobalDataService } from '../shared/global-data.service';
import { RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, AfterViewInit {
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  pdfViewer: Element;
  showAll: true;
  zoomLevel: number = 1;
  zbtOffset = 320;
  savedZoom: number = 1;
  buttonsMouseOver: boolean = false;
  to: any;

  constructor(private global: GlobalDataService,
    private globalFunctions: GlobalFunctionsService
  ) { }

  ngOnInit() {
    window.addEventListener('resize', e => {
      this.moveButtons();
    });
    window.addEventListener('scroll', e => {
      this.moveButtons();
    });
    this.globalFunctions.swapClass('resumePage', 'page-in', 'page-out', 500);
    document.getElementById('vertZoomBtnHolder').addEventListener('mouseenter', () => {
      this.buttonsMouseOver = true;
    });
    document.getElementById('vertZoomBtnHolder').addEventListener('mouseleave', () => {
      this.buttonsMouseOver = false;
    });

    document.addEventListener
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.moveButtons();
    }, 1000);
  }

  ngOnDestroy() {
    this.globalFunctions.swapClass('resumePage', 'page-out', 'page-in');
  }

  moveButtons() {
    const btns = document.getElementById('zoomBtnHolder');
    const vBtns = document.getElementById('vertZoomBtnHolder');
    const anchor = document.getElementById('pdfAnchor');
    const wrapper = document.getElementById('contentWrapper');
    const canvas = document.querySelector('.canvasWrapper');
    const ct = wrapper ? wrapper.getBoundingClientRect().top : 0;
    const am = anchor ? anchor.getBoundingClientRect().right - ((anchor.getBoundingClientRect().right - anchor.getBoundingClientRect().left) / 2) : 0;
    const at = anchor ? anchor.getBoundingClientRect().top : 0;
    const bw = btns ? btns.getBoundingClientRect().width : 0;
    const y = window.scrollY;
    const zbt = this.zbtOffset - at;
    const zbl = am - (bw * .5);
    const vbl = canvas ? canvas.getBoundingClientRect().width + canvas.getBoundingClientRect().left - 50 : 0;
    const vbt = y + 100;
    const wh = window.innerHeight;
    const ww = window.innerWidth;
    if (!(btns && canvas && wrapper)) { return; }
    if (y < 250 && btns) {
      btns.style.top = zbt + 'px';
      btns.style.left = zbl + 'px';
      this.globalFunctions.swapClass('zoomBtnHolder', '', 'vertical');
      this.globalFunctions.swapClass('vertZoomBtnHolder', 'horizontal', '');
    }
    else {
      this.globalFunctions.swapClass('vertZoomBtnHolder', '', 'horizontal');
      this.globalFunctions.swapClass('zoomBtnHolder', 'vertical', '');
      if (this.buttonsMouseOver) {
        this.to = setTimeout(() => {
          this.to = null;
          this.moveButtons();
        }, 1500);
      }
      else {
        vBtns.style.left = vbl + 'px';
        vBtns.style.top = vbt + 'px';
      }
    }
  }

  zoomUp(up: boolean) {
    this.zoomLevel = this.zoomLevel + .1 * (up ? 1 : -1);
    setTimeout(() => {
      this.moveButtons();
    }, 200);
  }

  afterLoadComplete(pdfData: any) {
    // 
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;

  }

  nextPage() {
    this.pdfViewer = document.getElementById('pdfViewerContainer');
    this.page++;
    this.pdfViewer.scrollTop = 0;
  }

  prevPage() {
    this.pdfViewer = document.getElementById('pdfViewerContainer');
    this.page--;
    this.pdfViewer.scrollTop = 0;
  }

  pageRenderedI(e) {
    
  }
}