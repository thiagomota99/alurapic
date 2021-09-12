import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  //Método responsável por realizar uma chamada AJAX do tipo POST para o servidor
  authenticate(userName:string, password:string) {
    //Passando como dados um objeto javascript com as propriedades userName e password
    return this.httpClient.post(`${API_URL}/user/login`,{ userName, password }); 
  }
}
