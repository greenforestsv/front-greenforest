import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

interface IpResponse {
  ip: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http = inject(HttpClient);

  private ip$ = this.http.get<IpResponse>('https://api.ipify.org?format=json').pipe(shareReplay(1));

  getIp(): Observable<IpResponse> {
    return this.ip$;
  }

  getDevice(): string {
    const ua = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|ipod/.test(ua)) {
      return 'mobile';
    }

    if (/tablet/.test(ua)) {
      return 'tablet';
    }

    return 'desktop';
  }

  getModel(): string {
    const ua = navigator.userAgent;

    if (/iPhone/i.test(ua)) return 'iPhone';
    if (/iPad/i.test(ua)) return 'iPad';
    if (/Android/i.test(ua)) return 'Android';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Macintosh/i.test(ua)) return 'Mac';
    if (/Linux/i.test(ua)) return 'Linux';

    return 'Unknown';
  }
}
