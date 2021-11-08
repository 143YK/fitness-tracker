import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavOpen = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authservice: AuthService) {}

  sidenavToggle() {
    this.sidenavOpen.emit();
  }

  logoutCall() {
    this.authservice.logout();
  }

  ngOnInit(): void {
    this.authSubscription = this.authservice.authChange.subscribe(
      (authChange) => {
        this.isAuth = authChange;
      }
    );
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription.unsubscribe();
  }
}
