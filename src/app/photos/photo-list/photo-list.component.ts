import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: IPhoto[] = [];
  filter: string = '';

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(private activatedRoute: ActivatedRoute) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {
    //Aqui estamos atribuindo o valor do resolver para o atributo do componente
    this.photos = this.activatedRoute.snapshot.data.photos; //this.activatedRoute.snapshot.data.nomeDaPropriedade

    //É importante lembrar que quando o resolver retorna um observable não precisamos assinar o método. Pois o Angular
    //automaticamente faz esse processo devolvendo de fato apenas o valor do observable.
  }

}
