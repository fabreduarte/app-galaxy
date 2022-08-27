import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Exoplanet } from 'src/app/models/exoplanets';
import { ExoplanetService } from 'src/app/services/exoplanet.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-exoplanets',
  templateUrl: './exoplanets.component.html',
  styleUrls: ['./exoplanets.component.scss']
})
export class ExoplanetsComponent implements OnInit {

  exoplanet: Exoplanet[] = [];
  
  displayedColumns: string[] = ['name', 'stars', 'moons', 'year', 'details'];
  dataSource = new MatTableDataSource<Exoplanet>(this.exoplanet);

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;


  constructor(private service: ExoplanetService, private dialog: MatDialog) { 
    this.service = service;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.intializeTable();
  }

  intializeTable(): void {
    this.service.findAll().subscribe(exoplanets => {
      this.exoplanet = exoplanets;
      this.dataSource = new MatTableDataSource<Exoplanet>(this.exoplanet);
      this.dataSource.paginator = this.paginator;
    })

  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDetailsDialog(exoplanet: Exoplanet): void {
    this.dialog.open(DetailsDialogComponent, { data: exoplanet, width: "400px" });
  }



}
