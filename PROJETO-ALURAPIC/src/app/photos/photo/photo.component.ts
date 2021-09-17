import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs';
@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
})
export class PhotoComponent {
    
    private _url:string = '';

    //Definindo propriedades como Inbound Properties: Poderão receber valores a partir de outros componentes
    @Input() description = "";
    @Input() set url(url: string) {
        //Caso a imagem não comece com 'data' ou seja, não esteja na base 64
        if (!url.startsWith('data'))
            this._url = `${CLOUD}/${url}`;
        else
            this._url = url;
    }

    get url(): string {
        return this._url;
    }
}