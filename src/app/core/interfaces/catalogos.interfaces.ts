export interface Country {
  iso_code: string;
  name: string;
  phone_code: string;
  currency: string;
  currency_symbol: string;
  region: Region;
  states: State[];
  timezones?: Timezone[];
  is_active: boolean;
}

export interface GetCountryDto {
  iso_code: string;
  name: string;
  phone_code: string;
  currency: string;
  currency_symbol: string;
  timezones?: Timezone[];
  is_active: boolean;
}

export interface Timezone {
  zoneName: string;
  gmtOffsetName: string;
}

export interface Region {
  id: number;
  name: string;
  is_active: boolean;
}

export interface State {
  id: string;
  name: string;
  iso_state?: string;
  is_active?: boolean;
}

export interface GetStateDto {
  id: number;
  name: string;
}
