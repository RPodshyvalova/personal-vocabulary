import {Component, OnInit} from "@angular/core";
import {Word} from "../models/word";
import {VocabularyService} from './vocabulary.service';
import {ApiService} from '../services/api.service';

@Component({
    selector: "personal-vocabulary",
    templateUrl: "personal-vocabulary.component.html",
    styleUrls: ["personal-vocabulary.component.css"]
})

export class PersonalVocabularyComponent implements OnInit {
    private url: string;
    private userVocabulary: Word[]; 
    private wordsCount: number;
    private message: string;

//    constructor(private vocabularyService: VocabularyService) {
//    }
//    
//    ngOnInit() {
//        let num: number = 1; //number of page
//        this.url = `/api/v1/words/my?page=${num}&range=10`;
//        this.userVocabulary = this.vocabularyService.getWords(1, this.url);
//        if (this.userVocabulary.length === 0) {
//            this.showMessage("Sorry, but there are no words in your personal vocabulary.");
//        }
//        this.url = "/api/v1/words/count/my";
//        this.wordsCount = this.vocabularyService.getWordsCount(this.url);
//        
//        console.log("this.wordsCount = " + this.wordsCount);
//    }
//    
//    onChanged(num: number) {
//        this.userVocabulary = this.vocabularyService.getWords(num, this.url);
//    }
//    
//    showMessage(message: string) {
//        this.message = message;  
//        setTimeout(() => {this.message = "";}, 4000);
//    }

    constructor(private apiService: ApiService) {
    }
    
    ngOnInit() {
        this.getWordsCountFromCommonVocabulary();
        this.getSetOfWordsForPageWithNumber(1);
    }
        
    getSetOfWordsForPageWithNumber(num: number) {
        this.url = `/api/v1/words/my?page=${num}&range=10`;
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {                    
                    if (data && (data as Word[]).length > 0 ) {
                        this.userVocabulary = data as Word[];
                    } else {
                       this.showMessage("Sorry, but there are no words in personal use.");    
                    }
                },
                (error: any)  => console.log(<any>error)
            );    
    }
    
    getWordsCountFromCommonVocabulary() {
        this.url = "/api/v1/words/count/my";
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