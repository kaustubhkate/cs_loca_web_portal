import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PageModel } from "./page-model";
import { PageableData } from '../loca-model/pageable-data';
import { PageableDataUserDto } from '../loca-model/pagable-user-2';

export class ExampleHttpDao {
    constructor(private http: HttpClient) {}
  
    getList(url:string, sort1: string, order1: string, page: number, size1:number): Observable<PageModel> {
      let sort  = sort1 != null ? sort1: "id";
      let order = order1 != null ? order1: "desc";
      let size = size1 !=null ? size1 : 10;
      const requestUrl = `${url}?page=${page}&size=${size}&sort=${sort}&order=${order}`;
      return this.http.get<PageModel>(requestUrl);
    }

    getNewList(url:string, sort1: string, order1: string, page: number, size1:number): Observable<PageModel> {
      if(order1 == null || order1 == undefined || order1 == ''){
        order1 = "desc";
      }
      let sort  = sort1 != null ? sort1: "id";
      let order = order1 != null ? order1: "desc";
      let size = size1 !=null ? size1 : 10;
      const requestUrl = `${url}?page=${page}&size=${size}&sort=${sort},${order}`;
      return this.http.get<PageModel>(requestUrl);
    }

    //new method for Role
    getNewList2(url:string, sort1: string, order1: string, page: number, size1:number): Observable<PageableData> {
      if(order1 == null || order1 == undefined || order1 == ''){
        order1 = "desc";
      }
      // let sort  = sort1 != null ? sort1: "id";
      // let order = order1 != null ? order1: "desc";
      // let size = size1 !=null ? size1 : 10;
      const requestUrl = `${url}`;
      return this.http.get<PageableData>(requestUrl);
    }

    /** For User */
    getNewListForUser(url:string, sort1: string, order1: string, page: number, size1:number): Observable<PageableDataUserDto> {
      if(order1 == null || order1 == undefined || order1 == ''){
        order1 = "desc";
      }
      let sort  = sort1 != null ? sort1: "id";
      let order = order1 != null ? order1: "desc";
      let size = size1 !=null ? size1 : 10;
      const requestUrl = `${url}`;
      return this.http.get<PageableDataUserDto>(requestUrl);
    }

    getGeofenceList(url:string, sort1: string, order1: string, page: number, size1:number): Observable<PageModel> {
      let sort  = sort1 != null ? sort1: "geofencingid";
      let order = order1 != null ? order1: "desc";
      let size = size1 !=null ? size1 : 10;
      const requestUrl = `${url}?page=${page}&size=${size}&sort=${sort}&order=${order}`;
      return this.http.get<PageModel>(requestUrl);
    }

    getNewListTemplate(url:string, sort1: string, order1: string, page: number, size1:number): Observable<any> {
      if(order1 == null || order1 == undefined || order1 == ''){
        order1 = "desc";
      }
      let sort  = sort1 != null ? sort1: "id";
      let order = order1 != null ? order1: "desc";
      let size = size1 !=null ? size1 : 10;
      const requestUrl = `${url}?page=${page}&size=${size}&sort=${sort},${order}`;
      return this.http.get<any>(requestUrl);
    }
}
