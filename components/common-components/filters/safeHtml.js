import { Pipe, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHtmlPipe.prototype.transform = function (data) {
        return this.sanitizer.bypassSecurityTrustHtml(data);
    };
    SafeHtmlPipe.decorators = [
        { type: Pipe, args: [{ name: 'safehtml' },] },
    ];
    /** @nocollapse */
    SafeHtmlPipe.ctorParameters = function () { return [
        { type: DomSanitizer, decorators: [{ type: Inject, args: [DomSanitizer,] },] },
    ]; };
    return SafeHtmlPipe;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/filters/safeHtml.js.map