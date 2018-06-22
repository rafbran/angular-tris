import { Component, OnInit } from '@angular/core';
import { SocketService } from './shared/socket.service';
import { Player } from './model/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  player: Player = new Player();

  constructor(private socketService: SocketService) {}
  ngOnInit() {

    this.socketService.createNewPlayer(this.player);

  }
}
