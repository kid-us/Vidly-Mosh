import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMoviesService';

// Getting a data form the DB
// import { getGenres } from '../services/genreService';
// import { getMo, saveMovie } from '../services/movieServices';
// 
class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    };

    // Get generes in the form from the DB and save the form in DB 
    // async populateGenres() {
    //     const genre = await getGenres();
    //     this.setState({ genres });

    // }

    // async populateMovie() {
    //     try {
    //         const movieId = this.props.match.params.id;
    //         if (movieId === "new") return;
    //         const { data: movie } = await getMovie(movieId);
    //         this.setState({ data: this.mapToViewModel(movie) });
    //     } catch (ex) {
    //         if (ex.response && ex.response.status === 404)
    //             this.props.history.replace("/not-found");
    //     }
    // }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        if (!movie) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(movie) });
    };

    mapToViewModel(movie) {
        return {
            _id: movie.id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    // Save and Update a movies to the DB
    // doSubmit = async () => {
    //     await saveMovie(this.state.data);

    //     this.props.history.push('/movies');
    // }

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push('/movies');
    }

    render() {
        return (
            <>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title", "text")}

                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number In Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate", "number")}
                    {this.renderButton('Save')}
                </form>
            </>
        );
    }
}

export default MovieForm;