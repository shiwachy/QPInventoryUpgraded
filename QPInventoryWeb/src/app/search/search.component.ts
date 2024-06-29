import { Component, OnInit } from '@angular/core';
import { hyperlink, keyword } from '../shared/hyperlink.model';
import { DMService } from '../shared/dm.service';
import { Category } from '../category/category.model';
import { ActionService } from '../shared/action.service';
import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dmService:DMService,
            private actionService:ActionService,
            private mainService:MainService
  ) { }

  catList:Array<Category> = this.dmService.catList;
  hyperlinks:any = this.dmService.hyperlinkList;
  filteredHyperlinks:Array<hyperlink> = this.dmService.hyperlinkList;
  _hyperlink: hyperlink = new hyperlink();
  _keyword: keyword = new keyword();
  keywordList: Array<keyword> = this.dmService.keyList;
  catInfo:Category = new Category();
  searchInput:string="";
  searchCat:string="";
  ngOnInit(): void {
  }

  openModal(id:string){
    this.actionService.openModal(id);
  }
  closeModal(id:string){
    this.actionService.closeModal(id);
  }



  copyUrl = async (url:string)=> {
    try {
      if ((navigator as any).clipboard) {
        await (navigator as any).clipboard.writeText(url);
        alert('Link copied to clipboard');
      } else {
        alert('Clipboard API not supported');
      }
    } catch (err) {
      alert('Failed to copy: ' + err);
    }
  }

  editHyperlink(obj:any){
    this._hyperlink = new hyperlink();
    this.openModal("editHyperlinkModel");
    this.findCategory(obj.CategoryId);
    this._hyperlink.CategoryId = obj.CategoryId;
    this._hyperlink.Hyperlink = obj.Hyperlink;
    this._hyperlink.HyperlinkId = obj.HyperlinkId;
    //this._hyperlink.Keywords = obj.Keywords;
    for (let key in obj.Keywords) {
      if (obj.Keywords.hasOwnProperty(key)) {
        let keywordObj = obj.Keywords[key];
        let _keyword = new keyword();
        _keyword.KeywordId = keywordObj.keywordId;
        _keyword.Keyword = keywordObj.keyword || "";
        this._hyperlink.Keywords.push(_keyword);
      }
    }
    console.log(obj);
    console.log(this.catList);
  }

  removeKeyword(key: keyword) {
    let index = this._hyperlink.Keywords.indexOf(key);
    this._hyperlink.Keywords.splice(index, 1);
  }

  addKeyword() {
    var isAvailable = this._hyperlink.Keywords.some(x => x.Keyword == this._keyword.Keyword);
    var obj = this.keywordList.find(x => x.Keyword == this._keyword.Keyword);
    if (this._keyword.Keyword != "") {
      if (!isAvailable) {
        if (obj != undefined) {
          this._keyword.KeywordId = obj.KeywordId;
          this._hyperlink.Keywords.push(this._keyword);
          this._keyword = new keyword();
        } else {
          this._hyperlink.Keywords.push(this._keyword);
          this._keyword = new keyword();
        }
      } else {
        this._keyword.Keyword = "";
        alert("Already exists");
      }
    } else {
      alert("Empty Field");
    }
  }

  findCategory(id:number){
    this.catInfo = new Category();
    for(let cat of this.catList){
      if(cat.CategoryId==id){
        this.catInfo.CategoryId=id;
        this.catInfo.CategoryName=cat.CategoryName;
      }
    }
  }

  updateHyperlink(){
    this.mainService.updateHyperlink(this._hyperlink);
    this.closeModal("catListModal");
  }

  onDeleteClick(obj:hyperlink){
    this.mainService.deleteHyperlink(obj);
  }

  
  filterHyperlink(){
    if(this.hyperlinks.length>=1){
      if(this.searchInput==""){
        this.filteredHyperlinks = new Array<hyperlink>();
        this.filteredHyperlinks = this.hyperlinks;
      }else{
        this.filteredHyperlinks = new Array<hyperlink>();
        for(let link of this.hyperlinks){
          for(let key of link.Keywords){
            if(key.keyword==this.searchInput){
              this.filteredHyperlinks.push(link);
            }
          }
        }
        // this.filterHyperlinks = this.hyperlinks.filter(
        //   x=>x.keywordList.filter(
        //     p=>p.keyword.match(this.searchInput)
        //   )
        // )
      }
    }else{
      this.searchInput="";
      alert("Domain not selected");
    }
    
  }


  onClickChangeDomain(){
    this.actionService.openModal("catListModal");
  }

  onClickCat(obj:Category){
    this.catInfo.CategoryName = obj.CategoryName;
    this._hyperlink.CategoryId = obj.CategoryId;
    this.closeModal("catListModal");
  }

  onInputChange(){
    console.log("s");
    if(this.searchCat==""){
      this.catList =  new Array<Category>();
      this.catList = this.dmService.catList;
    }else{
      this.catList = new Array<Category>();
      this.catList = this.dmService.catList.filter(
        x=>x.CategoryName.match(this.searchCat)
      )
    }
  }



}
