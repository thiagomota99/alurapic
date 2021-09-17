import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { HomeComponent } from './home.component';
import { SignInComponent } from './sigin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        //Rota filhas de HomeComponent
        canActivate: [AuthGuard], //Adicionando guarda de rota a tela de login da aplicação
        children: [
            {
                path: '',
                component: SignInComponent, //Quando a url for http://localhost:4200/ será renderizado o template do component SignInComponent                
            },
            {
                path: 'signup',
                component: SignUpComponent, //Quando a url for http://localhost:4200/signup será renderizado o template do component SignUpComponent
            },
        ]
    },
]

@NgModule({
    imports: [ 
        CommonModule, 
        RouterModule.forChild(routes),
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }