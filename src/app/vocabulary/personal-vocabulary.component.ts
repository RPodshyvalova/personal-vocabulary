import {Component, OnInit, OnDestroy} from "@angular/core";
import {Word} from "../models/word";
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

    constructor(private apiService: ApiService) {
    }
    
    ngOnInit() {
        this.getWordsCountFromPersonalVocabulary();
        this.getSetOfWordsForPageWithNumber(1);
    }
    
    getSetOfWordsForPageWithNumber(num: number) {
        this.url = `/api/v1/words/my?page=${num}&range=10`;
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {     
                    console.log(JSON.stringify(data));               
                    if (data && (data as Word[]).length > 0 ) {
                        this.userVocabulary = data as Word[];
                    } else {
                       console.log("PersonalVocabularyComponent userVocabulary empty");    
                    }
                },
                (error: any)  => console.log(<any>error)
            );   
    }
    
    //get new set of words for vocabulary page" + num    
    onChanged(num: number) {
        this.getSetOfWordsForPageWithNumber(num);
    }
    
    getWordsCountFromPersonalVocabulary() {
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
}