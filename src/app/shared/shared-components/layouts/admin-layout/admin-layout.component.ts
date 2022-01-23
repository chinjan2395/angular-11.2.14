import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../shared-services/navigation.service';
import {SearchService} from '../../../shared-services/search.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public navService: NavigationService, public searchService: SearchService) {
  }

  ngOnInit(): void {
  }

}
