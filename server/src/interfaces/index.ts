export type DeviceDetails = {
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
    id: string;
    type: string;
    brand: string;
    model: string;
  };
};

export interface ILocation {
  locality?: string;
  county?: string;
  country?: string;
}
