import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produit } from "./produit";
import { HttpClient } from "@angular/common/http";

@Injectable({ 
    providedIn: 'root'
})

export class mesService {

    private PURL = 'http://localhost:8080/produits/';
    private MURL = 'http://localhost:8082/machines/';

    constructor(private httpClient: HttpClient) { }

    getProduitsList(): Observable<Produit[]> {
        return this.httpClient.get<Produit[]>(`${this.PURL}all`);
    }
    getMachinesList(): Observable<Produit[]> {
        return this.httpClient.get<Produit[]>(`${this.MURL}all`);
    }
    getProduit(id: number): Observable<Produit> {
        return this.httpClient.get<Produit>(`${this.PURL}${id}`);
    }

    ajouterProduit(produit: Produit): Observable<Produit> {
        return this.httpClient.post<Produit>(`${this.PURL}add`, produit);
    }

    deleteProduit(id: number): Observable<Object> {
        return this.httpClient.delete(`${this.PURL}${id}`);
    }
    
    editProduit(id: number,produit: Produit): Observable<Produit> {
        return this.httpClient.put<Produit>(`${this.PURL}${id}`, produit);
    }
}