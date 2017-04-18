import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";


import {ExchangeDataService} from "../services/exchange-data.service";

@Component({
    selector: "test",
    templateUrl: "test.component.html"

})

export class TestComponent implements OnInit {
    private testForm: FormGroup;
    private formData: FormData;

    constructor(
        private fb: FormBuilder, 
        private exchangeDataService: ExchangeDataService) {
    }
  
    ngOnInit(): void {
        this.testForm = this.fb.group({
            test_word: ""
            
        });
    }

    testWord() {
        
        /*
//        this.formData = new FormData();
//        this.formData.append("test_word", this.testForm.get('test_word').value);
//
//        console.log("form data " + this.formData);

        let formValuesObj = this.testForm.value;
        let body = JSON.stringify(formValuesObj);
        this.exchangeDataService.askServerTestWord(body)
        
//        this.exchangeDataService.askServerTestWord(this.formData)
            .subscribe(
                (data: any) => {                   
                    console.log(JSON.stringify(data));
                },
                (error: any) => console.log(<any>error)
            );
            
*/

        let url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/words/test';
        this.makeRequest(url).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
            
       
    }
    
    makeRequest(url: string) {   
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("test_word", this.testForm.get('test_word').value);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
          
//            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
//            xhr.setRequestHeader("Authorization", this.token);
            xhr.send(formData);
        });
    }
    
    
}