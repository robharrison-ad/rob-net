import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalDataService } from './../shared/global-data.service';
import { GlobalFunctionsService } from './../shared/global-functions.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(private global: GlobalDataService, 
    private globalFunctions: GlobalFunctionsService
    ) { }

  ngOnInit() {
    this.globalFunctions.scrollToTop(500, 0, 0);
    this.globalFunctions.swapClass('aboutPage', 'page-in',  'page-out', 500);
  }

  ngOnDestroy() {
    this.globalFunctions.swapClass('aboutPage', 'page-out', 'page-in');
  }


}
