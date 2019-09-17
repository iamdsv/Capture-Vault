import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
/**
 * Generated class for the RecordingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recordings',
  templateUrl: 'recordings.html',
})
export class RecordingsPage {

  audioList: any [];
  image: any;
  recording: boolean = false;
  pause: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  currentPlaying: any = -1;
  pausedPlay: any = -1;
  constructor(public zone: NgZone, public navCtrl: NavController,private media: Media, private file: File, public navParams: NavParams,public platform: Platform) {
  }
  getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordingsPage');
    this.audioList=this.navParams.get('audioList');
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
