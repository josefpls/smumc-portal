import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { collection, doc, DocumentReference, Firestore, getDocs, getFirestore, orderBy, query, QuerySnapshot, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { GroupchatModel } from '../models/groupchat.model';

@Injectable({
  providedIn: 'root'
})
export class GroupchatsService {

  app: FirebaseApp = initializeApp(environment["firebaseConfig"]);
  firestore: Firestore = getFirestore(this.app);
  auth: Auth = getAuth(this.app);

  groupchatCollection: string = environment["collection"][1];

  constructor() { }

  getAllGroupchats(): Promise<QuerySnapshot> {
    return getDocs(query(collection(this.firestore, this.groupchatCollection), orderBy("created", "desc")));
  }

  createGroupchat(chat: GroupchatModel): Promise<void> {
    const docRef: DocumentReference = doc(collection(this.firestore, this.groupchatCollection));
    chat["id"] = docRef["id"];
    return setDoc(docRef, { ...chat });
  }
}
