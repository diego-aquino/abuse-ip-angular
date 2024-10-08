import { Component } from '@angular/core';
import {
  FormValues as IPSearchFormValues,
  IPSearchBarComponent,
} from './components/ip-search-bar/ip-search-bar.component';
import { IPSummaryComponent } from './components/ip-summary/ip-summary.component';
import { IPReportsComponent } from './components/ip-reports/ip-reports.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IPSearchBarComponent, IPSummaryComponent, IPReportsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  ip = '';

  onSearchBarSubmit(event: IPSearchFormValues) {
    this.ip = event.ip;
  }
}
