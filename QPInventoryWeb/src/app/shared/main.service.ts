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
    this.http.get<keyword[]>("https://localhost:7286/api/Main/GetKeywords").subscribe(
      (res)=>{
          this.dmService.mapKeywordList(res);
      },(error)=>{
          alert("Unable to Fetch Keywords List");
      }
    )
    
  }

  //Http calls for Category Module
  // postCategory(obj:Category){
  //   this.http.post("https://localhost:7286/api/Main/PostCategory",obj).subscribe(
  //     (res)=>{
  //       return res;
  //       alert("Category Created Successfully");
  //     },(error)=>{
  //       alert("Something went wrong");
  //     }
  //   )
  // }
  postCategory(obj:Category):Observable<any>{
    return this.http.post<Category>("https://localhost:7286/api/Main/PostCategory",obj);
  }

  getCategoryList(){
    this.http.get("https://localhost:7286/api/Main/GetCategory").subscribe(
      (res)=>{
          this.dmService.mapCatList(res);
      },(error)=>{
        alert("Failed to load categories");
      }
    )
  }

  deleteCategory(id:number){
    this.http.delete("https://localhost:7286/api/Main/"+id).subscribe(
      (res)=>{
          console.log(res);
          window.location.reload();
      },(error)=>{
        console.log(error);
      }
    )
  }

  updateCategory(obj:Category){
    this.http.put("https://localhost:7286/api/Main/UpdateCategory"+obj.CategoryId,obj).subscribe(
      (res)=>{
        alert("Updated Successfully");
      },(error)=>{
        alert("Update failed");
      }
    )
  }

  // Http calls hyperlinks
  postHyperlink(obj:hyperlink){
    this.http.post<hyperlink>("https://localhost:7286/api/Main/PostHyperlink",obj).subscribe(
      (res)=>{
        alert("Hyperlink Added");
        this.getKeywordsList();
      },(error)=>{
          console.log("Something went wrong");
      }
    )
  }

  getHyperlinksByCatId(catId:number){
    this.http.get<hyperlink[]>("https://localhost:7286/api/Main/"+catId).subscribe(
      (res)=>{
        this.dmService.mapHyperlinkList(res);
      },(error)=>{
        alert("Unable to load links");
      }
    )
  }

  // getHyperlinkInfo(link:string){
  //   var ln = JSON.stringify(link);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http.post("https://localhost:7286/api/Main/GetHyperlinkInfo",ln,{headers}).subscribe(
  //     (res)=>{
  //       this.dmService.mapFoundLink(res);
  //     },(error)=>{
        
  //     }
  //   )
  // }


  updateHyperlink(obj:hyperlink){
    this.http.put<hyperlink>("https://localhost:7286/api/Main/PutHyperlink",obj)
    .subscribe(
      (res)=>{
        alert("Hyperlink Updated");
      },(error)=>{
        alert("Something went wrong");
      }
    )
  }


  deleteHyperlink(obj:hyperlink){
    this.http.post("https://localhost:7286/api/Main/DeleteHyperlink",obj).subscribe(
      (res)=>{
        
      }
    )
  }

  

}
