import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPhoto } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: IPhoto[] = [];
  rows: any[] = [];

  constructor() { }

  //Verifica se alguma Inbound Property (propriedades decoradas com decorator Input()) sofreu alguma mudança
  //Caso tenha sofrido o parâmetro changes terá uma propriedade com o mesmo nome 
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos)
      this.rows = this.groupColumns(this.photos);
  }

  groupColumns(photos: IPhoto[]) {
    const newRows = [];

    for(let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }

    return newRows;
  }
}
