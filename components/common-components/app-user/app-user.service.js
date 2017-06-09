import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpWrapperService } from '../http/http-wrapper.service';
import { Observable } from "rxjs/Rx";
import { AuthGuard } from '../auth/auth.guard';
import { IMAGES } from '../properties/images.constant';
export var AppUserService = (function () {
    function AppUserService(http) {
        this.http = http;
        this._sso = window.sessionStorage.getItem('_sso');
    }
    AppUserService.getAppRoutes = function (features, routes) {
        routes = [];
        if (features) {
            for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
                var feature = features_1[_i];
                if (feature["path"]) {
                    feature.canActivate = [AuthGuard];
                    routes.push(feature);
                }
                if (feature["features"] && feature["features"].length > 0) {
                    var frs = this.getAppRoutes(feature["features"], routes);
                    for (var _a = 0, frs_1 = frs; _a < frs_1.length; _a++) {
                        var f = frs_1[_a];
                        if (f['path']) {
                            routes.push(f);
                        }
                    }
                }
            }
        }
        return routes;
    };
    AppUserService.prototype.load = function (features, ADMIN_FEATURES) {
        var _this = this;
        this.formatFeatures(features, '');
        this.appFeatures = features;
        this.formatFeatures(ADMIN_FEATURES, '');
        this.adminFeatures = this.__getAdminFeatures(ADMIN_FEATURES, '');
        var adminFeatures = this.__getAdminFeatures(ADMIN_FEATURES, '');
        var appFeatures = AppUserService.getAppRoutes(features, []);
        this.fullFeaturesList = adminFeatures.concat(appFeatures);
        var accessAPI = window.sessionStorage.getItem('FRAMEWORK_SERVER_BASE_URL') + "/rest/1.0/client/" + window.sessionStorage.getItem('appName') + "/access?_sso=" + window.sessionStorage.getItem('_sso');
        if (!this.accessResults) {
            this.accessResults = this.http.get(accessAPI)
                .map(function (res) { _this.init(res.json()); return res.json(); })
                .publishReplay(1).refCount();
        }
    };
    AppUserService.prototype.getSso = function () {
        return this._sso;
    };
    AppUserService.prototype.getFullFeaturesList = function () {
        // return clone of fullFeaureList to avoid changes on main object.
        if (this.fullFeaturesList && this.fullFeaturesList.length) {
            return this.processComponent(JSON.parse(JSON.stringify(this.fullFeaturesList)), this.fullFeaturesList);
        }
        else {
            return [];
        }
    };
    AppUserService.prototype.getUserData = function () {
        return this.userData;
    };
    AppUserService.prototype.getAdminFeatures = function () {
        // return clone of adminFeatures to avoid changes on main object.
        return this.processComponent(JSON.parse(JSON.stringify(this.adminFeatures)), this.adminFeatures);
    };
    AppUserService.prototype.getAccessDetails = function () {
        return this.accessResults;
    };
    AppUserService.prototype.getUserFeatures = function () {
        return this.userFeatures;
    };
    AppUserService.prototype.getAppFeatures = function () {
        return this.appFeatures;
    };
    AppUserService.prototype.getIsAdmin = function () {
        return this.userData.accessRights.isAdmin; //this.isAdmin;
    };
    AppUserService.prototype.getLayout = function () {
        return this.layout;
    };
    // this method is to populate component property
    AppUserService.prototype.processComponent = function (features, actf) {
        for (var _i = 0, features_2 = features; _i < features_2.length; _i++) {
            var f = features_2[_i];
            for (var _a = 0, actf_1 = actf; _a < actf_1.length; _a++) {
                var af = actf_1[_a];
                if (f['path'] == af['path']) {
                    if (af['component']) {
                        f['component'] = af['component'];
                    }
                    break;
                }
            }
        }
        return features;
    };
    /**
    * returns possible values "false" - No Access, "true" - Read or Full Access
    */
    AppUserService.prototype.isAccessible = function (path) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.accessResults.subscribe(function (data) {
                var permission = 'N';
                if (data) {
                    for (var _i = 0, _a = _this.fullFeaturesList; _i < _a.length; _i++) {
                        var feature = _a[_i];
                        if (_this.comparePath(feature['path'], path)) {
                            permission = feature['accessType'];
                            break;
                        }
                    }
                }
                observer.next((permission == 'N' ? false : true));
                //call complete if you want to close this stream (like a promise)
                observer.complete();
            }, function (error) { return console.log("Error HTTP GET Service"); }, function () { });
        });
    };
    /**
    * returns possible values "N" - No Access, "R" - Read Access, "W" - Full Access
    */
    AppUserService.prototype.getAccessPermission = function (path) {
        var permission = 'N';
        for (var _i = 0, _a = this.fullFeaturesList; _i < _a.length; _i++) {
            var feature = _a[_i];
            if (this.comparePath(feature['path'], path)) {
                permission = feature['accessType'];
                break;
            }
        }
        return permission;
    };
    AppUserService.prototype.comparePath = function (featurePath, inputPath) {
        var featurePathTokens = featurePath.split('/');
        var inputPathTokens = inputPath.split('/');
        if (featurePathTokens.length !== inputPathTokens.length) {
            return false;
        }
        for (var i = 0; i < featurePathTokens.length; i++) {
            if (featurePathTokens[i].indexOf(':') !== -1) {
                break;
            }
            if (featurePathTokens[i] !== inputPathTokens[i]) {
                return false;
            }
        }
        return true;
    };
    AppUserService.prototype.__getAdminFeatures = function (featuresRoute, parentpath) {
        var adminFeatures = [];
        for (var _i = 0, featuresRoute_1 = featuresRoute; _i < featuresRoute_1.length; _i++) {
            var feature = featuresRoute_1[_i];
            feature.parentpath = (feature["isMenuItem"] ? null : parentpath);
            if (feature.path) {
                adminFeatures.push(feature);
            }
            if (feature['features'] && feature['features'].length > 0) {
                var cfeatures = this.__getAdminFeatures(feature['features'], (feature["isMenuItem"] ? feature['path'] : parentpath));
                for (var _a = 0, cfeatures_1 = cfeatures; _a < cfeatures_1.length; _a++) {
                    var f = cfeatures_1[_a];
                    if (f.path) {
                        adminFeatures.push(f);
                    }
                }
            }
        }
        return adminFeatures;
    };
    /**
     * This method is to populate access permission for all the features.
     */
    AppUserService.prototype.init = function (data) {
        var that = this;
        this.userData = data.results;
        this.layout = this.userData['activeLayout'];
        this.userFeatures = [];
        // update full feature list with permissions.
        for (var _i = 0, _a = this.fullFeaturesList; _i < _a.length; _i++) {
            var feature = _a[_i];
            var uf = null;
            for (var _b = 0, _c = this.userData.accessRights.featuresVO; _b < _c.length; _b++) {
                var userFeature = _c[_b];
                if (feature['isMenuItem'] && (feature['path'] === userFeature['path'])) {
                    uf = userFeature;
                    break;
                }
                else if (feature['parentpath'] === userFeature['path']) {
                    uf = userFeature;
                    break;
                }
            }
            feature['accessType'] = (uf ? (uf['accessType'] ? uf['accessType'] : "N") : this.userData.accessRights.defaultAccessType);
            if (feature['isMenuItem'] && feature['accessType'] && feature['accessType'] != "N") {
                this.userFeatures.push(feature);
            }
        }
        // remove all admin features from user feature list
        if (this.userData && this.userData.accessRights.isAdmin == "0") {
            for (var _d = 0, _e = this.adminFeatures; _d < _e.length; _d++) {
                var admfeature = _e[_d];
                for (var i = this.userFeatures.length - 1; i >= 0; i--) {
                    if (admfeature['path'] === this.userFeatures[i]['path']) {
                        this.userFeatures.splice(i, 1);
                    }
                }
            }
        }
        // exposing services for other application integration access
        /*window.appUtils = {
             getAccessPermission : function(path: any) { return that.getAccessPermission(path);},
             getFullFeaturesList : function() { return that.getFullFeaturesList();},
             getUserInfo         : function() { return JSON.parse(JSON.stringify(that.userData.user));}
         };*/
    };
    AppUserService.prototype.formatFeatures = function (features, pbc) {
        var appHost = window.location.origin + '/' + window.sessionStorage.getItem('appName');
        for (var i in features) {
            if (features[i].featureUri && features[i].featureUri.indexOf('http') < 0) {
                features[i].featureUri = appHost + features[i].featureUri;
            }
            var bc = [];
            for (var i_1 in pbc) {
                bc.push(pbc[i_1]);
            }
            var obj = {
                displayName: features[i].featureName,
            };
            if (features[i].featureUri) {
                obj.featureUri = features[i].featureUri;
            }
            if (features[i].component) {
                obj.url = features[i].path;
            }
            if (features[i].image) {
                obj.image = features[i].image;
            }
            bc.push(obj);
            if (bc[0] && !bc[0].image) {
                bc[0].image = IMAGES.NON_ADMIN_BREADCRUMB_LOGO;
            }
            features[i]['breadscrumbData'] = bc;
            if (features[i].features && features[i].features.length > 0) {
                this.formatFeatures(features[i].features, bc);
            }
        }
    };
    AppUserService.prototype.sortJsonArrayByProperty = function (objArray, sortBy, sortOrder) {
        if (arguments.length < 2)
            throw new Error("sortJsonArrayByProp requires 2 arguments");
        var direct = arguments.length > 2 ? arguments[2] : 1; //default sort order ascending
        if (objArray && objArray.constructor === Array) {
            var propPath = (sortBy.constructor === Array) ? sortBy : sortBy.split(".");
            objArray.sort(function (a, b) {
                for (var p in propPath) {
                    if (a[propPath[p]] && b[propPath[p]]) {
                        a = a[propPath[p]];
                        b = b[propPath[p]];
                    }
                }
                // convert numeric strings to integers
                a = a.match(/^\d+$/) ? +a : a;
                b = b.match(/^\d+$/) ? +b : b;
                return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
            });
        }
    };
    AppUserService.setTimezone = function (timezone) {
        this.userTimezone = timezone;
    };
    AppUserService.getTimezone = function () {
        return this.userTimezone;
    };
    AppUserService.prototype.getAppFeaturesMenu = function (featuresList) {
        for (var i = featuresList.length - 1; i >= 0; i--) {
            if (featuresList[i].features && featuresList[i].features.length) {
                for (var j = featuresList[i].features.length - 1; j >= 0; j--) {
                    if (featuresList[i].features[j].accessType == 'N') {
                        featuresList[i].features.splice(j, 1);
                    }
                }
            }
        }
        return featuresList;
    };
    AppUserService.prototype.getFeaturesJsonData = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.http.get1("http://localhost:8080/budgetApp" + "/features.json?callback=JSONP_CALLBACK")
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    AppUserService.routeAccess = function (access) {
        this.routeAccessEv.next(access);
    };
    AppUserService.routeAccessEv = new EventEmitter();
    AppUserService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AppUserService.ctorParameters = function () { return [
        { type: HttpWrapperService, decorators: [{ type: Inject, args: [HttpWrapperService,] },] },
    ]; };
    return AppUserService;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/app-user/app-user.service.js.map