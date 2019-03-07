export class NgxDecorConfig {
  iconType: IconType;
  trigger: Trigger;
  iconClass: string;
  iconErrorClass: string;
  iconErrorStyle: Array<string>;
  textboxErrorClass: string;
  textboxErrorStyle: Array<string>;
    
  constructor(config: NgxDecorConfig) {
    this.iconType = config.iconType;
    this.trigger = config.trigger;
    this.iconClass = config.iconClass;
    this.iconErrorClass = config.iconErrorClass;
    this.iconErrorStyle = config.iconErrorStyle;
    this.textboxErrorClass = config.textboxErrorClass;
    this.textboxErrorStyle = config.textboxErrorStyle;
  }
}

export class Trigger {
  name: string;
  type: TriggerType;
}

export enum IconType {
  "Error" = 0
}

export enum TriggerType {
  "Boolean" = 0,
  "Function" = 1
}




export class Config {
   objects =   [
    {
      "text": "HTML/HTML5",
      "image": {
        "path": "../../assets/images/internet-icons/html5.png",
        "sizeX": 0.8,
        "sizeY": 0.8
      }
    },
    {
      "text": "Bootstrap",
      "subText": "5+ years experience using Bootstrap components.",
      "image": {
        "path": "../../assets/images/internet-icons/bootstrap.png",
        "sizeX": 1.5,
        "sizeY": 1.5
      }
    },
    // {
    //   "text": "NodeJS",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/node-js.png",
    //     "sizeX": 1.1,
    //     "sizeY": 0.8
    //   }
    // },
    // {
    //   "text": "Angular (2+)",
    //   "subTtext": "Over 5 years experience developing Angular Applications - Experienced with all angular versions",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/angular2.png",
    //     "sizeX": 1.3,
    //     "sizeY": 1.5
    //   }
    // },
    // {
    //   "text": "CSS",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/css3.png",
    //     "sizeY": 1.0,
    //     "sizeX": 0.8
    //   }
    // },
    // {
    //   "text": "ASP.NET",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/net-logo.png",
    //     "sizeX": "0.8",
    //     "sizeY": "0.8"
    //   }
    // },
    // {
    //   "text": "SQL Scripting",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/sql.svg"
    //   }
    // },
    // {
    //   "text": "C#",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/c-sharp2.png",
    //     "sizeX": 0.85,
    //     "sizeY": 1.1
    //   }
    // },
    // {
    //   "text": "Data transformation",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/database-icon-white.png"
    //   }
    // },
    // {
    //   "text": "JavaScript",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/javascript.png",
    //     "sizeX": 1,
    //     "sizeY": 1
    //   }
    // },
    // {
    //   "text": "JQuery",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/jquery.png",
    //     "sizeX": 1.25,
    //     "sizeY": 1.25
    //   }
    // },
    // {
    //   "text": "AngularJS",
    //   "subText": "",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/angularjs.png",
    //     "sizeX": 1.5,
    //     "sizeY": 0.6
    //   }
    // },
    // {
    //   "text": "ReactJS",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/react-neg.v2.png",
    //     "sizeX": "1.15",
    //     "sizeY": "auto"
    //   }
    // },
    // {
    //   "text": "Delightful User Experience",
    //   "subText": "Applications developed with the user in mind and a goal of exceeding thier expectations - every time!",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/ux-beating-heart.v4.white.gif",
    //     "sizeX": 1.3,
    //     "sizeY": 1.3
    //   }
    // },
    // {
    //   "text": "Custom Applications",
    //   "subText": "Applications designed and delivered to meet your specifications.",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/application-laptop.png",
    //     "sizeX": 1,
    //     "sizeY": 1
    //   }
    // },
    // {
    //   "text": "Database Driven Applications",
    //   "image": {
    //     "path": "../../assets/images/internet-icons/data-driven.png",
    //     "sizeX": 1.3,
    //     "sizeY": 1.1
    //   }
    // }
  ];

}

