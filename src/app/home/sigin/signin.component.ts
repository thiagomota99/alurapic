import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SignInComponent implements OnInit {

    //Criamos o atributo do tipo FormGroup que possui os métodos para manipular o formulário HTML
    public loginForm: FormGroup;

    //Injetando serviço do Angular que consegue construir um objeto do tipo FormGroup
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) { } 

    ngOnInit(): void {
        //Atribuindo a referência do FormGroup criado pelo método group do formBuilder
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required ], //Campos do formulário que serão gerenciados pelo atributo loginForm
            password: ['', Validators.required ], //Campos do formulário que serão gerenciados pelo atributo loginForm
        });

        /*
            O método group do formBuilder espera um objeto onde o nome das propriedades é nomes dos campos do formulário
            e estas propriedades esperam um array, a primeira posição do array é o valor do campo, a segunda são as validações
            que o campo terá
        */
    }

    login(): void {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName,password)
            .subscribe(
                () => console.log('autentitcado'),
                err => alert(`Erro: ${err.message}`)
            );
    }
}