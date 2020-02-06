import React from 'react';

const Search = ({search, searchChange}) => {
    return (
        <div className="input-group">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search"
                value={search}
                onChange={searchChange} />
        </div>
    )
};

export default Search;