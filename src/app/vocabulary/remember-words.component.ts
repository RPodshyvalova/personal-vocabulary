import {Component, OnInit, OnDestroy} from "@angular/core";
import {Word} from "../models/word";
import {ApiService} from "../services/api.service";

@Component({
    selector: "remember-words-list",
    templateUrl: "remember-words.component.html",
    styleUrls: ["remember-words.component.css"]
})

export class RememberWordsComponent implements OnInit {
    private url: string;
    private userRememberWords: Word[]; 
    private currentDate: Date;
    
    constructor(private apiService: ApiService) {
    }
    
    ngOnInit()  {
        this.currentDate = new Date();
        this.getSetOfWordsToRepeat();        
    }

    getSetOfWordsToRepeat() {
        this.url = `/api/v1/words/notice?currentDate=${this.currentDate.toLocaleDateString()}`;   
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {                    
                    if (data && (data as Word[]).length > 0 ) {
                        this.userRememberWords = data as Word[];
                    } else {
                       console.log("RememberWordsComponent userRememberWords empty");    
                    }
                },
                (error: any)  => console.log(<any>error)
            );     
    }
}