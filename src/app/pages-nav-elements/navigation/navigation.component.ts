import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "navigation-menu",
    templateUrl: "navigation.component.html",
    styleUrls: ["navigation.component.css"]
})

export class NavigationComponent {
    constructor(
        private router: Router) {
    }
    
    gotoPersonalVocabulary(event: any): void {
        this.router.navigate(["/personal-vocabulary", 
            { outlets: {"menu":["menu"],"context": ["personal-vocabulary"] }}]);
    }
    
    gotoAddNewWord(event: any): void {
        this.router.navigate(["/add-word", 
            { outlets: {"menu":["menu"],"context": ["add-word"] }}]);    
    }
    
    gotoFindWord(event: any): void {
        this.router.navigate(["/find-word", 
            { outlets: {"menu":["menu"],"context": ["find-word"] }}]);    
    }
    
    gotoCommonVocabulary(event: any): void {
        this.router.navigate(["/common-vocabulary", 
            { outlets: {"menu":["menu"],"context": ["common-vocabulary"] }}]);    
    }
    
    gotoVoticeWords(event: any): void {
        this.router.navigate(["/remember-words", 
            { outlets: {"menu":["menu"],"context": ["remember-words"] }}]);    
    }
}