import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PhotosModule } from './photos/photos.module';

@NgModule({
  declarations: [
    AppComponent,//Declarando componente em um módulo
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    AppRoutingModule, //Importando o módulo de rotas raízes da aplicação 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
