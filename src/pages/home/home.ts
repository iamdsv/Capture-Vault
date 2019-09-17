import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { GalleryPage } from '../gallery/gallery';
import { RecordingsPage } from '../recordings/recordings';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: any;
  recording: boolean = false;
  pause: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  currentPlaying: any = -1;
  pausedPlay: any = -1;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    allowEdit: true
  }

  constructor(public zone: NgZone, private camera: Camera, private media: Media, private file: File, public platform: Platform, public navCtrl: NavController) {
  }
  takePicture() {
    try {
      this.camera.getPicture(this.options).then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  }
  goToGallery(){
    this.navCtrl.push(GalleryPage);
  }
  goToRecordings(){
    let data={
      audioList: this.audioList
    }
    this.navCtrl.push(RecordingsPage, data);
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
    } else if (this.platform.is('android')) {
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
          this.currentPlaying=-1;
        });
        this.audio.pause();
      }
      if (this.platform.is('ios')) {
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
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

}
