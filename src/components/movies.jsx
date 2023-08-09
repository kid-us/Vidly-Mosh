import React, { Component } from 'react';
import { deleteMovie, getMovies } from '../services/fakeMoviesService';
import { getGenres } from '../services/fakeGenreService';
// import { getMovies } from '../services/movieServices'; from MONGOOS DB
// import { getGenres } from '../services/genreService'; from MONGOOS DB
import { paginate } from '../utils/pagination';
import Pagination from './common/pagination';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
import { toast } from 'react-toastify';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        searchQuery: '',
        selectedGenre: null,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]
        this.setState({ movies: getMovies(), genres });
    }

    // Show Genres from Mongooes DB

    // async componentDidMount() {
    //     getting genres from a DB
    //     const { data } = await getGenres();
    //     const genres = [{ id: "", name: "All Genres" }, ...data];

    //      getting the movies from the DB
    //      const {data: movies} = await getMovies();

    //      Updating the state
    //     this.setState({ movies, genres }); 
    // }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        deleteMovie(movie._id);
    };

    // Delete Movies from the mongooes DB

    // handleDelete = async movie => {
    //     const originalMovies = this.state.movies;
    //     const movies = originalMovies.filter(m => m._id !== movie._id);
    //     try {
    //         await deleteMovie(movie._id);
    //     } catch (ex) {
    //         if (ex.response && ex.response.status === 404)
    //             toast.error("This movie has been already deleted.");
    //         this.setState({ movies: originalMovies });
    //     }
    // }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].like = !movies[index].like;
        this.setState({ movies })
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenresSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    }

    getPagesData = () => {
        const {
            currentPage,
            pageSize,
            selectedGenre,
            sortColumn,
            searchQuery,
            movies: allMovies,
        } = this.state;
        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }

    render() {
        const { length: count } = this.state.movies;

        const { sortColumn, searchQuery } = this.state;

        if (count === 0)
            return <p className='mt-5'>There is no Movies in the database.</p>;

        const { totalCount, data: movies } = this.getPagesData();

        return (
            <>
                <div className="row">
                    <div className="col-3 mt-5">
                        <ListGroup
                            items={this.state.genres}
                            activeGenre={this.state.selectedGenre}
                            onGenreSelect={this.handleGenresSelect}
                        />
                    </div>

                    <div className="col">
                        <div className='mt-5'>
                            <Link to="/movies/new" className='btn btn-primary'>New Movie</Link>
                        </div>
                        <p className='mt-4'>Showing {totalCount} Movies in the database</p>

                        <SearchBox value={searchQuery} onChange={this.handleSearch} />

                        <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />

                        <Pagination
                            itemsCount={totalCount}
                            pageSize={this.state.pageSize}
                            currentPage={this.state.currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default Movies;
