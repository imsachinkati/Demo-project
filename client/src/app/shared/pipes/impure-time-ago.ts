import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'impureTimeAgo',
    pure: false // Declare the pipe as impure
})
export class ImpureTimeAgoPipe implements PipeTransform {
    transform(value: Date): string {
        // Simulate an external factor by adding a random number
        const currentTime = new Date().getTime();
        const inputTime = value.getTime();
        const difference = currentTime - inputTime;
        return `${Math.floor(difference / 1000)} seconds ago`;
    }
}
