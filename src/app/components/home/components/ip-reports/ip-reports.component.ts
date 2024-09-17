import { Component, Input, OnChanges } from '@angular/core';
import { AbuseIpService } from '@/app/services/abuse-ip.service';
import { NgIf, NgStyle } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotFoundIconComponent } from '@/app/components/icons/not-found-icon/not-found-icon.component';
import { ErrorIconComponent } from '@/app/components/icons/error-icon/error-icon.component';
import { MatListModule } from '@angular/material/list';
import { SummaryObj, SummaryRes } from '../ip-summary/ip-summary.component';

export interface ErrorObj {
  val: boolean;
  msg?: string;
  code?: number;
}

export interface ReportI {
  reportedAt: string;
  comment: string;
  categories: number[];
  reporterId: number;
  reporterCountryCode: string;
  reporterCountryName: string;
}

@Component({
  selector: 'app-ip-reports',
  standalone: true,
  imports: [NgIf, NgStyle, NotFoundIconComponent, ErrorIconComponent, MatListModule],
  templateUrl: './ip-reports.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('800ms 800ms', style({ opacity: 1 }))]),
      transition(':leave', [animate(800, style({ opacity: 0 }))]),
    ]),
  ],
})
export class IPReportsComponent implements OnChanges {
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

  getDate(strDate: string) {
    if (!strDate || strDate.length === 0) {
      return '';
    } else {
      const d = new Date(strDate);
      return d.toLocaleDateString('en-GB');
    }
  }
}
