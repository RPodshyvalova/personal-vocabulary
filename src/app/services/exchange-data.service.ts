import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ExchangeDataService {
    private url: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });  
    
    constructor(private http: Http) { 
    }

    askServerRegisterUser(body: string): any {
        this.url = 'https://blooming-lowlands-46132.herokuapp.com/signup.json';
        return this.http
            .post(this.url, body, { headers: this.headers })
            .map((res: Response) => res.json());
    } 
    
    askServerLoginUser(body: string): any {
        this.url = ' https://blooming-lowlands-46132.herokuapp.com/login.json';
        return this.http
            .post(this.url, body, { headers: this.headers })
            .map((res: Response) => res.json());
    }
    
    getUserVocabulary() {
        this.url = 'src/app/data/vocabulary.json';
    }
}
