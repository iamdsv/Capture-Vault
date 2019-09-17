import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GalleryPage } from '../pages/gallery/gallery';
import { RecordingsPage } from '../pages/recordings/recordings';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GalleryPage,
    RecordingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GalleryPage,
    RecordingsPage
  ],
  providers: [
    Camera,
    Media,
    File,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      if (platform.is('android')) {
        statusBar.backgroundColorByHexString("#488aff");
      } else if (platform.is('ios')) {
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
}
