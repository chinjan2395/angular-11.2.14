/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import {Injectable} from '@angular/core';
import API, {graphqlOperation} from '@aws-amplify/api-graphql';

export type Todo = {
  __typename: 'Todo';
  id: string;
  name?: string | null;
  description?: string | null;
  priority?: number | null;
};

export type GetTodosQuery = {
  __typename: 'Todo';
  id: string;
  name?: string | null;
  description?: string | null;
  priority?: number | null;
};

@Injectable({
  providedIn: 'root'
})
export class APIService {
  async GetTodos(): Promise<Array<GetTodosQuery>> {
    const statement = `query GetTodos {
        getTodos {
          __typename
          id
          name
          description
          priority
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<GetTodosQuery>> response.data.getTodos;
  }
}
