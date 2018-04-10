import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation, Renderer2} from '@angular/core';

@Component({
  selector: 'app-shape-menu',
  templateUrl: './shape-menu.component.html',
  styleUrls: ['./shape-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShapeMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('dragLayer') dragLayer: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.renderer.appendChild(document.body, this.wrapper.nativeElement);
  }

}
