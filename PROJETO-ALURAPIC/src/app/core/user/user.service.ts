import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from '../token/token.service';
import * as jwt_decode from 'jwt-decode';
import { IUser } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService { 

    //Criação de um BehaviorSubject para emitir valores. Onde o valor padrão a ser emitido é null
    private userSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    private userName: string = '';

    //Injetando o serviço de token
    constructor(private tokenService: TokenService) { 
        //Caso tenha algum token no browser execute o método decodeAndNotify
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    //Setando o token no localStorage do navegador e notificando que usuário está logado
    setToken(token:string): void {
        this.tokenService.setToken(token);
        this.decodeAndNotify();        
    }

    //Retornando um observable do subject userSubject
    getUser(): Observable<IUser> { 
        return this.userSubject.asObservable();
    }

    private decodeAndNotify(): void {
        const token = this.tokenService.getToken(); //Pegando o token do localStorage        
        const user = jwt_decode(token) as IUser; //Decodificando o token, pegando pay-load do token e transformando em um objeto do IUser
        this.userName = user.name; //Atribui o nome do usuário logado ao atributo userName
        this.userSubject.next(user); //Emitindo o valor decodificado do token
    }

    //Quando o usuário clicar em logout
    logout() {
        this.tokenService.removeToken(); //remove o token do localStorage
        this.userSubject.next(null); //Emite um valor null para limpar o nome do usuário logado no template do HeaderComponent
    }

    //Verifica se o usuário está logado
    isLogged(): boolean {
        return this.tokenService.hasToken(); //Se tem token, o usuári está logado
    }

    //Retorna o nome do usuário logado
    getUserName(): string {
        return this.userName;
    }
}