import React from 'react';
import HomeActions  from '../actions/HomeActions';
import HomeStore    from '../stores/HomeStore';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        HomeStore.listen(this.onChange);
        HomeActions.getAllFilms();
    }
    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }
    onChange(state){
        this.setState(state);
    }
    render() {
        let loadingStyle = { visibility:  this.state.isLoading ? 'visible' : 'hidden' };
        let filmsList = this.state.films.map((item,idx) => {
                return(
                <div key={item.episode_id} className="ui card">
                    <div className="image">
                        <img src={"/imgs/film_cover_"+item.episode_id+".jpg"} />
                    </div>
                    <div className="content">
                        <a className="header">{item.title}</a>
                        <div className="meta">
                            <span className="date">{item.release_date}</span>
                        </div>
                        <div className="description">
                            {item.opening_crawl}
                        </div>
                    </div>
                </div>);
            });
        return (
        <div className='container'>
            <div className="ui segment" style={loadingStyle}>
                <div className="ui active dimmer">
                    <div className="ui small text loader">Loading</div>
                </div>
                <p></p>
                <p></p>
            </div>
            <div className='ui link cards'>
                {filmsList}
            </div>
        </div>
        );
    }
}