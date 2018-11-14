import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { UserModel } from "../models/user.model";

@Injectable()

export class UserService {

    private readonly MOCKED_URL = '/api/user/detail';

    constructor(private readonly http: HttpClient) {}

    /**
     * Return the user data
     * 
     * @param id the user unique identifier.
     */
    public getUserById(id: string): Observable<UserModel> {
        return this.http.get<UserModel>(this.MOCKED_URL);
    }

    /**
     * Put edited information into user
     * 
     * @param data The new data to be put into user
     * @param id The user id
     */
    // public putUserData(id: string, data: UserModel): Observable<boolean> { return null }

}
