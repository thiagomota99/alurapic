import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignInComponent } from './sigin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { SignUpService } from './signup/signup.service';

@NgModule({
    declarations: [ 
        SignInComponent,
        SignUpComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        VMessageModule,
        HttpClientModule,
        HomeRoutingModule, //Módulo de rotas do HomeModule
    ],
    providers: [ SignUpService ] //Disponibilizando serviço para todos os componentes do módulo
})
export class HomeModule { }