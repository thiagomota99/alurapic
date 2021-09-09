import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Injetando o HttpClient no componente através do construtor
  constructor(private http: HttpClient) { 
    console.log(http);
  }

  title = 'alurapic';
  
  photos: any[] = [];  

} 
