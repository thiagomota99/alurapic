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