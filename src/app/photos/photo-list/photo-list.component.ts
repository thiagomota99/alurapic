import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: IPhoto[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>(); //Criando um subject 
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
    
    this.debounce
      //Utilizando o operator debounceTime que espera como parâmetro o tempo em ms em que será considerado o retorno do subject
      //ou seja depois 300ms o último valor emitido pelo subject chegará ao subscriber
      .pipe(debounceTime(300)) 
      .subscribe(filter => this.filter = filter);
  }

  //Método que será executando quando o componente for destruído
  ngOnDestroy(): void {
    this.debounce.unsubscribe(); //Faremos o cancelamento da inscrição do Subject para evitar vazamentos de memória. Já que se caso não cancelarmos sua inscrição já que caso
                                 //o mesmo possu algum assinante (subscriber()) o mesmo ficará escutando e aguardando mundanças.
  }

  //Método que carrega os novos dados buscados na API
  loadMore() {    
    this.photoService.listFromUserPaginated(this.userName, this.currentPage = this.currentPage + 1)
    .subscribe(photos => {
      this.photos = this.photos.concat(photos); //Criando uma nova referência e fazendo this.photos apontar para essa nova referência (espaço em memória)
      if(!photos.length) this.hasMore = false; //Caso o retorno da API for um array vazio desabilitar o botão loadMore
    });
  }

}
