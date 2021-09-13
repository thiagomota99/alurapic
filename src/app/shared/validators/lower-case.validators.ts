import { FormControl } from '@angular/forms';

//Validator Customizado
export function lowerCaseValidator(control: FormControl) { //Recebe como parâmetro um control (input do formulário) do tipo FormControl
    //Verifica se o campo se o valor do campo está vazio e se atende a expressão regular
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) 
        return { lowerCase: true }; //Retorna um objeto com a propriedade lowerCase: true caso campo esteja inválido
    return null; //Caso o campo esteja válido retorna null
}