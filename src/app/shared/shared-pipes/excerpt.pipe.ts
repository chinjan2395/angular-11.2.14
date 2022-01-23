import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'excerpt'})
export class ExcerptPipe implements PipeTransform {
    transform(text: string, limit: number = 15) {
        if (text != null) {
            if (text.length <= limit) {
                return text;
            }
            return text.substring(0, limit) + '...';
        } else {
            return text;
        }
    }
}
