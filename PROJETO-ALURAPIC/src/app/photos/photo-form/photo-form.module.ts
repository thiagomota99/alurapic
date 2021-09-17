import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
    declarations: [ PhotoFormComponent ],
    imports: [ 
        CommonModule,
        FormsModule,
        VMessageModule,
        ReactiveFormsModule,
        RouterModule,
    ]
})
export class PhotoFormModule {

}