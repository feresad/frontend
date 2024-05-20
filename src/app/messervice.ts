    import { Injectable } from "@angular/core";
    import { Observable, catchError, map, throwError } from "rxjs";
    import { Produit } from "./produit";
    import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
    import { Machine } from "./machine";
    import { Consommationn } from "./consommationn";
import { Users } from "./users";
import { Role } from "./role";
import { jwtDecode } from "jwt-decode";
import { Rebut } from "./rebut";
import { Panne } from "./panne";
import { OrdreFabrication } from "./ordre-fabrication";
import { Planproduit } from "./planproduit";
import { tap } from 'rxjs/operators';
    @Injectable({ 
        providedIn: 'root'
    })

    export class mesService {

        private PURL = 'http://localhost:8080/produits/';
        private MURL = 'http://localhost:8080/machines/';
        private CURL = 'http://localhost:8080/consommations/';
        private RURL = 'http://localhost:8080/rebut/';
        private AURL = 'http://localhost:8080/auth/';
        private OURL = 'http://localhost:8080/ordreFabrication/';
    

        private handleError(error: any) {
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

        //Produit
        getProduitsList(): Observable<Produit[]> {
            return this.httpClient.get<Produit[]>(`${this.PURL}all`);
        }
        getProduitFini(): Observable<Produit[]> {
            return this.httpClient.get<Produit[]>(`${this.PURL}produitFini`);
        }
        getProduitConso(): Observable<Produit[]> {
            return this.httpClient.get<Produit[]>(`${this.PURL}produitConso`);
        }
        getProduit(id: number): Observable<Produit> {
            return this.httpClient.get<Produit>(`${this.PURL}${id}`);
        }
        ajoutProduitConso(produit: Produit): Observable<Produit> {
            return this.httpClient.post<Produit>(`${this.PURL}addConso`, produit);
        }
        ajoutProduitFini(produit: Produit): Observable<Produit> {
            return this.httpClient.post<Produit>(`${this.PURL}addFini`, produit, this.getHttpOptions())
              .pipe(
                catchError((error: HttpErrorResponse) => {
                  if (error.error instanceof ErrorEvent) {
                    throw new Error(`Error: ${error.error.message}`);
                  } else {
                    if (error.error.message) {
                      return throwError(() => new Error(error.error.message)); 
                    } else {
                      return throwError(() => new Error('An error occurred; please try again later.'));
                    }
                  }
                })
              );
          }
        deleteProduit(id: number): Observable<Object> {
            return this.httpClient.delete(`${this.PURL}delete/${id}`);
        }
    
        editProduitFinis(id: number, produit: Produit): Observable<Produit> {
            return this.httpClient.put<Produit>(`${this.PURL}fini/${id}`, produit, this.getHttpOptions())
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = 'An error occurred';
                        if (error.error instanceof Object && error.error.message) {
                            errorMessage = error.error.message;
                        }
                        return throwError(() => new Error(errorMessage));
                    })
                );
        }
        editProduitConso(id: number,produit: Produit): Observable<Produit> {
            return this.httpClient.put<Produit>(`${this.PURL}conso/${id}`, produit);
        }
        CountProduit(): Observable<number> {
            return this.httpClient.get<number>(`${this.PURL}count`);
        }
        SearchProduit(name: string): Observable<Produit[]> {
            return this.httpClient.get<Produit[]>(`${this.PURL}search?name=${name}`);
        }
        getPlanProduitByProduitFini(id: number): Observable<Planproduit> {
            return this.httpClient.get<Planproduit>(`${this.PURL}plan/${id}`);
        }
        getProduitFiniById(id: number): Observable<Produit> {
            return this.httpClient.get<Produit>(`${this.PURL}produitFini/${id}`);
        }
        getProduitFiniStatistiques(): Observable<{ [key: string]: number }> {
            return this.httpClient.get<{ [key: string]: number }>(`${this.PURL}statistiques`);
        }

        //ordre de fabrication
        getOrdresFabrication(): Observable<OrdreFabrication[]> {
        return this.httpClient.get<OrdreFabrication[]>(`${this.OURL}all`).pipe(
            catchError((error) => throwError(() => new Error('Erreur lors de la récupération des ordres')))
        );
    }
        ajoutOrdreFabrication(ordre: OrdreFabrication): Observable<OrdreFabrication> {
            return this.httpClient.post<OrdreFabrication>(`${this.OURL}add`, ordre, this.getHttpOptions());
        }
        deleteOrdreFabrication(id: number): Observable<Object> {
            return this.httpClient.delete(`${this.OURL}${id}`, this.getHttpOptions());
        }
        getOrdreFabricationById(id: number): Observable<OrdreFabrication> {
            return this.httpClient.get<OrdreFabrication>(`${this.OURL}${id}`, this.getHttpOptions());
        }
        modifierOrdreFabrication(id: number, ordre: OrdreFabrication): Observable<OrdreFabrication> {
            return this.httpClient.put<OrdreFabrication>(`${this.OURL}${id}`, ordre, this.getHttpOptions());
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
        editMachine(id: number, machine: Machine): Observable<Machine> {
            return this.httpClient.put<Machine>(`${this.MURL}${id}`, machine, this.getHttpOptions());
          }
        CountMachine(): Observable<number> {
            return this.httpClient.get<number>(`${this.MURL}count`);
        }
        SearchMachine(etat: boolean): Observable<Machine[]> {
            return this.httpClient.get<Machine[]>(`${this.MURL}search?etat=${etat}`);
        }
        getMachinesByName(machineName: string): Observable<Machine[]> {
            return this.httpClient.get<Machine[]>(`${this.MURL}searchMachine?name=${machineName}`);
        }
        getPanneList(): Observable<Panne[]> {
            return this.httpClient.get<Panne[]>(`${this.MURL}pannes`);
        }
        getPanneById(id: number): Observable<Panne> {
            return this.httpClient.get<Panne>(`${this.MURL}pannes/${id}`);
        }
        addPannetoMachine(machineId: number, panneIds: number[], username: string): Observable<Machine> {
            const requestBody = { 
                panneIds: panneIds, 
                username: username 
            }; 
            // Use the updated endpoint
            return this.httpClient.put<Machine>(`${this.MURL}add-panne/${machineId}`, requestBody, this.getHttpOptions());
        }
        getMachinesEnPanne(): Observable<Machine[]> {
            return this.httpClient.get<Machine[]>(`${this.MURL}enpanne`);
        }
        getMachineStatistiques(): Observable<{ [key: string]: number }> {
            return this.httpClient.get<{ [key: string]: number }>(`${this.MURL}statistiques`);
        }


        // Consommations
        getConsommationsList(): Observable<Consommationn[]> {
            return this.httpClient.get<Consommationn[]>(`${this.CURL}all`);
        }
        countConsommation(): Observable<number> {
            return this.httpClient.get<number>(`${this.CURL}count`);
        }
        ajoutConsommation(consommation: Consommationn): Observable<Consommationn> {
            return this.httpClient.post<Consommationn>(`${this.CURL}add`, consommation);
        }
        getConsommation(id: number): Observable<Consommationn> {
            return this.httpClient.get<Consommationn>(`${this.CURL}${id}`);
        }
        editConsommation(id: number, consommation: Consommationn): Observable<Consommationn> {
            return this.httpClient.put<Consommationn>(`${this.CURL}${id}`, consommation);
        }
        getConsommationsByMachineId(machineId: number): Observable<Consommationn[]> {
            return this.httpClient.get<Consommationn[]>(`${this.CURL}machine/${machineId}`);
        }
        deleteConsommation(id: number): Observable<Object> {
            return this.httpClient.delete(`${this.CURL}${id}`);
        }

        // Rebut
        getRebutList(): Observable<Rebut[]> {
            return this.httpClient.get<Rebut[]>(`${this.RURL}all`);
        }
        addRebut(rebut: Rebut): Observable<Rebut> {
            return this.httpClient.post<Rebut>(`${this.RURL}add`, rebut);
        }
        deleteRebut(id: number): Observable<Object> {
            return this.httpClient.delete(`${this.RURL}${id}`);
        }
        getRebut(id: number): Observable<Rebut> {
            return this.httpClient.get<Rebut>(`${this.RURL}${id}`);
        }
        editRebut(id: number, Rebut: Rebut): Observable<Rebut> {
            return this.httpClient.put<Rebut>(`${this.RURL}${id}`, Rebut, this.getHttpOptions());
          }
          getRebutByProduitFini(idProduitFini: number): Observable<Rebut[]> {
            return this.httpClient.get<Rebut[]>(`${this.RURL}produit/${idProduitFini}`);
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

        register(username: string, email: string, password: string, role: string): Observable<any> {
            return this.httpClient.post(`${this.AURL}signup`, {
                username,
                email,
                password,
                role
            }).pipe(
                catchError(this.handleError)
            );
        }
        getUserInfo(username : string): Observable<Users> {
            return this.httpClient.get<Users>(`${this.AURL}user/${username}`, this.getHttpOptions()).pipe(
                catchError(this.handleError)
            );
        }
        getUserInfoById(id:number): Observable<Users> {
            return this.httpClient.get<Users>(`${this.AURL}${id}`, this.getHttpOptions()).pipe(
                catchError(this.handleError)
            );
        }
        logout(): Observable<any> {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            return this.httpClient.post(`${this.AURL}signout`, {}, this.getHttpOptions())
                .pipe(catchError(this.handleError));
        }
        updateUser(username: string, user: Users): Observable<any> {
            return this.httpClient.put(`${this.AURL}update/${username}`, user, this.getHttpOptions())
              .pipe(
                tap(() => {
                    // Mettre à jour le nom d'utilisateur dans le stockage local
                    localStorage.setItem('username', user.username);
                }),
                catchError(this.handleError)
              );
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
        changePassword(id: number, newPassword: string): Observable<any> {
            const url = `${this.AURL}/${id}`; // Utilisation de l'ID de l'utilisateur à changer
            return this.httpClient.put(url, { password: newPassword }, this.getHttpOptions());
        }
        
        //delete user
        deleteUser(id: any): Observable<Object> {
            return this.httpClient.delete(`${this.AURL}${id}`, this.getHttpOptions());
        }
        countUser(): Observable<number> {
            return this.httpClient.get<number>(`${this.AURL}count`, this.getHttpOptions());
        }
        searchUser(username: string): Observable<Users> {
            return this.httpClient.get<Users>(`${this.AURL}search?username=${username}`, this.getHttpOptions()).pipe(
                catchError(this.handleError)
            );
        }
    
    }