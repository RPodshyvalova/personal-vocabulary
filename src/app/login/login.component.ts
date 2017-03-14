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
    private url = 'https://blooming-lowlands-46132.herokuapp.com/login';
    public loginForm: FormGroup;
    
    constructor(
        public fb: FormBuilder, 
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
//                    console.log(data.message);
                    if (data.message === "Success") {
                        this.router.navigate(['/vacabulary']);
                    }
                },
                (error: any) => console.log(<any>error)
            );
    }
}