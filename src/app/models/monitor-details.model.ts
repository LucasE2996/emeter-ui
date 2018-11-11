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
    watt: Watt;
    report: Report;
}

export interface Watt {
    value: number;
    maxValue: number;
    minValue: number;
    date: string;
}

export interface Report {
    dayAverage: number;
    weekAverage: number;
    monthAverage: number;
}