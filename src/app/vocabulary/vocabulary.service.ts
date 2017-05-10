import {Injectable} from '@angular/core';
import {Word} from "../models/word";
import {ApiService} from '../services/api.service';

@Injectable() 
export class VocabularyService {
    private vocabulary: Word[] = []; 
    
    constructor(private apiService: ApiService) {
    }
    
    getWords(pageNumber: number, url: string ): any {
        this.apiService.get(url)
            .subscribe(
                (data: any) => {                    
                    if (data && (data as Word[]).length > 0 ) {
                        this.vocabulary = data as Word[];
                    } 
                },
                (error: any)  => console.log(<any>error)
            );
        return this.vocabulary;   
    }
    
    getWordsCount(url: string): any {
        this.apiService.get(url)
            .subscribe(
                (data: any) => {
                    if (data) {
                        return data.message as number;
                    }
                },
                (error: any)  => console.log(<any>error)
            );
        return 0;
    }
}
