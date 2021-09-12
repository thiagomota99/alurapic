/*
Ao efeturarmos um login bem sucedido, de que forma saberemos se realmente estamos logados? Em nenhum momento guardamos a informação de que o usuário está logado, e isso é ruim, pois se houver algum local da aplicação ou parte da API com acesso restrito, não teremos como bloqueá-lo.

Portanto, veremos como fazer esta identificação do login autenticado, inclusive armazenando informações a respeito do usuário. No nosso caso, o método authenticate() acessa a API do back end — que é /user/login — e espera receber um objeto que represente o usuário, com username e senha correspondentes.

Quando o login é efetuado com sucesso, a pessoa recebe uma resposta, pois a Web funciona assim, com uma requisição e um retorno. No cabeçalho desta resposta vem um x-access-token, que pode ter qualquer nome, sendo este um dos mais comuns para quem trabalha com autenticação. No caso, o back end escolhe colocar neste cabeçalho a informação de um token de autenticação.

Ou seja, após a validação do login, o back end irá gerar um token com alguns dados a respeito do usuário, e aplicará um algoritmo para "embaralhá-lo", criptografando-o, e então o token com as informações armazenadas serão enviados como resposta neste cabeçalho.

No ato de efetuarmos o login, precisaremos extrair e guardar a informação do cabeçalho x-access-token. Para facilitar a compreensão, vamos entender o token como sendo um crachá, a ser enviado uma única vez durante a requisição para consumir a API. Em acessos que precisam de autorização, o back end sempre irá fazer a verificação do token, descriptografando-o.

Além disto, será feita a verificação da validade do mesmo, uma vez que ele possui um tempo de vida. Se em algum momento este token não for válido, a operação não poderá ser executada. Ele precisa ser armazenado em algum local do navegador, para que possamos enviá-lo sempre, à qualquer requisição que quisermos, para um recurso protegido.

Prosseguindo, iremos realizar a extração do token, por enquanto sem termos que lidar com o armazenamento e reenvio a cada requisição. Então, no subscribe() do signin.component.ts, tentaremos acessar o token para poder armazená-lo em algum lugar futuramente. Porém, não faz parte da responsabilidade deste arquivo fazer isso, e sim do AuthService.

Entretanto, teremos a resposta apenas quando usamos o subscribe(), certo? E ele fica no signin.component.ts, então temos um impasse. Felizmente, o RxJS (Reactive Extensions for JavaScript) possui operadores, dos quais utilizaremos o tap, com import { tap } from 'rxjs/operators'.

Assim, faremos um POST com pipe() para que, entre a execução da operação e o subscribe(), executemos um código arbitrário. Isto é, incluiremos operações a serem aplicadas (filtro, timeout e por aí vai) antes do uso do subscribe(). A operação tap serve para a geração de side effects, normalmente quando queremos logar no console, ou acessar e gravar algum valor. O res é a resposta para quem for usar o subscribe(), em que criaremosauthToken.

Em auth.service.ts, então, teremos:

authenticate(userName: string, password: string) {

    return this.http
        .post(API_URL + '/user/login', { userName, password })
        .pipe(tap(res => {
            const authToken = res.headers.get('x-access-token');
        }))
}COPIAR CÓDIGO
Então, quando fazemos subscribe(), sabe-se que é preciso executar a operação do tap antes. No entanto, da maneira em que está, o programa aponta um erro de compilação indicando que headers não existe com tipo Object. Isso porque se quisermos acessá-lo na resposta (res) ao realizarmos POST, precisaremos passar uma configuração especial como terceiro parâmetro, para que headers seja exposto e possa ser manipulado.

Usaremos a propriedade observe:

return this.http
    .post(
        API_URL + '/user/login',
        { userName, password },
        { observe: 'response' }
    )
    .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        console.log(authToken);
    }))COPIAR CÓDIGO
Salvaremos tudo, retornaremos ao navegador e à tela de autenticação de login. No console, ao sermos redirecionados à página do usuário, temos o token, que são um conjunto de caracteres diferentes com variações entre maiúsculas e minúsculas. O signin.component.ts continua funcionando como antes, e o importante é que no auth.service.ts temos acesso ao token, o nosso "crachá".

Por fim, poderemos trocar o console.log(authToken) por um mais elegante:

console.log(`User ${userName} authenticated with token ${authToken}`)COPIAR CÓDIGO
Seguiremos aprendendo sobre o token a seguir.

*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  //Método responsável por realizar uma chamada AJAX do tipo POST para o servidor
  authenticate(userName:string, password:string) {
    //Passando como dados um objeto javascript com as propriedades userName e password
    return this.httpClient
      .post(
        `${API_URL}/user/login`,
        { userName, password },
        { observe: 'response' } //Este objeto com a propriedade observe e valor response me da acesso a todos as propriedades da resposta
      )
      .pipe(
        //Aplicando o operador tap para capturar o cabeçalho x-access-token da resposta
        tap(response => {
          const token = response.headers.get('x-access-token'); //Pegando o valor do cabeçalho x-access-token
          this.tokenService.setToken(token); //Setando o token.      
        })
      ); 
  }
}
