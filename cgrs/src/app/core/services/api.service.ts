/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//   Generated using Swaggie (https://github.com/yhnavein/swaggie)
//   Please avoid doing any manual changes in this file
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming
// deno-lint-ignore-file

import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

abstract class BaseService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : '';
  }

  protected $get<T>(url: string, options?: any): Observable<T> {
    return this.http
      .get<T>(this.baseUrl + url, options)
      .pipe((response: any) => response);
  }

  protected $getAll<T>(url: string, options?: any): Observable<T[]> {
    return this.http
      .get<T[]>(this.baseUrl + url, options)
      .pipe((response: any) => response);
  }

  protected $delete<T>(url: string, options?: any): Observable<T> {
    return this.http
      .delete(this.baseUrl + url, options)
      .pipe((response: any) => response);
  }

  protected $post(url: string, data: any, options?: any): Observable<any> {
    return this.http
      .post(this.baseUrl + url, data, options)
      .pipe((response: any) => response);
  }

  protected $patch<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http
      .patch(this.baseUrl + url, data, options)
      .pipe((response: any) => response);
  }

  protected $put(url: string, data: any, options?: any): Observable<any> {
    return this.http
      .put(this.baseUrl + url, data, options)
      .pipe((response: any) => response);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @param id
   * @return Success
   */
  deleteCategoriesId(id: string, config?: any): Observable<unknown> {
    let url = '/Categories/{id}?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$delete(url, config);
  }

  /**
   * @return Success
   */
  getCategories(config?: any): Observable<unknown> {
    let url = '/Categories?';

    return this.$get(url, config);
  }

  /**
   * @param id
   * @return Success
   */
  getCategoriesId(id: string, config?: any): Observable<unknown> {
    let url = '/Categories/{id}?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$get(url, config);
  }

  /**
   * @param id
   * @return Success
   */
  getCategoriesIdPopulated(id: string, config?: any): Observable<unknown> {
    let url = '/Categories/{id}/populated?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$get(url, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postCategories(
    body: CreateCategoryRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Categories?';

    return this.$post(url, body, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  putCategories(
    body: UpdateCategoryRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Categories?';

    return this.$put(url, body, config);
  }

  /**
   * @param id
   * @return Success
   */
  putCategoriesChangeStatusId(id: string, config?: any): Observable<unknown> {
    let url = '/Categories/change-status/{id}?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$put(url, null, config);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GamesService extends BaseService {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @param isActive (optional) (API name: IsActive)
   * @param categoryId (optional) (API name: CategoryId)
   * @return Success
   */
  getGames(
    isActive: boolean | null | undefined,
    categoryId: string | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Games?';
    if (isActive !== undefined) {
      url += 'IsActive=' + encodeURIComponent('' + isActive) + '&';
    }
    if (categoryId !== undefined) {
      url += 'CategoryId=' + encodeURIComponent('' + categoryId) + '&';
    }

    return this.$get(url, config);
  }

  /**
   * @param id
   * @return Success
   */
  getGamesId(id: string, config?: any): Observable<unknown> {
    let url = '/Games/{id}?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$get(url, config);
  }

  /**
   * @param id
   * @return Success
   */
  getGamesIdPopulated(id: string, config?: any): Observable<unknown> {
    let url = '/Games/{id}/populated?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$get(url, config);
  }

  /**
   * @return Success
   */
  getGamesPopulated(config?: any): Observable<unknown> {
    let url = '/Games/populated?';

    return this.$get(url, config);
  }

  /**
   * @return Success
   */
  getGamesRecommended(config?: any): Observable<unknown> {
    let url = '/Games/recommended?';

    return this.$get(url, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postGames(
    body: CreateGameRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Games?';

    return this.$post(url, body, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  putGames(
    body: UpdateGameRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Games?';

    return this.$put(url, body, config);
  }

  /**
   * @param id
   * @return Success
   */
  putGamesChangeStatusId(id: string, config?: any): Observable<unknown> {
    let url = '/Games/change-status/{id}?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$put(url, null, config);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GamesCommentsService extends BaseService {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @param id
   * @return Success
   */
  deleteGamesCommentsId(id: string, config?: any): Observable<unknown> {
    let url = '/GamesComments/{id}?';
    url = url.replace('{id}', encodeURIComponent('' + id));

    return this.$delete(url, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postGamesComments(
    body: CreateGameCommentRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/GamesComments?';

    return this.$post(url, body, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  putGamesComments(
    body: UpdateGameCommentRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/GamesComments?';

    return this.$put(url, body, config);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GamesMarksService extends BaseService {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postGamesMarks(
    body: CrateGameMarkRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/GamesMarks?';

    return this.$post(url, body, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  putGamesMarks(
    body: UpdateGameMarkRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/GamesMarks?';

    return this.$put(url, body, config);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TagsService extends BaseService {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postTags(
    body: CreateTagRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Tags?';

    return this.$post(url, body, config);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @return Success
   */
  getUsers(config?: any): Observable<unknown> {
    let url = '/Users?';

    return this.$get(url, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postUsersAuthenticate(
    body: UserAuthenticationRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Users/authenticate?';

    return this.$post(url, body, config);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  postUsersRegister(
    body: RegisterUserRequest | null | undefined,
    config?: any
  ): Observable<unknown> {
    let url = '/Users/register?';

    return this.$post(url, body, config);
  }
}

export interface CreateCategoryRequest {
  name?: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  id?: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CreateGameRequest {
  name?: string;
  description?: string;
  isAdultOnly?: boolean;
  categoryId?: string;
}

export interface UpdateGameRequest {
  id?: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  isAdultOnly?: boolean;
  categoryId?: string;
}

export interface CreateGameCommentRequest {
  message?: string;
  gameId?: string;
}

export interface UpdateGameCommentRequest {
  id?: string;
  message?: string;
  gameId?: string;
}

export interface CrateGameMarkRequest {
  averageScore?: number;
  gameId?: string;
}

export interface UpdateGameMarkRequest {
  id?: string;
  averageScore?: number;
  gameId?: string;
}

export interface CreateTagRequest {
  name?: string;
  description?: string;
}

export interface RegisterUserRequest {
  email?: string;
  nick?: string;
  birthDate?: Date;
  password?: string;
}

export interface UserAuthenticationRequest {
  email?: string;
  password?: string;
}