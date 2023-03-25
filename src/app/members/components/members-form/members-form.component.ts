import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Member } from '../../models/member.model';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-members-form',
  templateUrl: './members-form.component.html',
  styleUrls: ['./members-form.component.css']
})
export class MembersFormComponent implements OnInit {

    memberForm!: FormGroup;
    selectedMemberId!: string;

    constructor(
        public _location: Location,
        private _memberService: MembersService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.selectedMemberId = this._activatedRoute["snapshot"]["queryParams"]["m"];
    }
    
    ngOnInit(): void {
       this.initializeForm();
    }

    initializeForm(): void {
        if(this.selectedMemberId === "new") {
            this.memberForm = new FormGroup({
                first_name: new FormControl<string>("", [Validators.required]),
                middle_name: new FormControl<string>("", []),
                last_name: new FormControl<string>("", [Validators.required]),
                birthday: new FormControl<string>(Intl.DateTimeFormat("fr-CA").format(new Date()), [Validators.required]),
            });
        } else {
            this._memberService.getMember(this.selectedMemberId).then((member) => {
                const memberData = member.data();
                if(memberData !== undefined) {
                    this.memberForm = new FormGroup({
                        first_name: new FormControl<string>(memberData["first_name"], [Validators.required]),
                        middle_name: new FormControl<string>(memberData["middle_name"], []),
                        last_name: new FormControl<string>(memberData["last_name"], [Validators.required]),
                        birthday: new FormControl<string>(Intl.DateTimeFormat("fr-CA").format(new Timestamp(memberData["birthday"]["seconds"], memberData["birthday"]["nanoseconds"]).toDate()), [Validators.required]),
                    });
                } else {
                    this.memberForm = new FormGroup({
                        first_name: new FormControl<string>("", [Validators.required]),
                        middle_name: new FormControl<string>("", []),
                        last_name: new FormControl<string>("", [Validators.required]),
                        birthday: new FormControl<string>(Intl.DateTimeFormat("fr-CA").format(new Date()), [Validators.required]),
                    });
                }
            });
        }
    }

    onSaveMemberClicked(): void {
        if(this.selectedMemberId === "new") {
            this.addMember();
        } else {
            this.editMember();
        }
    }

    addMember(): void {
        if(!this.memberForm.valid) {
            alert("Form Invalid");
        }
        const dataVal: Member = {
            id: "",
            first_name: this.memberForm["value"]["first_name"],
            middle_name: this.memberForm["value"]["middle_name"],
            last_name: this.memberForm["value"]["last_name"],
            birthday: Timestamp.fromMillis(new Date(this.memberForm["value"]["birthday"]).getTime()),
            active: true,
            created: Timestamp.now(),
            modified: Timestamp.now(),
            created_by: localStorage.getItem("user")!, 
            modified_by: localStorage.getItem("user")!
        };
        this._memberService.addMember(dataVal).then(() => {
            alert("Member Added!");
            this._location.back();
        });
    }

    editMember(): void {
        if(!this.memberForm.valid) {
            alert("Form Invalid");
        }
        const dataVal: any = {
            first_name: this.memberForm["value"]["first_name"],
            middle_name: this.memberForm["value"]["middle_name"],
            last_name: this.memberForm["value"]["last_name"],
            birthday: Timestamp.fromMillis(new Date(this.memberForm["value"]["birthday"]).getTime()),
            active: true,
            modified: Timestamp.now(),
            modified_by: localStorage.getItem("user")
        };
        this._memberService.editMember(this.selectedMemberId, dataVal).then(() => {
            alert("Member Updated!");
            this._location.back();
        });
    }

}
