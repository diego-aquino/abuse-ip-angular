import { Component, Input, OnChanges } from '@angular/core';
import { AbuseIpService } from '@/app/services/abuse-ip.service';
import { NgIf, NgStyle } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotFoundIconComponent } from '@/app/components/icons/not-found-icon/not-found-icon.component';
import { ErrorIconComponent } from '@/app/components/icons/error-icon/error-icon.component';
import { MatListModule } from '@angular/material/list';
import { ReportI } from '../ip-reports/ip-reports.component';
import { map } from 'rxjs';

export interface ErrorObj {
  val: boolean;
  msg?: string;
  code?: number;
}

export interface SummaryObj {
  ipAddress: string;
  isPublic: boolean;
  ipVersion: number;
  isWhitelisted: boolean;
  abuseConfidenceScore: number;
  countryCode: string;
  countryName: string;
  usageType: string;
  isp: string;
  domain: string;
  hostnames: string[];
  isTor: boolean;
  totalReports: number;
  numDistinctUsers: number;
  lastReportedAt: string;
  reports: ReportI[];
}

export interface SummaryRes {
  data: SummaryObj;
}

@Component({
  selector: 'app-ip-summary',
  standalone: true,
  imports: [NgIf, NgStyle, NotFoundIconComponent, ErrorIconComponent, MatListModule],
  templateUrl: './ip-summary.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('800ms 800ms', style({ opacity: 1 }))]),
      transition(':leave', [animate(800, style({ opacity: 0 }))]),
    ]),
  ],
})
export class IPSummaryComponent implements OnChanges {
  @Input() ip = '';
  summary!: SummaryObj;
  isLoaded!: boolean;
  blacklist!: string[];
  isBlacklisted!: boolean;
  error: ErrorObj = {
    val: false,
  };

  constructor(private service: AbuseIpService) {
    this.getBlacklist()
  }

  ngOnChanges(): void {
    this.isLoaded = false;

    this.error = {
      val: false,
    };

    const response = this.service.check(this.ip);

    response.subscribe({
      next: (data) => {
        const dt = data as SummaryRes;
        this.summary = dt.data as SummaryObj;

        this.isLoaded = true;
        if (this.blacklist) this.isBlacklisted = this.blacklist.includes(this.ip);

        console.log(this.summary);
      },
      error: (err) => {

        this.summary = {} as SummaryObj;

        this.error = {
          val: true,
          msg: err.message,
          code: err.status,
        };

        this.isLoaded = true;

      },
    });
  }

  
  getBlacklist() {
    this.service
      .blacklist()
      .pipe(map((data: string) => data.split('\n').filter((ip) => ip.trim() !== '')))
      .subscribe({
        next: (blacklist: string[]) => {
          this.blacklist = blacklist;
          console.log(this.blacklist);
        },
        error: (err) => {
          console.log(err);
          this.summary = {} as SummaryObj;
          this.error = {
            val: true,
            msg: err.message,
            code: err.status,
          };
        },
      });
  }

  getDate(strDate: string) {
    if (!strDate || strDate.length === 0) {
      return '';
    } else {
      const d = new Date(strDate);
      return d.toLocaleDateString('pt-BR');
    }
  }

  getTextColor(num: number): string {
    let result = '';

    if (num <= 25) {
      result = 'D11E00';
    } else if (num < 70) {
      result = 'FFA318';
    } else {
      result = '3B9410';
    }

    return result;
  }
}
