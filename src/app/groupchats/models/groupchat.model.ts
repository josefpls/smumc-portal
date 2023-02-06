import { Timestamp } from "firebase/firestore";

export interface GroupchatModel {
    id: string,
    name: string,
    link: string,
    active: boolean,
    created: Timestamp,
    updated: Timestamp,
    modified_by: string,
}