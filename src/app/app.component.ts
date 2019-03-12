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
export class AppComponent implements OnInit, AfterViewInit {
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
    this.globalFunctions.setIntroClasses(200);
  }

  ngAfterViewInit() {
    this.globalFunctions.scrollToTop(500, 0, 0);
  }



}

