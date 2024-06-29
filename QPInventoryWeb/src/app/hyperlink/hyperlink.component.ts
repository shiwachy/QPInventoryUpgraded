import { Component, OnInit } from '@angular/core';
import { Category } from '../category/category.model';
import { ActionService } from '../shared/action.service';
import { hyperlink, keyword } from '../shared/hyperlink.model';
import { MainService } from '../shared/main.service';
import { DMService } from '../shared/dm.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.css']
})
export class HyperlinkComponent implements OnInit {

  constructor(private actionService: ActionService,
    private mainService: MainService,
    private dmService: DMService,
    private http:HttpClient
  ) { }

  catDetail: Category = new Category();
  _hyperlink: hyperlink = new hyperlink();
  _keyword: keyword = new keyword();
  keywordList: Array<keyword> = this.dmService.keyList;
  hyperlinkList: Array<hyperlink> = this.dmService.hyperlinkList;
  actionControlFlag:boolean = false;
  actionName:string="Submit";
  ngOnInit(): void {
    this.actionService.onSendCatDetail.subscribe(
      data => this.catDetail = data
    );

    // this.actionService.onLinkFound.subscribe(
    //   data=>this._hyperlink=data
    // )
  }

  onHyperlinkEntered() {
    // this.mainService.getHyperlinkInfo(this._hyperlink.Hyperlink);
    var ln = JSON.stringify(this._hyperlink.Hyperlink);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<hyperlink>("https://localhost:7286/api/Main/GetHyperlinkInfo",ln,{headers}).subscribe(
      (res)=>{
        this.onLinkFound(res);
      },(error)=>{
        this.actionControlFlag=false;
        this.actionName="Submit";
        this._hyperlink.Keywords = [];
      }
    )
  }

  onLinkFound(data:any){
    console.log(data);
    this.actionControlFlag=true;
    this.actionName="Update";
    this._hyperlink = new hyperlink();
    this._hyperlink.CategoryId = data.categoryId;
    this._hyperlink.Hyperlink = data.hyperlink;
    this._hyperlink.HyperlinkId = data.hyperlinkId;
    this.catDetail.CategoryId = data.categoryId;
    for (let key in data.keywords) {
      if (data.keywords.hasOwnProperty(key)) {
        let keywordObj = data.keywords[key];
        let _keyword = new keyword();
        _keyword.KeywordId = keywordObj.keywordId;
        _keyword.Keyword = keywordObj.keyword || "";
        this._hyperlink.Keywords.push(_keyword);
      }
    }
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
        console.log(this._hyperlink.Keywords);
      } else {
        this._keyword.Keyword = "";
        alert("Already exists");
      }
    } else {
      alert("Empty Field");
    }
  }


  removeKeyword(key: keyword) {
    let index = this._hyperlink.Keywords.indexOf(key);
    this._hyperlink.Keywords.splice(index, 1);
  }


  actionControl(){
    if(!this.actionControlFlag){
        this.onClickSubmit();
    }else{
      this.onClickUpdate();
    }
  }

  onClickSubmit() {
    if (this.catDetail.CategoryId != 0) {
      if (this._hyperlink.Hyperlink != "" && this._hyperlink.Keywords.length > 0) {
        this._hyperlink.CategoryId = this.catDetail.CategoryId;
        this.keywordList = new Array<keyword>();
        this.mainService.postHyperlink(this._hyperlink);
      } else {
        alert("Some field are empty");
      }
    } else {
      alert("Domain Name Not selected")
    }
  }

  onClickUpdate() {
    this._hyperlink.CategoryId=this.catDetail.CategoryId;
    this.mainService.updateHyperlink(this._hyperlink);
  }

















}
