import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmailDto } from '../models/email-dto';
import { RestApi } from '../api/rest-api';
import { ToasterService } from './toaster.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  api = new RestApi();

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  sendEmail(id:number, emailDto:EmailDto): Observable<any> {
    const url = `${this.api.DUMMY_URL}/${id}`;
    return this.httpClient.post<any>(url, emailDto);
  }
}
