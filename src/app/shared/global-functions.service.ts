import { Injectable } from '@angular/core';
import { GlobalDataService } from './global-data.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor(
    private globalData: GlobalDataService
  ) { }

  // transitionIntroOut(destination: string) {
  //   const intro = document.getElementById('intro');
  //   const streak = document.getElementById('blueStreak');
  //   if (intro) {
  //     this.spinOut(intro);
  //     if (streak) {
  //       this.shrinkOut(streak, { x: .5 });
  //     }
  //     setTimeout(() => {
  //       this.swapClass('main_menu', 'header-in', 'header-out');
  //       // this.swapClassByQuery('body', 'rh-background-2', 'rh-background-1');
  //       this.navigateTo(destination);
  //     }, 2000);
  //   }
  // }

  transitionIntroOut(destination: string) {
    const intro = document.getElementById('intro');
    // greetings el
    if (intro) {
      this.fadeOut(intro);
      this.swapClassByQuery('body', 'dim', '');
      this.swapClassByQuery('.wopr-container', 'show', '');
      const pause = window.innerWidth > 767 ? 4000 : 0;
      setTimeout(() => {
        this.swapClass('main_menu', 'header-in', 'header-out');
        this.navigateTo(destination);
      }, pause);
    }
  }

  playAGame() {

  }

  navigateTo(destination: string) {
    this.globalData.router.navigate([destination]);
  }

  onScroll(event) {
    if (!(this.globalData && this.globalData.scrollData && event.srcElement)) {
      return
    }
    const previousTop = this.globalData.scrollData.currentTop
    this.globalData.scrollData.currentTop = event.srcElement.scrollingElement.scrollTop;
    if (this.globalData.scrollData.currentTop <= 100) {
      this.globalData.scrollData.beenToTop = true;
    }
    this.globalData.scrollData.direction = (this.globalData.scrollData.currentTop < previousTop);
    
  }

  setIntroClasses(wait: number = 0) {
    const _this = this;
    let done = false;
    let bgImagePath: string = "";
    setTimeout(() => {
      const body = this.getElementByQuery('body');
      const bodyClasses = body.classList;
      if (bodyClasses && bodyClasses.length) {
        for (let i = 0; i < bodyClasses.length; i++) {
          bodyClasses.remove(bodyClasses[i]);
        }
      }
      _this.stripClassByQuery('#mainMenuBg', 'bg-has-back-color');

      const keys = Object.keys(_this.globalData.pageBgClasses);
      for (let i = 0; (i < keys.length && !done); i++) {
        const route = _this.globalData.router.url.replace(/\//g, '').split('#')[0];
        if (route == keys[i]) {
          body.classList.add(_this.globalData.pageBgClasses[keys[i]]);
          _this.globalData.setProperty('headerHidden', (route === 'intro'));
          done = true;
        }
      }

      if (!done) {
        _this.globalData.setProperty('headerHidden', true);
        body.classList.add('bg-has-back-color');
      }
      return bgImagePath;
    }, wait);

  }

  clearIntroClasses(wait: number = 50) {
    setTimeout(() => {
      const el = this.getElementByQuery('body');
      const keys = Object.keys(this.globalData.pageBgClasses);
      for (let i = 0; i < keys.length; i++) {
        el.classList.remove(this.globalData.pageBgClasses[keys[i]]);
      }
    }, wait);
  }


  addClass(name: string, className: string) {
    const el = document.getElementById(name);
    if (el) {
      el.classList.add(className);
    }
  }

  stripClassByQuery(query: string, className: string) {
    const el = this.getElementByQuery(query);
    if (el) {
      el.classList.remove(className);
    }
  }

  swapClass(name: string, classNameIn: string, classNameOut: string, wait: number = 0) {
    setTimeout(() => {
      const el = document.getElementById(name);
      if (el) {
        if (classNameIn) {
          el.classList.add(classNameIn);
        }
        if (classNameOut) {
          el.classList.remove(classNameOut);
        }
      }
    }, wait);
  }

  swapClassByQuery(name: string, classNameIn: string, classNameOut: string) {
    let el = document.querySelector(name);
    if (el && el[0]) {
      el = el[0];
    }
    if (el) {
      if (classNameOut) {
        el.classList.remove(classNameOut);
      }
      if (classNameIn) {
        el.classList.add(classNameIn);
      }
    }
  }

  swapAllByClass(name: string, classNameIn: string, classNameOut: string, delay: number = 0) {
    setTimeout(() => {
      let els = document.querySelectorAll('.' + name);
      if (els && els.length) {
        for (let i = 0; i < els.length; i++) {
          if (classNameIn) {
            els[i].classList.add(classNameIn);
          }
          if (classNameOut) {
            els[i].classList.remove(classNameOut);
          }
        }
      }
    }, delay);
  }

  getElementByQuery(query: string) {
    let el = document.querySelector(query);
    if (el && el[0]) {
      el = el[0];
    }
    return el;
  }

  spinOut(el) {
    el.style.transition = 'transform 1.5s ease-in';
    el.style.transform = 'rotate(1440deg) scale(0, 0)'
  }

  fadeOut(el) {
    el.style.transition = 'opacity 1s ease-in';
    el.style.opacity = 0;
  }

  shrinkOut(el, endScale) {
    el.style.transition = 'transform 1.5s ease-in';
    el.style.transform = 'scale(' + (endScale.x ? endScale.x : 1) + ', ' + (endScale.y ? endScale.y : 1) + ')';
  }

  menuClick(page: string, activeRoute: ActivatedRoute) {
    
  }

  scrollToTop(delay: number, x: number, y: number) {
    if (delay) {
      setTimeout(() => {
        window.scrollTo({
          top: x,
          left: y,
          behavior: 'smooth'
        });
      }, delay);
    }
  }


}
