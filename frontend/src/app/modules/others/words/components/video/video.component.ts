import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';

import { Video } from "../../models";

@Component({
  selector: 'app-video',
  template: '<video #target class="video-js vjs-16-9 vjs-big-play-centered" controls playsinline preload="metadata"></video>'
})
export class VideoComponent implements OnInit, OnDestroy {
  
  @Input() 
  public options: {
    sources: Video
  };

  @ViewChild('target', { static: true })
  private target: ElementRef;

  private player: videojs.Player;

  ngOnInit(): void {

    this.player = videojs(this.target.nativeElement, this.options);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}