import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ShapeMenuComponent } from './panels/shape-menu/shape-menu.component';
import { PropertiesComponent } from './panels/properties/properties.component';
import { ToolbarComponent } from './panels/toolbar/toolbar.component';
import { EditorComponent } from './panels/editor/editor.component';
import { ShapeWrapperComponent } from './shapes/shape-wrapper/shape-wrapper.component';
import { ClassShapeComponent } from './shapes/class-shape/class-shape.component';
import { ShapeHostDirective } from './directives/shape-host.directive';
import { ShapeSelectorService } from './services/shape-selector.service';
import { ShapeStencilComponent } from './shapes/shape-stencil/shape-stencil.component';
import { ShapeDropService } from './services/shape-drop.service';


@NgModule({
  declarations: [
    AppComponent,
    ShapeMenuComponent,
    PropertiesComponent,
    ToolbarComponent,
    EditorComponent,
    ShapeWrapperComponent,
    ClassShapeComponent,
    ShapeHostDirective,
    ShapeStencilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ClassShapeComponent
  ],
  providers: [ShapeSelectorService, ShapeDropService],
  bootstrap: [AppComponent]
})
export class AppModule { }
