import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state
  icon?: string,      // Item icon name
  tooltip?: string,   // Tooltip text 
  disabled?: boolean, // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]  // Dropdown items
}

interface IChildItem {
  name: string,       // Display text
  state: string       // Router state
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  separatorMenu:IMenuItem[] = [
    {
      name: 'Main Screen',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard'
    },
    {
      name: 'User Management',
      type: 'dropDown',
      tooltip: 'User Management',
      icon: 'person',
      state: '',
      sub: [
        {name: 'Role Management', state: 'role'},
        {name: 'Role Permission Mapping', state: 'rolepermissionmap'},
        {name: 'User Management', state: 'user'}
      ]
    },
    {
      name: 'Master Entries',
      type: 'dropDown',
      tooltip: 'Master Entries',
      icon: 'view_list',
      state: '',
      sub: [
     
        {name: 'Manage Student', state: 'students'},
        {name: 'Manage Staff', state: 'staff'},
        {name: 'Event Venue', state: 'venues'},
        {name: 'Event Category', state: 'eventcategory'},
        {name: 'Tour Category', state: 'tourcategory'},
        {name: 'Manage Teacher', state: 'teacher'},
        {name: 'Manage Tasks', state: 'tasks'},
        {name: 'Manage Templates', state: 'event-template'},
        {name: 'Capabilities', state: 'staff-capabilities'},
        {name: 'Clinic Information', state: 'clinicinfo'},
        {name: 'Manage Presenter', state: 'presenter'},
        {name: 'Inventory', state: 'inventory'},
        {name: 'Geofencing', state: 'geofencing'},
        {name: 'Manage Allergy', state: 'allergy'},
        {name: 'Manage Sickness Info', state: 'sicknessinfo'},
      ]
    },
    {
      name: 'Tour Management',
      type: 'dropDown',
      tooltip: 'Tour Management',
      icon: 'card_travel',
      state: '',
      sub: [
        {name: 'Manage Activity', state: 'activity'},
        {name: 'Manage Event', state: 'events'},
        {name: 'Manage Tour', state: 'tour'}
      ]
    },
    {
      name: 'MP Enrollment',
      type: 'dropDown',
      tooltip: 'MP Enrollment',
      icon: 'account_box',
      state: '',
      sub: [
        // {name: 'Catering Enrollment', state: 'catererenrolment'},
        {name: 'Homestay Enrollment', state: 'homestayenrolment'},
        // {name: 'Transportation Enrollment', state: 'transportationenrolment'},
        // {name: 'Insurance Enrollment', state: 'insuranceenrolment'},
      ]
    },
    {
      name: 'Vendor Management',
      type: 'dropDown',
      tooltip: 'Vendor Management',
      icon: 'account_box',
      state: '',
      sub: [
        {name: 'Vendor Category', state: 'vendorcategory'},
        {name: 'Manage Vendor', state: 'vendor'}
      ]
    }
  ]

  iconTypeMenuTitle:string = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.separatorMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  staffMenu:IMenuItem[] = [
    {
      name: 'Main Screen',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'staff-home'
    },
    {
      name: 'Calendar',
      type: 'link',
      tooltip: 'Calendar',
      icon: 'today',
      state: 'staff-calender'
    },
    {
      name: 'Availability',
      type: 'link',
      tooltip: 'Availability',
      icon: 'today',
      state: 'staff-availableon'
    },
    {
      name: 'Tours',
      type: 'link',
      tooltip: 'Tours',
      icon: 'train',
      state: 'staff-tours'
    },
    {
      name: 'Events',
      type: 'link',
      tooltip: 'Events',
      icon: 'watch',
      state: 'staff-events'
    },
    {
      name: 'Homestay',
      type: 'link',
      tooltip: 'Homestay',
      icon: 'home',
      state: 'staff-homestay'
    }
  ]

  // sets iconMenu as default;
  staffMenuItems = new BehaviorSubject<IMenuItem[]>(this.staffMenu);
  // navigation component has subscribed to this Observable
  staffMenuItems$ = this.staffMenuItems.asObservable();

}
