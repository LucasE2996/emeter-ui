import { Injectable } from "@angular/core";
import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class LoaderService {

    constructor(public loadingCtrl: LoadingController) { }

    /**
     * Shows loader per 10 seconds
     */
    public showLoader(): void {
        this.createLoader().present();
    }

    /**
     * dismissLoading
     */
    public dismissLoading() {
        this.createLoader().dismissAll();
    }

    /**
     * Create new loader with a default config
     */
    private createLoader(): Loading {
        return this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
            duration: 10000
        });
    }

}