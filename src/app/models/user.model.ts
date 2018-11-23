/**
 *  The customer model
 * 
 * @param username The user name
 * @param email The user email
 * @param password The user password
 */
export interface UserModel {
    id: string;
    username: string;
    email: string;
}

/**
 * The custoemr model for registration.
 * 
 * @param username The user username
 * @param email The user email
 * @param password The user password
 */
export interface RegisterInfoModel {
    username: string;
    email: string;
    password: string;
  }