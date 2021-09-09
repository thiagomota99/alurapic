import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  
  photos: object[] = []; 

  //Injetando o HttpClient no componente através do construtor
  constructor(private http: HttpClient) { 

    //Utilizando o método get do HttpClient para fazer a busca dos dados na API,
    //Onde o primeiro parâmetro é a url da API

    //Logo depois utilizamos o método subscribe para realizar de fato a consulta pelo endereço
    //o primeiro parâmetro é o retorno da consulta, e o segundo é caso ocorra algum erro durante o acesso
    this.http
    .get<object[]>('http://localhost:3000/flavio/photos')
    .subscribe(
      photos => this.photos = photos, //Primeiro parâmetro do subscribe 
      err => console.log(err) //Segundo parâmetro do subscribe
    );
  }

 

} 
