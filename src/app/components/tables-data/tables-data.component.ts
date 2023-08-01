import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {Dossier} from 'src/app/components/cards/dossier.Model';
@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css']
})
export class TablesDataComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Input()
  dossier!: Dossier;

}
