import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
})
export class SignUpService { 
    
    

    //Injetando serviço httpClient
    constructor(private httpClient: HttpClient) { }

    //Verifica a existência de um userName caso exista retorna um observable do tipo boolean
    checkUserNameTaken(userName:string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${API_URL}/user/exists/${userName}`);
    }
}