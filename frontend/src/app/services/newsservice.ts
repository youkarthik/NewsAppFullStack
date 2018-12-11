import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, retry } from 'rxjs/operators'
import { News } from "../models/news";
import { Injectable } from "@angular/core";

@Injectable()
export class NewsService {
    newsApiEndPoint: string = environment.newsApiEndpoint;

    constructor(private http: HttpClient) { 

    }

    getTopHeadlines() : Observable<Array<News>>
    {
        const endpoint = this.newsApiEndPoint + "GetTopHeadlines";
        return this.http.get<News[]>(endpoint).pipe(retry(3));
    }

    getCategoryTopHeadlines(category: string) : Observable<Array<News>>
    {
        const endpoint = this.newsApiEndPoint + "GetTopHeadlines/" + category;
        return this.http.get<News[]>(endpoint).pipe(retry(3));
    }

    getNewsForSearchText(searchText: string) : Observable<Array<News>>
    {
        const endpoint = this.newsApiEndPoint + "SearchNews/" + searchText;
        return this.http.get<News[]>(endpoint).pipe(retry(3));
    }

    


}