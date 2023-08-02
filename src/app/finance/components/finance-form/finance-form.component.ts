import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MembersService } from 'src/app/members/services/members.service';

@Component({
	selector: 'app-finance-form',
	templateUrl: './finance-form.component.html',
	styleUrls: ['./finance-form.component.css'],
})
export class FinanceFormComponent implements OnInit {

	members: Array<any> = [];
	filteredMembers: BehaviorSubject<any> = new BehaviorSubject([]);
	dateToday: Date = new Date();

	displayedColumns: Array<string> = ["Name", "Tithes", "Pledges", "Mission", "Vehicle"];

	constructor(
		private _memberService: MembersService,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this.getMembers();
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
			this.filteredMembers.next(this.members);
		})
	}

	searchMember(event: Event) {
		let members: Array<any> = this.members.filter(x => x["name"].includes((event.target as HTMLInputElement).value));
		this.filteredMembers.next(members);
	}

	onBackClicked() {
		this._router.navigate(['/main/finance/manage']);
	}

}
