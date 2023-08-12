import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pureTimeAgo'
})
export class PureTimeAgoPipe implements PipeTransform {
    transform(value: Date): string {
        // Calculate time ago from the input date
        const currentTime = new Date().getTime();
        const inputTime = value.getTime();
        const difference = currentTime - inputTime;
        return `${Math.floor(difference / 1000)} seconds ago`;
        
    }
}
