import {Component, OnInit} from '@angular/core';
import {APIService} from '../../../shared/shared-services/graphql.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/shared-classes/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private api: APIService, private httpClient: HttpClient) {
    this.httpClient
      .get('assets/json/users.json')
      .subscribe((data: { items: [] } | null) => {
        const users = data.items.map((item: any) => {
          return new User({
            ...item,
            profile: {
              id: item.id,
              mobile: 12345,
              zipcode: item.id + 39500,
              city: 'surat',
            }
          });
        });
        console.table(users);
      });
  }

  ngOnInit(): void {
  }

}
