import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Word} from '../models/word';
import {Router} from "@angular/router";
import {ExchangeDataService} from '../services/exchange-data.service';

@Component({
    selector: 'personal-vocabulary',
    templateUrl: 'personal-vocabulary.component.html',
    styleUrls: ['personal-vocabulary.component.css']
})

export class PersonalVocabularyComponent implements OnInit {
    private userVocabulary: Word[]; 
    
    constructor(
        private exchangeDataService: ExchangeDataService, 
        private router: Router) {
    }
    
    ngOnInit() {
        if (!localStorage.getItem('token')) {
            this.router.navigate(["/login"]);
        }
        console.log("PersonalVocabularyComponent" + localStorage.getItem('token'));
        this.getSetOfWordsForPageWithNumber(1);
    }
    
    getSetOfWordsForPageWithNumber(num: number) {
        this.exchangeDataService.getUserVocabulary(num)
            .subscribe(
                data => {
                    if (data) {
                        this.userVocabulary = data;
                        console.log("PersonalVocabularyComponent userVocabulary data" + this.userVocabulary);
                    } else {
                       console.log("PersonalVocabularyComponent userVocabulary empty");    
                    }
                },
                error  => console.log(<any>error)
            );    
    }
    
    //get new set of words for vocabulary page" + num    
    onChanged(num: number) {
        this.getSetOfWordsForPageWithNumber(num);
    }
}