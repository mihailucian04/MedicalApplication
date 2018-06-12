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
  constructor(public settingsService: SettingsService, private routeService: RoutesService) {
    this.menuItems = routeService.getRoutes();
    this.activeFontColor = 'rgba(0,0,0,.6)';
    this.normalFontColor = 'rgba(255,255,255,.8)';
    this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
  }

  ngOnInit() {
    this.color = this.settingsService.getSidebarFilter();
    this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
      this.color = filter;
      if (filter === '#fff') {
        this.activeFontColor = 'rgba(0,0,0,.6)';
      } else {
        this.activeFontColor = 'rgba(255,255,255,.8)';
      }
    });
    this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
      if (color === '#fff') {
        this.normalFontColor = 'rgba(0,0,0,.6)';
        this.dividerBgColor = 'rgba(0,0,0,.1)';
      } else {
        this.normalFontColor = 'rgba(255,255,255,.8)';
        this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
      }
    });
  }
  ngOnDestroy() {
    this.settingsService.sidebarFilterUpdate.unsubscribe();
    this.settingsService.sidebarColorUpdate.unsubscribe();
  }

  ngAfterViewInit() {
  }
}
