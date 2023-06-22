import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MembersService } from 'src/app/members/services/members.service';

@Component({
	selector: 'app-finance-form',
	templateUrl: './finance-form.component.html',
	styleUrls: ['./finance-form.component.css'],
})
export class FinanceFormComponent implements OnInit {

	members: Array<any> = [];
	dateToday: Date = new Date();

	displayedColumns: Array<string> = ["name", "tithes", "pledges", "mission", "vehicle"];
	dataSource!: MatTableDataSource<any>;

	constructor(
		private _memberService: MembersService,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this.getMembers();
	}

	initializeTable(data: any) {
		this.dataSource = new MatTableDataSource(data);
	}

	getMembers() {
		this._memberService.getMembers().then((snapshot) => {
			this.members = snapshot.docs.map(x => {
				const data = x.data()
				return {
					name: `${data["first_name"]} ${data["middle_name"]} ${data["last_name"]}`,
					tithes: 0,
					pledges: 0,
					mission: 0,
					vehicle: 0
				}
			});
			this.initializeTable(this.members);
		})
	}

	searchMember(searchValue: string) {
		this.dataSource.filter = searchValue.toUpperCase();
	}

	onBackClicked() {
		this._router.navigate(['/main/finance/manage']);
	}

}
