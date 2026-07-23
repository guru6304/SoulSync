// src/data/moodContent.js

const moodContent = {
    ROMANTIC: {
        songs: [
            { title: "Soft Piano Romance", artist: "Royalty Free Music", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { title: "Acoustic Love", artist: "Acoustic Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
            { title: "Midnight Stroll", artist: "Jazz Harmony", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
        ],
        questions: [
            { id: 1, text: "What was your favorite moment with me?", type: "text" },
            { id: 2, text: "What makes you the happiest?", options: ["Spending time with me", "Our cute talks", "Little surprises", "All of the above"], type: "multiple_choice" },
            { id: 3, text: "What was the exact moment you realized you loved me?", type: "text" },
            { id: 4, text: "Which physical feature of mine is your favorite?", options: ["Your Smile", "Your Eyes", "Your Hair", "Everything"], type: "multiple_choice" },
            { id: 5, text: "If we could teleport anywhere right now for a romantic date, where would we go?", type: "text" }
        ],
        letters: [
            "My Love, You are the most beautiful part of my life. Every day with you feels like a dream come true. Thank you for being my happiness, my strength, and my forever. I love you more than words can ever express.",
            "Hey Beautiful, just a quick note to remind you how deeply I cherish you. You bring so much light into my world, and I can't wait to spend all my tomorrows making you smile.",
            "To my everything: Loving you is the easiest thing I've ever done. You are my safe place, my greatest adventure, and my favorite hello."
        ],
        quotes: [
            "You + Me = Forever",
            "Every moment with you is a beautiful love story.",
            "I look at you and see the rest of my life in front of my eyes.",
            "You are my today and all of my tomorrows."
        ]
    },
    HAPPY: {
        songs: [
            { title: "Upbeat Sunshine", artist: "Happy Tunes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
            { title: "Walking on Air", artist: "Joyful Rhythms", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
        ],
        questions: [
            { id: 101, text: "What is your happiest memory of us?", type: "text" },
            { id: 102, text: "What makes you smile the most?", options: ["Good food", "Beautiful weather", "Spending time with you", "Just being alive"], type: "multiple_choice" },
            { id: 103, text: "If today had a theme song, what would it be?", type: "text" },
            { id: 104, text: "What is the best thing that happened to you today?", type: "text" }
        ],
        letters: [
            "Your smile is my favorite sight in the world. You have a special way of making ordinary moments extraordinary. Stay happy, stay yourself, because you make my life brighter every single day!",
            "Seeing you happy makes my heart full. Your joy is contagious, and I promise to spend my life finding new ways to keep that beautiful smile on your face."
        ],
        quotes: [
            "Your happiness makes my life beautiful.",
            "With you, every day is a happy day!",
            "A smile from you can change my whole world."
        ]
    },
    SAD: {
        songs: [
            { title: "Comforting Rain", artist: "Healing Sounds", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
            { title: "Gentle Embrace", artist: "Ambient Piano", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" }
        ],
        questions: [
            { id: 201, text: "What's making you feel sad today?", options: ["Missing someone", "Feeling lonely", "Overthinking", "Things not going right", "Just a low feeling"], type: "multiple_choice" },
            { id: 202, text: "What can I do right now to comfort you?", options: ["Just listen to me", "Distract me", "Give me advice", "Just stay on the line with me"], type: "multiple_choice" },
            { id: 203, text: "Do you want to talk about it, or just have some quiet time together?", type: "text" }
        ],
        letters: [
            "My Love, it's okay to feel sad sometimes. You don't have to face anything alone. I'm with you, through every tear and every fear. Take your time, breathe. You are loved, you are beautiful, and this too shall pass.",
            "I hate knowing you are hurting. Please remember that you are my priority, and my shoulders are always here for you to lean on. We will get through this together."
        ],
        quotes: [
            "It's okay to feel sad. I'm here for you, always.",
            "You are stronger than you think.",
            "Every storm runs out of rain, and every heart heals with time."
        ]
    },
    ANGRY: {
        songs: [
            { title: "Calming Tides", artist: "Zen Music", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
        ],
        questions: [
            { id: 301, text: "Are you angry with me?", options: ["Yes", "No", "A little bit"], type: "multiple_choice" },
            { id: 302, text: "What is the main thing that upset you?", type: "text" },
            { id: 303, text: "How can I make this right?", options: ["Apologize", "Give me space", "Let's talk it out calmly", "Just listen to why I'm mad"], type: "multiple_choice" }
        ],
        letters: [
            "I know something is wrong, and I hate seeing you upset. If I did something to cause this, I am truly sorry. Let me make it up to you. Your peace of mind means everything to me.",
            "Take a deep breath. I know things are heated right now, but nothing is more important to me than us. Whenever you are ready, I'm here to listen and fix this."
        ],
        quotes: [
            "Let's fix this together. Us against the problem, not us against each other.",
            "Even when you are mad, I still love you.",
            "Take a deep breath. I am right here."
        ]
    },
    FUNNY: {
        songs: [
            { title: "Quirky Bounce", artist: "Comedy Tracks", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
        ],
        questions: [
            { id: 401, text: "Who is more dramatic?", options: ["You (1000%)", "Me", "Both of us"], type: "multiple_choice" },
            { id: 402, text: "What is the silliest thing we have ever argued about?", type: "text" },
            { id: 403, text: "If we were in a zombie apocalypse, who would survive longer?", options: ["Me, obviously", "You, by pure luck"], type: "multiple_choice" }
        ],
        letters: [
            "You are the reason for my endless laughs and goofy smiles! Thank you for being my partner in crime, my best joke listener, and my daily dose of crazy. Life is so fun with you!",
            "I love that we can be absolute weirdos together. Never change, because your crazy perfectly matches my crazy."
        ],
        quotes: [
            "Laughter is our secret ingredient to a happier life!",
            "A day without laughter with you is a day wasted.",
            "We go together like copy and paste."
        ]
    },
    MISSING_YOU: {
        songs: [
            { title: "Echoes of You", artist: "Longing Melodies", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
        ],
        questions: [
            { id: 501, text: "What do you miss the most about me right now?", options: ["Your smile", "Your voice", "The way you care", "Everything about you"], type: "multiple_choice" },
            { id: 502, text: "What's the first thing we should do when we see each other?", type: "text" }
        ],
        letters: [
            "Distance means so little when someone means so much. Every second without you feels longer. Come back soon, my love. I miss you so much!",
            "My days feel incomplete without you right next to me. Thinking of you keeps me going, but I'm counting down the seconds until I can hold you again."
        ],
        quotes: [
            "Missing you a little too much today.",
            "The stars feel closer when I'm missing you.",
            "You are always in my heart."
        ]
    },
    SLEEPY: {
        songs: [
            { title: "Lullaby of the Moon", artist: "Sleep Sounds", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" }
        ],
        questions: [
            { id: 601, text: "What are you going to dream about tonight?", type: "text" },
            { id: 602, text: "Did you have a tiring day?", options: ["Yes, very exhausted", "It was okay", "No, just cozy right now"], type: "multiple_choice" }
        ],
        letters: [
            "Close your eyes, my love. Let the night wrap you in comfort. Dream of us, dream of beautiful things. I will meet you there in our dreams. Goodnight!",
            "Sleep well, my angel. You worked hard today and you deserve the most peaceful rest. I'll be the first one to text you in the morning."
        ],
        quotes: [
            "Good night, my love. I'll meet you in my dreams.",
            "You are loved, you are enough, you are my everything.",
            "Sleep well, my angel."
        ]
    },
    CELEBRATION: {
        songs: [
            { title: "Triumphant Fanfare", artist: "Party Music", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
        ],
        questions: [
            { id: 701, text: "What are we celebrating today?", type: "text" },
            { id: 702, text: "How should we treat ourselves?", options: ["Fancy Dinner", "Order In & Chill", "A special gift", "Just being together"], type: "multiple_choice" }
        ],
        letters: [
            "Every moment with you is a celebration! I am so incredibly proud of us and everything we achieve together. Let's make today unforgettable. Cheers to my favorite person!",
            "Congratulations my love! Your wins are my wins, and I couldn't be more excited to celebrate this beautiful moment with you."
        ],
        quotes: [
            "Let's Celebrate Us!",
            "Every day with you feels like a party in my heart.",
            "Here is to making more beautiful memories together."
        ]
    },
    NEED_A_HUG: {
        songs: [
            { title: "Warm Blanket", artist: "Acoustic Calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" }
        ],
        questions: [
            { id: 801, text: "What kind of hug do you need?", options: ["A tight bear hug", "A gentle, comforting hug", "A long, quiet hug"], type: "multiple_choice" },
            { id: 802, text: "If I was there right now, how long would I hold you?", type: "text" }
        ],
        letters: [
            "Sending you the biggest, warmest virtual hug right now! Wrap your arms around yourself and squeeze tight—that's me hugging you from afar. You are so loved.",
            "I wish I could wrap you in my arms and hide you from the world right now. Just know that my heart is holding yours."
        ],
        quotes: [
            "Sending you a big warm hug!",
            "You're in my heart, always and forever.",
            "A hug from me to you, until I can give you a real one."
        ]
    }
};

module.exports = moodContent;