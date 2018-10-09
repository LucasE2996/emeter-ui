import { Injectable } from "@angular/core";
import { DetailsModel } from "../models/monitor-details.model";
import { MonitorListItem } from "../models/monitor-list-item.model";

@Injectable()

export class MonitorService {
    constructor() {}

    /**
     * Return the monitor information for Details page.
     * 
     * @param id the monitor unique identifier.
     */
    public getMonitorDetail(id: string): DetailsModel {
        return null;
    }

    /**
     * Return all monitors for List page.
     */
    public getAllMonitors(): Array<MonitorListItem> {
        return null;
    }

}
