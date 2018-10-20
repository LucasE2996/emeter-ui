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
    id: string;
    name: string;
    maxPower: number;
    powerAvarage: number;
    value: number;
}