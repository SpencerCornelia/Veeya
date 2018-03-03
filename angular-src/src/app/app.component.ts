import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle('Veeya');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0,0);
      }
    })
  }


}
