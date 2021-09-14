import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignInComponent } from './sigin/signin.component';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
    declarations: [ 
        SignInComponent,
        SignUpComponent,
    ],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        VMessageModule,
        HttpClientModule,
        RouterModule,
    ]
})
export class HomeModule { }