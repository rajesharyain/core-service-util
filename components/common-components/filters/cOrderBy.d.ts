import { PipeTransform } from '@angular/core';
export declare class COrderByPipe implements PipeTransform {
    value: string[];
    static _orderByComparator(a: any, b: any): number;
    transform(input: any, config?: string): any;
}
