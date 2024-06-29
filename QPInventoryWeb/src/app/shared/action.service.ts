import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../category/category.model';
import { hyperlink } from './hyperlink.model';
import { Router } from '@angular/router';

declare var window:any;
@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private router:Router) { }


  formModal:any;
  hyperlinkModel:hyperlink = new hyperlink();
  openModal(modelId:string){
    this.formModal = new window.bootstrap.Modal(
      document.getElementById(modelId)
    )  
    this.formModal.show();
  }

  closeModal(modelId:string){
    this.formModal.hide();
  }


  // Interaction between hyperlink and category
  onSendCatDetail = new EventEmitter<Category>();
  sendCatDetail(obj:Category){
    this.onSendCatDetail.emit(obj);
  }


  // onLinkFound = new EventEmitter<hyperlink>();
  // sendLinkInfo(obj:hyperlink){
  //   this.onLinkFound.emit(obj);
  // }


    reloadCurrentRoute() {
      window.location.reload();
  }



  
}
