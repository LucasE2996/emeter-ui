import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MonitorDetailsModel } from "../models/monitor-details.model";
import { MonitorListItem } from "../models/monitor-list-item.model";
import { Observable } from "rxjs/Observable";

@Injectable()

export class MonitorService {
    constructor(private readonly http: HttpClient) {}

    /**
     * Return the monitor information for Details page.
     * 
     * @param id the monitor unique identifier.
     */
    public getMonitorDetail(userId: string, id: string): Observable<MonitorDetailsModel> {
        return this.http.get<MonitorDetailsModel>(`localhost:8080/user/${userId}/meter/${id}/detail`);
    }

    /**
     * Return all monitors for List page.
     */
    public getAllMonitors(userId: string): Observable<Array<MonitorListItem>> {
        return null;
    }

}
