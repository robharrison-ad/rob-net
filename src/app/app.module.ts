import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';
import { GlobalDataService } from './shared/global-data.service';
import { GlobalFunctionsService } from './shared/global-functions.service'
import { ResumeComponent } from './resume/resume.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AniCircleComponent } from './ani-circle/ani-circle.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { IntroComponent } from './intro/intro.component';
import { PipesDemoComponent } from './code-demos/pipes-demo/pipes-demo.component';
import { ROrderByPipe } from './shared/rOrderBy-pipe';
import { RMbGbPipe } from './shared/rmbgb-pipe';
import { CodeDemosComponent } from './code-demos/code-demos.component';
import { CcRewardsComponent } from './code-demos/cc-rewards/cc-rewards.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    Error404Component,
    ResumeComponent,
    AniCircleComponent,
    IntroComponent,
    PipesDemoComponent,
    RMbGbPipe,
    ROrderByPipe,
    CodeDemosComponent,
    CcRewardsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    GlobalDataService,
    GlobalFunctionsService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
