import { Component, Input, OnChanges } from '@angular/core';
import { AbuseIpService } from '@/app/services/abuse-ip.service';
import { NgIf, NgStyle } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotFoundIconComponent } from '@/app/components/icons/not-found-icon/not-found-icon.component';
import { ErrorIconComponent } from '@/app/components/icons/error-icon/error-icon.component';

export interface ErrorObj {
  val: boolean;
  msg?: string;
  code?: number;
}

export interface SummaryObj {
  countryName: string;
  countryCode: string;
  isp: string;
  domain: string;
  abuseConfidenceScore: number;
  totalReports: number;
  lastReportedAt: string;
}

export interface SummaryRes {
  data: SummaryObj;
}

@Component({
  selector: 'app-ip-summary',
  standalone: true,
  imports: [NgIf, NgStyle, NotFoundIconComponent, ErrorIconComponent],
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
  error: ErrorObj = {
    val: false,
  };

  constructor(private service: AbuseIpService) {}

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

        console.log(this.summary);
      },
      error: (err) => {
        console.log(err);

        this.summary = {} as SummaryObj;

        this.error = {
          val: true,
          msg: err.message,
          code: err.status,
        };

        this.isLoaded = true;

        console.log(this.error);
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
