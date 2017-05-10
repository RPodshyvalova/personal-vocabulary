import {Injectable} from '@angular/core';
import {Word} from "../models/word";
import {Theme} from "../models/theme";
import {ApiService} from '../services/api.service';

@Injectable() 
export class WordService {
    private themes: Theme[] = []; 
    
    constructor(private apiService: ApiService) {
    }
    
    getThemesList(): any {
        let url = "api/v1/themes/all";
        this.apiService.get(url)
            .subscribe(
                (data: any) => {
                    if (data) {
                        this.themes = data as Theme[];
                    }
                },
                (error: any)  => console.log(<any>error)
            );
        return this.themes;
    }
    
    
//    getWords(pageNumber: number, url: string ): any {
//        console.log("words for url" + url);
//        this.apiService.get(url)
//            .subscribe(
//                (data: any) => {                    
//                    if (data && (data as Word[]).length > 0 ) {
//                        this.vocabulary = data as Word[];
//                    } 
//                },
//                (error: any)  => console.log(<any>error)
//            );
////        console.log(JSON.stringify(this.vocabulary));    
//        return this.vocabulary;   
//    }
//    
//    getWordsCount(url: string): any {
//        console.log("words count for url" + url);
//        this.apiService.get(url)
//            .subscribe(
//                (data: any) => {
//                    if (data) {
//                        console.log(data.message as number);
//                        return data.message as number;
//                    }
//
//                },
//                (error: any)  => console.log(<any>error)
//            );
//        return 0;
//    }
}
