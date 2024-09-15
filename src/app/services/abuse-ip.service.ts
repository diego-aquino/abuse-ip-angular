import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';

export interface ReportI {
  reportedAt: string;
  comment: string;
  categories: number[];
  reporterId: number;
  reporterCountryCode: string;
  reporterCountryName: string;
}

export interface AbuseIPData {
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
  lastReportedAt: Date;
  reports: ReportI[];
}

export interface AbuseIPRespondeI {
  data: AbuseIPData;
}

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
      },
      headers: {
        Key: this.abuseIpApiKey,
      },
    });
  }
}
