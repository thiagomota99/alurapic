import { Component, OnInit } from '@angular/core';
import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

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
