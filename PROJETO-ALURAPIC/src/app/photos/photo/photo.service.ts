import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPhotoComment } from '../photo-details/photo-comment';
import { IPhoto } from './photo';


const API = 'http://localhost:3000';

/*
Todas classes de serviços são decoradas com o decorator Injectable()
onde esse decorator nos permite injetar este serviço no componente.
Já a propriedade providedIn com o valor 'root' indica que qualquer componente
que quiser utilizar esse serviço conseguirá apenas injentando-o em seu constructor
e que SÓ SERA CRIADA APENAS UMA INSTÂNCIA da classe de serviço PhotoService PARA TODA APLICAÇÃO.
OU SEJA, TODOS OS COMPONENTES COMPARTILHARÃO A MESMA INSTÂNCIA DO SERVIÇO
*/
@Injectable({providedIn: 'root'})
export class PhotoService {

    //Injetando o HttpClient na classe de serviço PhotoService
    constructor(private httpClient: HttpClient) { }

    //retornando um observable de IPhoto[]. Quem faz o subscriber é o componente que está injetando o serviço
    listFromUser(userName: string): Observable<IPhoto[]>{
        //Utilizando o método get do HttpClient para fazer a busca dos dados na API,
        //Onde o primeiro parâmetro é a url da API
        return this.httpClient.get<IPhoto[]>(`${API}/${userName}/photos`);        
    }

    //Retornando uma lista de fotos paginada. Onde cada página me retorna até 12 fotos
    listFromUserPaginated(userName: string, page: number): Observable<IPhoto[]>{
        const params = new HttpParams().append('page',page.toString()); //Criando um objeto do tipo HttpParams que nos permite passar QueryParams na url
        //Método append espera no primeiro parâmetro o nome do parâmetro e o segundo o valor do mesmo.

        return this.httpClient.get<IPhoto[]>(`${API}/${userName}/photos`,{ params }); //O método get do HttpClient espera um objeto com a propriedade params do tipo HttpParams
    }

    upload(file: File, description: string, allowComments: boolean) {
        //Quando o formulário possuir envio de arquivos
        //temos que mandar os campos a partir de um objeto do tipo FormData
        const formData = new FormData();
        formData.append('imageFile', file);
        formData.append('description',description);
        formData.append('allowComments', allowComments ? 'true' : 'false');

        return this.httpClient.post(`${API}/photos/upload`,formData);
    }

    //Buscar uma foto por id da mesma
    findById(photoId: number): Observable<IPhoto> {
        return this.httpClient.get<IPhoto>(`${API}/photos/${photoId}`);
    }

    //Buscando os comentários de uma foto
    getComments(photoId: number): Observable<IPhotoComment[]> {
        return this.httpClient
            .get<IPhotoComment[]>(`${API}/photos/${photoId}/comments`);
    }

    //Adicionando um comentário para a foto
    addComent(photoId: number, commentText: string): Observable<object> {
        return this.httpClient
            .post(`${API}/photos/${photoId}/comments`, { commentText });
    }

    //Remove uma foto do usuário
    removePhoto(photoId: number): Observable<object> {
        return this.httpClient.delete(`${API}/photos/${photoId}`);
    }
}