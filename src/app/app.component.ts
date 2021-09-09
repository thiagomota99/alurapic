import { Component } from '@angular/core';
import { IPhoto } from './photos/photo/photo';
import { PhotoService } from './photos/photo/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  
  photos: IPhoto[] = []; 

  //Injetando o serviço PhotoService no componente através do construtor
  constructor(private photoService: PhotoService) { 
    //Se inscrevendo no método do serviço PhotoService que retorna um observable de IPhoto[]
    this.photoService.listFromUser('flavio')
      .subscribe(photos => this.photos = photos);
  }
} 
