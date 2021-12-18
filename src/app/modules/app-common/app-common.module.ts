import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { services } from './services';
import { pipes } from './pipes';

@NgModule({
	declarations: [pipes],
	providers: [services],
	imports: [CommonModule],
	exports: [pipes]
})
export class AppCommonModule {}
