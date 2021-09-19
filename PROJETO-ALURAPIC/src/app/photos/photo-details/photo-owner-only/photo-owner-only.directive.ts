import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit { 

    @Input() IdOwnedPhoto: number; //Recebe o id do dono da publicação
    @Input() nodePai: ElementRef; //recebe a referência do elemento pai do elemento que queremos esconder

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                console.log(this.IdOwnedPhoto)
                console.log(user.id);
                //Se o usuário não estiver logado ou não for o dono da foto
                if(!user || user.id !== this.IdOwnedPhoto)
                    this.renderer.removeChild(this.nodePai, this.elementRef.nativeElement); //Com base no elemento pai, remove o filho
            });
    }
}