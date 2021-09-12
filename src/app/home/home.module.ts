import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignInComponent } from './sigin/signin.component';

@NgModule({
    declarations: [ SignInComponent ],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        VMessageModule,
        HttpClientModule,
    ]
})
export class HomeModule { }