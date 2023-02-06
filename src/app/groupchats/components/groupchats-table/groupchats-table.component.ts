import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { GroupchatsService } from '../../services/groupchats.service';

@Component({
  selector: 'app-groupchats-table',
  templateUrl: './groupchats-table.component.html',
  styleUrls: ['./groupchats-table.component.css']
})
export class GroupchatsTableComponent implements OnInit {

  groupchats: Array<DocumentData> = [];

  constructor(
    private _groupchatsService: GroupchatsService
  ) { }

  ngOnInit(): void {
    this.getGroupchats();
  }

  getGroupchats(): void {
    this._groupchatsService.getAllGroupchats().then((chats) => {
      this.groupchats = chats.docs.map(x => x.data());
    });
  }

}
