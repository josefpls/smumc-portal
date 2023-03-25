import { Timestamp } from "firebase/firestore";

export interface Member {
    id: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    birthday: Timestamp,
    active: boolean,
    created: Timestamp,
    modified: Timestamp
    created_by: string,
    modified_by: string,
}
