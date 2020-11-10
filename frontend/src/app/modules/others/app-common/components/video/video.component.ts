import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';

import { Video } from '../../models';

@Component({
	selector: 'app-video',
	template: `<video
		#videoTarget
		class="video-js vjs-16-9 vjs-big-play-centered"
		controls
		playsinline
		preload="metadata"
		[title]="title"
	></video>`
})
export class VideoComponent implements OnInit, OnDestroy {
	@Input()
	public options: {
		sources: Video;
	};

	@Input()
	public title: string;

	@ViewChild('videoTarget', { static: true })
	private target: ElementRef;

	private player: videojs.Player;

	constructor() {
		this.title = '';
	}

	ngOnInit(): void {
		this.player = videojs(this.target.nativeElement, this.options);
	}

	ngOnDestroy(): void {
		if (this.player) {
			this.player.dispose();
		}
	}
}
