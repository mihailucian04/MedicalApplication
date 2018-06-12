import {AfterViewInit, Component, OnInit, OnDestroy, Inject, InjectionToken} from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ROUTES, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { RoutesService } from '../../services/routes.service';


export const ROUTESs = new InjectionToken<Routes[]>('ROUTES');


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  public color: string;
  public menuItems;
  public activeFontColor: string;
  public normalFontColor: string;
  public dividerBgColor: string;

  constructor(private routeService: RoutesService) {
    this.menuItems = routeService.getRoutes();
    this.activeFontColor = 'rgba(0,0,0,.6)';
    this.normalFontColor = 'rgba(255,255,255,.8)';
    this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  // hideMenuItem(title: string) {
  //   if (this.isMedic === true) {
  //     return false;
  //   } else if ( this.isLab === true && (title === 'Home' || title === 'Laboratory Analysis') ) {
  //     return false;
  //   } else if (this.isReg === true && (title === 'Home')) {
  //     return false;
  //   }
  //   return true;
  // }

}
