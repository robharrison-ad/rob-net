import { Component, OnInit, Inject } from '@angular/core';
import * as AOS from 'aos';
import { DOCUMENT } from "@angular/common";
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
    private globalData: GlobalDataService,
    private globalFunctions: GlobalFunctionsService,
    private router: Router
  ) {
    router.events
            .pipe(
                // The "events" stream contains all the navigation events. For this demo,
                // though, we only care about the NavigationStart event as it contains
                // information about what initiated the navigation sequence.
                filter(
                    ( event: NavigationEvent ) => {
 
                        return( event instanceof NavigationStart );
 
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
  }






}

