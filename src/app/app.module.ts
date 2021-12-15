import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		HttpClientModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
