import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SignInComponent implements OnInit, AfterViewInit {

    //Criamos o atributo do tipo FormGroup que possui os métodos para manipular o formulário HTML
    public loginForm: FormGroup;

    //Injentando um elemento do template com o decorator ViewChild
    @ViewChild('userNameTemplate') userNameTemplate: ElementRef<HTMLInputElement>;

    //Injetando serviço do Angular que consegue construir um objeto do tipo FormGroup
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetector: PlatformDetectorService,
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

    //Este método do ciclo de vida será executado após o carregamento do template do componente
    ngAfterViewInit(): void {
        this.platformDetector.isPlatformBrowser() && //Verifica se o código está rodando no browser ou não
            this.userNameTemplate.nativeElement.focus(); //Aplicando foco ao compo de userName do formulário.  
    }

    login(): void {
        const userName = this.loginForm.get('userName').value; //Pegando o valor do campo userName
        const password = this.loginForm.get('password').value; //Pegando o valor do campo password

        this.authService
            .authenticate(userName,password)
            .subscribe(
                () => this.router.navigate(['user',userName]), //Redirecionando usuário após autenticação
                err => {
                    this.loginForm.reset(); //Limpa os campos do formulário
                    this.platformDetector.isPlatformBrowser() && //Verifica se o código está rodando no browser ou não
                        this.userNameTemplate.nativeElement.focus(); //Aplicando foco ao compo de userName do formulário.                    
                    alert(`Erro: ${err.message}`);
            });
    }
}