import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TRANSLATION_EN } from '../../../../public/i18n/en';

export class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case 'EN':
        return of(TRANSLATION_EN);
      default:
        return of(TRANSLATION_EN);
    }
  }
}
