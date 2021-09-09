import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';


@NgModule({
    declarations: [ 
        PhotoComponent, //Declarando componente em um módulo
        PhotoListComponent, //Declarando componente em um módulo
        PhotoFormComponent, //Declarando componente em um módulo
        PhotosComponent //Declarando componente em um módulo
    ],
    imports: [
        HttpClientModule, //Colocando o import do HttpClient, onde o mesmo fornece um provider configurado que sabe criar um objeto do tipo HttpClient
        CommonModule //CommomModule possui as diretivas do Angular para que possamos utiliza-las em nossos módulos de feature
    ],
})
export class PhotosModule {

}