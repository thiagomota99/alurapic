import { Component, OnInit } from '@angular/core';
import { IPhoto } from './photos/photo/photo';
import { PhotoService } from './photos/photo/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//Implementando a interface OnInit que espera a implementação do método ngOnInit()
export class AppComponent implements OnInit {
  title = 'alurapic';
  
  photos: IPhoto[] = []; 

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(private photoService: PhotoService) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {    
    //Se inscrevendo no método do serviço PhotoService que retorna um observable de IPhoto[]
    this.photoService.listFromUser('flavio')
      .subscribe(photos => this.photos = photos);
  }
} 
