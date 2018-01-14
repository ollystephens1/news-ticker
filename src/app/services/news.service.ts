import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { IArticle } from '../interfaces/article.interface';
import { ISource } from '../interfaces/source.interface';
import 'rxjs/add/operator/map';


@Injectable()
export class NewsService {

  url:string =       'https://newsapi.org/v1/articles';
  apiKey:string =   '9d10c7a2f58c474c9600538413e84222';
  sourceId:string;
  sortBy:string = 'top';

  private articles: IArticle[];
  private sources: ISource[];


  constructor(private http: Http) {}

  getArticles(id?: string): Observable<IArticle[]> {
    const options = this._getOptions(id);

    return this.http.get(this.url, options)
      .map((res: Response) => {
        const response = res.json();

        this.articles = _.map(response.articles, article => {
          article.sourceId = id;
          return article;
        });

        return this.articles;
      })
      .catch(this.handleError);
  }

  getSources(): Observable<ISource[]> {
    return this.http.get('assets/resources/sources.json')
      .map(result => { 
        this.sources = result.json();
        return this.sources;
      });
  }

  _getOptions(id?: string): RequestOptions {
    if (id) {
      this.sourceId = id;
    }

    return new RequestOptions({
      search: new URLSearchParams(`apiKey=${this.apiKey}&source=${this.sourceId}&sortBy=${this.sortBy}`)
    });
  }

  private handleError(error: any) {
    return Observable.throw(error.json().error || `Couldn't get news`);
  }
}