import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';

/*Variável com a definição das rotas */
const routes: Routes = [
    { path: 'user/:userName', component: PhotoListComponent }, //Quando a url for http://localhost:4200/user/flavio será renderizado o template do component PhotoListComponent
    { path: 'p/add', component: PhotoFormComponent }, //Quando a url for http://localhost:4200/p/add será renderizado o template do component PhotoFormComponent
    { path: '**', component: NotFoundComponent } //Quando for uma url que não existe será renderizado o template do componente NotFoundComponent
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], //Import de módulo que configura as rotas
    exports: [ RouterModule ] //Exportando o módulo que possui as diretivas de rotas Ex: <router-outlet></router-outlet>
})
export class AppRoutingModule { }