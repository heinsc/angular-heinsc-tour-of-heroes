import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: String[];
  constructor(private messageService: MessageService) {
    this.messages = this.messageService.messages;
  }

  clear() {
    this.messageService.clear();
  }
  ngOnInit(): void {
    this.messages = this.messageService.messages;
  }

}
