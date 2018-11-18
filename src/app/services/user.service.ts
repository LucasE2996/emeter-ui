import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { UserModel, RegisterInfoModel } from "../models/user.model";

@Injectable()

export class UserService {

    private readonly URL = '/api/user/detail';
    private readonly REGISTER_URL = '/api/register';

    constructor(private readonly http: HttpClient) {}

    /**
     * Return the user data
     * 
     * @param id the user unique identifier.
     */
    public getUserById(id: string): Observable<UserModel> {
        return this.http.get<UserModel>(this.URL);
    }

    public createNewUser(userInfo: RegisterInfoModel): Observable<UserModel> {
        return this.http.post<UserModel>(this.REGISTER_URL, userInfo);
    }

    /**
     * Put edited information into user
     * 
     * @param data The new data to be put into user
     * @param id The user id
     */
    // public putUserData(id: string, data: UserModel): Observable<boolean> { return null }

}
