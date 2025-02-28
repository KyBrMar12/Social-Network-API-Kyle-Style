import { Types } from 'mongoose';

export interface IUser {
    _id?: Types.ObjectId;
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount?: number;
}

export interface IThought {
    _id?: Types.ObjectId;
    thoughtText: string;
    createdAt?: Date;
    username: string;
    reactions: IReaction[];
    reactionCount?: number;
}

export interface IReaction {
    reactionId: Types.ObjectId;
    reactionText: string;
    username: string;
    createdAt?: Date;
}
