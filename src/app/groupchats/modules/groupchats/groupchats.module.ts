import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupchatsComponent } from '../../components/groupchats/groupchats.component';
import { GroupchatFormComponent } from '../../components/groupchat-form/groupchat-form.component';
import { GroupchatsTableComponent } from '../../components/groupchats-table/groupchats-table.component';

const groupChatsRoutes: Routes = [
  { path: "", redirectTo: "all", pathMatch: "full" },
  { path: "all", component: GroupchatsComponent },
  { path: "manage", component: GroupchatFormComponent }
]

@NgModule({
  declarations: [
    GroupchatsComponent,
    GroupchatFormComponent,
    GroupchatsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(groupChatsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class GroupchatsModule { }
