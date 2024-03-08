import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produit } from "./produit";
import { HttpClient } from "@angular/common/http";
import { Machine } from "./machine";
import { Consommationn } from "./consommationn";

@Injectable({ 
    providedIn: 'root'
})

export class mesService {

    private PURL = 'http://localhost:8080/produits/';
    private MURL = 'http://localhost:8080/machines/';
    private CURL = 'http://localhost:8080/consommations/';
    private RURL = 'http://localhost:8080/rebut/';

    constructor(private httpClient: HttpClient) { }

    getProduitsList(): Observable<Produit[]> {
        return this.httpClient.get<Produit[]>(`${this.PURL}all`);
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
    CountProduit(): Observable<number> {
        return this.httpClient.get<number>(`${this.PURL}count`);
    }
    SearchProduit(name: string): Observable<Produit[]> {
        return this.httpClient.get<Produit[]>(`${this.PURL}search?name=${name}`);
    }
    


    // Machines 
    getMachinesList(): Observable<Machine[]> {
        return this.httpClient.get<Machine[]>(`${this.MURL}all`);
    }
    getMachineDetails(id: number): Observable<Machine> {
        return this.httpClient.get<Machine>(`${this.MURL}${id}`);
    }
    ajouterMachine(machine: Machine): Observable<Machine> {
        return this.httpClient.post<Machine>(`${this.MURL}add`, machine);
    }
    deleteMachine(id: number): Observable<Object> {
        return this.httpClient.delete(`${this.MURL}${id}`);
    }
    editMachine(id: number,machine: Machine): Observable<Machine> {
        return this.httpClient.put<Machine>(`${this.MURL}${id}`, machine);
    }
    CountMachine(): Observable<number> {
        return this.httpClient.get<number>(`${this.MURL}count`);
    }
    SearchMachine(etat: boolean): Observable<Machine[]> {
        return this.httpClient.get<Machine[]>(`${this.MURL}search?etat=${etat}`);
    }

    // Consommations
    getConsommationsList(): Observable<Consommationn[]> {
        return this.httpClient.get<Consommationn[]>(`${this.CURL}all`);
    }
    countConsommation(): Observable<number> {
        return this.httpClient.get<number>(`${this.CURL}count`);
    }

    // Rebut
    getRebutList(): Observable<Produit[]> {
        return this.httpClient.get<Produit[]>(`${this.RURL}all`);
    }
}