import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../category/category.model';
import { DMService } from './dm.service';
import { hyperlink, keyword } from './hyperlink.model';
import { HyperlinkComponent } from '../hyperlink/hyperlink.component';
import { ActionService } from './action.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient,private dmService:DMService) { }

  getKeywordsList(){
    this.http.get<keyword[]>("/api/Main/GetKeywords").subscribe(
      (res)=>{
          this.dmService.mapKeywordList(res);
      },(error)=>{
          alert("Unable to Fetch Keywords List");
      }
    )
    
  }

  //Http calls for Category Module
  // postCategory(obj:Category){
  //   this.http.post("/api/Main/PostCategory",obj).subscribe(
  //     (res)=>{
  //       return res;
  //       alert("Category Created Successfully");
  //     },(error)=>{
  //       alert("Something went wrong");
  //     }
  //   )
  // }
  postCategory(obj:Category):Observable<any>{
    return this.http.post<Category>("/api/Main/PostCategory",obj);
  }

  getCategoryList(){
    this.http.get("/api/Main/GetCategory").subscribe(
      (res)=>{
          this.dmService.mapCatList(res);
      },(error)=>{
        alert("Failed to load categories");
      }
    )
  }

  deleteCategory(id:number){
    this.http.delete("/api/Main/"+id).subscribe(
      (res)=>{
          console.log(res);
          window.location.reload();
      },(error)=>{
        console.log(error);
      }
    )
  }

  updateCategory(obj:Category){
    this.http.put("/api/Main/UpdateCategory"+obj.CategoryId,obj).subscribe(
      (res)=>{
        alert("Updated Successfully");
      },(error)=>{
        alert("Update failed");
      }
    )
  }

  // Http calls hyperlinks
  // postHyperlink(obj:hyperlink){
  //   this.http.post<hyperlink>("/api/Main/PostHyperlink",obj).subscribe(
  //     (res)=>{
  //       alert("Hyperlink Added");
  //       this.getKeywordsList();
  //     },(error)=>{
  //         console.log("Something went wrong");
  //     }
  //   )
  // }
  postHyperlink(obj:hyperlink):Observable<any>{
    return this.http.post<any>("/api/Main/PostHyperlink",obj);
  }

  getHyperlinksByCatId(catId:number){
    this.http.get<hyperlink[]>("/api/Main/"+catId).subscribe(
      (res)=>{
        this.dmService.mapHyperlinkList(res);
      },(error)=>{
        alert("Unable to load links");
      }
    )
  }

  // getHyperlinksByCatId(catId:number):Observable<any>{
  //   return this.http.get<hyperlink[]>("/api/Main/"+catId) 
  // }



  // getHyperlinkInfo(link:string){
  //   var ln = JSON.stringify(link);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http.post("/api/Main/GetHyperlinkInfo",ln,{headers}).subscribe(
  //     (res)=>{
  //       this.dmService.mapFoundLink(res);
  //     },(error)=>{
        
  //     }
  //   )
  // }


  updateHyperlink(obj:hyperlink){
    this.http.put<hyperlink>("/api/Main/PutHyperlink",obj)
    .subscribe(
      (res)=>{
        alert("Hyperlink Updated");
      },(error)=>{
        alert("Something went wrong");
      }
    )
  }


  deleteHyperlink(obj:hyperlink){
    this.http.post("/api/Main/DeleteHyperlink",obj).subscribe(
      (res)=>{
        
      }
    )
  }

  

}
