import _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';

import { IArticle } from './interfaces/article.interface';
import { ISource } from './interfaces/source.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ready:       boolean = false;
  articles:    IArticle[] = [];
  sources:     Observable<ISource[]>;
  selectedSources: string[] = ['bbc-news'];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this._getSources();
  }

  _getArticles(id?: string) {
    this.ready = false;
    this.newsService.getArticles(id)
      .subscribe((articles: IArticle[]) => {
        this.articles = articles.concat(this.articles);
        this.ready = true;
      }, err => {
        alert(err);
      });
  }

  _getSources(): void {
    this.sources = this.newsService.getSources()
      .do(() => this._getArticles('bbc-news')); 
  }

  setSource(source): void {
    if (_.indexOf(this.selectedSources, source.id) < 0) {
      this._getArticles(source.id);
      this.selectedSources.push(source.id);
    } else {
      this.articles = this.articles.filter(article => article.sourceId !== source.id);
      _.pull(this.selectedSources, source.id);
    } 
  }

  isSourceSelected(id: string): boolean {
    return _.indexOf(this.selectedSources, id) > -1;
  }
}
