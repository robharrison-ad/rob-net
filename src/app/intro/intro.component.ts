import { Component, OnInit } from '@angular/core';
import { GlobalFunctionsService } from '../shared/global-functions.service';
import { GlobalDataService } from '../shared/global-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  currentPage: string = 'intro';

  constructor(
    private dataService: GlobalDataService,
    private globalFunctions: GlobalFunctionsService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.globalFunctions.scrollToTop(0, 0, 0);
    this.globalFunctions.setIntroClasses();
  }

  clickEnter(page) {
    this.globalFunctions.transitionIntroOut('/home');
  }


}
