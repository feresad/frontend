import { Panne } from "./panne";

export class Machine {
    id? :any;
    name: string ='';
    etat: boolean = false;
    pannes: Panne[] = [];
    username: string = '';
    date? : Date;
}
