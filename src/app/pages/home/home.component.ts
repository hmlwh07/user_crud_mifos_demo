import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  languages: any[] = [
    {value: '0', viewValue: 'Myanmar'},
    {value: '1', viewValue: 'English'},
  ];

  selectedValue: any = this.languages[1];

  languageForm: FormGroup = new FormGroup({
    language: new FormControl('0'),
  });

  constructor(private router: Router) {
  }

}
