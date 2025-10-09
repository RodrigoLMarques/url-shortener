import { Injectable } from '@nestjs/common';
import { lookup } from 'geoip-lite';
import { tryCatchSync } from 'src/helpers/try-catch';
import { UAParser } from 'ua-parser-js';
import {
  messagingKeywords,
  platformMap,
  searchKeywords,
  socialKeywords,
} from '../models/url-click.constant';

export type ClickEnrichment = {
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
};

export type ReferrerCategory =
  | 'Direct'
  | 'Social Media'
  | 'Search Engine'
  | 'Messaging'
  | 'Other';

export interface ReferrerInfo {
  category: ReferrerCategory;
  domain?: string;
  platform?: string;
}

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

  getReferrerInfo(referrer?: string): ReferrerInfo {
    const category = this.categorizeReferrer(referrer);

    if (category === 'Direct') {
      return { category };
    }

    const domain = this.extractDomain(referrer);
    const platform = this.identifyPlatform(referrer);

    return {
      category,
      domain,
      platform,
    };
  }

  private categorizeReferrer(referrer?: string): ReferrerCategory {
    if (!referrer || referrer === 'direct') {
      return 'Direct';
    }

    const lowerRef = referrer.toLowerCase();

    if (socialKeywords.some((keyword) => lowerRef.includes(keyword))) {
      return 'Social Media';
    }
    if (searchKeywords.some((keyword) => lowerRef.includes(keyword))) {
      return 'Search Engine';
    }
    if (messagingKeywords.some((keyword) => lowerRef.includes(keyword))) {
      return 'Messaging';
    }
    return 'Other';
  }

  private extractDomain(referrer?: string): string | undefined {
    if (!referrer || referrer === 'direct') {
      return undefined;
    }

    const [data, err] = tryCatchSync<URL>(() => new URL(referrer));
    if (err) return undefined;
    return data.hostname.replace(/^www\./, '');
  }

  private identifyPlatform(referrer?: string): string | undefined {
    if (!referrer || referrer === 'direct') {
      return undefined;
    }

    const lowerRef = referrer.toLowerCase();

    for (const [domain, platform] of Object.entries(platformMap)) {
      if (lowerRef.includes(domain)) {
        return platform;
      }
    }

    return this.extractDomain(referrer);
  }
}
