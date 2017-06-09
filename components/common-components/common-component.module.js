import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from './filters/safeUrl';
import { SafeHtmlPipe } from './filters/safeHtml';
import { HttpWrapperService } from './http/http-wrapper.service';
import { AppUserService } from './app-user/app-user.service';
import { ObjectToArrayPipe } from './filters/objectToArray';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { COrderByPipe } from './filters/cOrderBy';
import { cTimezonePipe } from './filters/cTimezone';
import { CommonUtilService } from './common-util/common-util.service';
export var CoreServicesUtilModule = (function () {
    function CoreServicesUtilModule() {
    }
    CoreServicesUtilModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        RouterModule.forChild([])
                    ],
                    declarations: [
                        SafeUrlPipe,
                        SafeHtmlPipe,
                        ObjectToArrayPipe,
                        COrderByPipe,
                        cTimezonePipe
                    ],
                    exports: [
                        SafeUrlPipe,
                        SafeHtmlPipe,
                        ObjectToArrayPipe,
                        COrderByPipe,
                        cTimezonePipe,
                    ],
                    providers: [
                        HttpWrapperService,
                        AppUserService,
                        AuthGuard,
                        AuthService,
                        CommonUtilService
                    ],
                    bootstrap: []
                },] },
    ];
    /** @nocollapse */
    CoreServicesUtilModule.ctorParameters = function () { return []; };
    return CoreServicesUtilModule;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/common-component.module.js.map