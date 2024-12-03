import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ROUTES_CONSTANTS } from './core/constants/routes.constants';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { APP_CONSTANTS } from './core/constants/app.constants';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button, ButtonDirective } from 'primeng/button';
import { NgClass } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, Button, OverlayPanelModule, RouterLink, NgClass, RouterLinkActive, MenubarModule, ButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  public navItems: MenuItem[] = [];
  public newActions: MenuItem[] = [];
  language = '';
  languages: any[] = [];
  formTypeStep: any | undefined;

  private _subscription$: Subject<void>;

  constructor(
    private _router: Router,
    private _translateService: TranslateService,
  ) {
    this._subscription$ = new Subject();
  }

  ngOnInit() {
    this.languages = [
      { label: APP_CONSTANTS.LANGUAGES.ES, value: APP_CONSTANTS.LANGUAGES.ES },
      { label: APP_CONSTANTS.LANGUAGES.EN, value: APP_CONSTANTS.LANGUAGES.EN },
      { label: APP_CONSTANTS.LANGUAGES.FR, value: APP_CONSTANTS.LANGUAGES.FR },
      { label: APP_CONSTANTS.COUNTRIES.PT, value: APP_CONSTANTS.COUNTRIES.PT },
      { label: APP_CONSTANTS.COUNTRIES.NL, value: APP_CONSTANTS.COUNTRIES.NL }
    ];
    this.language = this.languages[1].value;
    this.setNavItems();
    this.setNewAcctions();
  }

  isActive(route: string[]): boolean {
    return this._router.url === route[0];
  }

  setNavItems() {
    this.navItems = [
      {
        label: this._translateService.instant('HEADER.DASHBOARD'),
        icon: 'icons/dashboard.svg',
        activeIcon: 'icons/dashboard-active.svg',
        routerLink: [ROUTES_CONSTANTS.DASHBOARD],
      },
      {
        label: this._translateService.instant('HEADER.CLIENTS'),
        icon: 'icons/clients.svg',
        activeIcon: 'icons/clients-active.svg',
        routerLink: [ROUTES_CONSTANTS.CLIENTS],
      },
      {
        label: this._translateService.instant('HEADER.POOLS'),
        icon: 'icons/pools.svg',
        activeIcon: 'icons/pools-active.svg',
        routerLink: [ROUTES_CONSTANTS.POOLS],
      },
      {
        label: this._translateService.instant('HEADER.WATERLINK'),
        icon: 'icons/waterlink.svg',
        activeIcon: 'icons/waterlink-active.svg',
        routerLink: [ROUTES_CONSTANTS.WATERLINK],
      },
    ];
  }

  setNewAcctions() {
    this.newActions = [
      {
        label: 'HEADER.NEWCLIENT',
        icon: 'icons/clients-white.svg',
        routerLink: [ROUTES_CONSTANTS.NEWCLIENT],
      },
      {
        label: 'HEADER.NEWANALYST',
        icon: 'icons/science-white.svg',
        routerLink: [ROUTES_CONSTANTS.RAPID_ANALYSIS],
      },
    ];
  }

  changeLang(langValue: string, menuLanguage: OverlayPanel): void {
    this._translateService.use(langValue).subscribe(() => {
      this.language = langValue;
      menuLanguage.hide();
      this.setNavItems();
    });
  }

  isShowingRecipe(): boolean {
    return (this.formTypeStep?.formType == APP_CONSTANTS.ANALYSIS_TYPES.RAPID && this.formTypeStep.step == 4) ||
      (this.formTypeStep?.formType != APP_CONSTANTS.ANALYSIS_TYPES.RAPID && this.formTypeStep?.step == 3);
  }

  goToMyAccount(): void {
    this.resetFormData();
    this._router.navigate([ROUTES_CONSTANTS.MYACCOUNT]);
  }

  resetFormData(): void {
    console.log('reset');
  }

  ngOnDestroy() {
    this._subscription$.next();
    this._subscription$.complete();
  }
}
