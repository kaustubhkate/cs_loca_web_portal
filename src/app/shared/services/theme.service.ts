import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Subject }    from 'rxjs';

@Injectable()
export class ThemeService {

  private changeThemeSource = new Subject<any>();

  changeThemeSource$ = this.changeThemeSource.asObservable();

  themes = [{
     name: 'default-theme',
     baseColor: '#3f51b5',
     chartLabelColor: 'blue',
     isActive: false
  },
  {
     name: 'black-theme',
     baseColor: '#212121',
     isActive: false,
     chartLabelColor: 'white',
  },
  {
     name: 'light-theme',
     baseColor: '#eeeeee',
     isActive: false,
     chartLabelColor: 'black',
  }];

  activatedThemeName: String;
  activatedTheme: any;

  constructor() {
    this.changeTheme({name: 'default-theme'});
  }

  changeTheme(theme) {
    this.themes.forEach((t) => {
      t.isActive = false;

      $(document.body).removeClass(t.name);
      if(t.name === theme.name) {
        $(document.body).addClass(t.name);

        t.isActive = true;

        this.activatedThemeName = theme.name;
        this.activatedTheme = t;

        this.changeThemeSource.next();
      }
    });
  }
}
//this.theme.activatedTheme.chartLabelColor