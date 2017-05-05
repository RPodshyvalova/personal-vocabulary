import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {LoginComponent} from "./authentication/login/login.component";
import {NewWordComponent} from "./word/new-word.component";
import {WordComponent} from "./word/word.component";
import {TranscriptionPanelComponent} from "./word/transcription-panel/transcription-panel.component";
import {PersonalVocabularyComponent} from "./vocabulary/personal-vocabulary.component";
import {CommonVocabularyComponent} from "./vocabulary/common-vocabulary.component";
import {RememberWordsComponent} from "./vocabulary/remember-words.component";
import {NavigationComponent} from "./pages-nav-elements/navigation/navigation.component";
import {PaginationComponent} from "./pages-nav-elements/pagination/pagination.component";
import {FindWordComponent} from "./find-word/find-word.component";
import {HomeComponent} from "./home/home.component";

import {CustomValidationService} from "./authentication/custom-validation.service";
import {ApiService} from "./services/api.service";
 
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import "bootstrap/dist/css/bootstrap.css";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        NewWordComponent,
        WordComponent,
        PersonalVocabularyComponent,
        CommonVocabularyComponent,
        NavigationComponent,
        PaginationComponent,
        TranscriptionPanelComponent,
        RememberWordsComponent,
        FindWordComponent,
        HomeComponent,
    ],
    providers: [ 
        CustomValidationService, 
        ApiService 
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}