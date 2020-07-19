import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linktheme = document.querySelector('#theme'); 

  constructor() {

    console.log('settings services init');
    const url = localStorage.getItem('theme')||'./assets/css/colors/purple-dark.css';
    this.linktheme.setAttribute('href',url);
    
  }

  changeTheme(theme:string){
    
    const url = `./assets/css/colors/${theme}.css`;
    this.linktheme.setAttribute('href',url);

    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){//working

    const links = document.querySelectorAll('working');
    links.forEach(element=>{
      
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`;
      const currentTheme= this.linktheme.getAttribute('href');

      if(currentTheme===btnThemeUrl){

        element.classList.add('working');
      }
    })

  }
   
}
