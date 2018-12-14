import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { retry, catchError } from 'rxjs/operators';
import { News } from '../models/news';
import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class NewsService {
    newsApiEndPoint: string = environment.newsApiEndpoint;

    constructor(private http: HttpClient) {

    }

    getTopHeadlines(): Observable<Array<News>> {
        const endpoint = this.newsApiEndPoint + 'GetTopHeadlines';
        return this.http.get<News[]>(endpoint).pipe(retry(3), catchError(this.handleError));
    }

    getCategoryTopHeadlines(category: string): Observable<Array<News>> {
        const endpoint = this.newsApiEndPoint + 'GetTopHeadlines/' + category;
        return this.http.get<News[]>(endpoint).pipe(retry(3), catchError(this.handleError));
    }

    getNewsForSearchText(searchText: string): Observable<Array<News>> {
        const endpoint = this.newsApiEndPoint + 'SearchNews/' + searchText;
        return this.http.get<News[]>(endpoint).pipe(retry(3), catchError(this.handleError));
    }

    // get favorite news service call to get news details from news rest api
    getFavoriteNews(): Observable<Array<News>> {
        return this.http.get<Array<News>>(this.newsApiEndPoint).pipe(retry(3), catchError(this.handleError));
    }

    addFavoriteNews(news: News): Observable<News> {
        return this.http.post<News>(this.newsApiEndPoint, news).pipe(catchError(this.handleError));
    }

    deleteFavoriteNews(id: number): Observable<{}> {
        const endpoint = `${this.newsApiEndPoint}${id}`;
        return this.http.delete(endpoint).pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.status);
        if (err.status === 404) {

            return new ErrorObservable(new Error('Error: Record Not Found. Please try again later'));
        } else if (err.status === 409) {

            return new ErrorObservable(new Error('Error: Record Already Exists. Please try again later'));
        }

        return new ErrorObservable(new Error('Something bad happened. Please try again later or contact administrator'));
    }
}
