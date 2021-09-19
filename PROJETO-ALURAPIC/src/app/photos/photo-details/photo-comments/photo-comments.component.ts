import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { PhotoService } from '../../photo/photo.service';
import { IPhotoComment } from '../photo-comment';

@Component({
    selector: 'ap-photo-comment',
    templateUrl: 'photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent { 

    @Input() photoId: number;
    comments$: Observable<IPhotoComment[]>;
    commentsForm: FormGroup;
    textoError: string = 'Max lenght is 300';

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {        
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentsForm = this.formBuilder.group({
            comments: ['', Validators.maxLength(300)]
        });
    }

    save(): void {
        /*
            O operador switchMap cancela o Observable anterior passando o fluxo para um novo Observable, garantindo assim que a emissão tenha apenas o valor emitido pelo Observable retornado por switchMap.
         */

        const commentText = this.commentsForm.get('comments').value as string;
        this.comments$ = this.photoService
            .addComent(this.photoId, commentText) //recebendo o observable do método addComent()
            .pipe(switchMap(() =>  this.photoService.getComments(this.photoId))) //Após o observable de cima completar, passe o fluxo para um outro observable
            .pipe(tap(() => { //Quando o switchMap terminar sua operação, o operador tap vai realizar um side-effect (mudança na página)
                this.commentsForm.reset(); //Reseta o formulário
                alert('Comentário realizado com sucesso!'); //Exibe um alerta
            }))
            .pipe(catchError(err => { //Caso algum observable falhe por algum motivo, este pipe será executando retornando uma excessão
                alert(`Ops, algo deu errado ${err.message}`);
                return throwError(err);
            }))
    }
}