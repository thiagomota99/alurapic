import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
    templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit{ 

    //Utilizando Observables para carregar os dados no template de forma assíncrona
    photo$: Observable<IPhoto>
    photoId: number;

    //Injentando serviços necessários:
    constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
    ) { }
    
    ngOnInit(): void {
        //Capturando o parâmetro da rota
        this.photoId = this.activatedRoute.snapshot.params?.photoId;

        //Recebendo e atribuindo o valor da função para um observable de IPhoto
        this.photo$ = this.photoService.findById(this.photoId);
    }

    remover(): void {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(
                () => this.router.navigate(['']), //Caso o retorno seja sucesso, redirecione para a tela de fotos do usuário
                (err:HttpErrorResponse) => alert(`Ops, aconteceu algum problema ${err.message}`) //Caso aconteça algum erro, informe o usuário com um alert
            );
    }
}