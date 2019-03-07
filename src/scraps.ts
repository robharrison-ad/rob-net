// setTriggerClasses(list: Array<TriggerElement>) {
//   for (let i = 0; i < list.length; i++) {
//     const el = list[i];
//     const classesToAdd = ['triggered'];
//     if (el.triggerClasses) {
//       el.triggerClasses.forEach(c => {
//         classesToAdd.push(c);
//       });
//     }
//     if (el.applyToElementId && !el.applyToElement) {
//       el.applyToElement = document.getElementById(el.applyToElementId);
//     }
//     const applyToElement = el.applyToElement ? el.applyToElement : el;
//     if (el.triggered) {

//       classesToAdd.forEach(c => {
//         applyToElement.classList.add(c);
//       });
//     }
//     else {
//       classesToAdd.forEach(c => {
//         applyToElement.classList.remove(c);
//       });
//     }
//   }
// }

// getTriggerElementPos(element) {
//   let pos;
//   if (element === window) {
//     pos = {
//       height: element.innerHeight,
//       width: element.innerWidth,
//       top: 0,
//       bottom: element.innerHeight,
//       left: 0,
//       right: element.innerWidth
//     };
//   }
//   else {
//     const rect = element.getBoundingClientRect();
//     pos = {
//       bottom: pos.top + pos.height,
//       right: pos.left + pos.width,
//       ...rect
//     }
//   }
//   return pos;
// }

// scrollToElement(data: any) {
//   const routeData = (() => {
//     let retVal;
//     this.globalData.scrollRoutes.forEach(x => {
//       if (x.route === this.globalData.router.url) {
//         retVal = x;
//       }
//     });
//     return retVal;
//   })();
//   const selfTop = document.getElementById(routeData.self).getBoundingClientRect().top;
//   let othersTotal: number = 0;
//   routeData.above.forEach(x => {
//     othersTotal += document.getElementById(x).getBoundingClientRect().height;
//   });
//   const scrollTarget = (window.scrollY * -1) + (selfTop + othersTotal);
//   window.scrollTo({
//     behavior: "smooth",
//     top: scrollTarget,
//     left: 0
//   })
// }

// trackElements(): Array<TriggerElement> {
//   let els = this.globalData.watchOnScroll;
//   for (let i = 0; i < els.length; i++) {
//     let el: TriggerElement = els[i];

//     // The element we're watching
//     let element: Element = null;
//     if (el.id) {
//       element = document.getElementById(el.id);
//     }
//     else if (el.class) {
//       element = document.querySelector('.' + el.class);
//       element = (element && element[0]) ? element[0] : element;
//     }

//     if (element) {
//       element;
//       el.pos = new ElementCoords(element.getBoundingClientRect());
//       el.pos.bottom = el.pos.top + el.pos.height;
//       el.pos.right = el.pos.left + el.pos.width;

//       // get the compare element as specified on DOM element (if specified)
//       const compareElementValue = element.getAttribute('data-rh-trigger');

//       // if compare element not specified, we use window
//       el.compareElement = compareElementValue ? new TriggerElement(document.getElementById(compareElementValue)) : window;

//       // get apply-to element if given in DOM element
//       const applyToId = element.getAttribute('data-rh-apply-to');
//       let applyToElement: HTMLElement = null;
//       if (applyToId) {
//         el.applyToElementId = applyToId;
//         applyToElement = document.getElementById(applyToId);
//         el.applyToElement = applyToElement;
//       }

//       // get offset value, if one was specified.
//       el.compareElementPos = this.getTriggerElementPos(el.compareElement);
//       const triggerOffsetValue = element.getAttribute('data-rh-trigger-offset');
//       const triggerOffset = triggerOffsetValue ? Number.parseFloat(triggerOffsetValue) : 0;

//       //determine if trigger condition has been met
//       const compareElementPos: ElementCoords = new ElementCoords(this.getTriggerElementPos(el.compareElement));

//       // we alter the compare point in the case of negative top to allow for when the element has gone 
//       // passed the compare element.
//       const comparePoint = (el.pos.top < 0) ? (el.pos.top * -1) + compareElementPos.height : el.pos.top;

//       el.triggered = el.pos.top <= comparePoint;
//       // 
//       if (el.triggered) {
//         // if it's already been triggered for this trip up, ignore and reset triggered status
//         if (el.triggeredAtPos && el.pos.top > el.triggeredAtPos.top) {
//           el.triggeredAtPreviousPos = el.triggeredAtPos;
//           el.triggeredAtPos = el.pos;
//           el.triggered = false;
//         }
//         else if (el.pos.top > comparePoint) {
//           // going back down, so reset trigger
//           el.triggered = false;
//           el.triggeredAtPreviousPos = el.triggeredAtPos;
//           el.triggeredAtPos = null;
//         }
//       }
//       // update array
//       this.globalData.watchOnScroll[i] = element;
//     }

//   }
//   // return the array (as a conveniencee so the calling function doesn't have to get it again)
//   // 
//   return this.globalData.watchOnScroll;

// }


