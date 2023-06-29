export interface ApiResponse {
  apis: {
    [key: string]: ProviderData;
  };
}

export interface ProviderData {
  added: string;
  info: providerData;
  updated: string;
  swaggerUrl: string;
  swaggerYamlUrl: string;
  openapiVer: string;
  link: string;
}

export interface ProviderInfo {
  contact: {
    email: string;
    name: string;
    url: string;
    "x-twitter": string;
  };
  description: string;
  title: string;
  version: string;
  "x-apisguru-categories": string[];
  "x-logo": {
    url: string;
  };
  "x-origin": {
    format: string;
    url: string;
    version: string;
  }[];
  "x-providerName": string;
  "x-serviceName": string;
  "x-unofficialSpec": boolean;
}
