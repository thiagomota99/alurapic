import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ImmediateClickModule } from 'src/app/shared/directive/immediate-click/immediate-click.module';
import { PhotoModule } from '../photo/photo.module';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
    declarations: [ PhotoFormComponent ],
    imports: [ 
        CommonModule,
        FormsModule,
        VMessageModule,
        ReactiveFormsModule,
        RouterModule,
        PhotoModule,
        ImmediateClickModule,
    ]
})
export class PhotoFormModule {

}