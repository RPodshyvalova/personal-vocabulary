import {Component, OnInit, OnDestroy} from "@angular/core";
import {Word} from "../models/word";
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
                       console.log("CommonVocabularyComponent vocabulary empty");    
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
}