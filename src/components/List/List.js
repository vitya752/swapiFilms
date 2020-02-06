import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import SwapiService from '../../services/SwapiService';
import './List.css';

export default class List extends Component {

    swapiService = new SwapiService();

    state = {
        loading: true,
        list: []
    }

    componentDidMount() {
        this.swapiService.getAllFilms()
            .then((data) => {
                this.setState({
                    list: data.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1),
                    loading: false
                });
            });
    }

    onFilter = (list) => {
        const {search} = this.props;
        if(search === '') return list;
        return list.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) !== false );
    }

    render() {
        const {selectHandler} = this.props;
        const {list, loading} = this.state;
        const filteredList = this.onFilter(list);
        const renderList = filteredList.length > 0 ? filteredList.map((item, idx) => {
            return (
                <li 
                    key={idx}
                    className="list-group-item"
                    onClick={() => selectHandler(item.id)}>
                    {item.title}
                </li>
            )
        }) : <span>Ничего нету</span>;
        const renderContent = loading ? <Loader /> : renderList;

        return (
            <div className="card items-list">
                <ul className="list-group list-group-flush">
                    { renderContent }
                </ul>
            </div>
        )
    }
}