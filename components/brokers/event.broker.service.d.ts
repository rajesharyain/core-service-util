export declare class EventBrokerService {
    _events: any;
    constructor();
    register<T>(eventName: string): any;
    listen<T>(eventName: string, next: (value: T) => void): any;
    emit<T>(eventName: string, data: T): void;
}
