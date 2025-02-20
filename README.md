# pinScout

pinScout is a crowdsourced, gamified urban exploration map. It was created for EmP Hackfest Winter 2025, and won 3rd place in Group 2. 

https://pinscout.vercel.app

![Screenshot 2025-02-20 151405](https://github.com/user-attachments/assets/921f4b71-a63b-4a74-92f2-624b2f9e6790)

## motivation

The theme of the hackathon was "facilitate access to urban or natural resources". We decided to focus on the idea of outdoor urban exploration. Often, when in parks or cities, it is difficult to find utilities like restrooms, water fountains, trash cans, etc. Additionally, we wanted to encourage people to share cool places or points of interest like art installations, scenic viewpoints, and more. Finally, transportation, especially public transportation is important for facilitating urban exploration, so we decided to include that as well.

## the app

pinScout is a web app with an interactive satellite map. Users can create pins to label things ranging from restrooms to historical landmarks. Once a pin has been created, users can submit images or reviews to provide additional information about it. 

We planned to include a gamified aspect (but didn't have enough time to full implement it) where users would earn Pin Points from creating pins, adding images, or writing reviews. There would also be leaderboards and challenges to further motivate users to explore their cities. 

## implementation

pinScout was built on the SvelteKit framework. It uses Mapbox for the map implementation, and Supabase for database and auth. It is hosted on Vercel.
