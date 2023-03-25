import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { collection, doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, getDoc, getDocs, getFirestore, orderBy, query, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';

@Injectable({
    providedIn: 'root'
})
export class MembersService {

    app: FirebaseApp = initializeApp(environment["firebaseConfig"]);
    firestore: Firestore = getFirestore(this.app);
    auth: Auth = getAuth(this.app);

    memberCollection: string = environment["collection"][2];

    constructor() { }

    getMembers(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(query(collection(this.firestore, this.memberCollection), orderBy("created", "desc")));
    }

    addMember(member: Member): Promise<void> {
        const docRef: DocumentReference = doc(collection(this.firestore, this.memberCollection));
        member["id"] = docRef["id"];
        return setDoc(docRef, { ...member });
    }

    getMember(id: string): Promise<DocumentSnapshot<DocumentData>> {
        const docRef: DocumentReference = doc(this.firestore, this.memberCollection, id);
        return getDoc(docRef); 
    }

    editMember(id: string, data: any): Promise<void> {
        const docRef: DocumentReference = doc(collection(this.firestore, this.memberCollection), id);
        return updateDoc(docRef, { ...data });
    }

    deleteMember(): void {

    }
}
