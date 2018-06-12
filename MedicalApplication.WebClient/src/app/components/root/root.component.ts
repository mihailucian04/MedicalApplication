import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit, OnDestroy {
  public id: number;
  public backgroundColor: string;
  constructor(private router: Router) {
    this.id = 1;
    this.backgroundColor = '#D80B0B';
    this.router.navigate(['dashboard/home']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
