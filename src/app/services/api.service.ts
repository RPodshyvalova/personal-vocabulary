import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class ApiService {
    private headers: Headers;
    private baseUrl: string = 'http://personal-vocabulary-v3.herokuapp.com';
    private token: string;
    
    constructor (private http: Http) {
        this.setHeaders();
    }
    
    private setHeaders() {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", this.getToken());   
    }

    setToken(token: string) {
        if (!this.supportsLocalStorage()) {
            console.log("doesnt support localStorage");
        } else {
            localStorage.setItem("token", token); 
        }
    }
    
    getToken() {
        return localStorage.getItem("token");
    }
    
    supportsLocalStorage() {
        return typeof(Storage)!== "undefined";
    }
    
    get(url: string): any {
        return this.http
            .get(`${this.baseUrl}/${url}`, {headers : this.headers})
            .map((response: Response) => response.json());
    }
    
    post(url: string, body: string): any {
        return this.http
            .post(this.baseUrl + url, body, {headers: this.headers})
            .map((response: Response) => response.json());
    }
    
    del(url: string): any {
        return this.http
            .delete(`${this.baseUrl}/${url}`, {headers : this.headers})
            .map((response: Response) => response.json());
    }
}