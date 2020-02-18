import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule,MatSortModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule { }
