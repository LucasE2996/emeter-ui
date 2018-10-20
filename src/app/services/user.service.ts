import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MonitorDetailsModel } from "../models/monitor-details.model";
import { MonitorListItem } from "../models/monitor-list-item.model";
import { Observable } from "rxjs/Observable";

@Injectable()

export class UserService {
    constructor(private readonly http: HttpClient) {}

    /**
     * Return the user data
     * 
     * @param id the user unique identifier.
     */
    public getUserById(id: string): Observable<MonitorDetailsModel> {
        return this.http.get<MonitorDetailsModel>(`localhost:8080/user/${id}`);
    }

    /**
     * Put edited information into user
     * 
     * @param data The new data to be put into user
     * @param id The user id
     */
    // public putUserData(id: string, data: UserModel): Observable<boolean> { return null }

}
