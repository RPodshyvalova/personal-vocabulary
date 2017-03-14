import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from '../services/custom-validation.service';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'registration-form',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})

export class RegistrationComponent implements OnInit {
    public registrationForm: FormGroup;

    constructor(
        public fb: FormBuilder, 
        private router: Router, 
        //private http: Http, 
        private exchangeDataService: ExchangeDataService) {
    }
  
    ngOnInit(): void {
        this.registrationForm = this.fb.group({
            login: ["", [
                Validators.required,  
                Validators.minLength(6), 
                Validators.maxLength(15),
                CustomValidationService.checkCorrectIdentifier] //sync validation
               // [CustomValidationService.checkUniqueLogin] //async validation
            ],
            name: ["", [
                Validators.minLength(6), 
                Validators.maxLength(15),
                CustomValidationService.checkCorrectIdentifier]
            ],
            email: ["", [
                Validators.required,
                CustomValidationService.checkCorrectEmail] //sync validation
                // [CustomValidationService.checkUniqueEmail] //async validation
            ],
            passwordgroup: this.fb.group({
                password: ["", [
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(15)]
                ],
                password_confirmation: ""
            },  { validator: CustomValidationService.passwordConfirm })
            
        });
    }

    registerUser() {
        let formValuesObj = this.registrationForm.value;
//        console.log(JSON.stringify(formValuesObj));
        let body = JSON.stringify(formValuesObj).replace('"passwordgroup":{','').replace(/}\s*$/, "");
//        console.log(body);
        this.exchangeDataService.askServerRegisterUser(body)
            .subscribe(
                (data: any) => {                   
                    console.log(data.message);
                    if (data.message === "Success") {
                        this.router.navigate(['/login']);
                    }
                },
                (error: any) => console.log(<any>error)
            );
    }
}
