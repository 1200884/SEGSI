import { Component, OnInit } from '@angular/core';
import { Packaging } from 'src/app/_models/Packaging';
import { LogisticsService } from 'src/app/_services/logistics.service';
// packagings packaging  Packaging Packagings
@Component({
  selector: 'app-get-packagings',
  templateUrl: './get-packagings.component.html',
  styleUrls: ['./get-packagings.component.css']
})
export class GetPackagingsComponent implements OnInit {

  packagings: Packaging[] = [];
  content ?: string;

  constructor(private logisticsService: LogisticsService) { }

  ngOnInit(): void {
    this.getPackagings();
  }

  getPackagings(): void {
    this.logisticsService.getPackagings().subscribe(
      data=> {
        this.packagings = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
