import { QuantiteConso } from "./quantite-conso";

export class Consommationn {
    id?: any;
    quantiteMatiereConso: QuantiteConso[] = [];
    idProduitFini?: any;
    idMachine?: any;
    nomProduit?: string;
    nomMachine?: string;
}
