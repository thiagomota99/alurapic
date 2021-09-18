import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo/photo.service';
import { IPhotoComment } from '../photo-comment';

@Component({
    selector: 'ap-photo-comment',
    templateUrl: 'photo-comments.component.html',
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
        const commentText = this.commentsForm.get('comments').value;
        this.photoService
            .addComent(this.photoId, commentText)
            .subscribe(() => {
                    this.commentsForm.reset();
                    alert('Comentário realizado com sucesso!');
                },
                err => alert(`Ops, tivemos um problema: ${err.message}`)
            );
    }
}