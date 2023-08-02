import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { FinanceDashboardComponent } from '../../components/finance-dashboard/finance-dashboard.component';
import { FinanceComponent } from '../../components/finance/finance.component';
import { FinanceRecordsComponent } from '../../components/finance-records/finance-records.component';
import { FinanceFormComponent } from '../../components/finance-form/finance-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const financeRoutes: Routes = [
	{ path: "", redirectTo: "manage", pathMatch: "full" },
	{ path: "manage", component: FinanceComponent, children: [
        { path: "", redirectTo: "dashboard", pathMatch: "full" },
        { path: "dashboard", component: FinanceDashboardComponent },
        { path: "records", component: FinanceRecordsComponent }
    ]},
    { path: "form", component: FinanceFormComponent }
]

@NgModule({
	declarations: [
		FinanceDashboardComponent,
		FinanceComponent,
        FinanceRecordsComponent,
        FinanceFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(financeRoutes),
        MaterialModule,
        FormsModule, ReactiveFormsModule
    ],
    exports: [
        FinanceFormComponent
    ]
})
export class FinanceModule { }
