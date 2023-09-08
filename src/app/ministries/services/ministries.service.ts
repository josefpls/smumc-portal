import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { DocumentData, DocumentReference, DocumentSnapshot, Firestore, QuerySnapshot, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { MinistryModel } from '../models/ministry.model';

@Injectable({
  providedIn: 'root'
})
export class MinistriesService {

  app: FirebaseApp = initializeApp(environment["firebaseConfig"]);
  firestore: Firestore = getFirestore(this.app);
  auth: Auth = getAuth(this.app);

  ministriesCollection: string = environment["collection"][3];

  constructor() { }

  getAllMinistries(): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, this.ministriesCollection), orderBy("created", "desc")));
  }

  createMinistry(ministry: MinistryModel): Promise<void> {
    const docRef: DocumentReference = doc(collection(this.firestore, this.ministriesCollection));
    ministry["id"] = docRef["id"];
    return setDoc(docRef, { ...ministry });
  }

  getMinistry(id: string): Promise<DocumentSnapshot<DocumentData>> {
    const docRef: DocumentReference = doc(this.firestore, this.ministriesCollection, id);
    return getDoc(docRef); 
  }

  updateMinistry(id: string, data: any): Promise<void> {
    const docRef: DocumentReference = doc(collection(this.firestore, this.ministriesCollection), id);
    return updateDoc(docRef, { ...data });
  }

}
