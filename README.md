# GitHub Tracker

A tool that allows users to authenticate with their GitHub account, fetch their public repositories, and track their contributions. This information is then displayed via a Chrome extension.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Server:

1. Navigate to the `server` directory.
   bash
   cd server
   

2. Install the required dependencies.
   bash
   npm install
   

3. Fill in your MongoDB connection details and GitHub OAuth credentials in `.env`.

4. Start the server.
   bash
   node server.js
   

### Extension:

1. Open Chrome, go to `chrome://extensions/`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select the `extension` directory of this project.

## Usage

1. Click on the GitHub Tracker extension icon in Chrome.
2. Log in with your GitHub account.
3. View your repositories and contribution statistics directly from the extension.

## File Structure


github-tracker/
│
├── server/
│   ├── models/
│   │   ├── user.js             # Mongoose model for User
│   │   └── repo.js             # Mongoose model for Repo
│   ├── routes/
│   │   ├── auth.js             # Auth-related routes
│   │   └── data.js             # Data retrieval routes
│   ├── .env                   # Environment variables
│   ├── package.json           # Node.js dependencies
│   └── server.js              # Main server file
│
└── extension/
    ├── images/                # Extension icons or imagery
    ├── js/
    │   └── popup.js           # Logic for popup UI
    ├── css/
    │   └── styles.css         # Styling for popup UI
    ├── popup.html             # Popup UI
    └── manifest.json          # Extension configuration


## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.



