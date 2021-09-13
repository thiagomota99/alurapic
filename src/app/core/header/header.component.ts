import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent { 
    
    /**/
    user$: Observable<IUser>;
    user: IUser;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => this.user = user);                
    }
}