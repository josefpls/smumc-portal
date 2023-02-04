import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: string = "";

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string>("", [Validators.required, Validators.email]),
      password: new FormControl<string>("", [Validators.required, Validators.minLength(8)]),
    })
  }

  submitForm(): void {
    if(!this.loginForm.valid) return;
    this._authService.login(this.loginForm.value["email"], this.loginForm.value["password"]).then((credentials) => {
      localStorage.setItem("user", credentials["user"]["uid"]);
      this._router.navigate(["/main"]);
    }).catch((error: FirebaseError) => {
      this.error = error["code"];
      setTimeout(() => {
        this.error = "";
      }, 3000);
    });
  }

}
