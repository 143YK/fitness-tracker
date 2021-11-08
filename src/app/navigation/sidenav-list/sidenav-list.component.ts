import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<string>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authservice: AuthService) {}

  CloseSideNav() {
    this.sideNavClose.emit('0');
  }

  logoutCall() {
    this.authservice.logout();
  }

  ngOnInit(): void {
    this.authservice.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription.unsubscribe();
  }
}
