import { PipeTransform } from '@angular/core';
export declare class cTimezonePipe implements PipeTransform {
    transform(input: any, config: string): any;
    private zones;
    private links;
}
