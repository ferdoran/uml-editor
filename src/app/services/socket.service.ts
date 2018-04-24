import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) {
    this.socket.on('incMessage', (data) => {
      console.log("Incoming message: ", data);
    })
   }

  sendMessage(msg: string) {
    this.socket.emit("message", msg);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  getMessage() {
    return this.socket.fromEvent("message").take(1);
  }

}
