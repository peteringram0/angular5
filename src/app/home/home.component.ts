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
    data: object = [];

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

        this.http.get(`${this.api}/${this.url}.json?limit=100?sort=top&t=week`)
            .subscribe(this.processData.bind(this));

    }

    /**
     * Process the returned object
     */
    processData(feedData: any) {

        if (!feedData || !feedData.data)
            return;

        const items = feedData.data.children
            .map(post => post.data.url);

        const data = {
            gifs: items.filter(url => /gifv$/.exec(url))
                .map(url => {
                    return {
                        type: 'gif', url: url.replace(/v$/, '')
                    };
                }),
            images: items.filter(url => /jpg$|png$|jepg$/.exec(url))
                .map(url => {
                    return {type: 'image', url: url};
                })
        };

        this.data = data.gifs.concat(data.images);

        console.log(this.data);

    }

}
