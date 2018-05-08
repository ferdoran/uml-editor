import { Component, OnInit, ChangeDetectorRef, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ClassShapeComponent } from '../class-shape/class-shape.component';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { AggregateService } from '../../services/aggregate.service';
import { BoundedContextService } from '../../services/bounded-context.service';

@Component({
  selector: 'svg.entity-shape',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent extends ClassShapeComponent implements OnInit, AfterViewInit {

  constructor(public checker: ChangeDetectorRef,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected shapeSelectorService: ShapeSelectorService,
    protected drawConnectionService: DrawConnectionService,
    protected aggregateService: AggregateService,
    protected bcService: BoundedContextService) {
    super(checker, elementRef, renderer, shapeSelectorService, drawConnectionService, aggregateService, bcService);
  }

  ngOnInit() {
    this.type = "Entity";
    this.stereotype = "<<Entity>>";
    this.updateHeights();
  }


}
