import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { INewUser } from './new-user';

const API_URL = 'http://localhost:3000';
@Injectable()
export class SignUpService { 
    
    //Injetando serviço httpClient
    constructor(private httpClient: HttpClient) { }

    //Verifica a existência de um userName caso exista retorna um observable do tipo boolean
    checkUserNameTaken(userName:string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${API_URL}/user/exists/${userName}`);
    }

    //Criando um novo usuário
    signup(newUser: INewUser): Observable<void> {
        return this.httpClient.post<void>(`${API_URL}/user/signup`, newUser);
    }    
}