    import { Injectable } from "@angular/core";
    import { Observable, catchError, map, throwError } from "rxjs";
    import { Produit } from "./produit";
    import { HttpClient, HttpHeaders } from "@angular/common/http";
    import { Machine } from "./machine";
    import { Consommationn } from "./consommationn";
import { Users } from "./users";
import { Role } from "./role";
import { jwtDecode } from "jwt-decode";

    @Injectable({ 
        providedIn: 'root'
    })

    export class mesService {

        private PURL = 'http://localhost:8080/produits/';
        private MURL = 'http://localhost:8080/machines/';
        private CURL = 'http://localhost:8080/consommations/';
        private RURL = 'http://localhost:8080/rebut/';
        private AURL = 'http://localhost:8080/auth/';
    

        private handleError(error: any) {
            console.error('An error occurred:', error);
            return throwError(() => new Error('An error occurred; please try again later.'));
        }
        private getHttpOptions() {
            const token = localStorage.getItem('authToken');
            return {
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'Authorization': `Bearer ${token}`
                })
            };
        }

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

        // Authentification
        login(username: string, password: string): Observable<any> {
            return this.httpClient.post(`${this.AURL}signin`, {
                username,
                password
            }).pipe(
                catchError(this.handleError)
            );
        }

        register(username: string, email: string, password: string, roles: string[]): Observable<any> {
            return this.httpClient.post(`${this.AURL}signup`, {
                username,
                email,
                password,
                role : roles
            }).pipe(
                catchError(this.handleError)
            );
        }

        logout(): Observable<any> {
            // For logout, you'd typically clear the local storage and not necessarily make a backend call
            localStorage.removeItem('authToken');
            // If backend call is needed, adjust accordingly.
            return this.httpClient.post(`${this.AURL}signout`, {}, this.getHttpOptions())
                .pipe(catchError(this.handleError));
        }

        getUsersList(): Observable<Users[]> {
            return this.httpClient.get<Users[]>(`${this.AURL}all`, this.getHttpOptions()).pipe(
                catchError(this.handleError)
            );
        }
        getRoles(): Observable<Role[]> {
            return this.httpClient.get<Role[]>(`${this.AURL}roles`, this.getHttpOptions()).pipe(
                catchError(this.handleError)
            );
        }
        //delete user
        deleteUser(id: any): Observable<Object> {
            return this.httpClient.delete(`${this.AURL}${id}`, this.getHttpOptions());
        }
        countUser(): Observable<number> {
            return this.httpClient.get<number>(`${this.AURL}count`, this.getHttpOptions());
        }
    }