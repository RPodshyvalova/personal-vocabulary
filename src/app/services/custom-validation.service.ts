import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable()
export class CustomValidationService {
    
    static checkUniqueLogin(control: FormControl) {
        let login = control.value;
    }
   
    static checkUniqueEmail(control: FormControl) {
        let email = control.value;
    }
    
    static checkCorrectIdentifier(control: FormControl) {
        let pattern = new RegExp("^[a-zA-Z0-9_-]{3,15}$");
        return pattern.test(control.value) ? null : {checkCorrectIdentifier: true}; 
    }
    
    static checkCorrectEmail(control: FormControl) {
        let pattern = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$");
        return pattern.test(control.value) ? null : {checkCorrectEmail: true}; 
    }
    
    static passwordConfirm(group: AbstractControl) {
        return group.get('password').value === group.get('password_confirmation').value ? null : {passwordConfirm: true}; 
    }
}