import * as _ from 'lodash';
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

  start = true;
  ready = true;
  articles: IArticle[] = [];
  sources: Observable<ISource[]>;
  selectedSources: string[] = [];
  categories: object[] = [{ id: '', name: 'All news' }];
  categoryId: string = '';

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
        this.start = true;
      }, err => {
        console.log(err);
      });
  }

  _getSources(): void {
    this.sources = this.newsService.getSources(); 

    this.sources.subscribe((sources) => {
      let categories = _.uniq(sources.map(source => source.category));

      this.categories = this.categories.concat(_.map(categories, cat => {
        let name = cat.replace(/\-/g, ' ');
        return {id: cat, name: _.capitalize(name)};
      }));
    })
  }

  setSource(source): void {
    if (_.indexOf(this.selectedSources, source.id) < 0) {
      this._getArticles(source.id);
      this.selectedSources.push(source.id);
    } else {
      this.articles = this.articles.filter(article => article.sourceId !== source.id);
      _.pull(this.selectedSources, source.id);
    } 

    this.categoryId = undefined;
  }

  setCategory(id: string): void {
    this.categoryId = id;
  }

  isSourceSelected(id: string): boolean {
    return _.indexOf(this.selectedSources, id) > -1;
  }
}
