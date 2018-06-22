import { Component, OnInit } from '@angular/core';
import { SocketService } from '../shared/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

}
