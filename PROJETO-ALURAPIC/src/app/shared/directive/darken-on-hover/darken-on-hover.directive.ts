import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/*
    Toda diretiva é anotada com o decorator Directive e o selector da mesma é definido entre parênteses
*/
@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness: string = '70%'; 

    /*
        Injetando o elementRef que é a referência do componente onde a diretiva está sendo utilizada.
        Ou seja se a a diretiva estiver sendo utilizada em uma <div></div>
        o objeto ElementRef irá trazer todos as propriedades e eventos deste elemento
    */
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }
    
    /*
        Este decorator tem como objetivo interceptar qualquer evento do elemento que está utilizando a diretiva
        no nosso caso decidimos por interceptar o evento mouseover e mouseleave
    */
    @HostListener('mouseover') 
    darkenOn() {
        /*
            Aqui estamos utilizando o método setStyle() do objeto renderer 
            para atribuir um estilo ao elemento que está utilizando a diretiva
            o mesmo espera três parâmetros:
            1 - Referência do elemento que está utilizando a diretiva
            2 - Nome da propriedade CSS que queremos aplicar
            3 - Valor desta propriedade
        */
        this.renderer.setStyle(this.elementRef.nativeElement,'filter',`brightness(${this.brightness})`);            
    }

    @HostListener('mouseleave')
    darkenOff() {        
        this.renderer.setStyle(this.elementRef.nativeElement,'filter','brightness(100%)');        
    }
 }