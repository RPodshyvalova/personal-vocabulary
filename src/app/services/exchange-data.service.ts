import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Word } from '../models/word';
import { Theme } from '../models/theme';

@Injectable()
export class ExchangeDataService implements OnInit {
    public url: string = "https://personal-vocabulary-v1.herokuapp.com";
    private headers = new Headers();  
    private token: string;
    
    constructor(private http: Http) { 
        this.token = localStorage.getItem('token');
        if (this.token) {
           this.headers.append("Authorization", this.token);
        }
    }
    
    ngOnInit(): void {
//        this.token = localStorage.getItem('token');
//        if (this.token) {
//           this.headers.append("Authorization", this.token);
//        }
    }
    
    askServerUniqueLogin(login: string): any {
        this.url = 'https://personal-vocabulary-v1.herokuapp.com/users/check?login=' + login;
        return this.http
            .get(this.url)
            .map((response: Response) => response.json());
    }
    
    askServerUniqueEmail(email: string): any {
//        this.headers.append('Content-Type': 'application/json');
        this.url = 'https://personal-vocabulary-v1.herokuapp.com/users/check?email=' + email;
        return this.http
            .get(this.url)
            .map((response: Response) => response.json());
    } 
    
    askServerRegisterUser(body: string): any {
//        this.url = 'https://personal-vocabulary-v1.herokuapp.com/signup.json';
        this.url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/registration';
        this.headers.append('Content-Type', 'application/json');
        console.log(body);
        return this.http
            .post(this.url, body, { headers: this.headers })
            .map((response: Response) => response.json());
    } 
   
    
    askServerLoginUser(body: string): any {
//        this.url = 'https://personal-vocabulary-v1.herokuapp.com/login.json';
        this.url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/log_in';
        this.headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.url, body, { headers: this.headers })
            .map((response: Response) => response.json());
    }
    
    getUserVocabulary(pageNumber: number): Observable<Word[]> {
       let headers = new Headers();
       headers.append('Content-Type', 'application/json');
       
//        this.url = 'http://localhost:8080/src/app/data/vocabulary.json';
//        https://personal-vocabulary-v1.herokuapp.com/words.json
//        this.url = 'https://personal-vocabulary-v1.herokuapp.com/words.json?page=' + pageNumber;
        console.log("localStorage from service " + JSON.stringify(localStorage));   
        console.log("this.headers from service " + JSON.stringify(headers));  
        this.url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/words/my?page=' + pageNumber;
        return this.http
            .get(this.url,  {headers: headers})
            .map((response: Response) => response.json().word as Word[]);
    }
    
    getCommonVocabulary(pageNumber: number): Observable<Word[]> {
//        https://personal-vocabulary-v1.herokuapp.com/words.json
        this.url = 'https://personal-vocabulary-v1.herokuapp.com/words.json?page=' + pageNumber;
        return this.http
            .get(this.url, { headers: this.headers })
            .map((response: Response) => response.json().word as Word[]);
    }
    
    getWordsCountInVocabulary(): Observable<number> {
        this.url = 'http://personal-vocabulary-v1.herokuapp.com/words/wordscount';
        return this.http
            .get(this.url)
            .map((response: Response) => response.json().count as number);
//            .map((response: Response) => response.text() as number);
    }
    
    addWordToVocabulary(formData: FormData): any {
        let url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/words/new';
//        let headers = new Headers();
//        headers.append('Content-Type', 'multipart/form-data');
//        if (this.token) {
//           headers.append("Authorization", this.token);
//        }
//
//        return this.http
//            .post(url, formData, { headers: headers })
//            .map((response: Response) => response.json());
            
        return new Promise((resolve, reject) => {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
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
//            xhr.setRequestHeader('Accept', 'application/json');
            console.log("token" , this.token)
            xhr.setRequestHeader("Authorization", this.token);
            xhr.send(formData);
        });
    } 
    
    
    askServerTestWord(formData: any): any {
        let headers = new Headers();
//        console.log('askServerTestWord ' + formData);
        let url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/words/test';
        headers.append('Content-Type', 'application/json');
//        headers.append('Content-Type', 'multipart/form-data');
//        headers.append('Accept', 'application/json');
        console.log(" askServerTestWord(  " + JSON.stringify(this.headers));
        if (this.token) {
           headers.append("Authorization", this.token);
        }
        return this.http
            .post(url, formData, { headers: headers })
            .map((response: Response) => response.json());
    }
    
    changeWordInVocabulary(formData: any): any {
        let headers = new Headers();
        console.log('changeWordInVocabulary ' + formData);
        let url = 'https://personal-vocabulary-v2.herokuapp.com/api/v1/words/edit';
        headers.append('Content-Type', 'multipart/form-data');
        return this.http
//            .put(url, formData, { headers: headers })
            .post(url, formData, { headers: headers })
            .map((response: Response) => response.json());
    } 
    
    askServerFindWord(word: any): Observable<Word>  {
        this.url = 'http://localhost:8080/src/app/data/findword';
        return this.http
            .post(this.url, word, { headers: this.headers })
            .map((response: Response) => response.json() as Word);
    }
    
    getUserVocabularyToRepeat(currentDate: any): Observable<Word[]> {
//        this.url = 'http://localhost:8080/src/app/data/vocabulary?currentDate=' + currentDate;
        this.url = 'https://personal-vocabulary-v1.herokuapp.com/words.json';
        console.log(currentDate);
        return this.http
            .get(this.url)
            .map((response: Response) => response.json().word as Word[]);
    }
    
    getThemes(): Observable<Theme[]>  {
        this.url = 'https://personal-vocabulary-v1.herokuapp.com/themes.json';
        return this.http
            .get(this.url, {headers: this.headers})
            .map((response: Response) => response.json() as Theme[]);    
    }
}
