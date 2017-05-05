import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidationService} from "../custom-validation.service";
import {ApiService} from "../../services/api.service";

@Component({
    selector: "login-form",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})

export class LoginComponent implements OnInit {
    private url: string = "/api/v1/log_in";
    private loginForm: FormGroup;
    private message: string;
    
    constructor(
        private fb: FormBuilder, 
        private router: Router,
        private apiService: ApiService) {
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
        let body = JSON.stringify(formValuesObj);
        this.apiService.post(this.url, body)
            .subscribe(
                (data: any) => {
                    if (data.message === "Success") {
                        if (data.token) {
                            this.apiService.setToken(data.token.toString());
                            setTimeout(() => {
//                                this.router.navigate(["/personal-vocabulary"]);
                                this.router.navigate(['/personal-vocabulary', { outlets: {'menu':['menu'],'context': ['personal-vocabulary'] }}]);
                            }, 1000);
                        }
                    } else {
                       this.message = data.body;
                    }
                },
                (error: any) => console.log(<any>error)
            );
    }
}