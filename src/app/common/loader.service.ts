import { Injectable } from "@angular/core";
import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class LoaderService {

    private loading: Loading;

    constructor(public loadingCtrl: LoadingController) { }

    /**
     * Shows loader per 10 seconds
     */
    public showLoader(): void {
        this.loading = this.createLoader();
        this.loading.present();
    }

    /**
     * dismissLoading
     */
    public dismissLoading(): void {
        this.loading ?  this.loading.dismissAll() : null;
    }

    /**
     * Create new loader with a default config
     */
    private createLoader(): Loading {
        return this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
    }

}