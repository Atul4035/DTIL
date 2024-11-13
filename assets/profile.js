// Check if profile data exists; if not, redirect to setup
const storedProfile = JSON.parse(localStorage.getItem("profile"));

window.onload = function() {
    if (storedProfile) {
        displayProfile();
    } else {
        window.location.href = "login.html";  // Redirect if no profile exists
    }
};

// Function to display profile data and recent posts
function displayProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
        document.getElementById("display-username").innerText = profile.username;
        document.getElementById("display-bio").innerText = profile.bio || "No bio available.";
        document.getElementById("profile-picture").src = profile.picture || "assets/default-avatar.png";
        loadRecentPosts(profile.username);
    }
}

// Function to upload a profile picture
function uploadProfilePic() {
    const fileInput = document.getElementById("profile-pic-input");
    const reader = new FileReader();

    reader.onload = function(event) {
        const profile = JSON.parse(localStorage.getItem("profile"));
        profile.picture = event.target.result;
        localStorage.setItem("profile", JSON.stringify(profile));
        displayProfile();
    };

    reader.readAsDataURL(fileInput.files[0]);
}

// Function to edit profile details
function editProfile() {
    if (!storedProfile) return;  // Check if profile exists

    const newUsername = prompt("Enter new username:", storedProfile.username);
    const newBio = prompt("Enter new bio:", storedProfile.bio);

    if (newUsername && newBio) {
        const profile = { ...storedProfile, username: newUsername, bio: newBio };
        localStorage.setItem("profile", JSON.stringify(profile));
        displayProfile();
    }
}

// Function to logout
function logout() {
    localStorage.removeItem("profile");
    window.location.href = "login.html";
}

// Function to load recent posts by the user
function loadRecentPosts(username) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const recentPostsDiv = document.getElementById("recent-posts");
    recentPostsDiv.innerHTML = "";

    posts
        .filter(post => post.username === username)
        .forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `
                <p>${post.text}</p>
                <small>${post.timestamp}</small>
                <button onclick="deletePost(${post.id})" class="delete-btn">Delete</button>
            `;
            recentPostsDiv.appendChild(postDiv);
        });
}

// Function to delete a specific post
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadRecentPosts(storedProfile.username);  // Reload recent posts
}
