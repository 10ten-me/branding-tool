import { Component, OnInit } from '@angular/core';
import { ThemeProviderService } from './theme-provider/theme-provider.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'theme-provider';

    constructor(
        private themeProviderService: ThemeProviderService,
    ) {}

    public ngOnInit() {
    }
}
