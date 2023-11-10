import { Document, model, Schema } from 'mongoose';

interface IGenreDocument extends Document {
    name: string;
}

const GenreSchema = new Schema<IGenreDocument> (
    {
        name: {
            type: String,
            required: [true, 'Name is required.']
        }
    },
    { timestamps: true, versionKey: false }
)

const GenresModel = model<IGenreDocument>("Genre", GenreSchema);

export default GenresModel;
