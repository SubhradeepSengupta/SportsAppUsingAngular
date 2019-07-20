export class User {
    id : number;
    name : string;
    role : UserRole;
    userrole : string;
    userTestMappers : object;
}

export enum UserRole {
    Coach,
    Athlete
}
