import { Component } from "@angular/core";

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
})
export class PhotoComponent {
    
    description = "Cachorro";
    url = "https://picsum.photos/id/237/200/300";
}