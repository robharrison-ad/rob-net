
export class RConfig {
  numberOfObjects: number = 11;
  positionClasses: Array<string> = [
    "r-position-class-1",
    "r-position-class-2",
    "r-position-class-3",
    "r-position-class-4",
    "r-position-class-5",
    "r-position-class-6",
    "r-position-class-7",
    "r-position-class-8",
    "r-position-class-9",
    "r-position-class-10",
    "r-position-class-11"
  ];
  positionChangeInterval: number = 1500; // seconds
  positionChangeDuration: number = 750; //ms
  pauseLength: number = 10; // seconds
  runTime?: number = 600; // seconds
  endPositionClass?: string = "r-position-end";
  restEvery?: number = 60; // seconds
  restDuration?: number = 30; // seconds, 
  restPositionClass?: string = "r-rest-position"

  constructor(private rConfig?: RConfig) {
    if (rConfig) {
      const keys = Object.keys(rConfig);
      for (let i = 0; i < keys.length; i++) {
        const inKey = keys[i];
        if (this.hasOwnProperty(inKey)) {
          this[inKey] = rConfig[inKey];
        }
      }

    }
  }
}


/*
1. `numberOfObjects` instances of `template` objects are created
2.  each one is given one of the `positionClasses`.
    a) if there are more `template`s than `positionClasses` then the classes are cycled through until all objects have one.  (In other words, if there are 6 objects, and 5 classes, then class #1 will be applied to object #6)
    b) if there are more classes than objects, then the classes will be used in order until all objects have a class. (some classes may be left over, without having been attached to a class - yet.)
3.  The objects start out with the original class applied (defining their position, color, shape, etc. -- whatever the class specifies) The list of classes (`positionClasses`)
4.  After `pauseLength` seconds, the classes are rotated around the objects.  So, object #1 started with class #1 and object #2, started with class #2, and so on.  After the first pause ,class #1 gets moved to object #2, class #2 gets moved to object #3, etc.
    a) this is where we will start using any of the left-over classes that might have been around after step 2b.
5.  This process of pause and rotate classes goes on until one of these things happens:
    a) If there is a `restEvery` defined, then the "pause and rotate" process takes a break for `restDuration` seconds when `restEvery` seconds has passed.
    b) IF there is no `restEvery ` defined then the process continues until `runTime` seconds has passed, at which time the process skips to step X below.
6.  When `restEvery` is triggered, the objects receive the `endPositionClass` for `restDuration` seconds and then the process begins again, starting with each object receiving its next class in order (from `positionClasses`).
    a)  This whole process of "pause and rotate, then rest" continues until `runTime` seconds has passed.
7.  Once `runTime` seconds elapse, the `endPositionClass` is applied to ALL of the `templlate` objects, so the objects come to a final stop at the size, shape, position, etc. defined in `endPositionClass`.
    a) Note: If `runTime` is not defined, the process goes on indefinitely.

** Default values are shown in the object definitions above **
*/