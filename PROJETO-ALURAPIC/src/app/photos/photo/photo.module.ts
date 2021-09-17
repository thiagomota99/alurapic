import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoComponent } from './photo.component';

@NgModule({
    declarations: [ PhotoComponent ],
    imports: [
        CommonModule, //CommomModule possui as diretivas do Angular para que possamos utiliza-las em nossos módulos de feature        
    ],
    exports: [
        PhotoComponent, //Exportando o componente PhotoComponent
    ]
})
export class PhotoModule { }