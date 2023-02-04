import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  app: FirebaseApp = initializeApp(environment["firebaseConfig"]);
  firestore: Firestore = getFirestore(this.app);
  auth: Auth = getAuth(this.app);

  constructor() { }
  
  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut(): Promise<void> {
    return signOut(this.auth);
  }

}