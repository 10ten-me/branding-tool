import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeProviderModule } from './theme-provider/theme-provider.module';
import { AnotherModule } from './another/another.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ThemeProviderModule.forRoot(
            {
                theme: 'my-theme',
                source: {
                    'my-theme': [
                        {
                            key: 'com.app.title.text',
                            value: 'Welcome My Theme',
                            label: 'Represents the title of app',
                        },
                        {
                            key: 'com.app.color.bgcolor',
                            value: '#008736',
                            label: 'The color for the topbar',
                        },
                        {
                            key: 'com.app.color.fgcolor',
                            value: '#008736',
                            label: 'The color for the topbar',
                        },
                        {
                            key: 'com.app.logo.image',
                            value: 'assets/logo-black.png',
                            label: 'Application Logo'
                        }
                    ],
                },
                sourceType: 'object',
            }
        ),
        AnotherModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
