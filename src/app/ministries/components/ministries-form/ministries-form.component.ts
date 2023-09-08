import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MinistriesService } from '../../services/ministries.service';
import { MinistryModel } from '../../models/ministry.model';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ministries-form',
  templateUrl: './ministries-form.component.html',
  styleUrls: ['./ministries-form.component.css']
})
export class MinistriesFormComponent implements OnInit {

  ministryControl: FormControl = new FormControl(null, Validators.required);
  selectedMinistryId!: string;
  selectedMinistry!: any;

  constructor(
    private _ministriesService: MinistriesService,
    private _activatedRoute: ActivatedRoute,
    public _location: Location
  ) { 
    this.selectedMinistryId = this._activatedRoute["snapshot"]["queryParams"]["m"];
  }

  ngOnInit(): void {
    if(this.selectedMinistryId !== "new") {
      this._ministriesService.getMinistry(this.selectedMinistryId).then((ministry) => {
        let ministryDetails: DocumentData | undefined = ministry.data();
        this.selectedMinistry = ministryDetails;
        this.ministryControl.setValue(ministryDetails !== undefined ? ministryDetails["name"] : "");
      });
    }
  }

  onSaveClicked(): void {
    if(this.selectedMinistryId === "new") {
      this.addMinistry();
    } else {
      this.updateMinistry();
    }
  }

  addMinistry(): void {
    let dataVal: MinistryModel = {
      id: "",
      name: this.ministryControl.value,
      active: true,
      created: Timestamp.now(),
      modified: Timestamp.now(),
      created_by: localStorage.getItem("user")!,
      modified_by: localStorage.getItem("user")!,
    };
    this._ministriesService.createMinistry(dataVal).then(() => {
      this._location.back();
      alert("New ministry added");
    });
  }

  updateMinistry(): void {
    let dataVal: any = {
      name: this.ministryControl.value,
      modified: Timestamp.now(),
      modified_by: localStorage.getItem("user")!,
    };
    this._ministriesService.updateMinistry(this.selectedMinistryId, dataVal).then(() => {
      this._location.back();
      alert("Ministry updated");
    });
  }
  
}
