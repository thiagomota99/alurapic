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
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
  ) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;

    //Aqui estamos atribuindo o valor do resolver para o atributo do componente
    this.photos = this.activatedRoute.snapshot.data.photos; //this.activatedRoute.snapshot.data.nomeDaPropriedade
    //É importante lembrar que quando o resolver retorna um observable não precisamos assinar o método. Pois o Angular
    //automaticamente faz esse processo devolvendo de fato apenas o valor do observable.
  }

  //Método que carrega os novos dados buscados na API
  loadMore() {    
    this.photoService.listFromUserPaginated(this.userName, this.currentPage = this.currentPage + 1)
    .subscribe(photos => {
      this.filter = '';
      this.photos = this.photos.concat(photos); //Criando uma nova referência e fazendo this.photos apontar para essa nova referência (espaço em memória)
      if(!photos.length) this.hasMore = false; //Caso o retorno da API for um array vazio desabilitar o botão loadMore
    });
  }

}
