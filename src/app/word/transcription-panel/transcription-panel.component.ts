import {Component, OnInit, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "trascription-panel",
    templateUrl: "transcription-panel.component.html",
    styleUrls: ["transcription-panel.component.css"]
})

export class TranscriptionPanelComponent implements OnInit {
    private symbols: string[];
    @Output() onChanged = new EventEmitter<string>();
    
    ngOnInit() {
        this.symbols = ["b","d","f","3","d3","k","l","m","n","p","s","t","v","z","tʃ","ʃ","r","j",
            "Λ","a:","i","i:","ɔ","ɔ:","u","u:","e","ɜː",
            "əu","au","ei","ɔi","ai",
            "θ","ð","ŋ","w","æ","ə"];
    }
    
    getSymbol(num: number) {
        let index = num++; 
        this.change(this.symbols[index]);
    }

    change(symbl: string) {
        this.onChanged.emit(symbl);
    }
}