import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { UserNotTakenValidatorService } from './user-not-taken.validators.service';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit { 

    signupForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService
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
}