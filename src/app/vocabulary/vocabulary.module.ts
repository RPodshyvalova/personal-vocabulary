import { Injectable} from "@angular/core";
import {Word} from "../models/word";
import {ApiService} from "../services/api.service"; 

@NgModule({
    declarations: [],
    exports: []
})
export class VocabularyModule {
    constructor(private apiService: ApiService) {
    }

    getSetOfWords(url: string): any { 
        let vocabulary: Word[] = [];
        this.apiService.get(url)
            .subscribe(
                (data: any) => {                   
                    if (data && (data as Word[]).length > 0 ) {
                        vocabulary = data as Word[];
                    }
                },
                (error: any)  => {console.log(<any>error);}
            ); 
        return vocabulary;    
    }
}
