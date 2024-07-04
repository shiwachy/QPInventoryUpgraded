import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { MainService } from '../shared/main.service';
import { DMService } from '../shared/dm.service';
import { ActionService } from '../shared/action.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private mainService:MainService,
    private dmService:DMService,
    private actionService:ActionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getCatList();
  }

  catInfo:Category = new Category();
  catList:Array<Category> = this.dmService.catList;
  searchInput:string="";
  openModal(id:string){
    this.actionService.openModal(id);
  }
  closeModal(id:string){
    this.actionService.closeModal(id);
  }
  onClickSaveCat(){
    //this.mainService.postCategory(this.catInfo);
    this.mainService.postCategory(this.catInfo).subscribe(
      res=>{
        console.log(res),
        this.catList.push(res);
      }
    )
    this.catInfo = new Category();
    this.actionService.closeModal("categoryModal") //This is the id of the modal
  }

  getCatList(){
    this.mainService.getCategoryList();
  }

  onClickDelete(){
    this.mainService.deleteCategory(this.catInfo.CategoryId);
    this.catInfo = new Category();
    this.actionService.closeModal("categoryModal");
  }

  onClickUpdate(){
    this.mainService.updateCategory(this.catInfo);
    this.catInfo = new Category();
    this.actionService.closeModal("categoryModal");
  }

  actionBtnStatus:boolean=false;
  onCatNameInputChange(){
    const filteredCat = this.catList.find(x=>x.CategoryName===this.catInfo.CategoryName);
    if(filteredCat!=undefined){
      this.actionBtnStatus=true;
      this.catInfo.CategoryId = filteredCat.CategoryId;
      this.catInfo.CategoryName = filteredCat.CategoryName;
      this.catInfo.Link = filteredCat.Link;
      this.catInfo.Description = filteredCat.Description;
    }else{
      this.actionBtnStatus=false;
      this.catInfo.CategoryId=0;
      this.catInfo.Link = ""
      this.catInfo.Description = "";
    }
  }


  catDetail:Category = new Category();
  onClickCat(obj:Category){
    this.actionService.sendCatDetail(obj);
    this.mainService.getHyperlinksByCatId(obj.CategoryId);
  }

  showSearchbar:boolean=false;
  onSearchIconClick(){
    this.showSearchbar=true;
  }

  onInputChange(){
    if(this.searchInput==""){
      this.catList =  new Array<Category>();
      this.catList = this.dmService.catList;
    }else{
      this.catList = new Array<Category>();
      this.catList = this.dmService.catList.filter(
        x=>x.CategoryName.match(this.searchInput)
      )
    }
  }
  
  
}
