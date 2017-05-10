import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./authentication/login/login.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {PersonalVocabularyComponent} from "./vocabulary/personal-vocabulary.component";
import {CommonVocabularyComponent} from "./vocabulary/common-vocabulary.component";
import {NewWordComponent} from "./word/new-word.component";
import {RememberWordsComponent} from "./vocabulary/remember-words.component";
import {HomeComponent} from "./home/home.component";
import {FindWordComponent} from "./find-word/find-word.component";
import {NavigationComponent} from "./pages-nav-elements/navigation/navigation.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login",  component: LoginComponent },
    { path: "registration", component: RegistrationComponent },
//    { path: "personal-vocabulary", component: PersonalVocabularyComponent},
//    { path: "common-vocabulary", component: CommonVocabularyComponent},
//    { path: "add-word", component: NewWordComponent},
//    { path: "remember-words", component: RememberWordsComponent},
//    { path: "find-word", component: FindWordComponent},
    
    {path: 'personal-vocabulary', component: HomeComponent,
        children: [
            {path: 'menu', component: NavigationComponent, outlet: 'menu'},
            {path: 'personal-vocabulary', component: PersonalVocabularyComponent, outlet: 'context'}
      ]
    },
    {path: 'common-vocabulary', component: HomeComponent,
        children: [
            {path: 'menu', component: NavigationComponent, outlet: 'menu'},
            {path: 'common-vocabulary', component: CommonVocabularyComponent, outlet: 'context'}
      ]
    },
    {path: 'add-word', component: HomeComponent,
        children: [
            {path: 'menu', component: NavigationComponent, outlet: 'menu'},
            {path: 'add-word', component: NewWordComponent, outlet: 'context'}
      ]
    },
    {path: 'remember-words', component: HomeComponent,
        children: [
            {path: 'menu', component: NavigationComponent, outlet: 'menu'},
            {path: 'remember-words', component: RememberWordsComponent, outlet: 'context'}
      ]
    },
    {path: 'find-word', component: HomeComponent,
        children: [
            {path: 'menu', component: NavigationComponent, outlet: 'menu'},
            {path: 'find-word', component: FindWordComponent, outlet: 'context'}
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}