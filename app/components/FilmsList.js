import React from 'react';
import FilmsListActions  from '../actions/FilmsListActions';
import FilmsListStore    from '../stores/FilmsListStore';

export default class FilmsList extends React.Component {
    constructor(props){
        super(props);
        this.state = FilmsListStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        FilmsListStore.listen(this.onChange);
        FilmsListActions.getAllFilms();
    }
    componentWillUnmount() {
        FilmsListStore.unlisten(this.onChange);
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
                        <a className="header" href={'/films/'+item.episode_id}>{item.title}</a>
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