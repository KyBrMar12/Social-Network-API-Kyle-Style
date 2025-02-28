import { Schema, model, Document } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction';

export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];  // ✅ Ensure reactions is explicitly defined
    reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: Date) => createdAt
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], 
    },
    {
        toJSON: { virtuals: true, getters: true },
        id: false,
    }
);

// Virtual to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions ? this.reactions.length : 0; 
});

export const Thought = model<IThought>('Thought', thoughtSchema);
