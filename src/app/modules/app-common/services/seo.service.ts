import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SEOOptions } from '../models';

@Injectable({
	providedIn: 'root'
})
export class SEOService {
	constructor(private title: Title, private meta: Meta) {}

	// Title displayed in the window name of the browser
	// For Browsers
	updateTitle(title: string) {
		this.title.setTitle(title);
	}

	// For Google

	// For Social Medias

	// Title of Web Page display
	updateOgTitle(title: string) {
		this.meta.updateTag({ name: 'og:title', content: title });
		this.meta.updateTag({ name: 'twitter:title', content: title });
	}

	// Type of Content: article, product, ...
	updateType(type: string) {
		this.meta.updateTag({ name: 'og:type', content: type });
	}

	// Description of the page content
	updateDescription(desc: string) {
		this.meta.updateTag({ name: 'description', content: desc });
		this.meta.updateTag({ name: 'og:description', content: desc });
		this.meta.updateTag({ name: 'twitter:description', content: desc });
	}

	// Url
	updateUrl(url: string) {
		this.meta.updateTag({ name: 'og:url', content: url });
	}

	// Image Url
	updateImage(url: string) {
		this.meta.updateTag({ name: 'og:image', content: url });
		this.meta.updateTag({ name: 'twitter:image', content: url });
	}

	// Price
	updatePrice(price: number | string, currency: string) {
		this.meta.updateTag({ name: 'og:price:amount', content: `${price}` });
		this.meta.updateTag({ name: 'og:price:currency', content: currency });
	}

	// Syte name
	updateSyteName(site: string) {
		this.meta.updateTag({ name: 'og:site_name', content: site });
		this.meta.updateTag({ name: 'twitter:site', content: site });
	}

	// For All
	updateMeta(options: SEOOptions) {
		if (options.title) this.updateTitle(options.title);
		if (options.ogTitle) this.updateOgTitle(options.ogTitle);
		if (options.type) this.updateType(options.type);
		if (options.description) this.updateDescription(options.description);
		if (options.url) this.updateUrl(options.url);
		if (options.imageUrl) this.updateImage(options.imageUrl);
		if (options.price && options.priceCurrency)
			this.updatePrice(options.price, options.priceCurrency);
		if (options.siteName) this.updateImage(options.siteName);
	}

	deleteMetas(metas: string[]) {
		metas.forEach((meta) => {
			this.meta.removeTag(meta);
		});
	}

	deleteSocialMetas() {
		this.deleteMetas([
			"name='og:title'",
			"name='twitter:title'",
			"name='og:type'",
			"name='description'",
			"name='og:description'",
			"name='twitter:description'",
			"name='og:url'",
			"name='og:image'",
			"name='twitter:image'",
			"name='og:price:amount'",
			"name='og:price:currency'"
		]);
	}
}
