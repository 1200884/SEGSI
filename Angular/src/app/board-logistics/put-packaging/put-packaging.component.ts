import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packaging } from 'src/app/_models/Packaging';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-put-packaging',
  templateUrl: './put-packaging.component.html',
  styleUrls: ['./put-packaging.component.css']
})
export class PutPackagingComponent implements OnInit {
  content?: string;
  packaging: Packaging | undefined;
  error = false;

  constructor(private logisticsService: LogisticsService,
  private route: ActivatedRoute,
  private location: Location) { }

  ngOnInit(): void {
    this.getPackaging();
  }

  getPackaging(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.logisticsService.getPackaging(id)
      .subscribe (packaging => this.packaging = packaging);
      console.log(this.packaging);
  }

  goBack(): void {
    this.location.back();
  }

  Save(): void {
    if(this.packaging){
      this.logisticsService.putPackaging(this.packaging).subscribe(() => this.goBack());
    }
  }

}