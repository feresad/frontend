import { MatierePremier } from "./matiere-premier";

export class Produit {
    id?: any;
    name: string ='';
    matieresPremieres: MatierePremier[] = [];
    quantite: number=0;
    quantiteRestante : number=0;
    etat! : number
    date? : Date
}
