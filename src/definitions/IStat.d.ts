export interface IStat {
    confirmed?: Confirmed;
    recovered?: Confirmed;
    deaths?: Confirmed;
    dailySummary?: string;
    dailyTimeSeries?: CountryDetail;
    image?: string;
    source?: string;
    countries?: string;
    countryDetail?: CountryDetail;
    lastUpdate?: string;
}

export interface Confirmed {
    value: number;
    detail: string;
}

export interface CountryDetail {
    pattern: string;
    example: string;
}
