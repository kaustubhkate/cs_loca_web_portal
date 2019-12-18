import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {


  @Input('email') email: string;
  successMessage:string = 'Success Message';

  constructor() { }

  ngOnInit() {
  }

}
