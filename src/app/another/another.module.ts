import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { ThemeProviderModule } from '../theme-provider/theme-provider.module';



@NgModule({
    declarations: [
        TitleComponent,
    ],
    imports: [
        CommonModule,
        ThemeProviderModule.forChild(),
    ],
    exports: [
        TitleComponent,
    ]
})
export class AnotherModule { }
