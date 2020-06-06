import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ThemeProviderService } from '../theme-provider.service';
import { Subscription } from 'rxjs';
import { Theme } from '../config.schema';

@Pipe({
  name: 'themeProvider',
  pure: false,
})
export class ThemeProviderPipe implements PipeTransform, OnDestroy {
    private value: string | number | undefined = undefined;
    private subscriptions = new Subscription();

    constructor(
        private themeProvider: ThemeProviderService,
        private ref: ChangeDetectorRef,
    ) {

    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    transform(key: string): string | number | undefined {
        const themeSubscriber = {
            next: (theme: Theme[]) => {
                this.value = this.themeProvider.instant(key, theme).value;
                this.ref.markForCheck();
            },
        };

        this.subscriptions.add(
            this.themeProvider.theme.subscribe(themeSubscriber),
        );

        return this.value;
    }

}
