import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-finance-records',
	templateUrl: './finance-records.component.html',
	styleUrls: ['./finance-records.component.css'],
})
export class FinanceRecordsComponent {

	constructor(
		private _router: Router
	) {}	

	newRecord() {
		this._router.navigate(["/main/finance/form"], {
			queryParams: {
				r: "new"
			}
		});
	}
}