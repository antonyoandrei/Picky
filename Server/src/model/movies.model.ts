import { Document, model, Schema } from 'mongoose';

interface IMovieDocument extends Document {
    name: string;
    poster_image: string;
    score: string;
    genre: string;
}

const MovieSchema = new Schema<IMovieDocument> (
    {
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        poster_image: {
            type: String,
            required: [true, 'Poster is required.']
        },
        score: {
            type: String,
            required: [true, 'Score is required.']
        },
        genre: {
            type: String,
            required: [true, 'Genre is required.']
        }
    },
    { timestamps: true, versionKey: false }
)

const MoviesModel = model<IMovieDocument>("Movies", MovieSchema);

export default MoviesModel;