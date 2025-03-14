import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/dto/user.model';
import { UserApiService } from 'src/app/service/user.api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: User[] = [];
  totalUsers: number = 0;
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);
  private userSubscription: Subscription | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private userApiService: UserApiService, private _snackBar: MatSnackBar, private userService: UserService, private cdf: ChangeDetectorRef) {}

  ngOnInit() {
    const id = history.state.id;
    console.log(id);
    if(id) {
      this.loadUsers(id);
    } else {
      this.loadUsers();
    }
  }

  ngAfterViewInit() {
    // Set up sort and paginator once
    if (this.sort && this.paginator) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  loadUsers(id?: number) {

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
    }

    if (id) {
        this.userSubscription = this.userService.user$.subscribe((users) => {
        console.log('users with id', users);
        this.users = users;
        this.dataSource.data = this.users; // Update data property instead of creating new instance
        this.totalUsers = this.users.length;
      });
    } else {
      this.userApiService.getUsers().subscribe({
        next: (data) => {
          this.userService.getUsers(data);

          // Just subscribe once and update the existing dataSource
          this.userSubscription = this.userService.user$.subscribe((users) => {
            this.users = users;
            this.dataSource.data = this.users; // Update data property instead of creating new instance
            this.totalUsers = this.users.length;
          });
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(sortState.direction);
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onView(id: number) {
    this.router.navigate(['/user/user-form'],{
      state: {
        id: id,
        isCreateState: false,
        isView: true,
      }
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/user/user-form'],{
      state: {
        id: id,
        isCreateState: false,
        isView: false,
      }
    });
  }

  onDelete(id: number) {
    if(confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id)
      this.loadUsers(id);
    }
  }

  onAddUser() {
    this.router.navigate(['/user/user-form'],{
      state: {
        isCreateState: true,
        isView: false,
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
