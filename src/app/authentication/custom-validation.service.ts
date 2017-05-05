import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {AbstractControl, FormControl} from "@angular/forms";
import {ApiService} from "../services/api.service";

@Injectable()
export class CustomValidationService {
       
    constructor(private apiService: ApiService) { 
    }
    
//    checkUniqueLogin(control: FormControl): any {
//        let login = control.value;
//        let uniqueLogin: boolean;
//        this.apiService.get("/users/check?login=" + login)
//            .subscribe(
//                (data: any) => {
//                    uniqueLogin = data.message != "true" ? true : false;
//                },
//                (error: any)  => console.log(<any>error)
//            );
//        return uniqueLogin ? null : {checkUniqueLogin: true};
//    }
//   
//    checkUniqueEmail(control: FormControl): any {
//        let email = control.value;
//        let uniqueEmail: boolean;
//        this.apiService.get("/users/check?email=" + email)
//            .subscribe(
//                (data: any) => {
//                    uniqueEmail = data.message != "true" ? true : fals;
//                },
//                (error: any)  => console.log(<any>error)
//            );
//
//        return uniqueEmail ? null : {checkUniqueEmail: true};
//    }
    
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