export enum Role {
    LOGOGENIST = "logogenist",
    ADMINISTRATOR = "administrator"
}

export interface RouteData {
    title: string;
    roles: Role[];
}