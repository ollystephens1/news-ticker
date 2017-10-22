import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class NewsService {

  url:string = 'https://newsapi.org/v1/articles';
  apiKey:string = '9d10c7a2f58c474c9600538413e84222';
  sourceId:string = 'bbc-news';
  sortBy:string = 'top';

  constructor(private http: Http) {}

  getArticles(id?: string): Observable<any> {
    const options = this._getOptions(id);
    return this.http.get(this.url, options)
      .map((response) => response.json());
  }

  getSources(): Observable<any> {
     return this.http.get('assets/resources/sources.json')
       .map(result => result.json());
  }

  _getOptions(id?: string): RequestOptions {
    if (id) {
      this.sourceId = id;
    }

    return new RequestOptions({
      search: new URLSearchParams(`apiKey=${this.apiKey}&source=${this.sourceId}&sortBy=${this.sortBy}`)
    });
  }

}