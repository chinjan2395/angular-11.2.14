import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
// import {DataLayerService} from '../../services/data-layer.service';
import {SharedAnimations} from '../../shared-animations/shared-animations';
import {SearchService} from '../../shared-services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [SharedAnimations]
})
export class SearchComponent implements OnInit {
  page = 1;
  pageSize = 6;

  results$: Observable<any[]>;
  searchCtrl: FormControl = new FormControl('');

  constructor(
    // private dl: DataLayerService,
    public searchService: SearchService
  ) {
  }

  ngOnInit(): void {

    /*this.results$ = combineLatest(
        this.dl.getProducts(),
        this.searchCtrl.valueChanges
            .pipe(startWith(''), debounceTime(200))
    )
        .pipe(map(([products, searchTerm]) => {
            return products.filter(p => {
                return p.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });
        }));*/
  }

}
