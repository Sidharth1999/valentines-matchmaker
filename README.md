# Glimpses of the app

# Motivation

Around a week before Valentine's Day, I noticed that there weren't any other matchmaking initiatives being planned. So, I spontaneously decided to take up the challenge because I knew I had all the necessary skills to do so myself.

In a few days, I was able to complete the entire project - from mental designs to a fully styled, polished looking app. To save myself the engineering effort, I also designed the app to operate without an explicitly programmed backend and just firebase APIs.

# Matchmaking Algorithm

There are certainly state-of-the-art matchmaking algorithms out there, but given my time constraints I went ahead with a simplified algorithm:

1. Vectorizing survey results
2. Normalizing the scores
3. Applying a form of Euclidean distance to calculate pair-wise similarities
4. Taking the highest similarity score from a similarity matrix, matching the pair corresponding to that entry, and eliminating them from the pool
5. Continue step 4 until the pool is empty

# Ethical considerations

The app only collects basic data such as people's names, emails, and profile photos, but as soon as the matchmaking was complete, I deleted all of this data. I also did not look at this data while the app was live. Moreover, while running the algorithm, I made sure to anonymize the data with user IDs

# Result

With a few days left before Valentine's day, my marketing efforts allowed me to ultimately match around 50 people.

# Future considerations

I plan to keep this an ongoing project where I may improve the following aspects:

1. The sophistication of the matchmaking algorithm
2. The UI/UX of the app
3. It bothered me a little that my users would need to take my word that I was properly handling their data. I realized that there was no good reason for this system to be centralized. As I get time, I might decentralize the app on the Blockchain using smart contracts and democratized voting processes for what questions to include in the survey, how data is handled/stored, and when to release results.




