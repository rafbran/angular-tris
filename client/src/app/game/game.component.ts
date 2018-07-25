import { Component, OnInit } from '@angular/core';
import { SocketService } from '../shared/socket.service';
import { Move } from '../model/move';
import { Player } from '../model/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  playerCount = 0;
  error = '';
  board: Array<Move> = [];
  gameOver = '';

  constructor(public socketService: SocketService) { }

  ngOnInit() {
    this.socketService.userJoined().subscribe(data => { this.playerCount = data;  } );
    this.socketService.gameOver().subscribe(data => {
      this.board = [];
      if (data) {this.gameOver = 'Vincitore ' + data.name;
    } else { this.gameOver = 'Pareggio'; } } );
    this.socketService.userLeft().subscribe(data => { 
      this.playerCount = data;
      this.gameOver = '';
    } );
    this.socketService.newMoveReceived().subscribe(data => {
      this.socketService.player.currentTurno = !this.socketService.player.currentTurno;
      this.board.push(data);
      this.checkGame();
    });
    this.socketService.error().subscribe(data => { this.error = data; } );
    this.socketService.getPlayerData().subscribe(data => { this.socketService.player = data; } );
  }

  sendMove(x: number, y: number, value: number) {
    // se è il mio turno è non c'è già una mossa in quella cella
    if (this.socketService.player.currentTurno && !this.moveAlreadyTaken(x, y)) {
      this.socketService.sendMove(new Move(x, y, this.socketService.player, value));
    }
  }

  getMoveAt(x: number, y: number) {
    let symbol = '';
    this.board.forEach(element => {
      if (element.x === x && element.y === y) {
        if (element.player.symbol === 'X') { symbol = 'fa-remove';
        } else if (element.player.symbol === 'O') { symbol = 'fa-circle-o'; }
          return false;
        }
    });
    return symbol;
  }

  moveAlreadyTaken(x: number, y: number) {
    let taken = false;
    this.board.forEach(element => {
      if (element.x === x && element.y === y) {
        taken = true;
        return false;
      }
    });
    return taken;
  }

  checkGame() {
    if (this.board.length >= 9) {
      this.socketService.tiedGame();
    }
<<<<<<< HEAD
    const wins: Array<number> = [7, 56, 448, 73, 146, 292, 273, 84];
=======
    const wins = [7, 56, 448, 73, 146, 292, 273, 84];
>>>>>>> f070a24f03ab28656ee18cabf30fc458ea9bc00d
    let playerMovesValues = 0;
    this.board.forEach(element => {
      if (element.player.id === this.socketService.player.id) {
        playerMovesValues += element.value;
      }
    });
    wins.forEach(win => {
      if((win & playerMovesValues) === win) {
        this.socketService.announceWinner();
        return false;
      }
    });
  }
}
