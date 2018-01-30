import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

    api: string = 'https://www.reddit.com/r';
    url: string = 'funny';
    // url: string = 'watches';
    data: object[] = [];

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

        this.http.get(`${this.api}/${this.url}.json?limit=500?sort=top&t=week`)
            .subscribe(this.processData.bind(this));

    }

    /**
     * Process the returned object
     */
    processData(feedData: any) {

        if (!feedData || !feedData.data)
            return;

        feedData.data.children.forEach(post => {

            if (/gifv$/.exec(post.data.url) !== null)
                this.data.push({
                    type: 'gif', url: post.data.url.replace(/v$/, '')
                });

            else if (/jpg$|png$|jepg$/.exec(post.data.url) !== null)
                this.data.push({
                    type: 'image', url: post.data.url
                });

            else
                console.log('unprocessed', post.data.url);

        });

    }

}
