import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UserApiService } from 'src/app/service/user.api.service';
import { Location } from '@angular/common';
import { User } from 'src/app/dto/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class UserCreateFormComponent {

  offices = [
    { value: '1', viewValue: 'Office 1' },
    { value: '2', viewValue: 'Office 2' },
    { value: '3', viewValue: 'Office 3' },
  ];

  people = [
    { value: '1', viewValue: 'Person 1' },
    { value: '2', viewValue: 'Person 2' },
    { value: '3', viewValue: 'Person 3' },
  ];

  genders = [
    { value: '1', viewValue: 'Male' },
    { value: '2', viewValue: 'Female' },
    { value: '3', viewValue: 'Other' },
  ];

  staffs = [
    { value: '1', viewValue: 'Staff 1' },
    { value: '2', viewValue: 'Staff 2' },
    { value: '3', viewValue: 'Staff 3' },
  ];

  clientTypes = [
    { value: '1', viewValue: 'Client 1' },
    { value: '2', viewValue: 'Client 2' },
    { value: '3', viewValue: 'Client 3' },
  ];

  familyForm: FormGroup = new FormGroup({
    address: new FormControl(''),
  });

  createForm!: FormGroup;

  startDate = new Date();

  isCreateState!: boolean;
  isView!: boolean;
  id: any;

  constructor(private userService: UserService, private location: Location, private _snackBar: MatSnackBar, private router: Router) {}

  onCheckboxChange($event: MatCheckboxChange) {
    console.log($event);
    this.createForm.patchValue({
      isStaff: $event.checked,
    });
  }

  ngOnInit() {
    this.loadForm();
    const state = history.state;
    if(state?.isCreateState) {
      this.isCreateState = true;
    } else {
      this.isCreateState = false;
    }
    if(state?.isView) {
      this.isView = true;
    } else {
      this.isView = false;
    }
    if(state?.id) {
      this.id = state.id;
      this.loadForm(this.id);
    }
  }

  loadForm(id?: number){
    this.createForm = new FormGroup({
      office: new FormControl(''),
      person: new FormControl(''),
      externalId: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl(''),
      gender: new FormControl(''),
      staff: new FormControl(''),
      isStaff: new FormControl(''),
      mobileNumber: new FormControl('', [Validators.required]),
      clientType: new FormControl(''),
    });

    if(id) {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.createForm.patchValue({
            externalId: user?.id,
            firstName: user?.name,
            middleName: user?.username,
            isStaff: true,
            mobileNumber: user?.phone,
            dob: new Date(),
            office: user?.id.toString()  ,
            person: user?.id.toString(),
            gender: user?.id.toString(),
            staff: user?.id.toString(),
            clientType: user?.id.toString(),
          });
        }
      })

    }
  }

  onSubmit(state: string) {
    console.log(this.createForm.value);
    if(this.createForm.valid){
      const user: User = {
        id: this.createForm.value.externalId,
        name: this.createForm.value.firstName + ' ' + this.createForm.value.middleName + ' ' + this.createForm.value.lastName,
        username: this.createForm.value.firstName,
        phone: this.createForm.value.mobileNumber
      }
      if(state === 'create'){
        this.onCreate(user);
      } else {
        this.onUpdate(user);
      }
    } else {
      this._snackBar.open('Please fill all the required fields!', 'Close')._dismissAfter(3000);
    }
  }

  onCreate(user: User) {
    this.userService.createUser(user).subscribe({
      next: () => {
        this._snackBar.open('User created successfully!', 'Close')._dismissAfter(3000);
        this.router.navigate(['/user/user-list'], {
          state: {
            id: user.id,
          },
          replaceUrl: false
        });
      }
    });
  }

  onUpdate(user: User) {
    this.userService.updateUser(user)
    this.router.navigate(['/user/user-list'], {
      state: {
        id: user.id,
      },
      replaceUrl: false
    });
  }

  onBack() {
    this.router.navigate(['/user/user-list'], {
      replaceUrl: true
    });
  }
}
