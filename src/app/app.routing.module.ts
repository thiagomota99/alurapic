import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';

/*Variável com a definição das rotas */
const routes: Routes = [
    { path: 'user/flavio', component: PhotoListComponent },
    { path: 'p/add', component: PhotoFormComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], //Import de módulo que configura as rotas
    exports: [ RouterModule ] //Exportando o módulo que possui as diretivas de rotas Ex: <router-outlet></router-outlet>
})
export class AppRoutingModule { }