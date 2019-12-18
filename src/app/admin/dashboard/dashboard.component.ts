import { Component, OnInit} from '@angular/core';
import { DashboardcounterDto } from '../../shared/models/dashboardcounter-dto';
import { DashboardService } from '../../shared/services/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageDb } from '../../shared/models/image-db';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  useremail:string;
  counterDto = new DashboardcounterDto();
  isStaff : boolean = false;
  referenceno:number;
  imageData = new ImageDb();
  constructor(private dashboardService:DashboardService) { 
  }

  ngOnInit() {
    this.getDashboardCounters();
  }

  getDashboardCounters(): void{
    // 27-11-19
    // this.dashboardService.getDashboardCounters().subscribe(result=>{
    //   console.log(result);
    //   this.counterDto = result;
    // }, (err:HttpErrorResponse)=> {
      
    // })
    console.log("hey there!");
  }

}