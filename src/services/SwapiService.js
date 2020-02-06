export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }

    getAllFilms = async () => {
        const data = await this.getResource('/films/');
        return data.results.map(this._transformFilm);
    }

    getFilm = async (id) => {
        const data = await this.getResource(`/films/${id}`);
        const transformPlanet =  this._transformFilm(data);
        const planetNames = await Promise.all(data.planets.map(item => this._getObjectName(item, 'planets')));
        const starshipNames = await Promise.all(data.starships.map(item => this._getObjectName(item, 'starships')));
        return {
            ...transformPlanet,
            planets: planetNames,
            starships: starshipNames
        }
    }

    _getObjectName = async (planetURL, objectsName) => {
        const id = this._getId(planetURL);
        const request = await this.getResource(`/${objectsName}/${id}`);
        return request.name;
    }

    _getId = (url) => {
        return url.match(/(\d+)/)[1];
    }

    _transformFilm = (film) => {
        return {
            id: this._getId(film.url),
            title: film.title,
            relised: film.release_date,
            description: film.opening_crawl,
            director: film.director,
            producer: film.producer,
            planets: film.planets,
            starships: film.starships
        }
    }

}