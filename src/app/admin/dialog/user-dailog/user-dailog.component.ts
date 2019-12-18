import { Component, OnInit ,Inject, HostListener} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-dailog',
  templateUrl: './user-dailog.component.html',
  styleUrls: ['./user-dailog.component.scss']
})
export class UserDailogComponent implements OnInit {
 
  title:string="Are You Sure to Make changes ?";
  
  constructor( 
    public dialogRef: MatDialogRef<UserDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,) {
   }

   
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  
   active:boolean;

   onNoClick(): void {
    this.dialogRef.close(false);
  }
 
  getinitial():void{
   
    console.log('st',this.data.initial);
  
  }
  
  confirm(): void {
   
    switch (this.data.type) {
      case "allowlogin":
       
        // this.userService.setallowlogin(this.data.id, this.data.allowlogin).subscribe(data => {
        //   console.log('update1', data);
          
        //   // this.staffs=data;
        // })
        break;
      case "status":
      console.log('st',this.data.initial);
        this.userService.setloginstatus(this.data.id, this.data.status).subscribe(data => {
          console.log('update2', data);
          //this.staffs=data;
        })

        break;
    }
  }

  
  ngOnInit() {
    this.getinitial();
  }

}
