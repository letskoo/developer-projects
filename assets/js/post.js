let posts = [];

function formatDate(dateString) {

    const date =
        new Date(dateString);

    const year =
        String(date.getFullYear()).slice(-2);

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;

}
let post = null;
let index = -1;

const params =
    new URLSearchParams(
        location.search
    );

const postId =
    params.get("id");

fetch(
    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec?action=getPosts"
)
    .then(r => r.json())
    .then(data => {

        posts = data;

        post =
            posts.find(
                p => String(p.postId) === String(postId)
            );

        index =
            posts.findIndex(
                p => String(p.postId) === String(postId)
            );

        if (!post) {

            location.href =
                "community.html";

            return;

        }

        console.log(
            "VIEW POST",
            post.postId
        );

        post.views =
            Number(post.views) + 1;

        fetch(
            "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    type: "viewPost",
                    postId: post.postId
                })
            }
        );

        initPost();

    });

function initPost() {

    document.getElementById(
        "postCategory"
    ).textContent =
        `[${post.category}]`;

    document.getElementById(
        "postTitle"
    ).textContent =
        post.title;

    document.getElementById(
        "postDate"
    ).textContent =
        formatDate(post.date);

    document.getElementById(
        "postViews"
    ).textContent =
        post.views;

    if (!post.likes) {
        post.likes = 0;
    }

    document.getElementById(
        "postLikes"
    ).textContent =
        post.likes || 0;

    const likeBtn =
        document.getElementById(
            "likeBtn"
        );

    if (!post.likes) {
        post.likes = 0;
    }

    const likedPosts =
        JSON.parse(
            localStorage.getItem(
                "likedPosts"
            )
        ) || [];

    const liked =
        likedPosts.includes(
            `post_${post.postId}`
        );

    likeBtn.innerHTML =
        liked
            ? `❤️ <span id="postLikes">${post.likes}</span>`
            : `🤍 <span id="postLikes">${post.likes}</span>`;

    document.getElementById(
        "postContent"
    ).textContent =
        post.content;

    const commentList =
        document.getElementById(
            "commentList"
        );

    function renderComments() {

        commentList.innerHTML =
            "";

        const comments =
            post.comments || [];

        const likedComments =
            JSON.parse(
                localStorage.getItem(
                    "likedComments"
                )
            ) || [];

        comments.forEach((comment, commentIndex) => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "comment-item";

            div.innerHTML =
                `
        <div class="comment-top">

            <div class="comment-name">
                ${comment.nickname}
            </div>

            <div class="comment-actions">

    <button
        class="edit-comment-btn"
        title="Edit Comment"
    >
        ✏️
    </button>

    <button
        class="delete-comment-btn"
        title="Delete Comment"
    >
        🗑️
    </button>

</div>

        </div>

        <div class="comment-text">

    ${comment.comment}

    <button
    class="like-comment-btn"
>
    ${likedComments.includes(`comment_${comment.commentId}`) ? "❤️" : "🤍"}
    ${comment.likes || 0}
</button>

</div>
        `;

            const editBtn =
                div.querySelector(
                    ".edit-comment-btn"
                );

            editBtn.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const password =
                        prompt(
                            "Comment Password or Admin Password"
                        );

                    if (
                        password !== "rustica2026" &&
                        password !== comment.password
                    ) {
                        alert("Wrong Password");
                        return;
                    }

                    const newText =
                        prompt(
                            "Edit Comment",
                            comment.comment
                        )

                    if (!newText) {
                        return;
                    }

                    comment.comment =
                        newText;

                    fetch(
                        "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                        {
                            method: "POST",
                            mode: "no-cors",
                            body: JSON.stringify({
                                type: "updateComment",
                                commentId: comment.commentId,
                                comment: newText
                            })
                        }
                    );

                    renderComments();

                }
            );

            const deleteBtn =
                div.querySelector(
                    ".delete-comment-btn"
                );

            deleteBtn.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const password =
                        prompt(
                            "Admin Password"
                        );

                    if (
                        password !== "rustica2026" &&
                        password !== comment.password
                    ) {

                        alert(
                            "Wrong Password"
                        );

                        return;
                    }

                    const confirmDelete =
                        confirm(
                            "Delete this comment?"
                        );

                    if (!confirmDelete) {
                        return;
                    }

                    comments.splice(
                        commentIndex,
                        1
                    );

                    post.comments =
                        comments;

                    fetch(
                        "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                        {
                            method: "POST",
                            mode: "no-cors",
                            body: JSON.stringify({
                                type: "deleteComment",
                                commentId: comment.commentId
                            })
                        }
                    );

                    renderComments();

                }
            );

            const likeCommentBtn =
                div.querySelector(
                    ".like-comment-btn"
                );

            likeCommentBtn.addEventListener(
                "click",
                () => {

                    if (!comment.likes) {
                        comment.likes = 0;
                    }

                    const commentKey =
                        `comment_${comment.commentId}`;

                    const likedIndex =
                        likedComments.indexOf(
                            commentKey
                        );

                    if (likedIndex !== -1) {

                        likedComments.splice(
                            likedIndex,
                            1
                        );

                        if (comment.likes > 0) {
                            comment.likes--;
                        }

                    } else {

                        likedComments.push(
                            commentKey
                        );

                        comment.likes++;
                    }

                    localStorage.setItem(
                        "likedComments",
                        JSON.stringify(
                            likedComments
                        )
                    );

                    fetch(
                        "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                        {
                            method: "POST",
                            mode: "no-cors",
                            body: JSON.stringify({
                                type: "likeComment",
                                commentId: comment.commentId,
                                delta: likedIndex !== -1 ? -1 : 1
                            })
                        }
                    );

                    renderComments();

                }
            );

            commentList.appendChild(
                div
            );

        });

    }

    renderComments();

    document
        .getElementById(
            "commentBtn"
        )
        .addEventListener(
            "click",
            () => {

                const name =
                    document
                        .getElementById(
                            "nickname"
                        )
                        .value ||
                    "Anonymous";

                const text =
                    document
                        .getElementById(
                            "commentText"
                        )
                        .value;

                if (!text) {
                    return;
                }

                if (!post.comments) {
                    post.comments = [];
                }

                const commentPassword =
                    prompt(
                        "Comment Password"
                    );

                if (
                    !commentPassword ||
                    commentPassword.length !== 4
                ) {
                    alert("Password must be 4 digits");
                    return;
                }

                const commentId = Date.now();

                post.comments.push({

                    commentId: commentId,
                    postId: post.postId,
                    nickname: name,
                    comment: text,
                    likes: 0,
                    password: commentPassword,
                    createdAt: new Date()

                });

                localStorage.setItem(
                    `postComments_${post.postId}`,
                    JSON.stringify(post.comments)
                );

                fetch(
                    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: JSON.stringify({
                            type: "comment",
                            commentId: commentId,
                            postId: post.postId,
                            postTitle: post.title,
                            nickname: name,
                            password: commentPassword,
                            comment: text
                        })
                    }
                );

                document
                    .getElementById(
                        "commentText"
                    )
                    .value = "";

                document
                    .getElementById(
                        "nickname"
                    )
                    .value = "";

                renderComments();

            }
        );

    const deletePostBtn =
        document.getElementById(
            "deletePostBtn"
        );

    if (deletePostBtn) {

        deletePostBtn.addEventListener(
            "click",
            () => {

                const password =
                    prompt(
                        "Admin Password"
                    );

                if (
                    password !== "rustica2026"
                ) {

                    alert(
                        "Wrong Password"
                    );

                    return;
                }

                const confirmDelete =
                    confirm(
                        "Delete this post?"
                    );

                if (!confirmDelete) {
                    return;
                }

                fetch(
                    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: JSON.stringify({
                            type: "deletePost",
                            postId: post.postId
                        })
                    }
                );

                posts.splice(
                    index,
                    1
                );

                alert(
                    "Post deleted"
                );

                location.href =
                    "community.html";

            }
        );

    }

    const editPostBtn =
        document.getElementById(
            "editPostBtn"
        );

    if (editPostBtn) {

        editPostBtn.addEventListener(
            "click",
            () => {

                const password =
                    prompt(
                        "Admin Password"
                    );

                if (
                    password !== "rustica2026"
                ) {
                    alert("Wrong Password");
                    return;
                }

                const newTitle =
                    prompt(
                        "Edit Title",
                        post.title
                    );

                const newContent =
                    prompt(
                        "Edit Content",
                        post.content
                    );

                if (
                    !newTitle ||
                    !newContent
                ) {
                    return;
                }

                post.title =
                    newTitle;

                post.content =
                    newContent;

                fetch(
                    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: JSON.stringify({
                            type: "updatePost",
                            postId: post.postId,
                            title: newTitle,
                            content: newContent
                        })
                    }
                );

                document.getElementById(
                    "postTitle"
                ).textContent =
                    post.title;

                document.getElementById(
                    "postContent"
                ).textContent =
                    post.content;

                alert("Post updated");

            }
        );

    }

    if (likeBtn) {

        likeBtn.addEventListener(
            "click",
            () => {

                const postKey =
                    `post_${post.postId}`;

                const likedPosts =
                    JSON.parse(
                        localStorage.getItem(
                            "likedPosts"
                        )
                    ) || [];

                const likedIndex =
                    likedPosts.indexOf(postKey);

                if (likedIndex !== -1) {

                    likedPosts.splice(
                        likedIndex,
                        1
                    );

                    if (post.likes > 0) {
                        post.likes--;
                    }

                    likeBtn.innerHTML =
                        `🤍 <span id="postLikes">${post.likes}</span>`;

                } else {

                    likedPosts.push(postKey);

                    post.likes++;

                    likeBtn.innerHTML =
                        `❤️ <span id="postLikes">${post.likes}</span>`;
                }

                localStorage.setItem(
                    "likedPosts",
                    JSON.stringify(likedPosts)
                );

                console.log(
                    "LIKE POST",
                    post.postId,
                    likedIndex !== -1 ? -1 : 1
                );

                fetch(
                    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: JSON.stringify({
                            type: "likePost",
                            postId: post.postId,
                            delta: likedIndex !== -1 ? -1 : 1
                        })
                    }
                );

            }
        );

    }

}