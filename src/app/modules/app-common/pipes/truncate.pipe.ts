import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, args?: any[]): string {
		// Default 210 characters
		const limit: number = args && args.length > 0 ? parseInt(args[0], 10) : 210;
		// Default ... trail
		const trail: string = args && args.length > 1 ? args[1] : '...';
		return value.length > limit ? value.substring(0, limit) + trail : value;
	}
}
