import { Component, OnInit, Inject, OnChanges, OnDestroy } from '@angular/core';
import { GlobalDataService } from '../shared/global-data.service';
import { GlobalFunctionsService } from '../shared/global-functions.service';
import { DOCUMENT, NgForOf } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  templateItems: Array<any>;
  backgroundImagePath: any;
  pipes: any;

  // move to global service
  constructor(
    @Inject(DOCUMENT) document,
    private globalData: GlobalDataService,
    private globalFunctions: GlobalFunctionsService,
  ) {
  }

  ngOnInit() {
    this.globalData.setProperty('headerHidden', false);
    this.globalFunctions.swapClass('homePage', 'page-in', 'page-out', 500);
    this.initItems();
    window.addEventListener('scroll', (event) => {
      this.globalFunctions.onScroll(event);
    });
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.globalFunctions.onScroll);
    window.addEventListener('scroll', this.globalFunctions.onScroll);
    this.globalFunctions.swapAllByClass('park', 'mute', '', 45000);
  }

  ngOnDestroy() {
    this.globalFunctions.swapClass('homePage', 'page-out', 'page-in');
  }
  


  initialResize() {
  }

  fadeCircles(scrollTop: number) {
    let homePage = document.getElementById('homePage');
    if (homePage) {
      homePage = homePage[0] ? homePage[0] : homePage;
    }
    const nextPage = homePage.getBoundingClientRect().top - window.innerHeight;
    
    const fadeOut = nextPage <= window.innerHeight;
    let circlesContainer = document.querySelector('.circles-container-anchor');
    if (circlesContainer) {
      circlesContainer = circlesContainer[0] ? circlesContainer[0] : circlesContainer;
      if (!fadeOut) {
        circlesContainer.classList.remove('out');
      }
      else {
        circlesContainer.classList.add('out');
      }
    }
  }
  onResize() {
    
  }

  onScrollAndResize() {

  }


  initItems() {

  }



}
