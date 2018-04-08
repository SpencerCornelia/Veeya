import { Injectable } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class ProgressService {

  constructor(public progress: NgProgress) { }

  startLoading() {
    this.progress.start();
  }

  stopLoading() {
    this.progress.complete();
  }
}