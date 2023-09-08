import { Timestamp } from "firebase/firestore";

export interface MinistryModel {
    id: string,
    name: string,
    active: boolean,
    created: Timestamp,
    modified: Timestamp
    created_by: string,
    modified_by: string,
}