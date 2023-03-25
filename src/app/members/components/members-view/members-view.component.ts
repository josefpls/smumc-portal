import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Member } from '../../models/member.model';
import { MembersService } from '../../services/members.service';

@Component({
    selector: 'app-members-view',
    templateUrl: './members-view.component.html',
    styleUrls: ['./members-view.component.css']
})
export class MembersViewComponent implements OnInit {

    memberData!: Member | DocumentData;

    constructor(
        private _dialogRef: MatDialogRef<MembersViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _membersService: MembersService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this.getMemberData();
    }

    getMemberData(): void {
        this._membersService.getMember(this.data["member_id"]).then((member) => {
            const memberData = member.data();
            if(memberData !== undefined) {
                this.memberData = memberData;
            }
        });
    }

    editMember(): void {
        this._dialogRef.close();
        this._router.navigate(["/main/members/manage"], {
            queryParams: {
                m: this.data["member_id"] 
            }
        });
    }
}
