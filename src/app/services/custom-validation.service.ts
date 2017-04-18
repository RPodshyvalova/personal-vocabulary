import {Injectable} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ExchangeDataService} from './exchange-data.service';

@Injectable()
export class CustomValidationService {
       
    constructor(private exchangeDataService: ExchangeDataService) { 
    }

    checkUniqueLogin(control: FormControl) {
        let login = control.value;
//        console.log(login);
//        console.log("his.service.url " + this.exchangeDataService.url);
        this.exchangeDataService.askServerUniqueLogin(login)
            .subscribe(
                (data: any) => {
                    console.log(data.message);
                    data.message ? null : {checkUniqueLogin: true}; 
                },
                (error: any)  => console.log(<any>error)
            );
    }
   
    checkUniqueEmail(control: FormControl) {
        let email = control.value;
        this.exchangeDataService.askServerUniqueEmail(email)
            .subscribe(
                (data: any) => {
                    console.log(data.message);
                    data.message ? null : {checkUniqueEmail: true}; 
                },
                (error: any)  => console.log(<any>error)
            );
    }
    
    static checkCorrectIdentifier(control: FormControl): any {
        let pattern = new RegExp("^[a-zA-Z0-9_-]{3,15}$");
        return pattern.test(control.value) ? null : {checkCorrectIdentifier: true}; 
    }
    
    static checkCorrectEmail(control: FormControl): any {
        let pattern = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$");
        return pattern.test(control.value) ? null : {checkCorrectEmail: true}; 
    }
    
    static passwordConfirm(group: AbstractControl): any {
        return group.get('password').value === group.get('password_confirmation').value ? null : {passwordConfirm: true}; 
    }
}