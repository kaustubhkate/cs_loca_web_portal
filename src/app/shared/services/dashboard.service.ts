import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardcounterDto } from '../models/dashboardcounter-dto';
import { HttpClient } from '@angular/common/http';
import { RestApi } from '../api/rest-api';
import { ImageDb } from '../models/image-db';

@Injectable()
export class DashboardService {

  api = new RestApi();

  constructor(private httpClient:HttpClient) { }

  getDashboardCounters():Observable<DashboardcounterDto>{
    return this.httpClient.get<DashboardcounterDto>(this.api.DUMMY_URL);
  }

  getImage(id:number):Observable<ImageDb>{
    const url = `http://35.182.72.86:8080/experiencerest/staff/imagebystaffid/${id}`;
    return this.httpClient.get<ImageDb>(url);
  }

}
