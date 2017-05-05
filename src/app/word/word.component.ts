import {Component, OnInit, Input,  ElementRef, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Subscription} from 'rxjs/Rx';
import {Word} from "../models/word";
import {ApiService} from '../services/api.service';

@Component({
    selector: "word",
    templateUrl: "word.component.html",
    styleUrls: ["word.component.css"]
})

export class WordComponent implements OnInit {
    private url: string;
    private wordForm: FormGroup;
    private showDescriptionOfWord: boolean = false;
    private filesToUpload: Array<File>;
    private formData: FormData;
    private imageLikeBase64: string = ""; 
    private subscription: Subscription;
    @ViewChild("image") image: ElementRef;
    @Input() word: Word;
    
    constructor(
        private fb: FormBuilder, 
        private apiService: ApiService) {
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
    
    changeWord(event: any) {
        this.url = "/api/v1/words/edit";
        event.stopPropagation();
        let wordObj  =  { 
            "name": this.wordForm.get("name").value,
            "transcription": this.wordForm.get("transcription").value,
            "translation": this.wordForm.get("translation").value,
            "associate": this.wordForm.get("associate").value,
            "phrase": this.wordForm.get("phrase").value,
            "share": this.wordForm.get("share").value,
            "learned": this.wordForm.get("learned").value,
            "theme_name": this.wordForm.get("theme_name").value,
            "image": {
                    "filename": this.filesToUpload[0].name, 
                    "data": this.imageLikeBase64.length > 0 ? this.imageLikeBase64 : ""
                }
            };

        this.subscription = this.apiService.post(this.url, JSON.stringify(wordObj))
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                (error: any)  => console.log(<any>error)
            ); 
    }
    
    addImage(fileInput: any): boolean {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        if (this.filesToUpload[0].size >= 4194304) { //file size must be less then 4mB ( or 5mB = 5242880b ?)
            console.log("Such a big file. Its more then 4mB");
           return; 
        }
        let newWordConponentLink = this;
        let fileReader = new FileReader();
        let domImage = this.image;
        fileReader.onload = function(event) {
            let data = this.result;
            domImage.nativeElement.src = data;
            newWordConponentLink.imageLikeBase64 = data;
        }
        fileReader.readAsDataURL(this.filesToUpload[0]);
        return true;
    }    

    deleteWord(event: any) {
        event.stopPropagation();
        let wordName = this.wordForm.get("name").value; 
        this.url = `/api/v1/words/delete?name=${wordName}`;
        this.subscription = this.apiService.del(this.url) 
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                (error: any)  => console.log(<any>error)
            );      
    }
}