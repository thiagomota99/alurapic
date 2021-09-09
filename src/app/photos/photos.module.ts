import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";

@NgModule({
    declarations: [ 
        PhotoComponent //Declarando componente em um módulo
    ],
    imports: [
        HttpClientModule, //Colocando o import do HttpClient, onde o mesmo fornece um provider configurado que sabe criar um objeto do tipo HttpClient
    ],
    exports: [ 
        PhotoComponent //Exportando o componente para tornar acessível para quem importar PhotosModule
    ]
})
export class PhotosModule {

}