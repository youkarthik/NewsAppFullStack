import { TestBed } from '@angular/core/testing';
import { NewsService } from './newsservice';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('NewsService', () => {
    let service: NewsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NewsService, HttpClient, HttpHandler]
        });
        service = TestBed.get(NewsService);
    });

    it('can load instance', () => {
        expect(service).toBeTruthy();
    });

});
