import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: IPhoto[] = [];
  filter: string = '';

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {
    const userName = this.activatedRoute.snapshot.params.userName;
    //Se inscrevendo no método do serviço PhotoService que retorna um observable de IPhoto[]
    this.photoService.listFromUser(userName)
      .subscribe(photos => this.photos = photos);
  }

}
