import './NewsPanel.css';
// import _ from 'lodash';

import React from 'react';

import NewsCard from '../NewsCard/NewsCard'

import Auth from '../Auth/Auth';

class NewsPanel extends React.Component {
    constructor() {
        super();
        this.state = { news: null };
        // this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        console.log('loading news....');

        this.loadMoreNews();
        // this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
        // window.addEventListener('scroll', this.handleScroll);
    }

    // handleScroll() {
    //     let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    //     if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
    //         console.log('Loading more news');
    //         this.loadMoreNews();
    //     }
    // }

    loadMoreNews() {

        fetch('http://localhost:3000/news', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Authorization': 'bearer ' + Auth.getToken()
            }
        })
            .then((res) => res.json())
            .then((news) => {
                this.setState({
                    news: this.state.news ? this.state.news.concat(news) : news,
                });
            });
    }

    renderNews() {
        let news_list = this.state.news.map(function (news, i) {
            return (
                // eslint-disable-next-line
                <a key={i} className='list-group-item' href='#'>
                    <NewsCard news={news} />
                </a>
            );
        });

        return (
            <div className="container-fluid">
                <div className='list-group'>
                    {news_list}
                </div>
            </div>
        );
    }

    render() {
        if (this.state.news) {
            return (
                <div>
                    {this.renderNews()}
                </div>
            );
        } else {
            return (
                <div>
                    <div id='msg-app-loading'>
                        Loading
          </div>
                </div>
            );
        }
    }
}

export default NewsPanel;
