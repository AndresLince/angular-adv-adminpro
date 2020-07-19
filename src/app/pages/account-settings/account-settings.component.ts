import { SettingsService } from '../../services/settings.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    
    this.settingsService.checkCurrentTheme();
    
  }

  changeTheme(theme:string){
    
    this.settingsService.changeTheme(theme);    
  }

  

}
