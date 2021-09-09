import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IPhoto } from '../photo/photo';

import { PhotoService } from '../photo/photo.service';

@Injectable({providedIn: 'root'})
//Aqui estamos criando um resolver que retorna um Observable que é um array de IPhoto
export class PhotoListResolver implements Resolve<Observable<IPhoto[]>>{

    //Inejetamos o serviço para buscar as fotos
    constructor(private service: PhotoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPhoto[]> | Observable<Observable<IPhoto[]>> | Promise<Observable<IPhoto[]>> {
        const userName = route.params.userName; //Pegamos o parâmetro da rota.
        return this.service.listFromUser(userName); //retornamos o Observable da lista de Photos
    }


}