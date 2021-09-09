import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';


@NgModule({
    declarations: [ 
        PhotoComponent, //Declarando componente em um módulo
        PhotoListComponent //Declarando componente em um módulo
    ],
    imports: [
        HttpClientModule, //Colocando o import do HttpClient, onde o mesmo fornece um provider configurado que sabe criar um objeto do tipo HttpClient
    ],
})
export class PhotosModule {

}