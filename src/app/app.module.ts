import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {NewWordComponent} from "./word/new-word.component";
import {WordComponent} from "./word/word.component";
import {PersonalVocabularyComponent} from "./vocabulary/personal-vocabulary.component";
import {CommonVocabularyComponent} from "./vocabulary/common-vocabulary.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {TranscriptionPanelComponent} from "./transcription-panel/transcription-panel.component";
import {RememberWordsComponent} from "./remember-words/remember-words.component";
import {FindWordComponent} from "./find-word/find-word.component";
import {TestComponent} from "./test/test.component";

import {CustomValidationService} from "./services/custom-validation.service";
import {ExchangeDataService} from "./services/exchange-data.service";
 
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import "bootstrap/dist/css/bootstrap.css";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule
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
        TestComponent
    ],
    providers: [ 
        CustomValidationService, 
        ExchangeDataService 
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}