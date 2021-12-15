import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { services } from './services';

@NgModule({
	declarations: [components],
	providers: [services],
	imports: [CommonModule]
})
export class WordModule {}
