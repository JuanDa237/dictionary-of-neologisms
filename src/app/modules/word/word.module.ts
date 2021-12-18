import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '@modules/app-common/app-common.module';

import { components } from './components';
import { services } from './services';

@NgModule({
	declarations: [components],
	providers: [services],
	imports: [CommonModule, AppCommonModule],
	exports: [components]
})
export class WordModule {}
