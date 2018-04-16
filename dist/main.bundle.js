webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nspan#mousePos {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 50%;\r\n}\r\n\r\napp-toolbar {\r\n    top: 0;\r\n    left: 0;\r\n    position: fixed;\r\n    width: 100%;\r\n    height: 15%;\r\n    background: lightgray;\r\n    z-index: 0;\r\n}\r\n\r\napp-shape-menu {\r\n    top: 15%;\r\n    left: 0;\r\n    width: 20%;\r\n    height: 85%;\r\n    position: fixed;\r\n    background-color: #f0f0f0;\r\n    z-index: 0;\r\n}\r\n\r\napp-properties {\r\n    top: 15%;\r\n    right: 0;\r\n    width: 15%;\r\n    height: 85%;\r\n    position: fixed;\r\n    background-color: #f0f0f0;\r\n    overflow-y: scroll;\r\n    z-index: 0;\r\n}\r\n\r\napp-editor {\r\n    top: 15%;\r\n    left: 20%;\r\n    right: 15%;\r\n    height: 85%;\r\n    width: 70%;\r\n    position: fixed;\r\n    background-color: #fafafa;\r\n    z-index: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n\n<div>\n  <svg #panel>\n    <svg:g>\n      <svg:rect\n        [(attr.x)]=\"x\"\n        [(attr.y)]=\"y\"\n        width=\"200\"\n        height=\"70\" style=\"fill: white; stroke: black; stroke-width: 1;\"></svg:rect>\n      <svg:text [attr.x]=\"x\" [attr.y]=\"y\" width=\"200\" style=\"align-content: center;\">Class</svg:text>\n    </svg:g>\n  </svg>\n</div> -->\n\n<app-toolbar></app-toolbar>\n<app-shape-menu></app-shape-menu>\n<app-editor></app-editor>\n<app-properties></app-properties>\n<span id=\"mousePos\"> X: {{ mousePos.x }} Y: {{ mousePos.y }}</span>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromEvent__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/fromEvent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_combineLatest__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_take__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_skipUntil__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/skipUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/startWith.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
        this.mousePos = { x: 0, y: 0 };
    }
    AppComponent.prototype.mouseMove = function (e) {
        this.mousePos = {
            x: e.offsetX,
            y: e.offsetY
        };
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // const obs = Observable.fromEvent(document, "mousemove");
        // obs.subscribe((e: MouseEvent) => {
        //   this.mousePos = {
        //     x: e.offsetX,
        //     y: e.offsetY
        //   };
        // });
        // const down = Observable.fromEvent(this.panel.nativeElement, 'mousedown')
        // .filter((e: MouseEvent) => !((e.which && e.which == 3) || (e.button && e.button == 2)))
        // .do((e: MouseEvent) => e.preventDefault())
        // .do((e: MouseEvent) => {
        //   console.log("Mouse down");
        // });
        // const up = Observable.fromEvent(document, 'mouseup')
        //   .do((e: MouseEvent) => e.preventDefault());
        // const mouseMove = Observable.fromEvent(document, 'mousemove')
        //   .do((e: MouseEvent) => e.stopPropagation());
        // const scrollWindow = Observable.fromEvent(document, 'scroll')
        //   .startWith({});
        // const move = Observable.combineLatest(mouseMove, scrollWindow);
        // const drag = down.mergeMap((md: MouseEvent) => {
        //   return move
        //     .map(([mm, s]) => mm)
        //     .do((mm: MouseEvent) => {
        //       this.x = mm.x - mm.x % 10;
        //       this.y = mm.y - mm.y % 10;
        //       console.log("[%s, %s]", mm.x, mm.y);
        //       // this.cable.movePatch(mm);
        //       // this.patches.resetSelection();
        //       // const target = this.patches.locateTarget(mm);
        //       // if (target) {
        //       //   target.isSelected = true;
        //       // }
        //     })
        //     .skipUntil(up
        //       .take(1))
        //       // .do(() => console.log("I did something")))
        //     .take(1);
        // });
        // this.draggable = drag.subscribe((e: MouseEvent) => {
        //   // const target = this.patches.locateTarget(e);
        //   // if (target && this.patches.notConnected(this, target)) {
        //   //   this.patches.connect(this, target);
        //   //   this.signal.connect(target.signal);
        //   // }
        //   // this.patches.resetSelection();
        //   console.log("I did another thing");
        // });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('panel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AppComponent.prototype, "panel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "mouseMove", null);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__panels_shape_menu_shape_menu_component__ = __webpack_require__("../../../../../src/app/panels/shape-menu/shape-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__panels_properties_properties_component__ = __webpack_require__("../../../../../src/app/panels/properties/properties.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__panels_toolbar_toolbar_component__ = __webpack_require__("../../../../../src/app/panels/toolbar/toolbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__panels_editor_editor_component__ = __webpack_require__("../../../../../src/app/panels/editor/editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shapes_shape_wrapper_shape_wrapper_component__ = __webpack_require__("../../../../../src/app/shapes/shape-wrapper/shape-wrapper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shapes_class_shape_class_shape_component__ = __webpack_require__("../../../../../src/app/shapes/class-shape/class-shape.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_shape_host_directive__ = __webpack_require__("../../../../../src/app/directives/shape-host.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_shape_selector_service__ = __webpack_require__("../../../../../src/app/services/shape-selector.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shapes_shape_stencil_shape_stencil_component__ = __webpack_require__("../../../../../src/app/shapes/shape-stencil/shape-stencil.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_shape_drop_service__ = __webpack_require__("../../../../../src/app/services/shape-drop.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__panels_shape_menu_shape_menu_component__["a" /* ShapeMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_6__panels_properties_properties_component__["a" /* PropertiesComponent */],
                __WEBPACK_IMPORTED_MODULE_7__panels_toolbar_toolbar_component__["a" /* ToolbarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__panels_editor_editor_component__["a" /* EditorComponent */],
                __WEBPACK_IMPORTED_MODULE_9__shapes_shape_wrapper_shape_wrapper_component__["a" /* ShapeWrapperComponent */],
                __WEBPACK_IMPORTED_MODULE_10__shapes_class_shape_class_shape_component__["a" /* ClassShapeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__directives_shape_host_directive__["a" /* ShapeHostDirective */],
                __WEBPACK_IMPORTED_MODULE_13__shapes_shape_stencil_shape_stencil_component__["a" /* ShapeStencilComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__shapes_class_shape_class_shape_component__["a" /* ClassShapeComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_12__services_shape_selector_service__["a" /* ShapeSelectorService */], __WEBPACK_IMPORTED_MODULE_14__services_shape_drop_service__["a" /* ShapeDropService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/directives/shape-host.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeHostDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShapeHostDirective = (function () {
    function ShapeHostDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ShapeHostDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[shapeHost]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewContainerRef */]])
    ], ShapeHostDirective);
    return ShapeHostDirective;
}());



/***/ }),

/***/ "../../../../../src/app/panels/editor/editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#editor, #editor-panel {\r\n    width: calc(100%);\r\n    height: calc(100%);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/panels/editor/editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"editor\">\n  <svg id=\"editor-panel\" #panel>\n    <defs>\n      <pattern id=\"smallGrid\" width=\"8\" height=\"8\" patternUnits=\"userSpaceOnUse\">\n        <path d=\"M 8 0 L 0 0 0 8\" fill=\"none\" stroke=\"lightgray\" stroke-width=\"0.5\" />\n      </pattern>\n      <pattern id=\"grid\" width=\"80\" height=\"80\" patternUnits=\"userSpaceOnUse\">\n        <rect width=\"80\" height=\"80\" fill=\"url(#smallGrid)\" />\n        <path d=\"M 80 0 L 0 0 0 80\" fill=\"none\" stroke=\"lightgray\" stroke-width=\"1\" />\n      </pattern>\n    </defs>\n\n    <rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\" />\n    <!-- <ng-content></ng-content> -->\n    <ng-template shapeHost></ng-template>\n    <!-- <shape-wrapper *ngFor=\"let element of this.elements\">{{ element.el.nativeElement }}</shape-wrapper> -->\n  </svg>\n</div>"

/***/ }),

/***/ "../../../../../src/app/panels/editor/editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shapes_class_shape_class_shape_component__ = __webpack_require__("../../../../../src/app/shapes/class-shape/class-shape.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_shape_host_directive__ = __webpack_require__("../../../../../src/app/directives/shape-host.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shape_drop_service__ = __webpack_require__("../../../../../src/app/services/shape-drop.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditorComponent = (function () {
    function EditorComponent(compFacRes, shapeDropService, elementRef, _renderer) {
        this.compFacRes = compFacRes;
        this.shapeDropService = shapeDropService;
        this.elementRef = elementRef;
        this._renderer = _renderer;
        this.elements = [];
    }
    EditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        var cmpFac = this.compFacRes.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_1__shapes_class_shape_class_shape_component__["a" /* ClassShapeComponent */]);
        var classViewConRef = this.shapeHost.viewContainerRef;
        // classViewConRef.clear();
        this.shapeDropService.droppedShape.subscribe(function (droppedData) {
            var selfy = _this;
            if (droppedData.type === "class") {
                var x = droppedData.x - _this.elementRef.nativeElement.offsetLeft;
                var y = droppedData.y - _this.elementRef.nativeElement.offsetTop;
                _this.createClassShape({ x: x, y: y });
            }
            else if (droppedData.type === "interface") {
            }
        });
    };
    EditorComponent.prototype.ngAfterViewInit = function () {
        var compStyle = window.getComputedStyle(this.panel.nativeElement);
        var w = +compStyle.width.replace("px", "");
        var h = +compStyle.height.replace("px", "");
        w = w - w % 10;
        h = h - h % 10;
        this._renderer.setStyle(this.panel.nativeElement, "width", w);
        this._renderer.setStyle(this.panel.nativeElement, "height", h);
    };
    EditorComponent.prototype.createClassShape = function (position) {
        var cmpFac = this.compFacRes.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_1__shapes_class_shape_class_shape_component__["a" /* ClassShapeComponent */]);
        var classViewConRef = this.shapeHost.viewContainerRef;
        var compRef = classViewConRef.createComponent(cmpFac);
        compRef.instance.name = "Class";
        var x = position.x - (compRef.instance.width / 2);
        x = x - x % 10;
        var y = position.y - (compRef.instance.height / 2);
        y = y - y % 10;
        compRef.instance.x = x;
        compRef.instance.y = y;
        this.elements.push(compRef);
    };
    EditorComponent.prototype.deleteElement = function (event) {
        switch (event.keyCode) {
            case 46:// Delete Key
                this.deleteSelectedElements();
                break;
        }
    };
    EditorComponent.prototype.deleteSelectedElements = function () {
        var _this = this;
        var selectedElements = this.elements.filter(function (elem) { return elem.instance.isSelected; });
        selectedElements.forEach(function (element) {
            var idx = _this.elements.indexOf(element);
            _this.elements.splice(idx, 1);
            element.destroy();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('panel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], EditorComponent.prototype, "panel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__directives_shape_host_directive__["a" /* ShapeHostDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__directives_shape_host_directive__["a" /* ShapeHostDirective */])
    ], EditorComponent.prototype, "shapeHost", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], EditorComponent.prototype, "deleteElement", null);
    EditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-editor',
            template: __webpack_require__("../../../../../src/app/panels/editor/editor.component.html"),
            styles: [__webpack_require__("../../../../../src/app/panels/editor/editor.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_3__services_shape_drop_service__["a" /* ShapeDropService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */]])
    ], EditorComponent);
    return EditorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/panels/properties/properties.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input, .form-control {\r\n    background: transparent;\r\n    border: none;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\ninput + div.input-group-append>button{\r\n    visibility: hidden;\r\n}\r\n\r\ninput:focus + div.input-group-append>button, input + div.input-group-append>button:hover, .form-control {\r\n    visibility: visible;\r\n}\r\n\r\n.add-input {\r\n    background: white;\r\n}\r\n\r\ninput + div.input-group-append>button.add-element{\r\n    visibility: visible;\r\n}\r\n\r\ninput:focus {\r\n    background: white;\r\n}\r\n\r\n.w-80 {\r\n    width: 80%!important;\r\n}\r\n\r\nul {\r\n    list-style-type: none;\r\n    padding-left: 0;\r\n}\r\n\r\nul > li {\r\n    width: 80%;\r\n    margin: 0 auto;\r\n}\r\n\r\n.material-icons {\r\n    font-size: 16px;\r\n}\r\n\r\n.input-group-append button {\r\n    padding: .1rem .1rem;\r\n    line-height: 1;\r\n}\r\n/* input.form-control {\r\n    padding: 0;\r\n} */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/panels/properties/properties.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div id=\"properties-panel\">\n  <!-- <h2 class=\"text-center\">Properties</h2> -->\n<ng-container *ngIf=\"selectedElement && constr && constr.name === 'ClassShapeComponent'\">\n  <h3 class=\"text-center\">Name</h3>\n  <div class=\"w-80 mx-auto input-group input-group-sm mb-1\">\n    <input class=\"form-control rounded-0\" type=\"text\" [(ngModel)]=\"selectedElement['name']\" name=\"class-name\" />\n  </div>\n  <h3 class=\"text-center\">Attributes</h3>\n  <ul>\n    <li *ngFor=\"let attr of selectedElement['attributes']; let i = index; trackBy:trackFunction\">\n      <div class=\"input-group input-group-sm mb-1\">\n        <input class=\"form-control rounded-0\" [(ngModel)]=\"selectedElement['attributes'][i]\" minlength=\"1\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-secondary rounded-0\" ngbTooltip=\"Remove\" (click)=\"removeAttribute(i)\">\n            <i class=\"material-icons\">delete</i>\n          </button>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"input-group input-group-sm mb-1\">\n        <input class=\"form-control rounded-0 add-input\" minlength=\"1\" [(ngModel)]=\"newAttrValue\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-secondary rounded-0 add-element\" ngbTooltip=\"Add Attribute\" (click)=\"addAttribute()\">\n            <i class=\"material-icons\">add</i>\n          </button>\n        </div>\n      </div>\n    </li>\n  </ul>\n\n  <h3 class=\"text-center\">Methods</h3>\n  <ul>\n    <li *ngFor=\"let meth of selectedElement['methods']; let i = index; trackBy:trackFunction\">\n      <div class=\"input-group input-group-sm mb-1\">\n        <input class=\"form-control rounded-0\" [(ngModel)]=\"selectedElement['methods'][i]\" minlength=\"1\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-secondary rounded-0\" ngbTooltip=\"Remove\" (click)=\"removeMethod(i)\">\n            <i class=\"material-icons\">delete</i>\n          </button>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"input-group input-group-sm mb-1\">\n        <input class=\"form-control rounded-0 add-input\" minlength=\"1\" [(ngModel)]=\"newMethValue\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-secondary rounded-0 add-element\" ngbTooltip=\"Add Method\" (click)=\"addMethod()\">\n            <i class=\"material-icons\">add</i>\n          </button>\n        </div>\n      </div>\n    </li>\n  </ul>\n</ng-container>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/panels/properties/properties.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertiesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shape_selector_service__ = __webpack_require__("../../../../../src/app/services/shape-selector.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PropertiesComponent = (function () {
    function PropertiesComponent(shapeSelectorService) {
        this.shapeSelectorService = shapeSelectorService;
        this.newAttrValue = "";
        this.newMethValue = "";
    }
    PropertiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.shapeSelectorService.selectElement.subscribe(function (elementId) {
            var element = _this.shapeSelectorService.getShape(elementId);
            _this.selectedElement = element;
            _this.constr = element.constructor;
        });
        this.shapeSelectorService.deselectElement.subscribe(function (elementId) {
            if (elementId === _this.selectedElement.id) {
                _this.selectedElement = null;
                _this.constr = null;
            }
        });
    };
    PropertiesComponent.prototype.trackFunction = function (index, item) {
        return index;
    };
    PropertiesComponent.prototype.removeAttribute = function (index) {
        var c = this.selectedElement;
        c.attributes.splice(index, 1);
        c.updateHeights();
    };
    PropertiesComponent.prototype.removeMethod = function (index) {
        var c = this.selectedElement;
        c.methods.splice(index, 1);
        c.updateHeights();
    };
    PropertiesComponent.prototype.addAttribute = function () {
        var c = this.selectedElement;
        c.attributes.push(this.newAttrValue);
        this.newAttrValue = "";
        c.updateHeights();
    };
    PropertiesComponent.prototype.addMethod = function () {
        var c = this.selectedElement;
        c.methods.push(this.newMethValue);
        this.newMethValue = "";
        c.updateHeights();
    };
    PropertiesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-properties',
            template: __webpack_require__("../../../../../src/app/panels/properties/properties.component.html"),
            styles: [__webpack_require__("../../../../../src/app/panels/properties/properties.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_shape_selector_service__["a" /* ShapeSelectorService */]])
    ], PropertiesComponent);
    return PropertiesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/panels/shape-menu/shape-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".shape-row {\r\n    margin-top: 1rem;\r\n}\r\n\r\n.shape-row-shape {\r\n    fill: white;\r\n    stroke: black;\r\n    stroke-width: 1;\r\n    cursor: pointer;\r\n}\r\n\r\n.shape-row-text {\r\n    margin: 10 auto;\r\n    display: block;\r\n    text-anchor: center;\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n}\r\n\r\n#drag-layer-wrapper {\r\n    position: absolute;\r\n    z-index: 10000;\r\n    opacity: 0.5;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/panels/shape-menu/shape-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"shape-menu\">\n  <h2 class=\"text-center\">Shapes</h2>\n  <svg class=\"w-100 shape-row\">\n    <svg app-shape-stencil shapeType=\"class\" [layer]=\"dragLayer\" x=\"25\" >\n      <svg:g>\n        <svg:rect x=\"0\" y=\"0\" width=\"120\" height=\"70\" class=\"shape-row-shape\"></svg:rect>\n        <svg:text x=\"20\" y=\"40\" class=\"shape-row-text\">\n          &lt;&lt;class&gt;&gt;\n        </svg:text>\n      </svg:g>\n\n    </svg>\n    <svg app-shape-stencil shapeType=\"interface\" [layer]=\"dragLayer\" x=\"170\">\n      <svg:g>\n        <svg:rect x=\"0\" y=\"0\" width=\"120\" height=\"70\" class=\"shape-row-shape\"></svg:rect>\n        <svg:text x=\"10\" y=\"40\" class=\"shape-row-text\">\n          &lt;&lt;interface&gt;&gt;\n        </svg:text>\n      </svg:g>\n\n    </svg>\n  </svg>\n  <svg>\n\n  </svg>\n</div>\n<div id=\"drag-layer-wrapper\" #wrapper>\n  <svg id=\"drag-layer\" #dragLayer>\n\n  </svg>\n</div>"

/***/ }),

/***/ "../../../../../src/app/panels/shape-menu/shape-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShapeMenuComponent = (function () {
    function ShapeMenuComponent(renderer) {
        this.renderer = renderer;
    }
    ShapeMenuComponent.prototype.ngOnInit = function () {
    };
    ShapeMenuComponent.prototype.ngAfterViewInit = function () {
        this.renderer.appendChild(document.body, this.wrapper.nativeElement);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('dragLayer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ShapeMenuComponent.prototype, "dragLayer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('wrapper'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ShapeMenuComponent.prototype, "wrapper", void 0);
    ShapeMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-shape-menu',
            template: __webpack_require__("../../../../../src/app/panels/shape-menu/shape-menu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/panels/shape-menu/shape-menu.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */]])
    ], ShapeMenuComponent);
    return ShapeMenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/panels/toolbar/toolbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/panels/toolbar/toolbar.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  toolbar works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/panels/toolbar/toolbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolbarComponent = (function () {
    function ToolbarComponent() {
    }
    ToolbarComponent.prototype.ngOnInit = function () {
    };
    ToolbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-toolbar',
            template: __webpack_require__("../../../../../src/app/panels/toolbar/toolbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/panels/toolbar/toolbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ToolbarComponent);
    return ToolbarComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/shape-drop.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeDropService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShapeDropService = (function () {
    function ShapeDropService() {
        this.droppedShape = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
    }
    ShapeDropService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ShapeDropService);
    return ShapeDropService;
}());



/***/ }),

/***/ "../../../../../src/app/services/shape-selector.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeSelectorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShapeSelectorService = (function () {
    function ShapeSelectorService() {
        this.selectElement = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.deselectElement = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.shapes = [];
    }
    ShapeSelectorService.prototype.registerShape = function (element) {
        this.shapes[element.id] = element;
    };
    ShapeSelectorService.prototype.getShape = function (id) {
        return this.shapes[id];
    };
    ShapeSelectorService.prototype.select = function (id) {
        var shape = this.getShape(id);
        this.selectElement.next(shape);
    };
    ShapeSelectorService.prototype.deselect = function (id) {
        var shape = this.getShape(id);
        this.deselectElement.next(shape);
    };
    ShapeSelectorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ShapeSelectorService);
    return ShapeSelectorService;
}());



/***/ }),

/***/ "../../../../../src/app/shapes/class-shape/class-shape.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".resize-rect {\r\n    fill: transparent;\r\n    stroke: white;\r\n    stroke-width: 2;\r\n    stroke-dasharray: 5, 5;\r\n}\r\n\r\n.resize-point {\r\n    fill: #4286f4;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shapes/class-shape/class-shape.component.html":
/***/ (function(module, exports) {

module.exports = "<svg:g #displayGroup>\n<svg:rect class=\"name-rect\" x=\"0\" y=\"0\" [attr.width]=\"width\" [attr.height]=\"nameRectHeight\" style=\"fill: white; stroke: black; stroke-width: 2;\" #nameRect></svg:rect>\n<svg:text font-family=\"Helvetica\" [attr.width]=\"width\" [attr.height]=\"height\" font-size=\"10\" [attr.x]=\"width/2\" [attr.y]=\"nameRectHeight / 2\" style=\"fill: black;\" text-anchor=\"middle\" #stereotypeText> {{ stereotype }}</svg:text>\n<svg:text font-family=\"Helvetica\" [attr.width]=\"width\" [attr.height]=\"height\" font-size=\"10\" [attr.x]=\"width/2\" [attr.y]=\"nameRectHeight / 2 + 10\" style=\"fill: black;\" text-anchor=\"middle\" #nameText> {{ name }} </svg:text>\n\n<svg:rect class=\"attr-rect\" x=\"0\" [attr.y]=\"nameRectHeight\" [attr.width]=\"width\" [attr.height]=\"attrRectHeight\" style=\"fill: white; stroke: black; stroke-width: 2;\" #attrRect></svg:rect>\n<svg:text font-family=\"Helvetica\" [attr.width]=\"width\" [attr.height]=\"height\" font-size=\"10\" [attr.x]=\"10\" [attr.y]=\"nameRectHeight + (i+2) * fontSize\" style=\"fill: black;\" text-anchor=\"start\" *ngFor=\"let attr of attributes; let i = index\"> {{ attr }} </svg:text>\n<svg:rect class=\"methods-rect\" x=\"0\" [attr.y]=\"nameRectHeight + attrRectHeight\" [attr.width]=\"width\" [attr.height]=\"methRectHeight\" style=\"fill: white; stroke: black; stroke-width: 2;\" #methRect></svg:rect>\n<svg:text font-family=\"Helvetica\" [attr.width]=\"width\" [attr.height]=\"height\" font-size=\"10\" [attr.x]=\"10\" [attr.y]=\"nameRectHeight + attrRectHeight + (i+2) * fontSize\" style=\"fill: black;\" text-anchor=\"start\" *ngFor=\"let meth of methods; let i = index\"> {{ meth }} </svg:text>\n</svg:g>\n<svg:g class=\"d-none\" #resizeRect>\n    <svg:rect class=\"resize-rect\" x=\"0\" y=\"0\" [attr.height]=\"nameRectHeight + attrRectHeight + methRectHeight\" [attr.width]=\"width\"></svg:rect>\n    <svg:circle cx=\"0\" cy=\"0\" r=\"5\" class=\"resize-point\" style=\"cursor: nw-resize\" (mousedown)=\"startResize($event, 'nw')\"></svg:circle>\n    <svg:circle [attr.cx]=\"width / 2\" cy=\"0\" r=\"5\" class=\"resize-point\" style=\"cursor: n-resize\" (mousedown)=\"startResize($event, 'n')\"></svg:circle>\n    <svg:circle [attr.cx]=\"width\" cy=\"0\" r=\"5\" class=\"resize-point\" style=\"cursor: ne-resize\" (mousedown)=\"startResize($event, 'ne')\"></svg:circle>\n    <svg:circle cx=\"0\" [attr.cy]=\"height / 2\" r=\"5\" class=\"resize-point\" style=\"cursor: w-resize\" (mousedown)=\"startResize($event, 'w')\"></svg:circle>\n    <svg:circle [attr.cx]=\"width\" [attr.cy]=\"height / 2\" r=\"5\" class=\"resize-point\" style=\"cursor: e-resize\" (mousedown)=\"startResize($event, 'e')\"></svg:circle>\n    <svg:circle cx=\"0\" [attr.cy]=\"height\" r=\"5\" class=\"resize-point\" style=\"cursor: sw-resize\" (mousedown)=\"startResize($event, 'sw')\"></svg:circle>\n    <svg:circle [attr.cx]=\"width / 2\" [attr.cy]=\"height\" r=\"5\" class=\"resize-point\" style=\"cursor: s-resize\" (mousedown)=\"startResize($event, 's')\"></svg:circle>\n    <svg:circle [attr.cx]=\"width\" [attr.cy]=\"height\" r=\"5\" class=\"resize-point\" style=\"cursor: se-resize\" (mousedown)=\"startResize($event, 'se')\"></svg:circle>\n</svg:g>"

/***/ }),

/***/ "../../../../../src/app/shapes/class-shape/class-shape.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassShapeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape_wrapper_shape_wrapper_component__ = __webpack_require__("../../../../../src/app/shapes/shape-wrapper/shape-wrapper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shape_selector_service__ = __webpack_require__("../../../../../src/app/services/shape-selector.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClassShapeComponent = (function (_super) {
    __extends(ClassShapeComponent, _super);
    function ClassShapeComponent(elementRef, renderer, shapeSelectorService) {
        var _this = _super.call(this, elementRef, renderer, shapeSelectorService) || this;
        _this.elementRef = elementRef;
        _this.renderer = renderer;
        _this.shapeSelectorService = shapeSelectorService;
        _this.stereotype = "<<class>>";
        _this.name = "Class";
        _this.nameRectHeight = 10;
        _this.attrRectHeight = 10;
        _this.methRectHeight = 10;
        _this.fontSize = 10;
        _this.attributes = [];
        _this.methods = [];
        _this.width = 200;
        _this.height = 100;
        return _this;
    }
    ClassShapeComponent.prototype.ngOnInit = function () {
        this.updateHeights();
    };
    ClassShapeComponent.prototype.ngAfterViewInit = function () {
        this.setX(this.x);
        this.setY(this.y);
        this.renderer.setStyle(this.elementRef.nativeElement, "cursor", "move");
        this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
        this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
        this.resizeShape = this.resizeGroup;
        this.updateViewBox();
    };
    ClassShapeComponent.prototype.updateHeights = function () {
        var nameRectHeight = this.fontSize + this.fontSize * 2;
        if (this.attributes.length === 0 && this.methods.length === 0) {
            nameRectHeight *= 2;
        }
        // this.nameRectHeight = nameRectHeight;
        var attrRectHeight = 0;
        if (this.attributes.length > 0) {
            attrRectHeight = this.fontSize * (this.attributes.length + 2);
        }
        // this.attrRectHeight = attrRectHeight;
        var methRectHeight = 0;
        if (this.methods.length > 0) {
            methRectHeight = this.fontSize * (this.methods.length + 2);
        }
        // this.methRectHeight = methRectHeight;
        var innerHeight = nameRectHeight + attrRectHeight + methRectHeight;
        var heightRatio = this.height / innerHeight;
        this.nameRectHeight = nameRectHeight * heightRatio;
        this.attrRectHeight = attrRectHeight * heightRatio;
        this.methRectHeight = methRectHeight * heightRatio;
        // this.setHeight(nameRectHeight + attrRectHeight + methRectHeight);
    };
    ClassShapeComponent.prototype.setX = function (x) {
        // console.log("changed x[%s] to [%s]", this.x, x);
        this.x = x;
        this.renderer.setAttribute(this.elementRef.nativeElement, "x", this.x.toString());
        this.renderer.setAttribute(this.stereotypeText.nativeElement, "x", (this.width / 2).toString());
        this.renderer.setAttribute(this.nameText.nativeElement, "x", (this.width / 2).toString());
    };
    ClassShapeComponent.prototype.setHeight = function (h) {
        if (h > 0) {
            this.height = h;
            this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
            this.updateViewBox();
            this.updateHeights();
        }
    };
    ClassShapeComponent.prototype.setWidth = function (w) {
        if (w > 0) {
            this.width = w;
            this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
            _super.prototype.updateViewBox.call(this);
        }
    };
    ClassShapeComponent.prototype.setY = function (y) {
        // console.log("changed y[%s] to [%s]", this.y, y);
        this.y = y;
        this.renderer.setAttribute(this.elementRef.nativeElement, "y", this.y.toString());
        this.renderer.setAttribute(this.stereotypeText.nativeElement, "y", (this.nameRectHeight / 2).toString());
        this.renderer.setAttribute(this.nameText.nativeElement, "y", (this.nameRectHeight / 2 + 10).toString());
    };
    ClassShapeComponent.prototype.startResize = function (event, direction) {
        event.preventDefault();
        event.stopPropagation();
        this.isResizing = true;
        this.resizeDirection = direction;
    };
    ClassShapeComponent.prototype.stopResize = function (event) {
        event.preventDefault();
        if (this.isResizing) {
            event.preventDefault();
            this.isResizing = false;
            this.resizeDirection = "";
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('nameRect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "nameRect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('stereotypeText'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "stereotypeText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('nameText'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "nameText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('attrRect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "attrRect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('methRect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "methRect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('resizeRect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "resizeGroup", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('displayGroup'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ClassShapeComponent.prototype, "displayGroup", void 0);
    ClassShapeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'svg.class-shape ',
            template: __webpack_require__("../../../../../src/app/shapes/class-shape/class-shape.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shapes/class-shape/class-shape.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_2__services_shape_selector_service__["a" /* ShapeSelectorService */]])
    ], ClassShapeComponent);
    return ClassShapeComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shape_wrapper_shape_wrapper_component__["a" /* ShapeWrapperComponent */]));



/***/ }),

/***/ "../../../../../src/app/shapes/shape-stencil/shape-stencil.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shapes/shape-stencil/shape-stencil.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>\n"

/***/ }),

/***/ "../../../../../src/app/shapes/shape-stencil/shape-stencil.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeStencilComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shape_drop_service__ = __webpack_require__("../../../../../src/app/services/shape-drop.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShapeStencilComponent = (function () {
    function ShapeStencilComponent(content, _renderer, shapeDropService) {
        this.content = content;
        this._renderer = _renderer;
        this.shapeDropService = shapeDropService;
        this.isDragging = false;
    }
    ShapeStencilComponent.prototype.ngOnInit = function () { };
    ShapeStencilComponent.prototype.ngAfterViewInit = function () {
    };
    ShapeStencilComponent.prototype.onDragStart = function (event) {
        event.preventDefault();
        this.isDragging = true;
        // append div with the content
        this._renderer.setStyle(this.dragLayer.parentNode, "left", event.clientX.toString() + "px");
        this._renderer.setStyle(this.dragLayer.parentNode, "top", event.clientY.toString() + "px");
        var con = this.content.nativeElement.cloneNode(true);
        this._renderer.setAttribute(con, "x", "0");
        this._renderer.appendChild(this.dragLayer, con);
        this.clonedNode = con;
    };
    ShapeStencilComponent.prototype.onDragMove = function (event) {
        if (this.isDragging) {
            var bbox = this.clonedNode.getBBox();
            this._renderer.setStyle(this.dragLayer.parentNode, "left", event.clientX - (bbox.width / 2) + "px");
            this._renderer.setStyle(this.dragLayer.parentNode, "top", event.clientY - (bbox.height / 2) + "px");
        }
    };
    ShapeStencilComponent.prototype.onDragEnd = function (event) {
        if (this.isDragging) {
            this.isDragging = false;
            var dropped = {
                type: this.clonedNode.getAttribute("shapeType"),
                x: event.pageX,
                y: event.pageY
            };
            this.shapeDropService.droppedShape.next(dropped);
            this._renderer.removeChild(this.dragLayer, this.clonedNode);
            this._renderer.setStyle(this.dragLayer.parentNode, "left", "0");
            this._renderer.setStyle(this.dragLayer.parentNode, "top", "0");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])('layer'),
        __metadata("design:type", Object)
    ], ShapeStencilComponent.prototype, "dragLayer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ShapeStencilComponent.prototype, "onDragStart", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ShapeStencilComponent.prototype, "onDragMove", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ShapeStencilComponent.prototype, "onDragEnd", null);
    ShapeStencilComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[app-shape-stencil]',
            template: __webpack_require__("../../../../../src/app/shapes/shape-stencil/shape-stencil.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shapes/shape-stencil/shape-stencil.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_1__services_shape_drop_service__["a" /* ShapeDropService */]])
    ], ShapeStencilComponent);
    return ShapeStencilComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shapes/shape-wrapper/shape-wrapper.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shapes/shape-wrapper/shape-wrapper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeWrapperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shape_selector_service__ = __webpack_require__("../../../../../src/app/services/shape-selector.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uuid__ = __webpack_require__("../../../../uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_DomUtils__ = __webpack_require__("../../../../../src/app/utils/DomUtils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';



var ShapeWrapperComponent = (function () {
    function ShapeWrapperComponent(elementRef, renderer, shapeSelectorService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.shapeSelectorService = shapeSelectorService;
        this.x = 0;
        this.y = 0;
        this.isMouseDown = false;
        this.isDragging = false;
        this.isSelected = false;
        this.gridSize = 10;
        this.DRAG_TIMEOUT = 50;
        this.isResizing = false;
        this.resizeDirection = "";
        this.movementX = 0;
        this.movementY = 0;
        this.id = Object(__WEBPACK_IMPORTED_MODULE_2_uuid__["v4"])();
        renderer.setAttribute(this.elementRef.nativeElement, "id", this.id);
        shapeSelectorService.registerShape(this);
    }
    // @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    //   // event.preventDefault();
    //   console.log("I have been clicked!", event);
    // }
    ShapeWrapperComponent.prototype.deselect = function (event, target) {
        if (this.isSelected) {
            var minX = this.x;
            var maxX = this.x + (this.width);
            var minY = this.y;
            var maxY = this.y + (this.height);
            if (this.isSelected && (event.offsetX < minX || event.offsetX > maxX || event.offsetY < minY || event.offsetY > maxY) && !__WEBPACK_IMPORTED_MODULE_3__utils_DomUtils__["a" /* DomUtils */].isChildOf(event.target, "properties-panel")) {
                // deselect
                console.log("click not on position");
                this.isSelected = false;
                this.shapeSelectorService.deselectElement.next(this.id);
                this.unhighlight();
            }
        }
    };
    ShapeWrapperComponent.prototype.onMouseDown = function (event) {
        event.preventDefault();
        if (!this.isSelected) {
            this.isSelected = true;
            this.shapeSelectorService.selectElement.next(this.id);
            this.select();
        }
        this.isMouseDown = true;
        console.log("Mouse has been downed on me!", this.isSelected);
        if (this.isMouseDown && !this.isResizing)
            this.isDragging = true;
        // this.dragTimer = setTimeout(() => {
        //   if (this.isMouseDown) {
        //     this.isDragging = true;
        //   }
        // }, this.DRAG_TIMEOUT);
    };
    ShapeWrapperComponent.prototype.onMouseUp = function (event) {
        // event.preventDefault();
        this.isMouseDown = false;
        this.isDragging = false;
        this.isResizing = false;
        this.resizeDirection = "";
        clearTimeout(this.dragTimer);
        console.log("Mouse has been released");
    };
    ShapeWrapperComponent.prototype.onMouseMove = function (event) {
        // event.preventDefault();
        if (this.isMouseDown && this.isDragging) {
            var x = event.offsetX - (this.width / 2);
            var y = event.offsetY - (this.height / 2);
            x = x + this.gridSize - x % this.gridSize;
            y = y + this.gridSize - y % this.gridSize;
            this.x = x;
            this.y = y;
            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
        }
        else if (this.isResizing) {
            switch (this.resizeDirection) {
                case "nw":
                    this.resizeWidth(true, event);
                    this.resizeHeight(true, event);
                    break;
                case "n":
                    this.resizeHeight(true, event);
                    break;
                case "ne":
                    this.resizeWidth(false, event);
                    this.resizeHeight(true, event);
                    break;
                case "w":
                    this.resizeWidth(true, event);
                    break;
                case "e":
                    this.resizeWidth(false, event);
                    break;
                case "sw":
                    this.resizeWidth(true, event);
                    this.resizeHeight(false, event);
                    break;
                case "s":
                    this.resizeHeight(false, event);
                    break;
                case "se":
                    this.resizeWidth(false, event);
                    this.resizeHeight(false, event);
            }
        }
    };
    ShapeWrapperComponent.prototype.updateViewBox = function () {
        this.renderer.setAttribute(this.elementRef.nativeElement, "viewBox", "-5 -5 " + (this.width + 10) + " " + (this.height + 10));
    };
    ShapeWrapperComponent.prototype.setX = function (x) {
        this.x = x;
        this.renderer.setAttribute(this.elementRef.nativeElement, "x", this.x.toString());
    };
    ShapeWrapperComponent.prototype.setY = function (y) {
        this.y = y;
        this.renderer.setAttribute(this.elementRef.nativeElement, "y", this.y.toString());
    };
    ShapeWrapperComponent.prototype.setHeight = function (h) {
        this.height = h;
        this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
        this.updateViewBox();
    };
    ShapeWrapperComponent.prototype.setWidth = function (w) {
        this.width = w;
        this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
        this.updateViewBox();
    };
    ShapeWrapperComponent.prototype.highlight = function () {
        if (!this.isSelected) {
            this.renderer.setStyle(this.elementRef.nativeElement, "outline", "1px dashed green");
        }
    };
    ShapeWrapperComponent.prototype.select = function () {
        this.renderer.setStyle(this.elementRef.nativeElement, "outline", "3px solid lightblue");
        // draw resizable rect
        this.renderer.removeClass(this.resizeShape.nativeElement, "d-none");
    };
    ShapeWrapperComponent.prototype.unhighlight = function () {
        if (!this.isSelected) {
            this.renderer.setStyle(this.elementRef.nativeElement, "outline", "none");
            this.renderer.addClass(this.resizeShape.nativeElement, "d-none");
        }
    };
    ShapeWrapperComponent.prototype.resizeWidth = function (isNegative, event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.isResizing) {
            var w = 0;
            var x = this.x;
            this.movementX += event.movementX;
            if (this.movementX >= 10 || this.movementX <= -10) {
                if (isNegative) {
                    w = this.width - this.movementX;
                    x = x + this.movementX;
                }
                else {
                    w = this.width + this.movementX;
                }
                this.setWidth(w);
                this.setX(x);
                this.movementX = 0;
            }
        }
    };
    ShapeWrapperComponent.prototype.resizeHeight = function (isNegative, event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.isResizing) {
            var h = 0;
            var y = this.y;
            this.movementY += event.movementY;
            if (this.movementY >= 10 || this.movementY <= -10) {
                if (isNegative) {
                    h = this.height - this.movementY;
                    y = y + this.movementY;
                }
                else {
                    h = this.height + this.movementY;
                }
                this.setHeight(h);
                this.setY(y);
                this.movementY = 0;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:mousedown', ['$event', '$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent, Object]),
        __metadata("design:returntype", void 0)
    ], ShapeWrapperComponent.prototype, "deselect", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ShapeWrapperComponent.prototype, "onMouseDown", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ShapeWrapperComponent.prototype, "onMouseUp", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ShapeWrapperComponent.prototype, "onMouseMove", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ShapeWrapperComponent.prototype, "highlight", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostListener */])('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ShapeWrapperComponent.prototype, "unhighlight", null);
    ShapeWrapperComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[shape-wrapper]',
            // templateUrl: './shape-wrapper.component.html',
            template: '',
            styles: [__webpack_require__("../../../../../src/app/shapes/shape-wrapper/shape-wrapper.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_1__services_shape_selector_service__["a" /* ShapeSelectorService */]])
    ], ShapeWrapperComponent);
    return ShapeWrapperComponent;
}());



/***/ }),

/***/ "../../../../../src/app/utils/DomUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomUtils; });
var DomUtils = (function () {
    function DomUtils() {
    }
    DomUtils.isChildOf = function (child, id) {
        if (child.id === id)
            return true;
        var parent = child;
        while (parent) {
            if (parent.id === id) {
                return true;
            }
            else {
                parent = parent.parentElement;
            }
        }
        return false;
    };
    return DomUtils;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map