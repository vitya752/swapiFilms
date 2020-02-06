import React, { Component } from 'react';
import SwapiService from '../../services/SwapiService';
import Loader from '../Loader/Loader';
import './Details.css';

export default class Details extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        loading: false
    }

    componentDidUpdate(prevProps) {
        const {id} = this.props;
        if(id !== prevProps.id) {
            this.swapiService.getFilm(id)
                .then(this.setState({
                    loading: true
                }))
                .then(item => {
                    this.setState({
                        item,
                        loading: false
                    });
                });
        }
    }

    render() {
        const {item, loading} = this.state;
        const renderDetails = loading ? <Loader /> : !item ? <span>Select the item</span>
            : (
                <>
                    <h5 className="card-title">{item.title}</h5>
                    <p>Relised: {item.relised}</p>
                    <span>Description:</span>
                    <p>{item.description}</p>
                    <span>Starships in film</span>
                    <ul className="list-group list-group-flush list-group-custom">
                        {item.starships.map((item, idx) => {
                            return <li className="list-group-item" key={`starship-${idx}`}>{item}</li>
                        })}
                    </ul>
                    <span>Planets in film</span>
                    <ul className="list-group list-group-flush list-group-custom">
                        {item.planets.map((item, idx) => {
                            return <li className="list-group-item" key={`planet-${idx}`}>{item}</li>
                        })}
                    </ul>
                </>                
            );
        return (
            <div id="item-details" className="card item-details">
                <div className="card-body">
                    { renderDetails }
                </div>
            </div>
        )
    }
}