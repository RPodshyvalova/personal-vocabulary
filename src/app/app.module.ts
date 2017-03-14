import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {WordComponent} from './word/word.component';
import {VocabularyComponent} from './vocabulary/vocabulary.component';
import {NavigationComponent} from './navigation/navigation.component';

import {CustomValidationService} from './services/custom-validation.service';
import {ExchangeDataService} from './services/exchange-data.service';
 
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import 'bootstrap/dist/css/bootstrap.css';

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
        WordComponent,
        VocabularyComponent,
        NavigationComponent
    ],
    providers: [ CustomValidationService, ExchangeDataService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }