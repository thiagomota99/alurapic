import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit{ 

    //Utilizando Observables para carregar os dados no template de forma assíncrona
    photo$: Observable<IPhoto>
    photoId: number;

    //Injentando serviços necessários:
    constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService,
    ) { }
    
    ngOnInit(): void {
        //Capturando o parâmetro da rota
        this.photoId = this.activatedRoute.snapshot.params?.photoId;

        //Recebendo e atribuindo o valor da função para um observable de IPhoto
        this.photo$ = this.photoService.findById(this.photoId);
    }
}