import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceError } from '../../../shared/models/experience-error';

@Component({
  selector: 'app-unique-entry-dailog',
  templateUrl: './unique-entry-dailog.component.html',
  styleUrls: ['./unique-entry-dailog.component.scss']
})
export class UniqueEntryDailogComponent implements OnInit {

  title: string;
  exceptionExp = new ExperienceError();
  errorMessage: string;
  constructor(public dialogRef: MatDialogRef<UniqueEntryDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data != null) {
      this.errorMessage = this.data.errorData;
      this.title = this.data.title;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {

  }

}
