import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { layouts } from './layouts';
import { containers } from './containers';
import { components } from './components';

@NgModule({
	declarations: [layouts, containers, components],
	imports: [CommonModule, RouterModule]
})
export class LandingModule {}
