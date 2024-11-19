# Web Development Final Project - _Hobby Hub_

Submitted by: **Nereida Rondon**

This web app: **Allows users to create, edit, view, and delete posts about their favorite books. Users can give each post a title, add optional content, and include an image URL. Posts are displayed on a homepage with their upvote counts, creation times, and titles. Each post has a direct, unique link to a detailed page where users can view more information, leave comments, and upvote the post. Upvotes are directly reflected on the detailed view of each post.**

Time spent: **12** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The app includes a form that allows users to create new posts with specified attributes (title, content, image URL).**
- [x] **The homepage lists all posts, showing their titles, upvote counts, and creation times, with links to detailed views.**
- [x] **Each detailed view of a post has a direct, unique link that allows users to share or revisit the specific post page.**
- [x] **Users can leave comments on each post in the detailed view.**
- [x] **Users can upvote posts directly from the detailed view, and the upvote count updates dynamically.**

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='/src/assets/finalProject.gif' title='Video Walkthrough' width='100%' alt='Video Walkthrough' />

GIF created with LiceCap

## Notes

Some challenges encountered during development:

- **Upvote Functionality:** Implementing upvotes required directly updating the database while ensuring the new counts reflected immediately in the UI. Managing database queries for real-time updates without user-specific tracking simplified the implementation but required fine-tuning the state updates.

- **Dynamic Routing for Posts:** Structuring the app to allow unique detail pages for each post required setting up dynamic routes and integrating them seamlessly with the homepage. Ensuring smooth navigation between routes while maintaining data integrity was a challenge, particularly when managing comments and upvotes.

- **UI Enhancements for Detailed Views:** Designing the detailed view to display all post attributes, upvotes, and comments in a clean, user-friendly layout required experimenting with CSS for responsiveness and readability. Maintaining a consistent style across both the homepage and detailed views was essential for user experience.

## License

    Copyright 2024 Nereida Rondon

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
