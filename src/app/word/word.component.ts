import {Component, OnInit, Input,  ElementRef, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Word} from "../models/word";
import {ExchangeDataService} from "../services/exchange-data.service";

@Component({
    selector: "word",
    templateUrl: "word.component.html",
    styleUrls: ["word.component.css"]
})

export class WordComponent implements OnInit {
    private wordForm: FormGroup;
    private showDescriptionOfWord: boolean = false;
    private filesToUpload: Array<File>;
    private formData: FormData;
    @ViewChild('image') image: ElementRef;
    @Input() word: Word;
    
    constructor(
        private fb: FormBuilder, 
        private exchangeDataService: ExchangeDataService) {
    }
    
    ngOnInit(): void {
        if (this.word) {
            this.wordForm = this.fb.group({
                name: [this.word.name, Validators.required],
                transcription: this.word.transcription,
                translation: this.word.translation,
                associate: this.word.associate,
                phrase: this.word.phrase,
                theme_name: this.word.theme,
                share: this.word.share,
                learned: this.word.learned
            });
            this.setDisableFormElements(); 
        } 
    }
    
    setDisableFormElements() {
        Object.keys((<FormGroup>this.wordForm).controls)
            .forEach((control) => {
                this.wordForm.get(control).disable();
            });
    }
    
    setEnableFormElements() {
        Object.keys((<FormGroup>this.wordForm).controls)
            .forEach((control) => {
                this.wordForm.get(control).enable();
            });
    }
    
    toggle() {
        this.showDescriptionOfWord = !this.showDescriptionOfWord;
    }
    
    editWord(event: any) {   
        event.stopPropagation(); 
        this.setEnableFormElements();
    }
    
    saveChanges(event: any){
        event.stopPropagation();
        console.log("word from editWord() " + JSON.stringify(this.word));   
        console.log(JSON.stringify(this.wordForm.value));
        console.log(this.wordForm.get('name').value);
        
       // {"name":"Info","transcription":"[ˌɪnfərˈmeɪʃən]","translation":"Информация","associations":"Knowledge or facts learned, especially about a certain subject or event","phrase":"Information is facts that you learn or discover","theme_name":"City","share":"false","learned":false}
        
        this.formData = new FormData();
        this.formData.append("name", this.wordForm.get('name').value);
        this.formData.append("transcription", this.wordForm.get('transcription').value);
        this.formData.append("translation", this.wordForm.get('translation').value);
        this.formData.append("associate", this.wordForm.get('associate').value);
        this.formData.append("phrase", this.wordForm.get('phrase').value);
        this.formData.append("share", this.wordForm.get('share').value);
        this.formData.append("learned", this.wordForm.get('learned').value);
        this.formData.append("theme_name", this.wordForm.get('theme_name').value); 
        this.formData.append("image", this.filesToUpload[0]);         
        
        this.exchangeDataService.changeWordInVocabulary(this.formData)
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                (error: any)  => console.log(<any>error)
            ); 
    }
    
    addImage(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
      
        let fileReader = new FileReader();
        let domImage = this.image;
        fileReader.onload = function(event) {
            domImage.nativeElement.src = this.result;
        }
        fileReader.readAsDataURL(this.filesToUpload[0]);
        
    }    
    
    deleteWord(event: any) {
        event.stopPropagation();
        console.log("word from deleteWord() " + this.word.toString());        
    }
}