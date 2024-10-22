# BucketList

## Overview

The Bucket List is a web application where users can create "Buckets" which are goal activities or places to Travel with helpful dashboards to track those goals.

### Problem Space

This app will help people visualize their aspirations and track with real metrics their progress towards accomplishing those dream activities.

### User Profile

Anyone who has a bucket list, a dream vacation, or activity they're working towards and want a centralized location to track progress.

### Features

- A customizable bucket page where users can add a banner image and title for the bucket
- A chat board or note board in the case of single person activities
- An expense sheet for tracking costs related to the bucket
- A savings sheet for tracking contributions towards the bucket
- A progress marker that shows percentage of savings towards expenses
- Six pre-built themes

## Implementation

### Tech Stack

- HTML
- CSS
- Sass
- Javascript
- Axios
- React
- Express
- Toastify
- React Router Dom
- React Circular Progress Bar
- MySQL
- Knex

### APIs

- UnSplash for adding banner images

### Sitemap

- Home
- Sign Up / Log In
- Buckets List
- Bucket Add
- Bucket Details
- Bucket Chat
- Bucket Expenses
- Bucket Contributions
- Bucket Edit

### Mockups

See attached folder of example mock ups

![](ProposalAssets/Mockups/DesktopMockups/DesktopBucketDetails.jpg)
![](ProposalAssets/Mockups/DesktopMockups/DesktopExpenses.jpg)
![](ProposalAssets/Mockups/DesktopMockups/DesktopSavings.jpg)
![](ProposalAssets/Mockups/DesktopMockups/DesktopChat.jpg)
![](ProposalAssets/Mockups/DesktopMockups/DesktopEdit.jpg)

![](ProposalAssets/Mockups/MobileMockups/MobileBucketDetails.jpg)
![](ProposalAssets/Mockups/MobileMockups/MobileExpenses.jpg)
![](ProposalAssets/Mockups/MobileMockups/MobileSavings.jpg)
![](ProposalAssets/Mockups/MobileMockups/MobileChat.jpg)
![](ProposalAssets/Mockups/MobileMockups/MobileEdit.jpg)

### Data

- USERS: ID, Name, Email, Password
- BUCKETS: ID, Image, Title, Theme
- BUCKET_USERS: ID, BucketID, UserID, Role
- CHATS: ID, UserID, BucketID, Message, DateAdded
- SAVINGS: ID, BucketID, UserID, Amount, DateAdded
- EXPENSES: ID, BucketID, Name, Amount, Notes

![](ProposalAssets/DB/user_data.png)
![](ProposalAssets/DB/buckets_data.png)
![](ProposalAssets/DB/expenses_data.png)
![](ProposalAssets/DB/savings_data.png)
![](ProposalAssets/DB/chats_data.png)

### Endpoints

##### Users

- POST - http://localhost${PORT}/user/signup creates a new user

- POST - http://localhost${PORT}/user/login logs in a user

- GET - http://localhost${PORT}/user/userDetails/ gets the user details for the authenticated user by token

- DELETE - http://localhost${PORT}/user/deleteAccount/ deletes the user account and associated items

##### Bucket

- GET - http://localhost${PORT}/bucket/ Provides a list of all buckets of authenticated user

- GET - http://localhost${PORT}/buckets/:bucket_id Provides the details of one bucket

- POST - http://localhost${PORT}/bucket/ Add a new buckeet to the users list

- PUT - http://localhost${PORT}/bucket/:bucket_id Updates one bucket details by given ID

- DELETE - http://localhost${PORT}/bucket/:bucket_id Deletes one bucket by given ID

##### Expense

- GET - http://localhost${PORT}/bucket/:bucket_id/expenses Returns the expense list for a bucket

- POST - http://localhost${PORT}/bucket/:bucket_id/expenses Creates an expense item for the bucket

- DELETE - http://localhost${PORT}/bucket/:bucket_id/expenses/:expense_id Deletes an expense list associated to a bucket

##### Savings

- GET - http://localhost${PORT}/bucket/:bucket_id/savings Returns the savings list for a bucket

- POST - http://localhost${PORT}/bucket/:bucket_id/savings Creates a savings item for the bucket

- DELETE - http://localhost${PORT}/bucket//:bucket_id/savings/:savings_id Deletes a savings item associated to a bucket

##### Chat

- GET - http://localhost${PORT}/bucket/:bucket_id/chat/ Returns the chat list for a bucket

- POST - http://localhost${PORT}/bucket/:bucket_id/chat/ Adds a chat message

- DELETE - http://localhost${PORT}/bucket/:bucket_id/chat/:chat_id Deletes a chat message

##### Contributors

- GET - http://localhost${PORT}/bucket/:BucketID/contributors/ Returns the contributors on a bucket

- DELETE - http://localhost${PORT}/bucket/:BucketID/contributors/ Removes self as a contributor from a bucket

- POST - http://localhost${PORT}/bucket/:BucketID/contributors/:user_id Adds a user as a contributor to a bucket

- DELETE - http://localhost${PORT}/bucket/:BucketID/contributors/:user_id Removes a contributor from a bucket

## Roadmap

See attached Roadmap

![](ProposalAssets/Roadmap/Roadmap.jpg)

---

## Future Implementations

- User Authentication - DONE
- Multi user buckets - DONE
- Toastify Alerts - DONE
- Users can remove themselves as Contributors - DONE
- User delete account - DONE
- Bucket dashboard image as upload instead of stock images
- Customizable themes instead of the pre-builds
- Mobile and Tablet views (responsiveness)
