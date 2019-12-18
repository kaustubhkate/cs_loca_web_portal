
import {delay} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Observable ,  of } from 'rxjs';

import { LoaderDialogComponent } from '../../admin/dialog/loader-dialog/loader-dialog.component';

@Injectable()
export class ToasterService {

  dialogData: any;
  loaderText: string = 'Please wait';
  loadingTime: number = 1000;
  constructor(private snackBar: MatSnackBar, private dialog:MatDialog) { }

  getDialogData() {
    return this.dialogData;
  }

  showToaster(message: string, action: string, duration:number):void{
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openSuccessSnackBar(message: string,action: string, duration:number) {
    this.snackBar.open(message, action, {
      panelClass: ['mat--success'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: duration
    });
  }

  openErrorSnackBar(message: string,action: string, duration:number) {
    this.snackBar.open(message, action, {
      panelClass: ['mat--errors'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: duration
    });
  }

  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getHeroes(): Observable<Hero[]> {
    return of(heroes).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateHero(hero: Hero): Observable<Hero>  {
    const oldHero = heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(oldHero, hero); // Demo: mutate cached hero
    return of(newHero).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  addSelectDropdown(name:string){
    this.dialogData = name;
  }

  showLoader(): void {
    let dialogRef = this.dialog.open(LoaderDialogComponent, {
      width: '200px',
      height: '200px',
      data: { loaderText: this.loaderText, loadingTime: this.loadingTime },
      disableClose: true
    });

    dialogRef.afterOpen().subscribe(result => {
      setTimeout(() => dialogRef.close(), this.loadingTime);
    });
  }
}

export class Hero {
  id = 0;
  name = '';
  addresses: Address[];
}

export class Address {
  street = '';
  city   = '';
  state  = '';
  zip    = '';
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Whirlwind',
    addresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ]
  },
  {
    id: 2,
    name: 'Bombastic',
    addresses: [
      {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
    ]
  },
  {
    id: 3,
    name: 'Magneta',
    addresses: [ ]
  },
];

export const states = ['CA', 'MD', 'OH', 'VA'];


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
