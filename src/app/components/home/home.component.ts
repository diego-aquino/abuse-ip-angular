import { Component } from '@angular/core';
import {
  FormValues as IPSearchFormValues,
  IPSearchBarComponent,
} from './components/ip-search-bar/ip-search-bar.component';
import { IPSummaryComponent } from './components/ip-summary/ip-summary.component';
import { AbuseIPData, AbuseIPRespondeI, AbuseIpService } from '@/app/services/abuse-ip.service';
import { Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IPSearchBarComponent, IPSummaryComponent],
  templateUrl: './home.component.html',
  providers: [AbuseIpService],
})
export class HomeComponent {
  public ip = '';
  public ipData: AbuseIPData | null;
  private destroy$ = new Subject<void>();

  constructor(private abuseIpService: AbuseIpService) {
    this.ipData = null;
  }

  onSearchBarSubmit(event: IPSearchFormValues) {
    this.ip = event.ip;

    this.abuseIpService
      .check(this.ip)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.error(err);
          return [];
        }),
      )
      .subscribe((response) => {
        const abuseIPResponse = response as AbuseIPRespondeI;
        this.ipData = abuseIPResponse.data;
        console.log(this.ipData);
      });
  }
}
