import { NgModule, ModuleWithProviders, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThemeProviderService, ThemingSettings, THEMING_SETTINGS } from './theme-provider.service';
import { ThemeProviderPipe } from './pipe/theme-provider.pipe';

export function themeProviderModuleInstance() {
    const themeProviderModuleCreated = (themeProviderModuleInstance as any)._platformModuleCreated || false;
    if (themeProviderModuleCreated) {
       throw new Error('PlatformModule.forRoot imported to many times');
    }
    (themeProviderModuleInstance as any)._platformModuleCreated = true;
 }

@NgModule(
    {
        imports: [
            CommonModule,
            HttpClientModule,
        ],
        declarations: [
            ThemeProviderPipe,
        ],
        exports: [
            ThemeProviderPipe,
        ],
    }
)
export class ThemeProviderModule {

    public static forRoot(settings: ThemingSettings): ModuleWithProviders<ThemeProviderModule> {
        return {
            ngModule: ThemeProviderModule,
            providers: [
                {
                    provide: THEMING_SETTINGS,
                    useValue: settings,
                },
                {
                    provide: 'ThemeProviderModuleInstance',
                    useFactory: themeProviderModuleInstance,
                },
                ThemeProviderService,
            ],
        };
    }

    public static forChild(): ModuleWithProviders<ThemeProviderModule> {
        return {
            ngModule: ThemeProviderModule,
            providers: [
                ThemeProviderService,
            ]
        };
    }

    constructor(
        @Inject('ThemeProviderModuleInstance') instance: any,
        themeProviderService: ThemeProviderService,
    ) {
        /**
         * @description Load themes and Use * Default Theme*
         */
        themeProviderService.load();
        themeProviderService.use();
    }
}
