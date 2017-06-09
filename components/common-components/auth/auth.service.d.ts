import { Observable } from "rxjs/Rx";
export declare class AuthService {
    appUserService: any;
    constructor(appUserService: any);
    isAccessible(url: string): Observable<boolean>;
}
