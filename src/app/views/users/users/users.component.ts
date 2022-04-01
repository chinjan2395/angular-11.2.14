import {Component, OnInit} from '@angular/core';
import {APIService} from '../../../shared/shared-services/graphql.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private api: APIService) {
    /*this.api
      .ListUsers()
      .then((list) => console.log('list users!', list))
      .catch((e) => console.log('error listing users...', e));*/
  }

  ngOnInit(): void {
  }

}
