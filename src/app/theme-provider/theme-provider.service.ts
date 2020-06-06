import Ajv from 'ajv';
import { Injectable, OnDestroy, Inject, InjectionToken } from '@angular/core';
import {
    themeProviderConfig,
    ThemeProviderConfig,
    Theme,
 } from './config.schema';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, from } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

export interface ThemingSettings {
    theme: string;
    sourceType: 'url' | 'object';
    source: ThemeProviderConfig;
}

export const THEMING_SETTINGS = new InjectionToken('ThemeProvider.theme');

@Injectable({
  providedIn: 'root'
})
export class ThemeProviderService implements OnDestroy {
    public readonly themes = new BehaviorSubject<ThemeProviderConfig>({});

    private selectedTheme: Theme[] = [];
    private readonly subscriptions = new Subscription();
    private readonly validator: Ajv.ValidateFunction;

    public get theme() {
        return this.themes.asObservable()
            .pipe(
                map(
                    themes => {
                        const theme = themes[this.themingSettings.theme];
                        if (!theme || !Array.isArray(theme)) {
                            return [];
                        }
                        return theme;
                    }
                )
            );
    }

    constructor(
        private http: HttpClient,
        @Inject(THEMING_SETTINGS) private themingSettings: ThemingSettings,
    ) {
        const ajv = new Ajv();
        this.validator = ajv.compile(themeProviderConfig);
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    public instant(key: string, arr?: Theme[]) {
        for ( const item of (arr || this.selectedTheme) ) {
            if (item.key === key) {
                return item;
            }
        }
        return undefined;
    }

    public use() {
        this.subscriptions.add(
            this.theme.subscribe(
                {
                    next: (theme) => {
                        this.selectedTheme = [].concat(...theme);
                    },
                },
            ),
        );
    }

    public load() {
        switch (this.themingSettings.sourceType) {
            case 'object':
                this.loadFromObject(this.themingSettings.source);
                break;
            case 'url':
                this.loadFromUrl(this.themingSettings.source);
                break;
        }
    }

    private loadFromObject(source: ThemeProviderConfig) {
        const validateSourceKeys = Object.keys(source).filter(key => this.validator(source[key] as Array<Theme>));
        const validatedSourcesOnly: ThemeProviderConfig = {};

        for (const key of validateSourceKeys) {
            validatedSourcesOnly[key] = source[key] as Array<Theme>;
        }

        this.themes.next(validatedSourcesOnly);
        return;
    }

    private loadFromUrl(source: ThemeProviderConfig) {
        const validatedSourcesOnly: ThemeProviderConfig = {};

        this.subscriptions.add(
            from(Object.keys(source))
                .pipe(
                    map(
                        key => {
                            if (typeof source[key] === 'string') {
                                throw new Error(`theme source ${key} should be a string instead got ${source[key]}`);
                            }
                            return key;
                        }
                    ),
                    switchMap(
                        (key: string) => this.http.get(source[key] as string).pipe(
                            filter(
                                (data: Array<Theme>) => this.validator(data) as boolean,
                            ),
                            map<Theme[], [string, Array<Theme>]>(
                                (data: Array<Theme>) => [key, data],
                            ),
                        ),
                    )
                ).subscribe(
                    {
                        next: ([key, data]: [string, Array<Theme>]) => {
                            validatedSourcesOnly[key] = data;
                        },
                        error: console.error,
                        complete: () => {
                            this.themes.next(validatedSourcesOnly);
                        }
                    }
                )
        );
    }
}
