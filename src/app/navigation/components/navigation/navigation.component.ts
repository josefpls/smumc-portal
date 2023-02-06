import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  navLinks: Array<{ url: string, text: string}> = [
    { url: "/main/chats", text: "Groupchats" },
    { url: "/main/members", text: "Members" },
    { url: "/main/organizations", text: "Lay Organizations" },
  ];

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { }
  
  logout(): void {
    this._authService.logOut().then(() => {
      localStorage.clear();
      this._router.navigate(["/login"]);
    })
  }

}
