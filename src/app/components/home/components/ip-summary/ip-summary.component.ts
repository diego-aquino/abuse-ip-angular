import { AbuseIPData } from '@/app/services/abuse-ip.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ip-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ip-summary.component.html',
})
export class IPSummaryComponent {
  @Input() ip = '';
  @Input() ipData: AbuseIPData | null = null;
}
