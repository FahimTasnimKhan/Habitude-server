import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Habit from '../models/Habit.js';
dotenv.config();
async function main() {
  await connectDB();

  const habits = [
    // ---------------- MORNING ----------------
    {
      title: 'Morning Jog',
      description:
        'Start your day with a refreshing 20–30 minute jog to activate your muscles and boost blood circulation. This helps improve mood, increase stamina, and set a positive tone for the day.',
      category: 'Morning',
      reminderTime: '06:30 AM',
      image: 'https://i.ibb.co.com/27Lt5MQD/Morning-Jog.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Morning Yoga Flow',
      description:
        'A gentle 15-minute yoga flow designed to stretch stiff muscles and wake up your body. This routine encourages mindfulness and prepares you mentally for the tasks ahead.',
      category: 'Morning',
      reminderTime: '07:00 AM',
      image: 'https://i.ibb.co.com/cK53YZg6/Morning-Yoga.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Healthy Breakfast Routine',
      description:
        'Prepare a balanced breakfast that includes protein, fiber, and healthy carbs. A proper morning meal fuels your brain, stabilizes energy levels, and reduces cravings throughout the day.',
      category: 'Morning',
      reminderTime: '08:00 AM',
      image: 'https://i.ibb.co.com/cK53YZg6/Morning-Yoga.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Clean Up Your Room',
      description:
        'Spend 10 minutes tidying up your room by organizing your bed, desk, and essentials. A clean environment reduces stress and helps you stay productive.',
      category: 'Morning',
      reminderTime: '08:30 AM',
      image: 'https://i.ibb.co.com/27Lt5MQD/Morning-Jog.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },

    // ---------------- WORK ----------------
    {
      title: 'Daily Task Planning',
      description:
        'Take a few minutes to plan your day by listing your top priorities. This improves focus, reduces overwhelm, and keeps you on track throughout your work hours.',
      category: 'Work',
      reminderTime: '09:00 AM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Email Inbox Review',
      description:
        'Review your email inbox, sort messages, and respond to the important ones. Keeping your inbox organized helps prevent missed deadlines and unnecessary stress.',
      category: 'Work',
      reminderTime: '11:00 AM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Midday Stand & Stretch',
      description:
        'Stand up from your workstation and perform a light stretching routine to relieve tension from your neck, shoulders, and lower back. This habit helps reduce fatigue and improves posture.',
      category: 'Work',
      reminderTime: '01:00 PM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Work Progress Review',
      description:
        'Take 10 minutes to evaluate what you’ve completed so far and adjust your remaining tasks. This improves efficiency and ensures that no important tasks are overlooked.',
      category: 'Work',
      reminderTime: '03:00 PM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },

    // ---------------- FITNESS ----------------
    {
      title: 'Strength Training Routine',
      description:
        'A 25-minute workout targeting core muscle groups including chest, legs, and back. Strength training increases endurance, builds muscle, and boosts metabolism throughout the day.',
      category: 'Fitness',
      reminderTime: '06:00 PM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Evening Home Workout',
      description:
        'A moderate-intensity home workout including squats, push-ups, and lunges. Great for maintaining strength without requiring gym equipment.',
      category: 'Fitness',
      reminderTime: '07:00 PM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Full Body Stretch',
      description:
        'Spend 15 minutes stretching your full body to improve flexibility and reduce any muscle tension built up throughout the day. Helps promote better sleep and overall mobility.',
      category: 'Fitness',
      reminderTime: '08:00 PM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Hydration Check',
      description:
        'Remind yourself to drink water and stay hydrated. Proper hydration keeps your energy levels stable and improves focus, especially during physical activity.',
      category: 'Fitness',
      reminderTime: '05:00 PM',
      image: 'https://i.ibb.co.com/4Rt4YcVD/Fitness.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },

    // ---------------- EVENING ----------------
    {
      title: 'Evening Reflection Journal',
      description:
        'Write down three things you accomplished today and one thing you want to improve. This habit helps you stay mindful and track your personal growth.',
      category: 'Evening',
      reminderTime: '09:00 PM',
      image: 'https://i.ibb.co.com/rKJX4Dsp/Evening.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Nighttime Walk',
      description:
        'Take a gentle 10-minute walk outdoors to relax your mind and body. This is especially helpful after long work hours and helps prepare you for better sleep.',
      category: 'Evening',
      reminderTime: '08:30 PM',
      image: 'https://i.ibb.co.com/rKJX4Dsp/Evening.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Prepare for Tomorrow',
      description:
        'Spend a few minutes organizing items you need for the next day, such as clothes or work materials. This reduces morning stress and helps you start your day smoothly.',
      category: 'Evening',
      reminderTime: '10:00 PM',
      image: 'https://i.ibb.co.com/rKJX4Dsp/Evening.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Digital Detox',
      description:
        'Put away all electronic devices at least 30 minutes before bed. This helps reduce eye strain, calm your mind, and promote healthy sleep cycles.',
      category: 'Evening',
      reminderTime: '10:30 PM',
      image: 'https://i.ibb.co.com/rKJX4Dsp/Evening.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },

    // ---------------- STUDY ----------------
    {
      title: 'Focused Study Session',
      description:
        'Set aside 45 minutes for deep, focused studying without interruptions. Use techniques like the Pomodoro method to maintain momentum and improve retention.',
      category: 'Study',
      reminderTime: '07:00 PM',
      image: 'https://i.ibb.co.com/QvRXjjrG/Study.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Review Class Notes',
      description:
        'Go through your notes and highlight important topics that require extra attention. Reviewing notes daily boosts long-term memory and understanding.',
      category: 'Study',
      reminderTime: '08:30 PM',
      image: 'https://i.ibb.co.com/QvRXjjrG/Study.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Read a Chapter',
      description:
        'Read one chapter of a textbook or learning material of your choice. This habit strengthens comprehension and expands your knowledge base.',
      category: 'Study',
      reminderTime: '09:15 PM',
      image: 'https://i.ibb.co.com/QvRXjjrG/Study.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
    {
      title: 'Flashcard Revision',
      description:
        'Spend 15 minutes revising flashcards to reinforce key concepts. Spaced repetition helps lock information into long-term memory.',
      category: 'Study',
      reminderTime: '06:30 PM',
      image: 'https://i.ibb.co.com/QvRXjjrG/Study.webp',
      creatorID: '6918739ee7e7d477cdcc3ea7',
      isPublic: true,
    },
  ];

  try {
    await Habit.insertMany(habits);
    console.log('All habits created successfully');
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
}

main();
