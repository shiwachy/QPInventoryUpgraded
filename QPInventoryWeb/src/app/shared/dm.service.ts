import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Category } from '../category/category.model';
import { map } from 'rxjs';
import { hyperlink, keyword } from './hyperlink.model';
import { ActionService } from './action.service';
@Injectable({
  providedIn: 'root'
})
export class DMService {

  constructor(private actionService:ActionService) { }
  //Data Manipulation for category Module
  catList: Array<Category> = new Array<Category>();
  mapCatList(obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let categoryObj = obj[key];
        let category = new Category();
        category.CategoryId = categoryObj.CategoryId;
        category.CategoryName = categoryObj.CategoryName || "";
        category.Link = categoryObj.Link || "";
        category.Description = categoryObj.Description || "";
        this.catList.push(category);
      }
    }
  }


  keyList: Array<keyword> = new Array<keyword>();
  mapKeywordList(obj:Array<keyword>) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keywordObj = obj[key];
        let _keyword = new keyword();
        _keyword.KeywordId = keywordObj.KeywordId;
        _keyword.Keyword = keywordObj.Keyword || "";
        this.keyList.push(_keyword);
      }
    }
  }


  hyperlinkList:Array<hyperlink> = new Array<hyperlink>();
  mapHyperlinkList(obj:any){
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let hyperlinkObj = obj[key];
        let _hyperlink = new hyperlink();
        _hyperlink.HyperlinkId = hyperlinkObj.hyperlinkId;
        _hyperlink.CategoryId = hyperlinkObj.categoryId;
        _hyperlink.Hyperlink = hyperlinkObj.hyperlink;
        _hyperlink.Keywords = hyperlinkObj.keywords; 
        this.hyperlinkList.push(_hyperlink) 
      }
    }
  }

  foundLinkInfo:hyperlink = new hyperlink();
  // mapFoundLink(obj:any){
  //       this.foundLinkInfo.HyperlinkId = obj.hyperlinkId;
  //       this.foundLinkInfo.CategoryId = obj.categoryId;
  //       this.foundLinkInfo.Hyperlink = obj.hyperlink || "";
  //       for (let key in obj.Keywords) {
  //         if (obj.hasOwnProperty(key)) {
  //           let keywordObj = obj[key];
  //           let _keyword = new keyword();
  //           _keyword.KeywordId = keywordObj.keywordId;
  //           _keyword.Keyword = keywordObj.keyword;
  //           this.foundLinkInfo.Keywords.push(_keyword) 
  //         }
  //       }
  //       this.actionService.sendLinkInfo(this.foundLinkInfo);
  //       console.log(this.foundLinkInfo)
  // }

 






}







