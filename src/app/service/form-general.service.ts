import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormGeneralService {
  private message = 'No hay nada';
  subs: boolean[] = [];
  deviceConn = 0;
  @Output() change: EventEmitter<boolean[]> = new EventEmitter();
  constructor() { }

  onLine(): number{
    const pos = this.deviceConn;
    this.deviceConn++;
    this.subs.push(false);
    return pos;
  }

  setErrorChild(val: number): void {
    this.subs[val] = false;
  }

  getChilds(): boolean[]{
    return this.subs;
  }

  activateChild(pos: number) {
    this.subs[pos] = true;
    this.change.emit(this.subs);
  }

  activateChilds(){
    this.subs = this.subs.map((value: boolean) => (value)? value: true);
    this.change.emit(this.subs);
  }
}
