import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatTableDataSource  ,MatPaginator, MatSort} from '@angular/material';
import { Subscription } from 'rxjs';
import { first} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';



export interface PeriodicElement {
    id:number;
    firstname: string,
    lastname:  string,
    email:string,
    action:string;
  }

@Component({ templateUrl: 'home.component.html',
styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    Fetchdata:any = [];
    displayedColumns: string[] = ['id','firstname', 'lastname', 'email'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private http:HttpClient,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
      }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
        
    }
    fetchData(){
        // this.userService.fetchData().subscribe(data => {
        //     this.Fetchdata = data;
        //     console.log(this.Fetchdata);
        // });
        this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
                 this.Fetchdata = data;
                 this.formatUserData(data);
             });
    }
    formatUserData(users) {
  
        let userData = [];
        if(users){
          for (let i = 0; i < users.length; i++) {
            let tableData: PeriodicElement = {
              id:(i+1),
              firstname: users[i].firstName,
              lastname:  users[i].lastName,
              email: users[i].email,
              action: users[i].id,
            };
            userData.push(tableData);
          }
          this.dataSource.data = userData;
        }
      }
}