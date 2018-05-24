import { Component, OnInit } from '@angular/core';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private zoomService: ZoomService) { }

  ngOnInit() {
  }

  zoomIn() {
    this.zoomService.zoom(0.1);
  }

  zoomOut() {
    this.zoomService.zoom(-0.1);
  }

}
