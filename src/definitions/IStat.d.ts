interface IStat {
    confirmed?: IConfirmed;
    recovered?: IConfirmed;
    deaths?: IConfirmed;
    dailySummary?: string;
    dailyTimeSeries?: ICountryDetail;
    image?: string;
    source?: string;
    countries?: string;
    countryDetail?: ICountryDetail;
    lastUpdate?: string;
}

interface IConfirmed {
    value: number;
    detail: string;
}

interface ICountryDetail {
    pattern: string;
    example: string;
}

export {
    IStat,
    IConfirmed,
    ICountryDetail
}