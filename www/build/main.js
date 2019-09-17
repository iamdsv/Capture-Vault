webpackJsonp([2],{

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/gallery/gallery.module": [
		273,
		1
	],
	"../pages/recordings/recordings.module": [
		274,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_media__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gallery_gallery__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__recordings_recordings__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let HomePage = class HomePage {
    constructor(zone, camera, media, file, platform, navCtrl) {
        this.zone = zone;
        this.camera = camera;
        this.media = media;
        this.file = file;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.recording = false;
        this.pause = false;
        this.audioList = [];
        this.currentPlaying = -1;
        this.pausedPlay = -1;
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            allowEdit: true
        };
    }
    takePicture() {
        try {
            this.camera.getPicture(this.options).then((imageData) => {
                this.image = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
                console.log(err);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    goToGallery() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__gallery_gallery__["a" /* GalleryPage */]);
    }
    goToRecordings() {
        let data = {
            audioList: this.audioList
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__recordings_recordings__["a" /* RecordingsPage */], data);
    }
    getAudioList() {
        if (localStorage.getItem("audiolist")) {
            this.audioList = JSON.parse(localStorage.getItem("audiolist"));
            console.log(this.audioList);
        }
    }
    ionViewWillEnter() {
        this.getAudioList();
    }
    startRecord() {
        if (this.platform.is('ios')) {
            this.fileName = 'recording_' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.wav';
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        else if (this.platform.is('android')) {
            this.fileName = 'recording_' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.wav';
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        this.audio.startRecord();
        this.recording = true;
    }
    stopRecord() {
        this.audio.stopRecord();
        let data = { filename: this.fileName };
        this.audioList.push(data);
        this.audioList.sort().reverse();
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();
    }
    pauseRecord() {
        this.audio.pauseRecord();
        this.pause = true;
    }
    resumeRecord() {
        this.audio.resumeRecord();
        this.pause = false;
    }
    cancelRecord() {
        this.audio.release();
        this.pause = false;
        this.recording = false;
    }
    playAudio(file, idx) {
        if (idx != this.pausedPlay) {
            if (this.audio) {
                this.pausedPlay = -1;
                this.zone.run(() => {
                    this.currentPlaying = -1;
                });
                this.audio.pause();
            }
            if (this.platform.is('ios')) {
                this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
                this.audio = this.media.create(this.filePath);
            }
            else if (this.platform.is('android')) {
                this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
                this.audio = this.media.create(this.filePath);
            }
        }
        this.audio.play();
        this.zone.run(() => {
            this.currentPlaying = idx;
        });
        this.audio.setVolume(0.8);
        this.audio.onSuccess.subscribe(status => {
            //this.audio.release();
            this.zone.run(() => {
                this.currentPlaying = -1;
            });
        });
    }
    pauseAudio(file, idx) {
        this.audio.pause();
        this.pausedPlay = idx;
        this.currentPlaying = -1;
    }
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/var/www/html/Capture/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title><ion-icon name="lock"></ion-icon>&nbsp;Vault</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n<ion-card>\n    <ion-card-content>\n      <ion-card-title>\n        Capture Image\n        </ion-card-title>\n        <button ion-button icon-start (click)="takePicture()">\n          <ion-icon name="camera"></ion-icon>\n          Take a picture\n        </button>\n        <button ion-button icon-start (click)="goToGallery()">\n            <ion-icon name="images"></ion-icon>\n            Go to gallery\n          </button>\n    </ion-card-content>\n    <img src="{{image}}"/>\n  </ion-card>\n  <ion-card>\n    <ion-card-content>\n      <ion-card-title>\n        Capture Voice\n      </ion-card-title>\n      <button ion-button primary (click)="stopRecord()" *ngIf="recording && !pause"><ion-icon name="mic-off"></ion-icon>&nbsp;&nbsp;Stop Recording</button>\n      <button ion-button primary (click)="pauseRecord()" *ngIf="recording && !pause"><ion-icon name="pause"></ion-icon>&nbsp;&nbsp;Pause</button>\n      <button ion-button primary (click)="startRecord()" *ngIf="!recording"><ion-icon name="mic"></ion-icon>&nbsp;&nbsp;Start Recording</button>\n      <button ion-button primary (click)="resumeRecord()" *ngIf="recording && pause"><ion-icon name="mic"></ion-icon>&nbsp;&nbsp;Resume Recording</button>\n      <button ion-button primary (click)="cancelRecord()" *ngIf="recording && pause"><ion-icon name="Cancel"></ion-icon>&nbsp;&nbsp;Cancel</button>\n      <button ion-button icon-start (click)="goToRecordings()">\n          <ion-icon name="microphone"></ion-icon>\n          Go to recordings\n        </button>\n    </ion-card-content>\n    <ion-list>\n        <ion-item *ngFor="let audio of audioList | slice: 0:3; index as i;">\n          <p>{{audio.filename}}</p>\n          <button ion-button clear item-end large (click)="playAudio(audio.filename, i)" *ngIf="currentPlaying!=i"><ion-icon name="play"></ion-icon></button>\n          <button ion-button clear item-end large (click)="pauseAudio(audio.filename, i)" *ngIf="currentPlaying==i"><ion-icon name="pause"></ion-icon></button>\n            </ion-item>\n      </ion-list>\n  </ion-card>\n  <!--<button ion-button secondary menuToggle>Toggle Menu</button>-->\n</ion-content>'/*ion-inline-end:"/var/www/html/Capture/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_gallery_gallery__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_recordings_recordings__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_media__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













let AppModule = class AppModule {
    constructor(platform, statusBar, splashScreen) {
        platform.ready().then(() => {
            statusBar.overlaysWebView(false);
            if (platform.is('android')) {
                statusBar.backgroundColorByHexString("#488aff");
            }
            else if (platform.is('ios')) {
                statusBar.styleBlackTranslucent();
            }
            setTimeout(function () { statusBar.show(); }, 1000);
        });
        platform.pause.subscribe(() => {
            // Do something
        });
        platform.resume.subscribe(() => {
            // Status Bar
            setTimeout(function () { statusBar.show(); }, 1000);
        });
    }
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_gallery_gallery__["a" /* GalleryPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_recordings_recordings__["a" /* RecordingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/gallery/gallery.module#GalleryPageModule', name: 'GalleryPage', segment: 'gallery', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/recordings/recordings.module#RecordingsPageModule', name: 'RecordingsPage', segment: 'recordings', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_gallery_gallery__["a" /* GalleryPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_recordings_recordings__["a" /* RecordingsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */]])
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_gallery_gallery__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_recordings_recordings__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Vault', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Gallery', component: __WEBPACK_IMPORTED_MODULE_5__pages_gallery_gallery__["a" /* GalleryPage */] },
            { title: 'Recordings', component: __WEBPACK_IMPORTED_MODULE_6__pages_recordings_recordings__["a" /* RecordingsPage */] }
        ];
    }
    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/var/www/html/Capture/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/var/www/html/Capture/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let GalleryPage = class GalleryPage {
    constructor(domSanitizer, navCtrl, navParams, camera) {
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.loaded = false;
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            allowEdit: true
        };
    }
    ionViewDidLoad() {
        try {
            this.camera.getPicture(this.options).then((imageData) => {
                this.image = 'data:image/jpeg;base64,' + imageData;
                this.loaded = true;
            }, (err) => {
                console.log(err);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    takePicture() {
        try {
            this.camera.getPicture(this.options).then((imageData) => {
                this.image = 'data:image/jpeg;base64,' + imageData;
                this.loaded = true;
            }, (err) => {
                console.log(err);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};
GalleryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-gallery',template:/*ion-inline-start:"/var/www/html/Capture/src/pages/gallery/gallery.html"*/'<!--\n  Generated template for the GalleryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title><ion-icon name="images"></ion-icon>&nbsp;Gallery</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n        <ion-card-content>\n          <ion-card-title>\n            <ion-icon name="images"></ion-icon>&nbsp;\n            Selected Image View:\n          </ion-card-title>\n          <button ion-button icon-start (click)="takePicture()" *ngIf="loaded">\n              <ion-icon name="images"></ion-icon>\n              Select Another Image\n            </button>\n      </ion-card-content>\n      <img src="{{image}}"/>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"/var/www/html/Capture/src/pages/gallery/gallery.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]])
], GalleryPage);

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_media__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RecordingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let RecordingsPage = class RecordingsPage {
    constructor(zone, navCtrl, media, file, navParams, platform) {
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.media = media;
        this.file = file;
        this.navParams = navParams;
        this.platform = platform;
        this.recording = false;
        this.pause = false;
        this.currentPlaying = -1;
        this.pausedPlay = -1;
    }
    getAudioList() {
        if (localStorage.getItem("audiolist")) {
            this.audioList = JSON.parse(localStorage.getItem("audiolist"));
            console.log(this.audioList);
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad RecordingsPage');
        this.audioList = this.navParams.get('audioList');
        this.getAudioList();
    }
    startRecord() {
        if (this.platform.is('ios')) {
            this.fileName = 'recording_' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.wav';
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        else if (this.platform.is('android')) {
            this.fileName = 'recording_' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.wav';
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        this.audio.startRecord();
        this.recording = true;
    }
    stopRecord() {
        this.audio.stopRecord();
        let data = { filename: this.fileName };
        this.audioList.push(data);
        this.audioList.sort().reverse();
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();
    }
    pauseRecord() {
        this.audio.pauseRecord();
        this.pause = true;
    }
    resumeRecord() {
        this.audio.resumeRecord();
        this.pause = false;
    }
    cancelRecord() {
        this.audio.release();
        this.pause = false;
        this.recording = false;
    }
    playAudio(file, idx) {
        if (idx != this.pausedPlay) {
            if (this.audio) {
                this.pausedPlay = -1;
                this.zone.run(() => {
                    this.currentPlaying = -1;
                });
                this.audio.pause();
            }
            if (this.platform.is('ios')) {
                this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
                this.audio = this.media.create(this.filePath);
            }
            else if (this.platform.is('android')) {
                this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
                this.audio = this.media.create(this.filePath);
            }
        }
        this.audio.play();
        this.zone.run(() => {
            this.currentPlaying = idx;
        });
        this.audio.setVolume(0.8);
        this.audio.onSuccess.subscribe(status => {
            //this.audio.release();
            this.zone.run(() => {
                this.currentPlaying = -1;
            });
        });
    }
    pauseAudio(file, idx) {
        this.audio.pause();
        this.pausedPlay = idx;
        this.currentPlaying = -1;
    }
};
RecordingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-recordings',template:/*ion-inline-start:"/var/www/html/Capture/src/pages/recordings/recordings.html"*/'<!--\n  Generated template for the RecordingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title><ion-icon name="microphone"></ion-icon>&nbsp;Recordings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <ion-card-content>\n      <ion-card-title>\n        <ion-icon name="microphone"></ion-icon>&nbsp;Recordings\n      </ion-card-title>\n      <ion-list>\n        <ion-item *ngFor="let audio of audioList; index as i;">\n          <p>{{audio.filename}}</p>\n          <button ion-button clear item-end large (click)="playAudio(audio.filename, i)" *ngIf="currentPlaying!=i"><ion-icon\n              name="play"></ion-icon></button>\n          <button ion-button clear item-end large (click)="pauseAudio(audio.filename, i)" *ngIf="currentPlaying==i"><ion-icon\n              name="pause"></ion-icon></button>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/var/www/html/Capture/src/pages/recordings/recordings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
], RecordingsPage);

//# sourceMappingURL=recordings.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map