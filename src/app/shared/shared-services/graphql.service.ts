/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateUsers: OnCreateUsersSubscription;
  onUpdateUsers: OnUpdateUsersSubscription;
  onDeleteUsers: OnDeleteUsersSubscription;
};

export type CreateUsersInput = {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type Users = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type UpdateUsersInput = {
  id: string;
  name: string;
  email?: string | null;
  password?: string | null;
  username?: string | null;
  create_at?: number | null;
};

export type DeleteUsersInput = {
  id: string;
  name: string;
};

export type Todo = {
  __typename: "Todo";
  id: string;
  name?: string | null;
  description?: string | null;
  priority?: number | null;
};

export type TableUsersFilterInput = {
  id?: TableIDFilterInput | null;
  name?: TableStringFilterInput | null;
  email?: TableStringFilterInput | null;
  password?: TableStringFilterInput | null;
  username?: TableStringFilterInput | null;
  create_at?: TableIntFilterInput | null;
};

export type TableIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type TableStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type TableIntFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type UsersConnection = {
  __typename: "UsersConnection";
  items?: Array<Users | null> | null;
  nextToken?: string | null;
};

export type CreateUsersMutation = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type UpdateUsersMutation = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type DeleteUsersMutation = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type GetTodosQuery = {
  __typename: "Todo";
  id: string;
  name?: string | null;
  description?: string | null;
  priority?: number | null;
};

export type GetUsersQuery = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type ListUsersQuery = {
  __typename: "UsersConnection";
  items?: Array<{
    __typename: "Users";
    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    create_at?: number | null;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateUsersSubscription = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type OnUpdateUsersSubscription = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

export type OnDeleteUsersSubscription = {
  __typename: "Users";
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  create_at?: number | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUsers(input: CreateUsersInput): Promise<CreateUsersMutation> {
    const statement = `mutation CreateUsers($input: CreateUsersInput!) {
        createUsers(input: $input) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUsersMutation>response.data.createUsers;
  }
  async UpdateUsers(input: UpdateUsersInput): Promise<UpdateUsersMutation> {
    const statement = `mutation UpdateUsers($input: UpdateUsersInput!) {
        updateUsers(input: $input) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUsersMutation>response.data.updateUsers;
  }
  async DeleteUsers(input: DeleteUsersInput): Promise<DeleteUsersMutation> {
    const statement = `mutation DeleteUsers($input: DeleteUsersInput!) {
        deleteUsers(input: $input) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUsersMutation>response.data.deleteUsers;
  }
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
    return <Array<GetTodosQuery>>response.data.getTodos;
  }
  async GetUsers(id: string, name: string): Promise<GetUsersQuery> {
    const statement = `query GetUsers($id: ID!, $name: String!) {
        getUsers(id: $id, name: $name) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
      name
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUsersQuery>response.data.getUsers;
  }
  async ListUsers(
    filter?: TableUsersFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: TableUsersFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            email
            password
            username
            create_at
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  OnCreateUsersListener(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    username?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUsers">>
  > {
    const statement = `subscription OnCreateUsers($id: ID, $name: String, $email: String, $password: String, $username: String) {
        onCreateUsers(id: $id, name: $name, email: $email, password: $password, username: $username) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (name) {
      gqlAPIServiceArguments.name = name;
    }
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    if (username) {
      gqlAPIServiceArguments.username = username;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUsers">>
    >;
  }

  OnUpdateUsersListener(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    username?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUsers">>
  > {
    const statement = `subscription OnUpdateUsers($id: ID, $name: String, $email: String, $password: String, $username: String) {
        onUpdateUsers(id: $id, name: $name, email: $email, password: $password, username: $username) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (name) {
      gqlAPIServiceArguments.name = name;
    }
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    if (username) {
      gqlAPIServiceArguments.username = username;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUsers">>
    >;
  }

  OnDeleteUsersListener(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    username?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUsers">>
  > {
    const statement = `subscription OnDeleteUsers($id: ID, $name: String, $email: String, $password: String, $username: String) {
        onDeleteUsers(id: $id, name: $name, email: $email, password: $password, username: $username) {
          __typename
          id
          name
          email
          password
          username
          create_at
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (name) {
      gqlAPIServiceArguments.name = name;
    }
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    if (username) {
      gqlAPIServiceArguments.username = username;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUsers">>
    >;
  }
}
