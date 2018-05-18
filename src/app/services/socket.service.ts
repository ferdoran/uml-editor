import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { ElementCreatedMessage } from '../network/element-created.message';
import { BasicMessage } from '../network/basic.message';

@Injectable()
export class SocketService {

  private socketId: string = "";

  constructor(private socket: Socket) {
    this.socket.on('connect', () => {
      this.socketId = this.socket.ioSocket.id;
    });
   }

  sendMessage(msg: BasicMessage) {
    msg.senderId = this.socketId;
    this.socket.emit(msg.constructor.name, msg);
    console.log("Sent message: " ,msg);
  }

  onEvent<T>(event: string): Observable<T> {
    return this.socket.fromEvent<T>(event);
  }

}
