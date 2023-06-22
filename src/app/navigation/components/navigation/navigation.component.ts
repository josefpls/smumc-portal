import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    navLinks: Array<{ url: string, text: string}> = [
        { url: "/main/chats", text: "Groupchats" },
        { url: "/main/members", text: "Members" },
        { url: "/main/ministries", text: "Ministries" },
        { url: "/main/organizations", text: "Lay Organizations" },
        { url: "/main/finance", text: "Finance" },
    ];

    constructor(
        private _authService: AuthenticationService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher
    ) { 
        this.mobileQuery = this._media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    logout(): void {
        this._authService.logOut().then(() => {
            localStorage.clear();
            this._router.navigate(["/login"]);
        })
    }

}
