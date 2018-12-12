import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  constructor(private router: Router) {}

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('medic_guid');
    localStorage.removeItem('user_role');
    this.router.navigate(['user/login']);
  }

  menuClick() {
   // document.getElementById('main-panel').style.marginRight = '260px';
  }
}
