import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequiresAutenticationGuard } from './core/auth/requires-autentication.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

/*Variável com a definição das rotas */
const routes: Routes = [
    {
        path: '', //para o path vazio: localhost:3000/
        pathMatch: 'full', //Considere todo o segmento da rota
        redirectTo: 'home', //e redirecione para a rota home
    },
    {
        path: 'home', //para o path home: localhost:3000/home
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule), //Carregue o módulo HomeModule e suas rotas de forma lazy loading
    },
    { 
        path: 'user/:userName', 
        component: PhotoListComponent, //Quando a url for http://localhost:4200/user/flavio será renderizado o template do component PhotoListComponent
        //Adicionamos a propriedade resolver para definir um resolver para a rota em questão
        resolve: { 
            photos: PhotoListResolver //nomeQualquerParaAPropriedade: nomeDoResolver
        }
    }, 
    { 
        path: 'p/add', 
        component: PhotoFormComponent, //Quando a url for http://localhost:4200/p/add será renderizado o template do component PhotoFormComponent
        canActivate: [RequiresAutenticationGuard]
    },
    {
        path: 'p/:photoId',
        component: PhotoDetailsComponent,        
    },
    { 
        path: '**', //Quando a url não for nenhuma das anteriores
        component: NotFoundComponent //Quando for uma url que não existe será renderizado o template do componente NotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ], //Import de módulo que configura as rotas
    exports: [ RouterModule ] //Exportando o módulo que possui as diretivas de rotas Ex: <router-outlet></router-outlet>
})
export class AppRoutingModule { }