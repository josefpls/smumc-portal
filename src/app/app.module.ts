import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationModule } from './authentication/modules/authentication/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegistrationComponent } from './authentication/components/registration/registration.component';
import { NavigationComponent } from './navigation/components/navigation/navigation.component';

const baseRoutes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent },
    { path: "main", component: NavigationComponent, children: [
        { path: "", redirectTo: "chats", pathMatch: "full" },
        { path: "chats", loadChildren: () => import("./groupchats/modules/groupchats/groupchats.module").then(m => m.GroupchatsModule) },
        { path: "members", loadChildren: () => import("./members/modules/members/members.module").then(m => m.MembersModule) },
        { path: "finance", loadChildren: () => import("./finance/modules/finance/finance.module").then(m => m.FinanceModule) },
        { path: "ministries", loadChildren: () => import("./ministries/modules/ministries/ministries.module").then(m => m.MinistriesModule) },
    ]}
];

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(baseRoutes, { useHash: true }),
        AuthenticationModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
