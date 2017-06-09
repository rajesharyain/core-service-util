import { Pipe } from '@angular/core';
export var COrderByPipe = (function () {
    function COrderByPipe() {
        this.value = [];
    }
    COrderByPipe._orderByComparator = function (a, b) {
        if (a === null || typeof a === 'undefined')
            a = "";
        if (b === null || typeof b === 'undefined')
            b = "";
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    COrderByPipe.prototype.transform = function (input, config) {
        if (config === void 0) { config = '+'; }
        if (input) {
            //make a copy of the input's reference
            this.value = input.slice();
            var value = this.value;
            if (!Array.isArray(value))
                return value;
            if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
                var propertyToCheck = !Array.isArray(config) ? config : config[0];
                var desc = propertyToCheck.substr(0, 1) == '-';
                //Basic array
                if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                    return !desc ? value.sort() : value.sort().reverse();
                }
                else {
                    var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                        ? propertyToCheck.substr(1)
                        : propertyToCheck;
                    return value.sort(function (a, b) {
                        return !desc
                            ? COrderByPipe._orderByComparator(a[property], b[property])
                            : -COrderByPipe._orderByComparator(a[property], b[property]);
                    });
                }
            }
            else {
                //Loop over property of the array in order and sort
                return value.sort(function (a, b) {
                    for (var i = 0; i < config.length; i++) {
                        var desc = config[i].substr(0, 1) == '-';
                        var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                            ? config[i].substr(1)
                            : config[i];
                        var comparison = !desc
                            ? COrderByPipe._orderByComparator(a[property], b[property])
                            : -COrderByPipe._orderByComparator(a[property], b[property]);
                        //Don't return 0 yet in case of needing to sort by next property
                        if (comparison != 0)
                            return comparison;
                    }
                    return 0; //equal each other
                });
            }
        }
    };
    COrderByPipe.decorators = [
        { type: Pipe, args: [{ name: 'cOrderBy', pure: false },] },
    ];
    /** @nocollapse */
    COrderByPipe.ctorParameters = function () { return []; };
    return COrderByPipe;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/filters/cOrderBy.js.map