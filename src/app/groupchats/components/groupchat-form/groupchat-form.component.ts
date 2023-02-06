import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { Timestamp } from 'firebase/firestore';
import { GroupchatModel } from '../../models/groupchat.model';
import { GroupchatsService } from '../../services/groupchats.service';

@Component({
  selector: 'app-groupchat-form',
  templateUrl: './groupchat-form.component.html',
  styleUrls: ['./groupchat-form.component.css']
})
export class GroupchatFormComponent implements OnInit {

  groupchatForm!: FormGroup;
  notification: string = "";

  constructor(
    public _location: Location,
    public _groupchatsService: GroupchatsService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.groupchatForm = new FormGroup({
      name: new FormControl<string>("", [Validators.required]),
      link: new FormControl<string>("", [Validators.required]),
    });
  }

  submitForm(): void {
    if(this.groupchatForm.valid) {
      let dataVal: GroupchatModel = {
        id: "",
        name: this.groupchatForm.value["name"],
        link: this.groupchatForm.value["link"],
        active: true,
        created: Timestamp.now(),
        updated: Timestamp.now(),
        modified_by: localStorage.getItem("user") || "",
      }
      this._groupchatsService.createGroupchat(dataVal).then(() => {
        this._location.back();
      }).catch((error: FirebaseError) => {
        this.notification = error["code"];
        setTimeout(() => {
          this.notification = "";
        }, 3000)
      });
    }
  }

}
