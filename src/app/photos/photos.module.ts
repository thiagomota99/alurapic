import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";

@NgModule({
    declarations: [ 
        PhotoComponent //Declarando componente em um módulo
    ],
    exports: [ 
        PhotoComponent //Exportando o componente para tornar acessível para quem importar PhotosModule
    ]
})
export class PhotosModule {

}