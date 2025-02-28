import { Request, Response } from 'express';
import { User, Thought } from '../models';

export const userController = {
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find().populate('friends').populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.userId).populate('friends').populate('thoughts');
            if (!user) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }

            
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json({ message: 'User deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
