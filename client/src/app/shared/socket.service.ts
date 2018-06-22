import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, of} from 'rxjs';
import {Move} from '../model/move';
import { Player } from '../model/player';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  player: Player = new Player();

  private socket = io('http://localhost:3000');

  constructor() { }

  sendMove(data) {
    this.socket.emit('move', data);
  }

  createNewPlayer(player) {
    this.socket.emit('create new player', player);
  }

  newMoveReceived() {
    const observable = new Observable<Move>(observer => {
      this.socket.on('new move', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  getPlayerData() {
    const observable = new Observable<any>(observer => {
      this.socket.on('get player data', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  userJoined() {
    const observable = new Observable<number>(observer => {
      this.socket.on('player joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  userLeft() {
    const observable = new Observable<number>(observer => {
      this.socket.on('player left', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  announceWinner() {
    this.socket.emit('winner', this.player);
  }

  tiedGame() {
    this.socket.emit('tied game');
  }

  gameOver() {
    const observable = new Observable<Player>(observer => {
      this.socket.on('game over', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  error() {
    const observable = new Observable<string>(observer => {
      this.socket.on('err', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }
}
