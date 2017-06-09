import { EventEmitter } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
export declare class HttpWrapperService {
    private _http;
    process: EventEmitter<any>;
    authFailed: EventEmitter<any>;
    backendError: Subject<string>;
    loader: Subject<string>;
    constructor(_http: Http);
    private _buildAuthHeader();
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    get1(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    post1(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    put1(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    delete1(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    private _request(method, url, body?, options?);
    addSSO(url: string): string;
    private _request1(method, url, body?, options?);
    updateLoader(val: any): void;
}
