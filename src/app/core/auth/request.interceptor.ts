import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

/*ESTE INTERCEPTADOR SERÁ CHAMADO TODA VEZ QUE FOR FEITA UMA REQUISIÇÃO PARA O BACK-END*/
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //Caso o usuário esteja logado, ou seja tenha um token
        if(this.tokenService.hasToken()) {
            const token = this.tokenService.getToken(); //Pega o token
            req = req.clone({ //Clona requisição passando um objeto javascript para setar o token no cabeçalho da requisição
                setHeaders: {
                    'x-access-token': token
                }
            });
        }

        return next.handle(req); //Indica que não foi feito nenhuma mudança na requisição
    }
}
    
    

