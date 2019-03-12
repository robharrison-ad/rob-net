import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "rOrderBy"
})

export class ROrderByPipe implements PipeTransform {
  transform(values: number[]|string[]|object[], key?: string, reverse: boolean = false, dateFlag?: boolean) {
    if (!Array.isArray(values) || values.length <= 0) {
      return null;
    }

    return this.sort(values, key, reverse, dateFlag);
  }


  private sort(value: any[], key?: any, reverse: boolean = false, dateFlag?: boolean): any[] {
    
    const isInside = key && key.indexOf('.') !== -1;
    const dc = this.typeCheck;
    const gv = this.getValue;
    if (isInside) {
      key = key.split('.');
    }

    let array: Array<any> = [...value];

    array = array.sort((a: any, b: any): number => {
      if (!key) {
        return dc(a, dateFlag) > dc(b, dateFlag) ? 1 : -1;
      }

      if (!isInside) {
        return dc(a[key], dateFlag) > dc(b[key], dateFlag) ? 1 : -1;
      }

      return dc(gv(a, key), dateFlag) > dc(gv(b, key), dateFlag) ? 1 : -1;
    });

    if (reverse) {
      return array.reverse();
    }
    return array;
  }

  private getValue(object: any, key: string[], t?: Function) {
    let obj = object;
    for (let i = 0, n = key.length; i < n; ++i) {
      const k = key[i];
      obj = obj[k];
    }

    if (t) {
      obj = t(obj);
    }

    return obj;
  }

  private typeCheck(value:any, dateFlag?:boolean) {
    if (dateFlag) {
      const yr = new Date(value).getFullYear() ? new Date(value).getFullYear().toString() : '0000';
      const m = new Date(value).getMonth() ? (new Date(value).getMonth().toString().length > 1 ? '' : '0') + new Date(value).getMonth().toString() : '00';
      const dt = new Date(value).getDate() ? (new Date(value).getDate().toString().length > 1 ? '' : '0') + new Date(value).getDate().toString() : '00';
      console.log(parseInt(yr + m + dt));
      return parseInt(yr + m + dt);
    }
    if (typeof(value) === "boolean") {
      // returns the opposite of what is 'expected' so that true will sort ahead of false.
      return value ? 0 : 1;
    }
    return value;
  }

}
