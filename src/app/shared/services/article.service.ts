import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { GetArticleResponseInterface } from '../types/get-article-response.interface'
import { environment } from '../../../environments/environment'
import { ArticleInterface } from '../types/article.interface'

@Injectable()

export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http.get<GetArticleResponseInterface>(fullUrl)
      .pipe(map((response: GetArticleResponseInterface) => response.article))
  }
}
