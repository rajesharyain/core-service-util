export declare class CommonUtilService {
    constructor();
    /**
    * this method gets the system date.
    */
    getDate(): any;
    transform(input: any, config: string): any;
    transformIso(input: any, config: string): any;
    getFormattedDate(value: any): any;
    getFormattedTime(value: any): any;
    getFormattedHours(value: any): any;
    getFormattedMins(value: any): any;
    getFormattedSecs(value: any): any;
    private zones;
    private links;
}
