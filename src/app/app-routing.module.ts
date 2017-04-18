import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PersonalVocabularyComponent} from "./vocabulary/personal-vocabulary.component";
import {CommonVocabularyComponent} from "./vocabulary/common-vocabulary.component";
import {NewWordComponent} from "./word/new-word.component";
import {RememberWordsComponent} from "./remember-words/remember-words.component";
import {TestComponent} from "./test/test.component";

import {FindWordComponent} from "./find-word/find-word.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login",  component: LoginComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "personal-vocabulary", component: PersonalVocabularyComponent},
    { path: "common-vocabulary", component: CommonVocabularyComponent},
    { path: "add-word", component: NewWordComponent},
    { path: "remember-words", component: RememberWordsComponent},
    { path: "find-word", component: FindWordComponent},
    { path: "test", component: TestComponent}
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}