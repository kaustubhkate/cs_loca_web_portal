import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {


  @Input('email') email: string;
  successMessage:string = 'Error Message';

  constructor() { }

  ngOnInit() {
  }

}
