import { Pipe, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export var SafeUrlPipe = (function () {
    function SafeUrlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeUrlPipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafeUrlPipe.decorators = [
        { type: Pipe, args: [{ name: 'safeUrl' },] },
    ];
    /** @nocollapse */
    SafeUrlPipe.ctorParameters = function () { return [
        { type: DomSanitizer, decorators: [{ type: Inject, args: [DomSanitizer,] },] },
    ]; };
    return SafeUrlPipe;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/filters/safeUrl.js.map