import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { DarkenOnHoverModule } from 'src/app/shared/directive/darken-on-hover/darken-on-hover.module';

import { PhotoModule } from '../photo/photo.module';
import { FilterByDescriptionPipe } from './filter-by-description.pipe';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        PhotoListComponent,
        PhotosComponent,
        SearchComponent,
        LoadButtonComponent,
        FilterByDescriptionPipe,        
    ],
    imports: [ 
        CommonModule, //CommomModule possui as diretivas do Angular para que possamos utiliza-las em nossos módulos de feature
        PhotoModule,
        CardModule,
        DarkenOnHoverModule,
        HttpClientModule, //Colocando o import do HttpClient, onde o mesmo fornece um provider configurado que sabe criar um objeto do tipo HttpClient
        RouterModule,
    ] 
})
export class PhotoListModule {

}