import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import { DOCUMENT, Location } from "@angular/common";
import { GlobalDataService } from './shared/global-data.service';
import { GlobalFunctionsService } from './shared/global-functions.service'
import { Router, NavigationStart } from "@angular/router";
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rob-net';
  scrollTop: number = 0;

  aosConfig = {
    offset: 0,
    delay: 500,
    duration: 800,
    easing: 'ease-out',
    anchorPlacement: 'top'
  };
  backgroundImagePath: string;

  constructor(
    @Inject(DOCUMENT) document,
    public globalData: GlobalDataService,
    private globalFunctions: GlobalFunctionsService,
    private router: Router,
    private location: Location
  ) {
    router.events
      .pipe(
        // The "events" stream contains all the navigation events. For this demo,
        // though, we only care about the NavigationStart event as it contains
        // information about what initiated the navigation sequence.
        filter(
          (event: NavigationEvent) => {

            return (event instanceof NavigationStart);

          }
        )
      ).subscribe(
        (event: NavigationStart) => {

          this.globalFunctions.setIntroClasses();
        }
      )
  }

  ngOnInit() {
    AOS.init(this.aosConfig);

    if (window.scrollY > 10) {
      this.globalFunctions.scrollToTop(2500, 0, 0);
    }
    this.globalFunctions.setIntroClasses(200);
    // window.addEventListener('scroll', (e) => {
    //   this.globalFunctions.onScroll(e);
    //   this.scrollTop = window.scrollY;
    // });
  }

  // onScroll(e: Event) {
  //   this.scrollTop = window.scrollY;
  // }

  // backClick() {
  //   this.globalFunctions.scrollToTop(0, 0, 0);
  //   setTimeout(() => {
  //     let e = new Event('scroll');
  //     window.dispatchEvent(e);
  //   }, 750);
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     console.log('fire!');
  //     window.dispatchEvent(new Event('scroll'));
  //   }, 1500);
  // }


}

