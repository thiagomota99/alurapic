import { Component, Input } from '@angular/core';
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

    constructor(private photoService: PhotoService) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
    }
}