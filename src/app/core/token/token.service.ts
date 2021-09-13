import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService { 

    //Verifica se existe um token
    hasToken(): boolean { 
        return !!this.getToken();
    }

    //Pega o valor do token
    getToken(): string { 
        return window.localStorage.getItem(KEY);
    }

    //setando um token
    setToken(token:string): void { 
        window.localStorage.setItem(KEY,token);
    }

    //remove o token
    removeToken(): void { 
        window.localStorage.removeItem(KEY);
    }
}