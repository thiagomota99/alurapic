import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { INewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validators.service';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit { 

    signupForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email] ], //A segunda posição do array aceita um array de Validators
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName: ['', 
                [
                    Validators.required, 
                    Validators.minLength(2), 
                    lowerCaseValidator,
                    Validators.maxLength(30)
                ], 
                this.userNotTakenValidatorService.checkUserNameTaken() //A terceira posição do array de inputs é para validators assíncronos
            ],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
        });
    }

    signup(): void {
        const newUser = this.signupForm.getRawValue() as INewUser;
        this.signUpService.signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => alert(`Falhao ao criar o usuário ${err.message}`)
            );
    }
}