console.log("project.js loaded");

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec";

console.log("SCRIPT_URL =", SCRIPT_URL);

const params =
    new URLSearchParams(location.search);

const id =
    params.get("id");

let projectComments = [];

function loadComments() {

    const localData =
        localStorage.getItem(
            `projectComments_${id}`
        );

    if (localData) {

        projectComments =
            JSON.parse(localData);

        renderComments();

        return;
    }

    fetch(
        `${SCRIPT_URL}?action=getProjectComments&projectId=${id}`
    )
        .then(r => r.json())
        .then(comments => {

            projectComments =
                comments;

            localStorage.setItem(
                `projectComments_${id}`,
                JSON.stringify(comments)
            );

            renderComments();

        });

}

fetch(
    `${SCRIPT_URL}?action=getProjects`
)
    .then(r => r.json())
    .then(projects => {

        const project =
            projects.find(
                p =>
                    String(p.projectId) ===
                    String(id)
            );

        if (!project) {

            document.getElementById(
                "projectTitle"
            ).textContent =
                "Project not found";

            return;

        }

        document.getElementById(
            "projectTitle"
        ).textContent =
            project.title;

        document.getElementById(
            "projectDescription"
        ).textContent =
            project.fullDescription;

        document.getElementById(
            "projectVersion"
        ).textContent =
            `Version : ${project.version}`;

        document.getElementById(
            "projectCategory"
        ).textContent =
            `Category : ${project.category}`;

        document.getElementById(
            "projectThumbnail"
        ).src =
            project.thumbnail;

        const btn =
            document.getElementById(
                "downloadBtn"
            );

        btn.href =
            project.link;

        btn.textContent =
            project.type === "web"
                ? "Visit Website"
                : "Download";

        document
            .getElementById(
                "editProjectBtn"
            )
            .addEventListener(
                "click",
                () => editProject(project)
            );

        document
            .getElementById(
                "deleteProjectBtn"
            )
            .addEventListener(
                "click",
                () => deleteProject(project)
            );

        loadComments();

    });

function renderComments() {

    const list =
        document.getElementById("commentList");

    const likedComments =
        JSON.parse(
            localStorage.getItem("likedProjectComments")
        ) || [];

    list.innerHTML = "";

    projectComments.forEach(comment => {

        const liked =
            likedComments.includes(
                `project_comment_${comment.commentId}`
            );

        const div =
            document.createElement("div");

        div.className =
            "comment-item";

        div.innerHTML = `
<div class="comment-top">

    <div class="comment-name">
        ${comment.nickname || "Anonymous"}
    </div>

    <div class="comment-actions">

        <button
            class="edit-comment-btn"
            onclick="editComment('${comment.commentId}')"
            title="Edit Comment"
        >
            ✏️
        </button>

        <button
            class="delete-comment-btn"
            onclick="deleteComment('${comment.commentId}')"
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
        onclick="likeComment('${comment.commentId}')"
    >
        ${liked ? "❤️" : "🤍"} ${comment.likes || 0}
    </button>
</div>
`;

        list.appendChild(div);

    });

}

document
    .getElementById("commentBtn")
    .addEventListener("click", () => {

        const nickname =
            document.getElementById("nickname").value || "";

        const comment =
            document.getElementById("commentText").value;

        if (!comment.trim()) {
            alert("Comment required");
            return;
        }

        const commentPassword =
            prompt("Comment Password");

        if (
            !commentPassword ||
            commentPassword.length !== 4
        ) {
            alert("Password must be 4 digits");
            return;
        }

        const commentId =
            Date.now();

        projectComments.push({
            commentId,
            projectId: id,
            nickname,
            password: commentPassword,
            comment,
            likes: 0,
            createdAt: new Date()
        });

        localStorage.setItem(
            `projectComments_${id}`,
            JSON.stringify(projectComments)
        );

        renderComments();

        fetch(
            SCRIPT_URL,
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    type: "projectComment",
                    commentId,
                    projectId: id,
                    nickname,
                    password: commentPassword,
                    comment
                })
            }
        );

        document.getElementById("commentText").value = "";
        document.getElementById("nickname").value = "";

    });

function likeComment(commentId) {

    const key =
        `project_comment_${commentId}`;

    const likedComments =
        JSON.parse(
            localStorage.getItem("likedProjectComments")
        ) || [];

    const comment =
        projectComments.find(
            c => String(c.commentId) === String(commentId)
        );

    if (!comment) {
        return;
    }

    let delta = 1;

    if (likedComments.includes(key)) {

        likedComments.splice(
            likedComments.indexOf(key),
            1
        );

        if (comment.likes > 0) {
            comment.likes--;
        }

        delta = -1;

    } else {

        likedComments.push(key);

        comment.likes =
            Number(comment.likes || 0) + 1;

        delta = 1;
    }

    localStorage.setItem(
        "likedProjectComments",
        JSON.stringify(likedComments)
    );

    localStorage.setItem(
        `projectComments_${id}`,
        JSON.stringify(projectComments)
    );

    renderComments();

    fetch(
        SCRIPT_URL,
        {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                type: "likeProjectComment",
                commentId,
                delta
            })
        }
    );

}

function editComment(commentId) {

    const password =
        prompt("Comment Password or Admin Password");

    if (!password) {
        return;
    }

    const comment =
        projectComments.find(
            c => String(c.commentId) === String(commentId)
        );

    if (!comment) {
        return;
    }

    if (
        password !== "rustica2026" &&
        password !== comment.password
    ) {

        alert("Wrong Password");

        return;

    }

    const newComment =
        prompt(
            "Edit Comment",
            comment.comment
        );

    if (!newComment) {
        return;
    }

    comment.comment =
        newComment;

    localStorage.setItem(
        `projectComments_${id}`,
        JSON.stringify(projectComments)
    );

    renderComments();

    fetch(
        SCRIPT_URL,
        {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                type: "updateProjectComment",
                commentId,
                password,
                comment: newComment
            })
        }
    );

}

function deleteComment(commentId) {

    const password =
        prompt("Comment Password or Admin Password");

    if (!password) {
        return;
    }

    const comment =
        projectComments.find(
            c => String(c.commentId) === String(commentId)
        );

    if (!comment) {
        return;
    }

    if (
        password !== "rustica2026" &&
        password !== comment.password
    ) {

        alert("Wrong Password");

        return;

    }

    if (!confirm("Delete this comment?")) {
        return;
    }

    projectComments =
        projectComments.filter(
            c => String(c.commentId) !== String(commentId)
        );

    localStorage.setItem(
        `projectComments_${id}`,
        JSON.stringify(projectComments)
    );

    renderComments();

    fetch(
        SCRIPT_URL,
        {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                type: "deleteProjectComment",
                commentId,
                password
            })
        }
    );

}

function editProject(project) {

    const password =
        prompt("관리자 비밀번호");

    if (
        password !==
        "rustica2026"
    ) {

        alert("비밀번호 오류");

        return;

    }

    location.href =
        `project-upload.html?id=${project.projectId}`;

}

function deleteProject(project) {

    const password =
        prompt("관리자 비밀번호");

    if (
        password !==
        "rustica2026"
    ) {

        alert("비밀번호 오류");

        return;

    }

    if (
        !confirm(
            "프로젝트를 삭제할까요?"
        )
    ) {
        return;
    }

    fetch(
        SCRIPT_URL,
        {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({

                type:
                    "deleteProject",

                projectId:
                    project.projectId

            })
        }
    );

    alert(
        "프로젝트 삭제 완료"
    );

    setTimeout(
        () => {

            location.href =
                "projects.html";

        },
        1000
    );

}

document
    .getElementById(
        "backProjectBtn"
    )
    ?.addEventListener(
        "click",
        () => {

            location.href =
                "projects.html";

        }
    );