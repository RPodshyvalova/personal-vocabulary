import {Component, OnInit} from '@angular/core';
import {Word} from '../models/word';
import {ExchangeDataService} from '../services/exchange-data.service';


@Component({
    selector: 'common-vocabulary',
    templateUrl: 'common-vocabulary.component.html',
    styleUrls: ['common-vocabulary.component.css']
})

export class CommonVocabularyComponent implements OnInit {
    private commonVocabulary: Word[]; 

    constructor(private exchangeDataService: ExchangeDataService) {
    }
    
    ngOnInit() {
        this.getSetOfWordsForPageWithNumber(1);
    }
    
    getSetOfWordsForPageWithNumber(num: number) {
        this.exchangeDataService.getCommonVocabulary(num)
            .subscribe(
                data => {
                    this.commonVocabulary = data;
                    console.log("this.commonVocabulary)" + this.commonVocabulary);
                },
                error  => console.log(<any>error)
            );    
    }
    
    //get new set of words for vocabulary page" + num    
    onChanged(num: number) {
        console.log("page is = " + num);
        this.getSetOfWordsForPageWithNumber(num);
    }
}