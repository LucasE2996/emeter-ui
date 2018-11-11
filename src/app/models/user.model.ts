/**
 *  The customer model
 * 
 * @param name The user name
 * @param email The user email
 * @param password The user password
 * @param monitors All the monitor the user owns
 */
export interface UserModel {
    id: string;
    name: string;
    email: string;
}