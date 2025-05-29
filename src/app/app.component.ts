import { Component } from '@angular/core';
import { CompanyComponent } from './company/company.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-company></app-company>`,
  imports: [CompanyComponent]
})
export class AppComponent {}
