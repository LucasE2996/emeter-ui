import { MonitorListItem } from "./monitor-list-item.model";

/**
 *  The customer model
 * 
 * @param name The user name
 * @param email The user email
 * @param password The user password
 * @param monitors All the monitor the user owns
 */
export interface UserModel {
    name: string;
    email: string;
    password: string;
    monitors: Array<MonitorListItem>;
}