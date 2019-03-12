import { Injectable, Inject } from "@angular/core";

import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import "prismjs";
import "prismjs/components/prism-pug.js";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-typescript";

import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/show-language/prism-show-language";

declare const Prism: any;

@Injectable({
  providedIn: 'root'
})
export class CodeHighlightService {

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) { }

  public highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
