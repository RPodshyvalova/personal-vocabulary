import {Component} from "@angular/core";

@Component({
    selector: "home",
    template: `
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    <router-outlet  name="menu"></router-outlet>
                </div>
                <div class="col-sm-8 col-sm-offset-1">
                    <router-outlet  name="context"></router-outlet>
                </div> 
            </div>    
        </div> 
    `
})

export class HomeComponent {
}