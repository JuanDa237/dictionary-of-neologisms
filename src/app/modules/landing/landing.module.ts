import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';

import { layouts } from './layouts';
import { containers } from './containers';
import { components } from './components';

@NgModule({
	declarations: [layouts, containers, components],
	imports: [CommonModule, LandingRoutingModule]
})
export class LandingModule {}
