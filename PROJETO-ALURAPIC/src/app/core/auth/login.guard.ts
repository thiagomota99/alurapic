import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate{
    
    constructor(
        private userService: UserService,
        private route: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //Se o usuário estiver logado redireciona para a tela de fotos dele
        if(this.userService.isLogged()) {
            this.route.navigate(['user',this.userService.getUserName()]);
            return false;
        }
        //Caso ele esteja deslogado, redirecione-o para a tela de login
        return true;
    }
}