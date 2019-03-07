import { Component, OnInit, Inject } from '@angular/core';
// import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from "@angular/common";
import { GlobalDataService } from '../global-data.service';
import { GlobalFunctionsService } from '../global-functions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuClick = this.globalFunctions.menuClick;
  globalData: any;

  constructor(
    @Inject(DOCUMENT) document,
    globalData: GlobalDataService,
    private globalFunctions: GlobalFunctionsService
  ) {
    this.globalData = globalData;
  }

  ngOnInit() {
  
  }


  // adjustMenu() {
  //   const nContainer = document.querySelector('.navbar-container');
  //   if (nContainer) {
  //     if (this.scroll.direction) {
  //       nContainer.classList.remove('going-down');
  //     }
  //     else {
  //       nContainer.classList.add('going-down');
  //     }

  //   }
  // }


}
