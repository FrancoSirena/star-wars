import React from 'react';
import FilmsListActions  from '../actions/FilmsListActions';
import FilmsListStore    from '../stores/FilmsListStore';
import {Card, Icon, Image, Container} from 'semantic-ui-react';

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
                let arr = item.url.split('/');
                let index = arr.length;
                return(
                <Card key={item.episode_id}>
                    <Image src={"/imgs/film_cover_"+item.episode_id+".jpg"} />
                    <Card.Content>
                        <a className="header" href={'/films/'+arr[index-2]}>{item.title}</a>
                        <Card.Meta>
                            <span className="date">{item.release_date}</span>
                        </Card.Meta>
                        <Card.Description>
                            {item.opening_crawl}
                        </Card.Description>
                    </Card.Content>
                </Card>);
            });
        return (
        <Container>
            <div className="ui segment" style={loadingStyle}>
                <div className="ui active dimmer">
                    <div className="ui small text loader">Loading</div>
                </div>
                <p></p>
                <p></p>
            </div>
            <Card.Group>
                {filmsList}
            </Card.Group>
        </Container>
        );
    }
}