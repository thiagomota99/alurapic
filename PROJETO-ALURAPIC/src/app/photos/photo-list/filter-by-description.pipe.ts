import { Pipe, PipeTransform } from '@angular/core';
import { IPhoto } from '../photo/photo';

@Pipe({
    name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {

    //Primeiro parâmetro é o valor é a propriedade que queremos aplicar o pipe, o segundo são os critérios para transformação
    transform(photos: IPhoto[], description: string) {
        description = description.trim().toLowerCase();

        if(description) {
            return photos.filter(photo => 
                photo.description.toLowerCase().includes(description)
            );
        } else {
            return photos;
        }
        
    }
}