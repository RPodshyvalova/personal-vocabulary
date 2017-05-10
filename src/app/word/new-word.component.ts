import {Component, OnInit, OnDestroy, Input,  ElementRef, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Word} from "../models/word";
import {Theme} from "../models/theme";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {WordService} from "./word.service";

@Component({
    selector: "new-word",
    templateUrl: "new-word.component.html",
    styleUrls: ["new-word.component.css"]
})

export class NewWordComponent implements OnInit {
    private url: string;
    public wordForm: FormGroup;
    private newWord: boolean;
    private wordFromVocabulary: boolean;
    private themesList: Theme[];
    private filesToUpload: Array<File> = [];
    private formData: FormData = new FormData();
    private transcriptionStr: string = "";
    private imageLikeBase64: string = ""; 
    private message: string;
    @ViewChild("image") image: ElementRef;

    constructor(
        private fb: FormBuilder, 
        private apiService: ApiService,
//        private wordService: WordService,
        private router: Router) {
    }
    
    ngOnInit() {
        if (!localStorage.getItem("token")) {
            this.router.navigate(["/login"]);
        }
        this.getThemesList();
        this.wordFromVocabulary = false;
        this.newWord = true;
        this.wordForm = this.fb.group({
            name: ["", Validators.required],
            transcription: "",
            translation: "",
            associate: "",
            phrase: "",
            theme_name: [[], Validators.required],
            share: false,
            learned: false
        });        
    }
   
    onChanged(symbl: string) {
        this.transcriptionStr += symbl;
        this.wordForm.controls["transcription"].setValue(this.transcriptionStr);
    }
    
    addSymbolByKeypress(event: any) {
//        let key = event.keyCode | event.which; 
        this.transcriptionStr = event.target.value;
    }
    
    getThemesList(): void {
        this.url = "api/v1/themes/all";
        this.apiService.get(this.url)
            .subscribe(
                (data: any) => {
                    if (data) {
                        this.themesList = data as Theme[];
                    }
                },
                (error: any)  => console.log(<any>error)
            );
    }
    
    addWord(): void {
        console.log(JSON.stringify("add word " + this.wordForm.value));
        this.url = "/api/v1/words/new";
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
                    "filename": this.filesToUpload.length > 0  ? this.filesToUpload[0].name : "", 
                    "data": this.imageLikeBase64.length > 0 ? this.imageLikeBase64 : ""
                }
            };    

        this.apiService.post(this.url, JSON.stringify(wordObj))
            .subscribe(
                (data: any) => {
                    if (data.message === "Success") {
                        this.message = "The word was added to the vocabulary successfully.";
                        this.reset();
                    }
                },
                (error: any)  => {
                    this.message = `Sorry, ${error}`;
                    console.log(<any>error)
                }
            ); 
    }

    addImage(fileInput: any): boolean {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        if (this.filesToUpload[0].size >= 5242880) { //file size < 5 mB === 5242880 b
            this.message = "Sorry, but the file size must be less then 5 Mb";
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
    
    reset() {
        this.wordForm.reset();
        this.image.nativeElement.src = "";
    }
}