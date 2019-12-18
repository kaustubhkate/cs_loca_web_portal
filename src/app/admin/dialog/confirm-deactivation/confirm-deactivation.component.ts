import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';


@Component({
  selector: 'app-confirm-deactivation',
  templateUrl: './confirm-deactivation.component.html',
  styleUrls: ['./confirm-deactivation.component.scss']
})
export class ConfirmDeactivationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeactivationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDeactivate(): void {
    // this.tourService.deactivateTourById(this.data.id);
  }

}
