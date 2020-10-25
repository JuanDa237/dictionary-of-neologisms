import { Pipe, PipeTransform } from '@angular/core';
import { Word } from '../models';

@Pipe({
	name: 'filterWord'
})
export class FilterWordPipe implements PipeTransform {
	transform(words: Word[], arg: string): Word[] {
		if (arg.length < 3) return words;

		const resultWords: Word[] = new Array<Word>(0);

		words.forEach((word) => {
			if (word.word.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
				resultWords.push(word);
			}
		});

		return resultWords;
	}
}
