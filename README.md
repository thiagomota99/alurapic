# Alurapic

<hr>

## Commit 1 - Fazendo o primeiro data-binding

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

## Commit 2 - Adicionando o Bootstrap Ao Projeto

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

## Commit 3 - Criando o primeiro componente
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

