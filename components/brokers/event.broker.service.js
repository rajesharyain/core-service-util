import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var EventListener = (function () {
    function EventListener(_subscription) {
        this._subscription = _subscription;
    }
    EventListener.prototype.ignore = function () {
        this._subscription.unsubscribe();
    };
    return EventListener;
}());
var BrokeredEvent = (function () {
    function BrokeredEvent(name) {
        this.name = name;
        this._subject = new Subject();
    }
    BrokeredEvent.prototype.emit = function (data) {
        this._subject.next(data);
    };
    BrokeredEvent.prototype.listen = function (next) {
        return new EventListener(this._subject.subscribe(next));
    };
    return BrokeredEvent;
}());
export var EventBrokerService = (function () {
    function EventBrokerService() {
        this._events = {};
    }
    EventBrokerService.prototype.register = function (eventName) {
        var event = this._events[eventName];
        if (typeof event === 'undefined') {
            event = this._events[eventName] = new BrokeredEvent(eventName);
        }
        return event;
    };
    EventBrokerService.prototype.listen = function (eventName, next) {
        return this.register(eventName).listen(next);
    };
    EventBrokerService.prototype.emit = function (eventName, data) {
        return this.register(eventName).emit(data);
    };
    EventBrokerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EventBrokerService.ctorParameters = function () { return []; };
    return EventBrokerService;
}());
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/brokers/event.broker.service.js.map