import { Injectable } from '@angular/core';

@Injectable()
export class TogglePropertyService {

  constructor() { }

  private currentView: string = "View-Properties";

  setCurrentView(view: string) {
    this.currentView = view;
  }

  isPropertiesView() {
    return this.currentView === "View-Properties" ? true : false;
  }

  isPropertyView() {
    return this.currentView === "View-Property" ? true : false;
  }

}
