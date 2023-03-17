import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('new_chat') modal: ModalController
  @ViewChild('popover') popover: PopoverController

  segment = 'chats'
  open_new_chat = false
  users: Observable<any[]>
  chatRooms: Observable<any[]>
  /*users = [
    {id: 1, name: 'Andres', photo: 'https://i.pravatar.cc/389'},
    {id: 2, name: 'Juan', photo: 'https://i.pravatar.cc/337'}
]
  chatRooms = [
  {id: 1, name: 'María', photo: 'https://i.pravatar.cc/374'},
  {id: 2, name: 'Mitzi', photo: 'https://i.pravatar.cc/300'}
]*/

  constructor(
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getRooms()
  }

  getRooms(){
    this.chatService.getChatRooms()
    this.chatRooms = this.chatService.chatRooms
    console.log('chatrooms: ', this.chatRooms)
  }

  async logout(){
    try {
      console.log('logout')
      this.popover.dismiss()
      await this.chatService.auth.logout()
      this.router.navigateByUrl('/login', {replaceUrl: true})
    } catch(e){
      console.log(e)
    }
  }

  onSegmentChanged(event: any){
    console.log(event)

  }

  newChat(){
    this.open_new_chat = true
    if(!this.users) this.getUsers()
  }

  getUsers(){
    this.chatService.getUsers()
    this.users = this.chatService.users
  }

  onWillDismiss(event: any){

  }

  cancel(){
    this.modal.dismiss()
    this.open_new_chat = false
  }

  async startChat(item){
    try{
      //this.global.showLoader()
      const room = await this.chatService.createChatRoom(item?.uid)
      console.log('room: ', room)
      this.cancel()
      const navData: NavigationExtras = {
        queryParams: {
          name: item?.name
        }
      }
      this.router.navigate(['/', 'home', 'chats', room?.id], navData)
      //this.global.hideLoader()
    } catch(e){
      console.log(e)
      //this.global.hideLoader
    }
  }

  getChat(item){
    this.router.navigate(['/','home','chats', item?.id])
  }

  getUser(user: any){
    return user
  }

}
