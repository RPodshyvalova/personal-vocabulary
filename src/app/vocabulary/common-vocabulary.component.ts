import {Component, OnInit} from "@angular/core";
import {Word} from "../models/word";
import {VocabularyService} from './vocabulary.service';
import {ApiService} from '../services/api.service';

@Component({
    selector: "common-vocabulary",
    templateUrl: "common-vocabulary.component.html",
    styleUrls: ["common-vocabulary.component.css"]
})

export class CommonVocabularyComponent implements OnInit {
    private url: string;
    private commonVocabulary: Word[]; 
    private wordsCount: number;
    private message: string;

//    constructor(private vocabularyService: VocabularyService) {
//    }
//    
//    ngOnInit() {
//        let num: number = 1; //number of page
//        this.url = `/api/v1/words/shared?page=${num}&range=10`;
//        this.commonVocabulary = this.vocabularyService.getWords(1, this.url);
//        if (this.commonVocabulary.length === 0) {
//            this.showMessage("Sorry, but there are no words in common use.");
//        }
//        this.url = "/api/v1/words/count/shared";
//        this.wordsCount = this.vocabularyService.getWordsCount(this.url);
//    }
//    
//    onChanged(num: number) {
//        this.commonVocabulary = this.vocabularyService.getWords(num, this.url);
//    }
//    
   
    constructor(private apiService: ApiService) {
    }
    
    ngOnInit() {
        this.getWordsCountFromCommonVocabulary();
        this.getSetOfWordsForPageWithNumber(1);
    }
        
    getSetOfWordsForPageWithNumber(num: number) {
        this.url = `/api/v1/words/shared?page=${num}&range=10`;
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {                    
                    if (data && (data as Word[]).length > 0 ) {
                        this.commonVocabulary = data as Word[];
                    } else {
                       this.showMessage("Sorry, but there are no words in common use.");    
                    }
                },
                (error: any)  => console.log(<any>error)
            );    
    }
    
    getWordsCountFromCommonVocabulary() {
        this.url = "/api/v1/words/count/shared";
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {
                    if (data) {
                        this.wordsCount = data.message as number;
                    }
                },
                (error: any)  => console.log(<any>error)
            );
    }
    
    onChanged(num: number) {
        this.getSetOfWordsForPageWithNumber(num);
    }
    
    showMessage(message: string) {
        this.message = message;  
        setTimeout(() => {this.message = "";}, 4000);
    }
}