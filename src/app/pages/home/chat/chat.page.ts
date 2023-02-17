import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  name: string = 'Sender'
  message: string
  isLoading = false
  currentUserId = 1
  chats = [
    {id: 1, sender: 1, message: 'Hola, ¿Cómo estás?'},
    {id: 2, sender: 2, message: 'Hola que tal, bien y tu?'},
    {id: 1, sender: 1, message: 'Que bueno me da gusto'},
    {id: 2, sender: 2, message: 'Ayyy muchas gracias por preocuparte'}
  ]

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){

  }

}
