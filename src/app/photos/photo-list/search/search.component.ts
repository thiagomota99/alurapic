import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {

    //Criando uma output property que irá representar um evento customizado do componente search-component
    //o retorno deste evento continuará sendo um $event. Entretanto $event terá o valor que definirmos aqui para ele
    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
    @Input() value: string = '';
    
    debounce: Subject<string> = new Subject<string>(); //Criando um subject
    
    constructor() { }

    //Utilizando um dos ciclos de vida do Angular
    ngOnInit(): void {
        this.debounce.pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter)); //o objeto EventEmiiter possui o método emit que é responsável por emitir um valor, este valor será $event do evento.
    }
    
    //Método que será executando quando o componente for destruído
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}