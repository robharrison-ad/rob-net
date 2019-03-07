import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "rOrderBy"
})

export class ROrderByPipe implements PipeTransform {
  transform(values: number[]|string[]|object[], key?: string, reverse?: boolean) {
    if (!Array.isArray(values) || values.length <= 0) {
      return null;
    }

    return this.sort(values, key, reverse);
  }

  private sort(value: any[], key?: any, reverse?: boolean): any[] {
    const isInside = key && key.indexOf('.') !== -1;
    const dc = this.typeCheck;
    const gv = this.getValue;
    if (isInside) {
      key = key.split('.');
    }

    let array: Array<any> = [...value];

    array = array.sort((a: any, b: any): number => {
      if (!key) {
        return dc(a) > dc(b) ? 1 : -1;
      }

      if (!isInside) {
        return dc(a[key]) > dc(b[key]) ? 1 : -1;
      }

      return dc(gv(a, key)) > dc(gv(b, key)) ? 1 : -1;
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

  private typeCheck(value) {
    if (!Number.parseInt(value) && !isNaN(Date.parse(value))) {
      return Date.parse(value);
    }
    if (typeof(value) === "boolean") {
      // returns the opposite of what is 'expected' so that true will sort ahead of false.
      return value ? 0 : 1;
    }
    return value;
  }

}
