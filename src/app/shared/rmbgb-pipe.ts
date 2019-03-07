import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'rmbgb'
})
export class RMbGbPipe extends DecimalPipe {
  transform(value: number): string {

    // the decimal pipe leaves behind trailing zeroes after the decimal (.50)
    //    but we don't want those, so we remove below by calling this function.
    const trim = (numStr) => {
      return numStr.replace(/\.0{2}|(\.[1-9])0/,'$1');
    };

    if (!value || isNaN(value)) {
      return '';
    }
    let suffix: string;
    let val: string;

    // Used the arrays rather than a switch statement to simplify the code and so that 
    //    it could be extended some day when average data usage gets even higher.
    const pows = [5, 4, 3, 2, 1];
    const suffixes = ['PB', 'TB', 'GB', 'MB', 'KB', 'Bytes'];
    let done: boolean = false;

    if (value === undefined || value === null) {
      return;
    }

    // match the value of our given number with a MB, GB, etc. suffix, select the 
    //    corresponding suffix string, and trim the number down to just the part 
    //    we need.
    let i: number = 0;
    while (!done && i < suffixes.length - 1) {
      const n: number = (Math.pow(1000, pows[i]) - Math.pow(1000, (pows[i] * - 1)));
      if (value > n) {
        suffix = suffixes[i];
        val = trim(super.transform(value / Math.pow(1000, pows[i]), "1.2-2").toString());
        done = true;
      }
      i++;
    }

    // if we get inside this if block it means the number was too small to match any
    //    of the suffixes (it's under 1000) so it wasn't formatted into a proper string 
    //    in the loop above, so we do it here.
    if (value && !val) {
      val = trim(super.transform(value, "1.2-2").toString());
    }
    val += ' ' + (suffix ? suffix : suffixes[suffixes.length - 1]);

    return val;
  }
}
