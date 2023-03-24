import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentData } from 'firebase/firestore';
import { GroupchatsService } from '../../services/groupchats.service';

@Component({
  selector: 'app-groupchats-table',
  templateUrl: './groupchats-table.component.html',
  styleUrls: ['./groupchats-table.component.css']
})
export class GroupchatsTableComponent implements OnInit {

  groupchats: Array<DocumentData> = [];
  columnsToDisplay: Array<string> = ["created", "name", "link", "actions"];
  myDataArray!: MatTableDataSource<any>;

  constructor(
    private _groupchatsService: GroupchatsService
  ) { }

  ngOnInit(): void {
      this.getGroupchats();
  }

  initializeTable(data: Array<any>): void {
    this.myDataArray = new MatTableDataSource(data);
  }

  getGroupchats(): void {
    this._groupchatsService.getAllGroupchats().then((chats) => {
      this.groupchats = chats.docs.map(x => x.data());
      this.initializeTable(this.groupchats);
    });
  }

}
