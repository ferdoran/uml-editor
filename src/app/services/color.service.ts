import { Injectable } from '@angular/core';
var randomColor = require('randomcolor');

@Injectable()
export class ColorService {

  public nextColor(): string {
    return randomColor({
      hue: 'random',
      luminosity: 'light',
    });
  }


  constructor() { }

}
