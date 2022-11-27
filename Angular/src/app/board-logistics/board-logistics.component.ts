import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { LogisticsService } from '../_services/logistics.service';
import { Path } from '../_models/Path';
@Component({
  selector: 'app-board-logistics',
  templateUrl: './board-logistics.component.html',
  styleUrls: ['./board-logistics.component.css']
})
export class BoardLogisticsComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService ,private logisticsService: LogisticsService) { }

  ngOnInit(): void {
    this.userService.getLogisticsBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  getPaths(): void {
    this.logisticsService.getPaths().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  getSpecificPath(input: string): void {
    this.logisticsService.getSpecificPath(input).subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      })}
  postPath(input: string): void {
    this.logisticsService.postPath(input).subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      })}
  putPath(input: string): void {
    this.logisticsService.putPath(input).subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      })}
  patchPath(input: string): void {
    this.logisticsService.patchPath(input).subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }
}