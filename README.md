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
