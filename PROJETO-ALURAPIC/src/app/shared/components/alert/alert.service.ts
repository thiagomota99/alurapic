import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Alert, AlertType } from './alert';

@Injectable({
    providedIn: 'root'
})
export class AlertService { 

    subjectAlert: Subject<Alert>;
    
    danger(message: string): void {
        this.alert(AlertType.DANGER, message);
    }
    
    info(message: string): void {
        this.alert(AlertType.INFO, message);
    }

    success(message: string): void {
        this.alert(AlertType.SUCCESS, message);
    }

    warning(message: string): void {
        this.alert(AlertType.WARNING, message)
    }

    private alert(alertType: AlertType, message: string): void {
        this.subjectAlert.next(new Alert(alertType,message));
    }

    getAlert(): Observable<Alert> {
        return this.subjectAlert.asObservable();
    }
}