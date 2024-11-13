// Retrieve profile data
const profile = JSON.parse(localStorage.getItem("profile"));
const profileName = profile ? profile.username : "Anonymous";

// Add a post function
function addPost() {
    const postText = document.getElementById("postText").value;
    if (postText.trim() === "") {
        alert("Please enter some text to post.");
        return;
    }

    const newPost = {
        id: Date.now(),
        username: profileName,
        text: postText,
        timestamp: new Date().toLocaleString()
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postText").value = "";
    displayPosts();
}

// Display posts on the feed
function displayPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.dataset.id = post.id;  // Setting data-id for identification
        postDiv.innerHTML = `
            <h3 class="username" onclick="highlightPost(${post.id})">${post.username}</h3>
            <p>${post.text}</p>
            <small>${post.timestamp}</small>
        `;
        postDiv.addEventListener("click", function() { highlightPost(post.id); });
        feed.appendChild(postDiv);
    });
}

// Function to highlight a post
function highlightPost(postId) {
    const posts = document.querySelectorAll(".post");
    posts.forEach(post => post.classList.remove("highlight"));

    const selectedPost = Array.from(posts).find(post => post.dataset.id == postId);
    if (selectedPost) {
        selectedPost.classList.add("highlight");
    }
}

// Load posts on page load
window.onload = displayPosts;
