import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
export var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        var source = this.authService.isAccessible(url);
        var sub = source.subscribe(function (isAccessible) {
            if (!isAccessible) {
                window.location.href = "/" + window.sessionStorage.getItem('APP_ID') + "/logout";
                window.sessionStorage.clear();
            }
        });
        return source;
    };
    AuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: AuthService, decorators: [{ type: Inject, args: [AuthService,] },] },
    ]; };
    return AuthGuard;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/auth/auth.guard.js.map