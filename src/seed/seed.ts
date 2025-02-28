import mongoose from 'mongoose';
import { User, Thought } from '../models';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');

        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Seed users
        const users = await User.insertMany([
            { username: 'Mickey Mouse', email: 'MickeyMouse@example.com' },
            { username: 'Minnie Mouse', email: 'MinnieMouse@example.com' }
        ]);

        // Seed thoughts
        const thoughts = await Thought.insertMany([
            { thoughtText: 'Where is Goofy!?', username: 'Mickey Mouse' },
            { thoughtText: 'Where is Mickey!?', username: 'Minnie Mouse' }
        ]);

        // Associate thoughts with users
        await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
        await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
