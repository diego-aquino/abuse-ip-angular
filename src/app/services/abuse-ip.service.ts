import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbuseIpService {
  private abuseIpUrl = environment.abuseIpUrl;
  private abuseIpApiKey = environment.abuseIpApiKey;

  constructor(private httpClient: HttpClient) {}

  public check(ipAddress: string) {
    return this.httpClient.get(`${this.abuseIpUrl}/check`, {
      params: {
        ipAddress,
        maxAgeInDays: '90',
        verbose: '', //countryName won't be returned without this
      },
      headers: {
        Key: this.abuseIpApiKey,
      },
    });
  }
}
