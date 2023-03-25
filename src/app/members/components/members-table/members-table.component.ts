import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MembersService } from '../../services/members.service';
import { MembersViewComponent } from '../members-view/members-view.component';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css']
})
export class MembersTableComponent implements OnInit {

    columnsToDisplay: Array<string> = ["name", "org", "actions"];
    myDataArray!: MatTableDataSource<any>;
    
    constructor(
        private _membersService: MembersService,
        private _router: Router,
        private _dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getMembers();
    }

    initializeTable(data: any): void {
        this.myDataArray = new MatTableDataSource(data);
    }

    getMembers(): void {
        this._membersService.getMembers().then((members) => {
            this.initializeTable(members.docs.map(x => x.data()));
        });
    }

    viewMember(id: string): void {
        this._dialog.open(MembersViewComponent, {
            disableClose: true,
            data: {
                member_id: id
            },
        });
    }
}
