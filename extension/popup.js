document.getElementById('loginBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/auth/github' });
});

// Fetching user data from the server
function fetchUserData() {
    fetch('http://localhost:3000/user/data')
    .then(response => {
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Assuming the server returns an object with the structure:
        // { totalRepos: Number, totalIssues: Number, totalPRs: Number }
        document.getElementById('totalRepos').textContent = data.totalRepos;
        document.getElementById('totalIssues').textContent = data.totalIssues;
        document.getElementById('totalPRs').textContent = data.totalPRs;
    })
    .catch(error => {
        console.log("There was a problem with the fetch operation:", error.message);
    });
}

// Fetch user data when popup opens
fetchUserData();
