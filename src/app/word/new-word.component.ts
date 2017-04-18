import { Component, OnInit, Input,  ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Word } from '../models/word';
import { Theme } from '../models/theme';
import {Router} from "@angular/router";
import {ExchangeDataService} from '../services/exchange-data.service';

@Component({
    selector: 'new-word',
    templateUrl: 'new-word.component.html',
    styleUrls: ['new-word.component.css']
})

export class NewWordComponent implements OnInit {
    public wordForm: FormGroup;
    private newWord: boolean;
    private wordFromVocabulary: boolean;
    private themesList: Theme[];
    private filesToUpload: Array<File>;
    @ViewChild('image') image: ElementRef;
   //@Input() word: Word;
    private formData: FormData = new FormData();
    private transcriptionStr: string = "";

    constructor(
        private fb: FormBuilder, 
        private exchangeDataService: ExchangeDataService,
        private router: Router) {
    }
    
    ngOnInit(): void {
        if (!localStorage.getItem('token')) {
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
            theme_name: [],
//            image: "",
            share: false,
            learned: false
        });        
//
//   user_id: "1",
//   theme_name: "",
//   name: "",
//   transcription: "",
//   translation: "",
//   associate: "",
//   phrase: "",
//   url: "",
//   share: false,
//   learned: false
//            });
//        }
    }
    
    
    //        

//        
//        let obj = { 
//      "user_id": "1",
//  "theme_name": "City",
//   "name": "Girl",
//   "transcription": "[ˌɪnfərˈmeɪʃən]",
//   "translation": "Информация",
//   "associate": "Knowledge or facts learned, especially about a certain subject or event",
//   "phrase": "Information is facts that you learn or discover",
//   "url": "url",
//   "share": "false",
//   "learned": "false"
//        };
//   
    onChanged(symbl: string){
        this.transcriptionStr += symbl;
        console.log("current str" + this.transcriptionStr); 
//        this.wordForm.value.transcription = this.transcriptionStr;
//        this.wordForm.patchValue({'transcription': this.transcriptionStr});
        this.wordForm.controls['transcription'].setValue(this.transcriptionStr);

    }
    
    getThemesList(): void {
        this.exchangeDataService.getThemes()
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.themesList = data;
                },
                (error: any)  => console.log(<any>error)
            ); 
    }
    
    addWord(): void {
//        this.formData = new FormData();
//        console.log("file is " +    this.filesToUpload[0].name);
//        console.log(JSON.stringify(this.wordForm.value));
//        this.formData.append('data', JSON.stringify(this.wordForm.value));
//        this.formData.append('image', this.filesToUpload[0]);
        
        

        this.formData.append("name", this.wordForm.get('name').value);
//        console.log(this.wordForm.get('transcription').value);
        this.formData.append("transcription", this.wordForm.get('transcription').value);
        this.formData.append("translation", this.wordForm.get('translation').value);
        this.formData.append("associate", this.wordForm.get('associate').value);
        this.formData.append("phrase", this.wordForm.get('phrase').value);
        this.formData.append("share", this.wordForm.get('share').value);
        this.formData.append("learned", false);
        this.formData.append("theme_name", this.wordForm.get('theme_name').value); 
        this.formData.append("image", this.filesToUpload[0]);  

//        console.log("formData is  " + this.formData.getAll());
        
//        this.exchangeDataService.addWordToVocabulary(this.formData)
//            .subscribe(
//                (data: any) => {
//                    console.log(data);
//                },
//                (error: any)  => console.log(<any>error)
//            ); 
        this.exchangeDataService
            .addWordToVocabulary(this.formData)
            .then(
                (data: any) => {
                    console.log(data);
                },
                (error: any)  => console.log(<any>error)
            );
    }
    
//    upload() {
//        this.makeFileRequest("http://server/api/upload", [], this.filesToUpload).then((result) => {
//            console.log(result);
//        }, (error) => {
//            console.error(error);
//        });
//    }
 

    addImage(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
      
        let fileReader = new FileReader();
        let domImage = this.image;
        fileReader.onload = function(event) {
            domImage.nativeElement.src = this.result;
        }
        fileReader.readAsDataURL(this.filesToUpload[0]);
        
        
        

//        console.log("this.filesToUpload[0].name;" + this.filesToUpload[0].name);  
////        this.word.image = this.filesToUpload[0].name;
//        this.wordForm.value.image = this.filesToUpload[0].name;
//        console.log(this.wordForm.value);
    }
 
//    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
//        return new Promise((resolve, reject) => {
//            var formData: any = new FormData();
//            var xhr = new XMLHttpRequest();
//            for(var i = 0; i < files.length; i++) {
//                formData.append("uploads[]", files[i], files[i].name);
//            }
//            xhr.onreadystatechange = function () {
//                if (xhr.readyState == 4) {
//                    if (xhr.status == 200) {
//                        resolve(JSON.parse(xhr.response));
//                    } else {
//                        reject(xhr.response);
//                    }
//                }
//            }
//            xhr.open("POST", url, true);
//            xhr.send(formData);
//        });
//    }
}