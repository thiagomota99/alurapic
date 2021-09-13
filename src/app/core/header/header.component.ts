import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent { 
    
    /*Criando um observable do tipo IUser*/
    user$: Observable<IUser>;

    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.user$ = this.userService.getUser();
    }
    
    //deslogando do sistema
    logout(): void {
        this.userService.logout();
        this.router.navigate(['']); //redirecionando para a tela de login
    }
}