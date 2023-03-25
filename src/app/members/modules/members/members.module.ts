import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { MembersComponent } from '../../components/members/members.component';
import { MembersTableComponent } from '../../components/members-table/members-table.component';
import { MembersFormComponent } from '../../components/members-form/members-form.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersViewComponent } from '../../components/members-view/members-view.component';

const memberRoutes: Routes = [
    { path: "", redirectTo: "all", pathMatch: "full" },
    { path: "all", component: MembersComponent },
    { path: "manage", component: MembersFormComponent },
]

@NgModule({
    declarations: [
        MembersComponent,
        MembersTableComponent,
        MembersFormComponent,
        MembersViewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(memberRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})
export class MembersModule { }
