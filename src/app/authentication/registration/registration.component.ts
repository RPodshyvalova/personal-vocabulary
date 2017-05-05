import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidationService} from "../custom-validation.service";
import {ApiService} from '../../services/api.service';

@Component({
    selector: "registration-form",
    templateUrl: "registration.component.html",
    styleUrls: ["registration.component.css"],
})

export class RegistrationComponent implements OnInit {
    private url: string = "/api/v1/registration";
    private registrationForm: FormGroup;
    private message: string = "";
    
    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private apiService: ApiService,
        private customValidationService: CustomValidationService) {
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
   
        this.apiService.post(this.url, body)
            .subscribe(
                (data: any) => {                   
                    if (data.message === "Success") {
                        this.router.navigate(["/login"]);
                    } else {
                        this.message = JSON.stringify(data.message); 
                    }
                },
                (error: any) => { 
                    this.message = "Incorrect input data";
                }
            );
    }
}