import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class SelectDialogComponent implements OnInit {

  name = new FormControl('');
  title: string;
  constructor(public dialogRef: MatDialogRef<SelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toasterService: ToasterService
  ) { }

  
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data != null) {
      this.title = this.data.title;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmAdd(): void {
    const name = this.name.value;
    this.toasterService.addSelectDropdown(name);
  }

}
