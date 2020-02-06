import React, { useState } from 'react';
import List from '../List/List';
import Details from '../Details/Details';
import Search from '../Search/Search';

const App = () => {

    const [selectedId, setSelecterId] = useState();
    const [search, setSearch] = useState('');

    const selectHandler = (id) => {
        if(id === selectedId) return;
        setSelecterId(id);
    }

    const searchChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="container pt-3">
            <h1>Swapi Films App</h1>
            <Search search={search} searchChange={searchChange} />
            <div className="row pt-3">
                <div className="col-12 col-md-6 mb-3">
                    <List selectHandler={selectHandler} search={search} />
                </div>
                <div className="col-12 col-md-6">
                    <Details id={selectedId} />
                </div>
            </div>
        </div>
    )
};

export default App;