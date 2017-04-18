import {Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Word } from '../models/word';

@Component({
    selector: 'find-word',
    templateUrl: 'find-word.component.html',
    styleUrls: ['find-word.component.css']
})

export class FindWordComponent implements OnInit {
    private findForm: FormGroup;  
    private wordsInfo: Word;
    private wordObjToSend: any = {};
    
    constructor(
        private fb: FormBuilder, 
        private exchangeDataService: ExchangeDataService) {
    }
    
    ngOnInit(): void {
        this.findForm = this.fb.group({
            word: "",
            vocabulary: "own" 
        })
    }
    
    defineWordsLang(word: string): string {
        let smblsCode = word.toLowerCase().charCodeAt(0);
        console.log("smbl" + smblsCode);
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
        this.wordObjToSend = {
            word: formValuesObj.word,
            lang: language ? language : "",
            vocabulary: formValuesObj.vocabulary // can be "own" or "common" or "both"
        };
        
        console.log(this.wordObjToSend);
        this.wordsInfo = {
            name: "",
            transcription: "",
            translation: "",
            associate: "",
            phrase: "",
            theme: "",
            image: "",
            share: false,
            learned: false
        };
    }
        

           
//        this.exchangeDataService.askServerFindWord(this.wordObjToSend )
//            .subscribe(
//                (data: any) => {
//                    console.log(data);
//                    this.wordsInfo = data;
//                },
//                (error: any) => console.log(<any>error)
//            );
    
//    }    
    
}
