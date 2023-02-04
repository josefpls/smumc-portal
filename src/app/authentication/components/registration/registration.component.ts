import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { Timestamp } from 'firebase/firestore';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  registrationForm!: FormGroup;
  error: string = "";

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
  ) { }
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = new FormGroup({
      first_name: new FormControl<string>("", [Validators.required]),
      middle_name: new FormControl<string>("", []),
      last_name: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [Validators.required, Validators.email]),
      birthday: new FormControl<string>(Intl.DateTimeFormat("fr-CA").format(new Date()), []),
      password: new FormControl<string>("", [Validators.required, Validators.minLength(8)]),
    });
  }

  submitForm(): void {
    if(!this.registrationForm.valid) return;
    console.log(this.registrationForm.value);
    this._authService.signUp(this.registrationForm.value["email"], this.registrationForm.value["password"]).then((credentials) => {
      localStorage.setItem("user", credentials["user"]["uid"]);
      this._router.navigate(["/main"]);
    }).catch((error: FirebaseError) => {
      this.error = error["code"];
      setTimeout(() => {
        this.error = "";
      }, 3000)
    });
  }
}
