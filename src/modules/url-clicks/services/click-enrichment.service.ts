import { Injectable } from '@nestjs/common';
import { lookup } from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

export type ClickEnrichment = {
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
};

@Injectable()
export class ClickEnrichmentService {
  enrich(ip?: string, userAgent?: string): ClickEnrichment {
    const geo = ip ? this.lookupIp(ip) : {};
    const ua = userAgent ? this.lookupUserAgent(userAgent) : {};

    return { ...geo, ...ua };
  }

  private lookupIp(ip: string) {
    const geo = lookup(ip);
    return {
      country: geo?.country ?? undefined,
      city: geo?.city ?? undefined,
    };
  }

  private lookupUserAgent(userAgent: string) {
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name ?? undefined;
    const os = parser.getOS().name ?? undefined;
    const deviceType = parser.getDevice().type ?? 'desktop';

    return { browser, os, deviceType };
  }
}
