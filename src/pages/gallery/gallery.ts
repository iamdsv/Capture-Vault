import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  loaded: boolean = false;
  image: any;
  constructor(public domSanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams, public camera: Camera) {
  }
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    allowEdit: true
  }

  ionViewDidLoad() {
    try {
      this.camera.getPicture(this.options).then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
        this.loaded = true;
      }, (err) => {
        console.log(err);
      });
    } catch (e) {
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
    } catch (e) {
      console.log(e);
    }
  }

}

