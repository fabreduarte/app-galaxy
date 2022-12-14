import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exoplanet } from 'src/app/models/exoplanets';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {

  public link: string = "https://exoplanetarchive.ipac.caltech.edu/overview/";

  constructor(@Inject(MAT_DIALOG_DATA) public exoplanet: Exoplanet) { 
    this.exoplanet = exoplanet;
  }

  ngOnInit(): void {
    this.redirectLink(this.exoplanet);
  }

  redirectLink(exoplanet: Exoplanet): void {
    let name = exoplanet.name;
    const nameArray = name.split('');
    for(let i =0; i < nameArray.length; i++) {
      if(nameArray[i] === " ") {
        nameArray[i] = "%20";
      }
    }
    name = nameArray.join("");
    this.link += name;    
  }

}
