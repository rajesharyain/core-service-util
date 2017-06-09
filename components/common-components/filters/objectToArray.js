import { Pipe } from '@angular/core';
export var ObjectToArrayPipe = (function () {
    function ObjectToArrayPipe() {
    }
    ObjectToArrayPipe.prototype.transform = function (obj) {
        var result = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push({ key: key, value: obj[key] });
            }
        }
        return result;
    };
    ObjectToArrayPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'objectToArray'
                },] },
    ];
    /** @nocollapse */
    ObjectToArrayPipe.ctorParameters = function () { return []; };
    return ObjectToArrayPipe;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/filters/objectToArray.js.map