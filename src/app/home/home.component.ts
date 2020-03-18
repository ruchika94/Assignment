import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource  ,MatPaginator, MatSort} from '@angular/material';
import { Subscription } from 'rxjs';
import { first} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { } from "googlemaps";



export interface PeriodicElement {
    id:number;
    firstname: string,
    lastname:  string,
    email:string,
    city: string,
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
    
    displayedColumns: string[] = ['id','firstname', 'lastname', 'email', 'city'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
   }
   marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });
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
        this.mapInitializer();
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
              city: users[i].city,
              action: users[i].id,
            };
            userData.push(tableData);
          }
          this.dataSource.data = userData;
        }
      }
}