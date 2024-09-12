import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ip-summary',
  standalone: true,
  imports: [],
  templateUrl: './ip-summary.component.html',
})
export class IPSummaryComponent {
  @Input() ip = '';
}
