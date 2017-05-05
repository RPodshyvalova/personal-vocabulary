import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Word} from "../models/word";

@Component({
    selector: "find-word",
    templateUrl: "find-word.component.html",
    styleUrls: ["find-word.component.css"]
})

export class FindWordComponent implements OnInit{
    private url: string;
    private subscription: any;
    private findForm: FormGroup;  
    private findVocabulary: Word[]; 
    private wordsParamsObj: any = {};
    
    constructor(
        private fb: FormBuilder, 
        private apiService: ApiService) {
    }
    
    ngOnInit(): void {
        this.findForm = this.fb.group({
            word: "",
            vocabulary: "own" 
        })
    }
    
    defineWordsLang(word: string): string {
        let smblsCode = word.toLowerCase().charCodeAt(0);
        if (smblsCode >= 97 && smblsCode <= 122) {
            return "eng";
        } else {
            if (smblsCode >= 1072  && smblsCode <= 1103) { 
                return "ru";
            }
        }
        return null;
    }
    
    findWord() {
        let formValuesObj = this.findForm.value;
        let language = this.defineWordsLang(formValuesObj.word);
        this.wordsParamsObj = {
            word: formValuesObj.word,
            lang: language ? language : "",
            vocabulary: formValuesObj.vocabulary // can be "own" or "common" or "both"
        };
        
//        console.log(JSON.stringify(this.wordsParamsObj));
        this.url =  `/api/v1/words/search?text=${this.wordsParamsObj.word}&lang=${this.wordsParamsObj.lang}`;
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {
                    if (data && (data as Word[]).length > 0 ) {
                        this.findVocabulary = data as Word[];
                    } else {
                       console.log("FindWordComponent findVocabulary empty");    
                    }
                  },
                (error: any) => console.log(<any>error)
            );
    }
}