import {Component, OnInit, AfterContentInit, EventEmitter, Output, Renderer} from '@angular/core';
import {ExchangeDataService} from '../services/exchange-data.service';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.css']
})

export class PaginationComponent implements OnInit, AfterContentInit {
    private pages: Array<number> = []; 
    private currentPage: number;
    private chunkOfPages: number;
    private pagesCount: number;
    private wordsCount: number = 1;
    private fragment: number;
    private countWordsOnPage: number;
    private prevCurrentPage: number;
    @Output() onChanged = new EventEmitter<number>();
    
    constructor(
        private exchangeDataService: ExchangeDataService, 
        private renderer: Renderer) {
    }
    
    ngOnInit() {
        this.fragment = 10;
        this.countWordsOnPage = 100;
        this.chunkOfPages = 1;
        this.currentPage = 1;
        this.prevCurrentPage = 1;
        this.exchangeDataService.getWordsCountInVocabulary()
            .subscribe(
                data => {
                    console.log("data " + data);
                    this.wordsCount = data;
                },
                error  => console.log(<any>error)
            );
//        this.wordsCount = 5005;
//        this.wordsCount = 605;
        this.pagesCount = Math.floor(this.wordsCount / this.countWordsOnPage); 
          
        if (this.wordsCount % this.countWordsOnPage> 0) {
            this.pagesCount++;
        }
        if (this.pagesCount <= this.fragment) {
            this.fillArrPagesWithInterval(1,this.pagesCount);
        } else {
            this.fillArrPagesWithInterval(1,this.fragment);
        }
       
    }
    
    ngAfterContentInit(){
//        this.colorizePageElement(1, "gray");            
            
    }
    
    fillArrPagesWithInterval(beginInterval: number, endInterval: number) {
        this.pages = [];
        for (let i = beginInterval; i <= endInterval; i++) {
            this.pages.push(i);
        }
    }
    
    moveForward() {
        if (this.pagesCount - this.chunkOfPages * this.fragment > 0 
            && this.pagesCount - (this.chunkOfPages + 1) * this.fragment > 0 )  {
                this.fillArrPagesWithInterval(this.chunkOfPages * this.fragment, this.chunkOfPages * this.fragment + this.fragment);
                this.chunkOfPages++;   
        } else {
            this.fillArrPagesWithInterval(this.chunkOfPages * this.fragment, this.pagesCount); 
        }
    }
    
    moveBack() {
        if (this.chunkOfPages > 0) {
            this.chunkOfPages--;
            if (this.chunkOfPages !== 0) {
                this.fillArrPagesWithInterval(this.chunkOfPages * this.fragment, this.chunkOfPages * this.fragment + this.fragment);
            } else {
                this.fillArrPagesWithInterval(1, this.chunkOfPages * this.fragment + this.fragment);  
            }
        }
    }
    
    getPageOfWords(currentPage: number, event: any) {
        this.currentPage = currentPage;
        this.onChanged.emit(currentPage);

//        let spanElement = this.renderer.selectRootElement("span");
//        this.renderer.setElementStyle(spanElement, "backgroundColor", "green");
        this.renderer.setElementStyle(event.target, "backgroundColor", "gray");
        this.colorizePageElement(this.prevCurrentPage, "#dddddd");
        this.prevCurrentPage = this.currentPage;
//        this.renderer.setElementClass(event.target as Element, "red-text", true);
        
       
    }
    
    colorizePageElement(numberOfPage: number, color: string) {
        let pageElement = this.renderer.selectRootElement('.page' + numberOfPage);
        this.renderer.setElementStyle(pageElement, "backgroundColor", color);
//        console.log(numberOfPage);
        this.renderer.setElementProperty(pageElement, 'innerHTML', numberOfPage.toString());
    }
}