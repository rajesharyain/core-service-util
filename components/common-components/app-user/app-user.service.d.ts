import { EventEmitter } from '@angular/core';
import { HttpWrapperService } from '../http/http-wrapper.service';
import { Observable } from "rxjs/Rx";
export declare class AppUserService {
    private http;
    private appData;
    private userData;
    private _sso;
    private fullFeaturesList;
    private accessResults;
    private userFeatures;
    private appFeatures;
    private isAdmin;
    private adminFeatures;
    static userTimezone: any;
    private layout;
    static routeAccessEv: EventEmitter<any>;
    constructor(http: HttpWrapperService);
    static getAppRoutes(features: any, routes: Array<any>): Array<any>;
    load(features: any, ADMIN_FEATURES: any): void;
    getSso(): any;
    getFullFeaturesList(): any;
    getUserData(): any;
    getAdminFeatures(): Array<any>;
    getAccessDetails(): any;
    getUserFeatures(): any;
    getAppFeatures(): any;
    getIsAdmin(): any;
    getLayout(): any;
    private processComponent(features, actf);
    /**
    * returns possible values "false" - No Access, "true" - Read or Full Access
    */
    isAccessible(path: any): Observable<boolean>;
    /**
    * returns possible values "N" - No Access, "R" - Read Access, "W" - Full Access
    */
    getAccessPermission(path: any): string;
    comparePath(featurePath: any, inputPath: any): boolean;
    private __getAdminFeatures(featuresRoute, parentpath);
    /**
     * This method is to populate access permission for all the features.
     */
    private init(data);
    formatFeatures(features: any, pbc: any): void;
    sortJsonArrayByProperty(objArray: any, sortBy: any, sortOrder: any): void;
    static setTimezone(timezone: any): void;
    static getTimezone(): any;
    getAppFeaturesMenu(featuresList: any): any;
    getFeaturesJsonData(): Promise<{}>;
    static routeAccess(access: any): void;
}
