import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { User } from '@app/core/models/user.model';
import { UserService } from '@app/core/services/user.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-user-ist',
  templateUrl: './user-ist.component.html',
  styleUrls: ['./user-ist.component.scss'],
  encapsulation : ViewEncapsulation.Emulated,
})
export class UserIstComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | any;
  usersList: User[] = [];
  showPopup: boolean = false;
  submitted = false;
  isEdit: boolean = false;
  show: boolean = false;
  user: User = { _id: '', name: '', email: '', age: '' };
  yourTimeDate = new Date('08/12/2023 15:37:34');
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers('');
    // Create separate observables for name searches
    const nameSearch$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    );
    nameSearch$.subscribe((name: string) => {
      this.fetchUsers(name);
    });
  }

  addUser() {
    this.showPopup = true;
  }

  onCancel() {
    this.showPopup = false;
    this.submitted = false;
    this.resetUser();
  }

  resetUser(): void {
    this.user = { _id: '', name: '', email: '', age: '' };
  }

  validateForm(): boolean {
    return (
      this.user.name.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.age !== ''
    );
  }

  addNewUser() {
    if (this.validateForm()) {
      if (this.isEdit) {
        this.updateUser();
      }
      if (!this.isEdit) {
        this.userService.createUser(this.user).subscribe(
          (response: any) => {
            // Handle the response data here
            this.resetUser();
            this.showPopup = false;
            this.submitted = true;
            this.fetchUsers('');
          },
          (error) => {
            // Handle errors if any
            console.error('Error:', error);
          }
        );
      }
    } else {
      this.submitted = true;
    }
  }

  editUser(user: User) {
    this.isEdit = true;
    this.showPopup = true;
    this.user._id = user._id;
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.age = user.age;
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      (response: any) => {
        this.resetUser();
        this.showPopup = false;
        this.isEdit = false;
        this.submitted = true;
        this.fetchUsers('');
      },
      (error) => {
        // Handle errors if any
        console.error('Error:', error);
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (response: any) => {
        this.fetchUsers('');
      },
      (error) => {
        // Handle errors if any
        console.error('Error:', error);
      }
    );
  }

  fetchUsers(name: string) {
    this.userService.getUsers(name).subscribe(
      (userData: User[] | [] | null) => {
        // Handle the response data here
        if (userData) {
          if (Array.isArray(userData)) {
            this.usersList = userData; // Assuming the API returns an array of users
          } else {
            console.log('Invalid user data format.');
          }
        } else {
          console.log('No user data received.');
        }
      },
      (error) => {
        // Handle errors if any
        console.error('Error:', error);
      }
    );
  }
}

