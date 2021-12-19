export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface UrlDetails {
  url: string;
  shortUrl: string;
  views: number;
  uniqueViews: number;
  id: string;
}

export interface DeviceDetails {
  os: {
    name: string;
    short_name: string;
    version: string | number;
    platform: string;
    family: string;
  };
  client: {
    type: string;
    name: string;
    short_name: string;
    version: string;
    engine: string;
    engine_version: string;
    family: string;
  };
  device: {
    id?: string;
    type: string;
    brand?: string;
    model?: string;
  };
}

interface Analytics {
  shortUrl: string;
  url: string;
  views: number;
  createdAt: string;
  id: string;
  visits: {
    location: string;
    analytics: DeviceDetails;
  }[];
}

export type AnalyticsResponse = Analytics[];
