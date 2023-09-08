import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MinistriesService } from '../../services/ministries.service';

import { MinistriesComponent } from '../../components/ministries/ministries.component';
import { MinistriesListComponent } from '../../components/ministries-list/ministries-list.component';
import { MinistriesFormComponent } from '../../components/ministries-form/ministries-form.component';

const ministriesRoutes: Routes = [
	{ path: "", redirectTo: "all", pathMatch: "full" },
	{ path: "all", component: MinistriesComponent },
	{ path: "manage", component: MinistriesFormComponent },
]

@NgModule({
  declarations: [
    MinistriesComponent,
    MinistriesListComponent,
    MinistriesFormComponent,
  ],
  imports: [
    CommonModule,
  	RouterModule.forChild(ministriesRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
	  RouterModule
  ],
  providers: [MinistriesService]
})
export class MinistriesModule { }
