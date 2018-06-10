import { Injectable } from '@angular/core';

@Injectable()
export class RoutesService {

  constructor() { }
  private ROUTES = [
  { path: 'home', title: 'Home', icon: 'dashboard', children: null },
   { path: 'patient', title: 'Patients', icon: 'person', children: null },
   { path: 'calendar', title: 'Calendar', icon: 'calendar_today', children: null },
   { path: 'laboratory', title: 'Laboratory Analysis', icon: 'work', children: null },
   // { path: 'table', title: 'Table List', icon: 'content_paste', children: null },
   // { path: '#component', id: 'component', title: 'Component', icon: 'apps', children: [
     //     {path: 'components/price-table', title: 'Price Table', icon: 'PT'},
     //     {path: 'components/panels', title: 'Panels', icon: 'P'},
     //     {path: 'components/wizard', title: 'Wizard', icon: 'W'},
     //   ]},
     // { path: 'notification', title: 'Notification', icon: 'notifications', children: null },
     // { path: 'alert', title: 'Sweet Alert', icon: 'warning', children: null },
     { path: 'settings', title: 'Settings', icon: 'settings', children: null }
  ];
 getRoutes() {
   return this.ROUTES;
 }
}
