import { Component, Input } from '@angular/core';


@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
})
export class PhotoComponent {
    
    //Definindo propriedades como Inbound Properties: Poderão receber valores a partir de outros componentes
    @Input() description = "";
    @Input() url = "";
}