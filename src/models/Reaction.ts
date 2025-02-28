import { Schema, Types, Document } from 'mongoose';

export interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionText: string;
    username: string;
    createdAt: Date;
}

export const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: Date) => createdAt
        },
    },
    {
        toJSON: { getters: true },
        id: false,
    }
);
