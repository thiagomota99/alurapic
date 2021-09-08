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