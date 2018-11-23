/**
 * Model that details screen will need.
 * 
 * @param name The monitor name.
 * @param maxPower The maximum power.
 * @param powerAvarage The power avarage.
 * @param value The current power value.
 * 
 * @interface DetailsModel
 */
export interface MonitorDetailsModel {
    id: number;
    client_id: number;
    channel_id: number;
    name: string;
    nominalPower: number;
    diversion: number;
    watt: Watt;
    report: Report;
}

export interface Watt {
    watts: number;
    voltage: number;
    current: number;
    maxValue: number;
    minValue: number;
    date: string;
    month: string;
    day: string;
    hour: string;
}

export interface Report {
    dayAverage: number;
    weekAverage: number;
    monthAverage: number;
}