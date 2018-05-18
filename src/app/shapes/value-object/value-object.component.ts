import { Component, OnInit, ChangeDetectorRef, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ClassShapeComponent } from '../class-shape/class-shape.component';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { AggregateService } from '../../services/aggregate.service';
import { BoundedContextService } from '../../services/bounded-context.service';
import { DeletionService } from '../../services/deletion.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'svg.value-object-shape',
  templateUrl: './value-object.component.html',
  styleUrls: ['./value-object.component.css']
})
export class ValueObjectComponent extends ClassShapeComponent implements OnInit, AfterViewInit {

  constructor(public checker: ChangeDetectorRef,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected shapeSelectorService: ShapeSelectorService,
    protected drawConnectionService: DrawConnectionService,
    protected aggregateService: AggregateService,
    protected bcService: BoundedContextService,
    protected deletionService: DeletionService,
    protected socketService: SocketService
  )
  {
    super(checker, elementRef, renderer, shapeSelectorService, drawConnectionService, aggregateService, bcService, deletionService, socketService);
  }

  ngOnInit() {
    this.type = "ValueObject";
    this.stereotype = "<<Value Object>>";
    this.updateHeights();
  }


}
