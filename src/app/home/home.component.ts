import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

    api: string = 'https://www.reddit.com/r';
    url: string = 'watches';
    items: object = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getFeed();
    }

    /**
     * Validation and run the http request
     */
    getFeed() {

        if (this.url === null)
            return;

        this.http.get(`${this.api}/${this.url}.json`)
            .subscribe(this.processData.bind(this));

    }

    /**
     * Process the returned object
     */
    processData(feedData: any) {

        if (!feedData || !feedData.data)
            return;

        this.items = feedData.data.children
            .map(post => post.data.url)
            .filter(url => /jpg?$/.exec(url));

    }

}
