export interface Location {
  country?: {
    code?: string;
  };
}

export interface ServiceGroup {
  name?: string;
}

export interface Service {
  service?: {
    serviceGroup?: ServiceGroup;
  };
}

export interface Agency {
  id: string;
  companyName: string;
  locations: Location[];
  agencyService: Service[];
}
