import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { IPhotoComment } from './photo-comment';

@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit{ 

    photo$: Observable<IPhoto>
    comments$: Observable<IPhotoComment>

    constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService,
    ) { }
    
    ngOnInit(): void {
        const photoId = this.activatedRoute.snapshot.params?.photoId;
        this.photo$ = this.photoService.findById(photoId);
        
    }
}