import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from '../services/custom-validation.service';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'login-form',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements  OnInit {
    private loginForm: FormGroup;
    private message: string;
    
    constructor(
        private fb: FormBuilder, 
        private router: Router,
        private exchangeDataService: ExchangeDataService) {
    }
    
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            login: ["", [
                Validators.required,  
                Validators.minLength(6), 
                Validators.maxLength(15),
                CustomValidationService.checkCorrectIdentifier]
            ],
            password: ["", [
                Validators.required, 
                Validators.minLength(6), 
                Validators.maxLength(25)]
            ]
        });
    }

    loginUser() {
        let formValuesObj = this.loginForm.value;
//        console.log(JSON.stringify(formValuesObj));
        let body = JSON.stringify(formValuesObj);
        this.exchangeDataService.askServerLoginUser(body)
            .subscribe(
                (data: any) => {
                    if (data.message === "Success") {
                        this.message = data.body;

                        if (!this.supportsLocalStorage()) {
                            console.log("no support localStorage");
                        } else {
                            if (data.token) {
    //                            console.log("data.token " + data.token);
                                if (!localStorage.getItem('token')) {
                                    localStorage.setItem("token", data.token); 
                                }
                                console.log("localStorage from login  " + JSON.stringify(localStorage));   

                                setTimeout(() => {
                                    this.router.navigate(['/personal-vocabulary']);
//                                    this.router.navigate(['/test']);
                                }, 1000);
                            }
                        }
                    } else {
                       this.message = data.body;
                    }
                },
                (error: any) => console.log(<any>error)
            );
    }

    supportsLocalStorage() {
        return typeof(Storage)!== 'undefined';
    }
}