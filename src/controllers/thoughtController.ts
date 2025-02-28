import { Request, Response } from 'express';
import { Thought, IThought } from '../models/Thought';
import { User } from '../models/User';

export const thoughtController = {
    async getThoughts(req: Request, res: Response): Promise<void> {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtById(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req: Request, res: Response): Promise<void> {
        try {
            const newThought = await Thought.create(req.body);

            // Push the thought _id to the associated user's thoughts array
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: newThought._id } },
                { new: true }
            );

            res.status(201).json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req: Request, res: Response): Promise<void> {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

            if (!updatedThought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            console.log(thought);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { 
                    $pull: { reactions: { _id: req.params.reactionId } } // ✅ Correctly target the `_id` field in reactions array
                },
                { new: true }
            );
    
            if (!thought) {
                res.status(404).json({ message: "No thought found!" });
                return;
            }
    
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
};
