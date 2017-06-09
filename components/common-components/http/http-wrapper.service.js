import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//export enum Action { QueryStart, QueryStop };
export var HttpWrapperService = (function () {
    function HttpWrapperService(_http) {
        this._http = _http;
        this.process = new EventEmitter();
        this.authFailed = new EventEmitter();
        this.backendError = new Subject();
        this.loader = new Subject();
    }
    HttpWrapperService.prototype._buildAuthHeader = function () {
        return window.sessionStorage.getItem("apiKey") ? window.sessionStorage.getItem("apiKey") : "";
    };
    HttpWrapperService.prototype.get = function (url, options) {
        return this._request(RequestMethod.Get, url, null, options);
    };
    HttpWrapperService.prototype.get1 = function (url, options) {
        return this._request1(RequestMethod.Get, url, null, options);
    };
    HttpWrapperService.prototype.post = function (url, body, options) {
        return this._request(RequestMethod.Post, url, body, options);
    };
    HttpWrapperService.prototype.post1 = function (url, body, options) {
        return this._request1(RequestMethod.Post, url, body, options);
    };
    HttpWrapperService.prototype.put = function (url, body, options) {
        return this._request(RequestMethod.Put, url, body, options);
    };
    HttpWrapperService.prototype.put1 = function (url, body, options) {
        return this._request1(RequestMethod.Put, url, body, options);
    };
    HttpWrapperService.prototype.delete = function (url, options) {
        return this._request(RequestMethod.Delete, url, null, options);
    };
    HttpWrapperService.prototype.delete1 = function (url, options) {
        return this._request1(RequestMethod.Delete, url, null, options);
    };
    HttpWrapperService.prototype.patch = function (url, body, options) {
        return this._request(RequestMethod.Patch, url, body, options);
    };
    HttpWrapperService.prototype.head = function (url, options) {
        return this._request(RequestMethod.Head, url, null, options);
    };
    HttpWrapperService.prototype._request = function (method, url, body, options) {
        var requestOptions = new RequestOptions(Object.assign({
            method: method,
            url: url,
            body: body
        }, options));
        if (!requestOptions.headers) {
            requestOptions.headers = new Headers();
        }
        requestOptions.headers.set("apikey", this._buildAuthHeader());
        return this._http.request(new Request(requestOptions));
        /*return Observable.create((observer) => {
          this.process.next(Action.QueryStart);
          this._http.request(new Request(requestOptions))
            .map(res=> res.json())
            .finally(() => {
            this.process.next(Action.QueryStop);
          })
            .subscribe(
            (res) => {
              observer.next(res);
              observer.complete();
            },
            (err) => {
              switch (err.status) {
                case 401:
                  //intercept 401
                  this.authFailed.next(err);
                  observer.error(err);
                  break;
                default:
                  observer.error(err);
                  break;
              }
            })
        })*/
    };
    HttpWrapperService.prototype.addSSO = function (url) {
        if (url.includes("?")) {
            return url + '&_sso=' + window.sessionStorage.getItem('_sso');
        }
        else {
            return url + '?_sso=' + window.sessionStorage.getItem('_sso');
        }
    };
    HttpWrapperService.prototype._request1 = function (method, url, body, options) {
        var _this = this;
        var requestOptions = new RequestOptions(Object.assign({
            method: method,
            url: this.addSSO(url),
            body: body
        }, options));
        if (!requestOptions.headers) {
            requestOptions.headers = new Headers();
        }
        //this.backendError.next('----request1----'+url);
        requestOptions.headers.set("apikey", this._buildAuthHeader());
        this.updateLoader(false);
        return this._http.request(new Request(requestOptions))
            .map(function (res) {
            _this.updateLoader(true);
            if (res.status == 200) {
                return res.json();
            }
            else {
                return res;
            }
        })
            .catch(function (error) {
            _this.updateLoader(true);
            _this.backendError.next(error);
            return Observable.throw(error.json().error || 'Server error');
        });
    };
    HttpWrapperService.prototype.updateLoader = function (val) {
        this.loader.next(val);
    };
    HttpWrapperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpWrapperService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
    ]; };
    return HttpWrapperService;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/http/http-wrapper.service.js.map