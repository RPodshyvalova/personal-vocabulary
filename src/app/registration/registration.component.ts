import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import {CustomValidationService} from "../services/custom-validation.service";
import {ExchangeDataService} from "../services/exchange-data.service";

@Component({
    selector: "registration-form",
    templateUrl: "registration.component.html",
    styleUrls: ["registration.component.css"]
})

export class RegistrationComponent implements OnInit {
    private registrationForm: FormGroup;

    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private customValidationService: CustomValidationService,
        private exchangeDataService: ExchangeDataService) {
    }
  
    ngOnInit(): void {
        this.registrationForm = this.fb.group({
            login: ["", Validators.compose([
                Validators.required,  
                Validators.minLength(6), 
                Validators.maxLength(15),
                CustomValidationService.checkCorrectIdentifier]), //sync validation
//                [this.customValidationService.checkUniqueLogin] //async validation
            ],
            name: ["", Validators.compose([
                Validators.minLength(6), 
                Validators.maxLength(15),
                CustomValidationService.checkCorrectIdentifier])
            ],
            email: ["", Validators.compose([
                Validators.required,
                CustomValidationService.checkCorrectEmail]), //sync validation
//                [this.customValidationService.checkUniqueEmail] //async validation
            ],
            passwordgroup: this.fb.group({
                password: ["", Validators.compose([
                    Validators.required,
                    Validators.minLength(6), 
                    Validators.maxLength(15)])
                ],
                password_confirmation: ""
            },  {validator: CustomValidationService.passwordConfirm})
            
        });
    }

    registerUser() {
        let formValuesObj = this.registrationForm.value;
        let body = JSON.stringify(formValuesObj).replace('"passwordgroup":{',"").replace(/}\s*$/, "");
        this.exchangeDataService.askServerRegisterUser(body)
            .subscribe(
                (data: any) => {                   
                    console.log(data.message);
                    if (data.message === "Success") {
                        this.router.navigate(["/login"]);
                    }
                },
                (error: any) => console.log(<any>error)
            );
    }
}