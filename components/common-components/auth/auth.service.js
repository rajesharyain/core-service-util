import { Injectable, Inject, forwardRef } from "@angular/core";
import { AppUserService } from '../app-user/app-user.service';
export var AuthService = (function () {
    function AuthService(appUserService) {
        this.appUserService = appUserService;
    }
    AuthService.prototype.isAccessible = function (url) {
        return this.appUserService.isAccessible(url.slice(1));
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return AppUserService; }),] },] },
    ]; };
    return AuthService;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/auth/auth.service.js.map