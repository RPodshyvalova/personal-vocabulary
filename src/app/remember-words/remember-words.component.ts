import { Component } from '@angular/core';
import { Word } from '../models/word';
import {ExchangeDataService} from '../services/exchange-data.service';

@Component({
    selector: 'remember-words-list',
    templateUrl: 'remember-words.component.html',
    styleUrls: ['remember-words.component.css']
})

export class RememberWordsComponent {
    private userRememberWords: Word[]; 
    private currentDate: Date;
    
    constructor(private exchangeDataService: ExchangeDataService) {
        this.currentDate = new Date();
        this.getSetOfWordsToRepeat();
    }
    
    getSetOfWordsToRepeat() {
        this.exchangeDataService.getUserVocabularyToRepeat(this.currentDate)
            .subscribe(
                data => {
                    this.userRememberWords = data;
                    console.log(this.userRememberWords);
                },
                error => console.log(<any>error)
            );    
    }
        
}