# Alurapic

<hr>

## Fazendo o primeiro data-binding

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  description = "Cachorro";
  url = "https://picsum.photos/id/237/200/300";
  
} 
```

```html
<h1>{{ title }}</h1>
<img [src]="url" [alt]="description">
```

<hr>

## Adicionando o Bootstrap Ao Projeto

Para garantir que o Angular irá gerenciar todas nossas dependências de desenvolvimento
instale o bootstrap 4 via npm. Na pasta raíz do projeto execute o comando: `npm install bootstrap@4.1.1`

Posteriomente vá até o arquivo `angular.json` e procure pela propriedade `styles`. Encontre o caminho do
arquivo bootstrap instalado anteriormente na pasta `node_modules`. Por fim, declare este caminho na propriedade
`styles` EX:

```javascript
  "styles": [
    "src/styles.css",
    "./node_modules/bootstrap/dist/css/bootstrap.css"
  ],
```

## Criando o primeiro componente
Primeiro componente criado está no diretório `src\app\photo`

<hr>

## Declarando o componente no módulo
Para que possamos utilizar um componente no template de um outro. Precisamos definir um módulo para este componente primeiramente
Depois que encontramos um módulo para o componente, vamos declara-lo no módulo. Por fim, todos os componentes que também estão
declarados naquele mesmo módulo, terão acesso para utilizar o componente em seu template

```typescript
@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent //Declarando componente em um módulo
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

<hr>

## Inbound properties
As inbounds properties são propriedades dos componentes que podem receber valores de outros componentes
ou templates onde estejam inseridas, caso essas propriedades do componentes estejam decoradas com o decorator `Input()` Ex:

```html
<ap-photo url="https://picsum.photos/id/237/200/300" description="Cachorro"></ap-photo>
<ap-photo url="https://picsum.photos/seed/picsum/200/300" description="Montanha de Gelo"></ap-photo>
```

arquivo .component do `ap-photo`

```typescript
import { Component, Input } from "@angular/core";

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
})
export class PhotoComponent {
    
    //Definindo propriedades como Inbound Properties: Poderão receber valores a partir de outros componentes
    @Input() description = "";
    @Input() url = "";
}
```

<hr>

## Organizando código em módulos
É uma boa prática organizar a aplicação em módulos. Pois além de facilitar a leitura do código, também podemos detectar
mais rápido um erro. Portanto crie módulos onde os mesmos tenha declarados componentes, diretivas, pipes afins. Ou seja,
que fazem de um escopo Ex: PhotoComponent, PhotoListComponent, PhotoFormComponent, PhotoDetalhesCaracteristicasComponent, etc..

Ex de Módulo de feature (funcionalidade): 

```typescript
import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";

@NgModule({
    declarations: [ 
        PhotoComponent //Declarando componente em um módulo
    ],
    exports: [ 
        PhotoComponent //Exportando o componente para tornar acessível para quem importar PhotosModule
    ]
})
export class PhotosModule {

}
```

Módulo Raiz da Aplicação (o primeiro módulo a ser carregado). É partindo deste módulo que todos os outros (módulos de feature)
serão carregados. Basta o mesmo estar na propriedade `import`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';

@NgModule({
  declarations: [
    AppComponent,//Declarando componente em um módulo
  ],
  imports: [
    BrowserModule,
    PhotosModule, //Importando o módulo de funcionalidade
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

<hr>

## Utilizando a primeira diretiva

```html
<!-- 
  Utilizando a diretiva *ngFor. 
  A mesma pode mudar a estrutura do componente. 
  No caso, criará o componente ap-photo várias vezes de acordo com o tamanho do array 
-->
<ap-photo 
    [url]="photo.url" 
    [description]="photo.description" 
    *ngFor="let photo of photos">
</ap-photo>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  
  photos: any[] = [
    {
      url: 'https://picsum.photos/id/237/200/300',
      description: 'Cachorro'
    },
    {
      url: 'https://picsum.photos/seed/picsum/200/300',
      description: 'Montanha de Gelo'
    },
  ];
  
} 
```

<hr>

## HttpClient e Injeção de dependência
Para realizar chamadas a nossa WEB API precisamos primeiramente injetar a dependência do HttpClient.
O mesmo possui uma série de métodos que nos permite realizar chamadas ajax na nossa aplicação angular.
Mas para injeta-lo precisamos importar o módulo do mesmo em nosso `AppModule` da seguinte forma

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';

@NgModule({
  declarations: [
    AppComponent,//Declarando componente em um módulo
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    HttpClientModule //Colocando o import do HttpClient, onde o mesmo fornece um provider configurado que sabe criar um objeto do tipo HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Classe do componente:

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Injetando o HttpClient no componente através do construtor
  constructor(private http: HttpClient) { 
    console.log(http);
  }

  title = 'alurapic';
  
  photos: any[] = [];  

} 
```

<hr>

## Consumindo dados da API
Para consumir dados da API utilizamos a bliblioteca RxJS para realizarmos operações assíncronas
via http. Veja um exemplo:

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  
  photos: object[] = []; 

  //Injetando o HttpClient no componente através do construtor
  constructor(private http: HttpClient) { 

    //Utilizando o método get do HttpClient para fazer a busca dos dados na API,
    //Onde o primeiro parâmetro é a url da API

    //Logo depois utilizamos o método subscribe para realizar de fato a consulta pelo endereço
    //o primeiro parâmetro é o retorno da consulta, e o segundo é caso ocorra algum erro durante o acesso
    this.http
    .get<object[]>('http://localhost:3000/flavio/photos')
    .subscribe(
      photos => this.photos = photos, //Primeiro parâmetro do subscribe 
      err => console.log(err) //Segundo parâmetro do subscribe
    );
  }
}
```

<hr>

## Isolando o acesso em serviços
Para melhor organização e separação de responsabilidades no Angular temos classes que são próprias para
realizar o consumo dos dados das API's. Essas classes são chamadas de **Services**. Essas classes esconde e elimina
a complexidade das classes de componentes terem que implementar os métodos de consumo de dados da WEB API, a responsabilidade
de implementar estes métodos ficam com as classes de serviço Ex:

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

    //retornando um observable de object[]. Quem faz o subscriber é o componente que está injetando o serviço
    listFromUser(userName: string) {
        //Utilizando o método get do HttpClient para fazer a busca dos dados na API,
        //Onde o primeiro parâmetro é a url da API
        return this.httpClient.get<object[]>(API + '/flavio/photos');        
    }
}
}
```

Classe do componente:

```typescript
import { Component } from '@angular/core';
import { PhotoService } from './photos/photo/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  
  photos: object[] = []; 

  //Injetando o serviço PhotoService no componente através do construtor
  constructor(private photoService: PhotoService) { 
    //Se inscrevendo no método do serviço PhotoService
    this.photoService.listFromUser('flavio')
      .subscribe(photos => this.photos = photos);
  }
}
```

<hr>

## Tipando dados de retorno da API
Definimos uma interface para representar o tipo de retorno que uma operação assíncrona irá nos retornar.
Com isso ganhamos mais controle e acertividade na hora de acessar o retorno dos dados recebidos pela API.
Ex:

```typescript
//Criando uma interface para definir as propriedades do objeto retornado na lista da API
export interface IPhoto { 
    id:number;
    postDate:Date;
    url:string;
    description:string;
    allowComments:boolean;
    likes:number;
    comments:number;
    userId:number;
}
```

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPhoto } from "./photo";

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
    listFromUser(userName: string) {
        //Utilizando o método get do HttpClient para fazer a busca dos dados na API,
        //Onde o primeiro parâmetro é a url da API
        return this.httpClient.get<IPhoto[]>(API + '/flavio/photos');        
    }
}
```

<hr>

## Ciclo de Vida de um componente
```typescript
import { Component, OnInit } from '@angular/core';
import { IPhoto } from './photos/photo/photo';
import { PhotoService } from './photos/photo/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//Implementando a interface OnInit que espera a implementação do método ngOnInit()
export class AppComponent implements OnInit {
  title = 'alurapic';
  
  photos: IPhoto[] = []; 

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(private photoService: PhotoService) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {    
    //Se inscrevendo no método do serviço PhotoService que retorna um observable de IPhoto[]
    this.photoService.listFromUser('flavio')
      .subscribe(photos => this.photos = photos);
  }
}
```

<hr>

## CommomModule x BrowserModule
O CommomModule possui as diretivas mais utilizadas do Angular, sendo elas o *ngFor, *ngSwitch, *ngIf entre outras. O que acaba o diferenciado do BrowserModule em que o mesmo não pode ser importado em módulos de funcionalidade, apenas no módulo principal da aplicação

<hr>

## Rotas em Angular
O conceito de rotas em Angular tem como objetivo permitir que o Angular renderize um componente em específico de acordo com a url acessada. Ex: `http://localhost:4200/user/flavio`. Desta forma podemos visualizar o template de um componente de acordo com a rota que foi especificada para ele. Para isso criamos um arquivo de rotas que irá definir e configurar as rotas raízes (rotas principais) da aplicação.

**Arquivo de Rotas**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';

/*Variável com a definição das rotas */
const routes: Routes = [
    { path: 'user/flavio', component: PhotoListComponent },
    { path: 'p/add', component: PhotoFormComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], //Import de módulo que configura as rotas
    exports: [ RouterModule ] //Exportando o módulo que possui as diretivas de rotas Ex: <router-outlet></router-outlet>
})
export class AppRoutingModule { }
```

**Importando Módulo de Rotas no módulo principal da Aplicação**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PhotosModule } from './photos/photos.module';

@NgModule({
  declarations: [
    AppComponent,//Declarando componente em um módulo
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    ErrorsModule,
    AppRoutingModule, //Importando o módulo de rotas raízes da aplicação 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Adicionando diretiva ao template do AppComponent**
```html
<!--Diretiva que tem como objetivo renderizar o componente da rota dentro do template -->
<router-outlet></router-outlet>
```

<hr>

## Change Detection
O Angular utiliza essa abordagem para verificar mudanças em propriedades do componente que estão decoradas com o decorator `Input()`. Desta forma o Angular consegue identificar se houver alguma modificação nesta propriedade. Caso isso aconteça, podemos acionar alguma ação se for de nosso desejo.

Ex:
```typescript
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPhoto } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: IPhoto[] = [];
  rows: any[] = [];

  constructor() { }

  //Verifica se alguma Inbound Property (propriedades decoradas com decorator Input()) sofreu alguma mudança
  //Caso tenha sofrido o parâmetro changes terá uma propriedade com o mesmo nome 
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos)
      this.rows = this.groupColumns(this.photos);
  }

  groupColumns(photos: IPhoto[]) {
    const newRows = [];

    for(let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }

    return newRows;
  }
}
```
<hr>

## Event Binding
O Event Binding é a abordagem que o Angular utiliza para realizar eventos. Onde todos o objeto `$event` é retornado por todos os eventos onde podemos usar suas propriedades para realizar alguma lógica sob o componente ou elemento HMTL. Segue o exemplo abaixo:
```html
<!-- Estamos realizando o binding de eventos onde o evento utilizado é o keyup e o mesmo está atribuindo ao atributo filter do componente o valor do campo input -->
<div class="text-center mt-3 mb-3">
    <form>
        <input 
            class="rounded"
            type="search"
            placeholder="search..."
            autofocus
            (keyup)="filter = $event.target.value"
            >
    </form>
</div>
```

<hr>

## Introdução a Pipes
Criando nosso próprio Pipe para filtrar um array de acordo com uma descrição

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { IPhoto } from '../photo/photo';

@Pipe({
    name: 'filterByDescription' //Nome do pipe que será utilizado no template
})
export class FilterByDescriptionPipe implements PipeTransform {
    //Primeiro parâmetro é o valor é a propriedade que queremos aplicar o pipe, o segundo são os critérios para transformação
    transform(photos: IPhoto[], description: string) {
        description = description.trim().toLowerCase();

        if(description) {
            return photos.filter(photo => 
                photo.description.toLowerCase().includes(description)
            );
        } else {
            return photos;
        }
        
    }
}
```
**Utilizando o Pipe no template**
`<ap-photos [photos]="photos | filterByDescription: filter"></ap-photos>`

<hr>

## Resolvers
Os Resolvers são utilizados para momentos em que quando um componente seja carregado, os dados já estejam em memória e os mesmos só precise manipular esses dados como bem entender. Pois quando trata-se de chamadas assíncronas a resposta do servidor pode demorar e não queremos renderizar o nosso template enquanto esses dados ainda não estão disponíveis para serem visualizados. Os **Resolvers** vem para solucionar esse cenário. Veja um exemplo abaixo de como criar e implementa-lo:

**Resolver**
```typescript
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
```
**Arquivo de Rotas**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

/*Variável com a definição das rotas */
const routes: Routes = [
    { 
        path: 'user/:userName', 
        component: PhotoListComponent, //Quando a url for http://localhost:4200/user/flavio será renderizado o template do component PhotoListComponent
        //Adicionamos a propriedade resolver para definir um resolver para a rota em questão
        resolve: { 
            photos: PhotoListResolver //nomeQualquerParaAPropriedade: nomeDoResolver
        }
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], //Import de módulo que configura as rotas
    exports: [ RouterModule ] //Exportando o módulo que possui as diretivas de rotas Ex: <router-outlet></router-outlet>
})
export class AppRoutingModule { }
```

**Componente utilizando Resolver**
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: IPhoto[] = [];
  filter: string = '';

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(private activatedRoute: ActivatedRoute) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {
    //Aqui estamos atribuindo o valor do resolver para o atributo do componente
    this.photos = this.activatedRoute.snapshot.data.photos; //this.activatedRoute.snapshot.data.nomeDaPropriedade

    //É importante lembrar que quando o resolver retorna um observable não precisamos assinar o método. Pois o Angular
    //automaticamente faz esse processo devolvendo de fato apenas o valor do observable.
  }

}
```

<hr>

## Subject
Subject é um objeto parecido com um Observable. Entretanto ele é mais poderoso que um Observable, pois além de podermos nos assinar (`subscriber()`) a um Subject podemos também publicar dados em um subject com a função `next()`. Isso nos permite resolver diversos problemas. Entre eles o que está exemplificado abaixo:

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IPhoto } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: IPhoto[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>(); //Criando um subject 

  //Utilizando o constructor do componente apenas para injeção de dependência
  constructor(private activatedRoute: ActivatedRoute) { }
  
  //Utilizando um dos ciclos de vida do Angular
  ngOnInit(): void {
    //Aqui estamos atribuindo o valor do resolver para o atributo do componente
    this.photos = this.activatedRoute.snapshot.data.photos; //this.activatedRoute.snapshot.data.nomeDaPropriedade
    //É importante lembrar que quando o resolver retorna um observable não precisamos assinar o método. Pois o Angular
    //automaticamente faz esse processo devolvendo de fato apenas o valor do observable.
    
    this.debounce
      //Utilizando o operator debounceTime que espera como parâmetro o tempo em ms em que será considerado o retorno do subject
      //ou seja depois 300ms o último valor emitido pelo subject chegará ao subscriber
      .pipe(debounceTime(300)) 
      .subscribe(filter => this.filter = filter);
  }

  //Método que será executando quando o componente for destruído
  ngOnDestroy(): void {
    this.debounce.unsubscribe(); //Faremos o cancelamento da inscrição do Subject para evitar vazamentos de memória. Já que se caso não cancelarmos sua inscrição já que caso
                                 //o mesmo possu algum assinante (subscriber()) o mesmo ficará escutando e aguardando mundanças.
  }

}
```
**Template de PhotoListComponent**
```html
<!-- Estamos realizando o binding de eventos onde o evento utilizado é o keyup e o mesmo está atribuindo ao atributo filter do componente o valor do campo input -->
<div class="text-center mt-3 mb-3">
    <form>
        <input 
            class="rounded"
            type="search"
            placeholder="search..."
            autofocus
            (keyup)="debounce.next($event.target.value)" 
            ><!-- utilizando o método next do subject para emitir um valor a cada tecla digitada no input -->
    </form>
</div>

<ap-photos [photos]="photos | filterByDescription: filter"></ap-photos>
```

<hr>

## Aplicando else com a diretiva *ngIf
Conseguimos aplicar uma espécie de if else com a diretiva *ngIf. Siga o exemplo abaixo:
```html
<!-- 
     Para realizar o if else com o *ngIf, após criarmos o ng-template apenas referênciamos sua varável de
     template no else.
-->
<div class="text-center" *ngIf="hasMore; else messageTemplate">
    <button class="btn btn-primary">Load more</button>
</div>

<!-- 
    Para que possamos utilizar uma espécie if e else em nosso template 
    utilizamos a diretiva <ng-template></ng-template> que terá como objetivo
    envelopar o contéudo que queremos que seja exibido no else do da diretiva *ngIf

    Definimos também a variável de template messaTemplate que representará essa parte
    do template.
-->
<ng-template #messageTemplate>
    <p class="text-center text-muted">No more data to load</p>
</ng-template>
```

<hr>

## Componente Compartilhado e diretiva ng-content
Componentes compartilhados são aqueles componentes que é genérico e pode ser utilizado o usuário quiser. Componentes assim ficam dentro do diretório `shared\components` da aplicação. São componentes assim como qualquer outro. Entretanto declaramos um módulo para o mesmo e exportamos o componente através deste módulo para quem quiser utiliza-lo. Ja a diretiva **ng-content** tem como objetivo permitir que possamos passar dentro do componente o que quisermos, seja outro componente ou qualquer outra coisa. Veja o exemplo

**Template do componente CardComponent**
```html
<div class="card border-light text-center">
    <h4 class="card-header">{{ title }}</h4>
    <div class="card-block text-justify">
        <ng-content></ng-content> <!-- Tudo que estiver dentro de ap-card será renderizado aqui dentro -->       
    </div>
</div>
```

**Template do componente que utiliza o CardComponent**
```html
<!-- Verifica se o array de photos existe alguma posição -->
<p class="text-center text-muted" *ngIf="!photos.length">
    Sorry, no photos
</p>

<!-- Utilizando a diretiva *ngFor. A mesma pode mudar a estrutura do componente. No caso, criará o componente ap-photo várias vezes de acordo com o tamanho do array -->
<ol class="list-unstyled ">
    <li *ngFor="let cols of rows" class="row no-gutters">
        <div *ngFor="let photo of cols" class="col-4" >
            <!-- o contéudo passado dentro do ap-card será renderizado dentro da diretiva ng-content do template do CardComponent-->
            <ap-card [title]="photo.description">
                <ap-photo 
                    [url]="photo.url" 
                    [description]="photo.description">
                </ap-photo>
                <div class="text-center p-1">
                    <i aria-hidden="true" class="fa fa-heart-o fa-1x mr-2">{{ photo.likes }}</i>
                    <i aria-hidden="true" class="fa fa-comment-o fa-1x mr-2 ml-2">{{ photo.comments }}</i>
                </div>
            </ap-card>
        </div>
    </li>
</ol>
```

## Eventos Customizados
Para criarmos eventos customizados, precisamos utilizar anotar nossos atributos das classes de componente com o decorator `@Output()` e definirmos seu tipo para `EventEmitter` que é uma classe espcial do Angular que nos permite criar eventos personalizados para nossos componentes. Veja um exemplo abaixo:

**Componente com evento customizado onTyping**
```typescript
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {

    //Criando uma output property que irá representar um evento customizado do componente search-component
    //o retorno deste evento continuará sendo um $event. Entretanto $event terá o valor que definirmos aqui para ele
    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
    @Input() value: string = '';
    
    debounce: Subject<string> = new Subject<string>(); //Criando um subject
    
    constructor() { }

    //Utilizando um dos ciclos de vida do Angular
    ngOnInit(): void {
        this.debounce.pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter)); //o objeto EventEmiiter possui o método emit que é responsável por emitir um valor, este valor será $event do evento.
    }
    
    //Método que será executando quando o componente for destruído
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}
```

**Template do PhotoListComponent**
```html
<!-- Componente responsável por filtrar as fotos da grid de fotos -->
<ap-search (onTyping)="filter = $event" [value]="filter"></ap-search>

<!-- Componente responsável por renderizar a grid de fotos -->
<ap-photos [photos]="photos | filterByDescription: filter"></ap-photos>

<!-- Componente que representa o botão load more -->
<ap-load-button 
    [hasMore]="hasMore"
    (click)="loadMore()">
</ap-load-button>
```

<hr>

## Diretivas Customizadas
Diretivas são basicamente componentes que não possuem template. As mesmas tem como objetivo alterar a estrutura do DOM (**Diretivas Estruturais**) ou interagir com os elementos/componentes dispostos no template (**Diretivas de Atributos**). Para mais detalhes de como implementar o conceito de Diretivas, veja o exemplo abaixo:

**Criando uma Diretiva chamada `apDarkenOnHover`**
```typescript
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/*
    Toda diretiva é anotada com o decorator Directive e o selector da mesma é definido entre parênteses
*/
@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness: string = '70%'; 

    /*
        Injetando o elementRef que é a referência do componente onde a diretiva está sendo utilizada.
        Ou seja se a a diretiva estiver sendo utilizada em uma <div></div>
        o objeto ElementRef irá trazer todos as propriedades e eventos deste elemento
    */
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }
    
    /*
        Este decorator tem como objetivo interceptar qualquer evento do elemento que está utilizando a diretiva
        no nosso caso decidimos por interceptar o evento mouseover e mouseleave
    */
    @HostListener('mouseover') 
    darkenOn() {
        /*
            Aqui estamos utilizando o método setStyle() do objeto renderer 
            para atribuir um estilo ao elemento que está utilizando a diretiva
            o mesmo espera três parâmetros:
            1 - Referência do elemento que está utilizando a diretiva
            2 - Nome da propriedade CSS que queremos aplicar
            3 - Valor desta propriedade
        */
        this.renderer.setStyle(this.elementRef.nativeElement,'filter',`brightness(${this.brightness})`);            
    }

    @HostListener('mouseleave')
    darkenOff() {        
        this.renderer.setStyle(this.elementRef.nativeElement,'filter','brightness(100%)');        
    }
 }
```

**Utilizando a diretiva `apDarkenOnHover`**

```html
<ol class="list-unstyled ">
    <li *ngFor="let cols of rows" class="row no-gutters">
        <!-- 
            Adicionando a diretiva apDarkenOnHover customizada ao elemento. O Angular é inteligente o suficente para saber também
            que a propriedade brightness é uma input-property da diretiva apDarkenOnHover 
        -->
        <div *ngFor="let photo of cols" class="col-4" apDarkenOnHover brightness="70%">            
            <ap-card>
                <ap-photo 
                    [url]="photo.url" 
                    [description]="photo.description">
                </ap-photo>
                <div class="text-center p-1">
                    <i aria-hidden="true" class="fa fa-heart-o fa-1x mr-2">{{ photo.likes }}</i>
                    <i aria-hidden="true" class="fa fa-comment-o fa-1x mr-2 ml-2">{{ photo.comments }}</i>
                </div>
            </ap-card>
        </div>
    </li>
</ol>
```

<hr>

## Validação de formulário através do componente
Poderiamos realizar a validação do formulário através de atributos HTML. Entretanto faremos pelo componente
pois isso nos permite extrair o melhor que o framework tem a oferecer em relação ao controle e validação de formulários.
Veja o exemplo abaixo de controlar e realizar validações no formulário com o Angular.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SignInComponent implements OnInit {

    //Criamos o atributo do tipo FormGroup que possui os métodos para manipular o formulário HTML
    public loginForm: FormGroup;

    //Injetando serviço do Angular que consegue construir um objeto do tipo FormGroup
    constructor(private formBuilder: FormBuilder) { } 

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
}
```
**Template do componete SignInComponent**
```html
<h4 class="text-center">Login</h4>

<!-- 
    A diretiva formGroup do Angular espera como parâmetro um atributo do tipo FormGroup.
    Onde desta forma poderemos gerenciar agora o formulário através do componente.
-->
<form [formGroup]="loginForm" class="form mt-4">
    <div class="form-group">
        <!-- A diretiva formControlName espera uma string que é o nome do campo definido no método group do formBuilder -->
        <input
            formControlName="userName" 
            class="form-control"
            placeholder="user name"
            autofocus
        >
        <!-- Aqui estamos validando se o array errors existe e se a propriedade required é verdadeiro-->
        <small
            class="text-danger d-block mt-2"
            *ngIf="loginForm.get('userName').errors?.required">
            O campo de user name é obrigatório!
        </small>
    </div>

    <div class="form-group">
        <!-- A diretiva formControlName espera uma string que é o nome do campo definido no método group do formBuilder -->
        <input            
            formControlName="password"
            type="password" 
            class="form-control"
            placeholder="password"            
        >
        <!-- Aqui estamos validando se o array errors existe e se a propriedade required é verdadeiro-->
        <small 
            class="text-danger d-block mt-2" 
            *ngIf="loginForm.get('password').errors?.required">
            O campo de password é obrigatório!
        </small>        
    </div>

    <!-- utilizando o atributo disabled para desabilitar o botão, caso a propriedade invalid do atributo loginForm for verdadeiro-->
    <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid">Login</button>
</form>

<p>Not a user?<a>Register now</a></p>
```

> Obs: Para utilizar as diretivas formControlName, formGroup
> não esqueça já importar o módulo **ReactiveFormsModule**

<hr>

## Capturando o hearder da resposta
Para proteger a aplicação de acessos a áreas restritas utilizaremos um token retornado no cabeçalho da resposta.
Este cabeçalho tem o nome `x-access-token` que terá o token com algumas informações relacionadas ao usuário autenticado.
Para capturar essas inforamações veja o exemplo abaixo:

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  //Método responsável por realizar uma chamada AJAX do tipo POST para o servidor
  authenticate(userName:string, password:string) {
    //Passando como dados um objeto javascript com as propriedades userName e password
    return this.httpClient
      .post(
        `${API_URL}/user/login`,
        { userName, password },
        { observe: 'response' } //Este objeto com a propriedade observe e valor response dará acesso a todos as propriedades da resposta
      )
      .pipe(
        //Aplicando o operador tap para capturar o cabeçalho x-access-token da resposta
        tap(response => {
          const authToken = response.headers.get('x-access-token'); //Pegando o valor do cabeçalho x-access-token
          console.log(`User ${userName} authenticate with token ${authToken}`);
        })
      ); 
  }
}
```

## Criando serviço para gerenciar o TOKEN
Para melhor manipulação do token, criamos um serviço onde o mesmo terá métodos para guardar, buscar, verificar e remover um token
do localStorage do browser. Veja o exemplo abaixo:

```typescript
import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService { 

    //Verifica se existe um token
    hasToken(): boolean { 
        return !!this.getToken;
    }

    //Pega o valor do token
    getToken(): string { 
        return window.localStorage.getItem(KEY);
    }

    //setando um token
    setToken(token:string): void { 
        window.localStorage.setItem(KEY,token);
    }

    //remove o token
    removeToken(): void { 
        window.localStorage.removeItem(KEY);
    }
}
```
