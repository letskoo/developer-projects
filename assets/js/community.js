const writePostBtn =
    document.getElementById(
        "writePostBtn"
    );

const tableBody =
    document.getElementById(
        "postTableBody"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

let posts = [];

function formatDate(dateString) {

    const date =
        new Date(dateString);

    const year =
        String(date.getFullYear()).slice(-2);

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;

}

fetch(
    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec?action=getPosts"
)
    .then(r => r.json())
    .then(data => {

        console.log("GET DATA =", data);

        posts = data;

        renderPosts();

    });

function renderPosts() {

    tableBody.innerHTML = "";

    const keyword =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";

    const filteredPosts =
        posts.filter((post) => {

            const title =
                post.title.toLowerCase();

            const category =
                post.category.toLowerCase();

            const content =
                post.content.toLowerCase();

            return (
                title.includes(keyword) ||
                category.includes(keyword) ||
                content.includes(keyword)
            );

        });

    const latestNotice =
        filteredPosts.find(
            post => post.category === "공지"
        );

    if (filteredPosts.length === 0) {

        tableBody.innerHTML =
            `
            <tr>
                <td colspan="5">
                    No posts found.
                </td>
            </tr>
            `;

        return;
    }

    if (latestNotice) {

        const noticeRow =
            document.createElement(
                "tr"
            );

        const noticeIndex =
            posts.indexOf(
                latestNotice
            );

        noticeRow.innerHTML = `
        <td>📌</td>
        <td>[공지]</td>
        <td>
    ${latestNotice.title}
    ${latestNotice.likes > 0
                ? ` ❤️${latestNotice.likes}`
                : ""}
    ${latestNotice.comments && latestNotice.comments.length > 0
                ? ` (${latestNotice.comments.length})`
                : ""}
</td>
        <td>${formatDate(latestNotice.date)}</td>
        <td>${latestNotice.views}</td>
    `;

        noticeRow.addEventListener(
            "click",
            () => {
                openPost(noticeIndex);
            }
        );

        tableBody.appendChild(
            noticeRow
        );

    }

    filteredPosts.forEach((post) => {

        if (
            latestNotice &&
            post === latestNotice
        ) {
            return;
        }

        const realIndex =
            posts.indexOf(post);

        const tr =
            document.createElement(
                "tr"
            );

        tr.innerHTML = `
            <td>${posts.length - realIndex}</td>
            <td>[${post.category}]</td>
            <td>
${post.title}
${post.likes > 0 ? ` ❤️${post.likes}` : ""}
${post.comments && post.comments.length > 0 ? ` (${post.comments.length})` : ""}
</td>
            <td>${formatDate(post.date)}</td>
            <td>${post.views}</td>
        `;

        tr.addEventListener(
            "click",
            () => {
                openPost(realIndex);
            }
        );

        tableBody.appendChild(tr);

    });

}

function openPost(index) {

    const post =
        posts[index];

    location.href =
        `post.html?id=${post.postId}`;

}

const writeModal =
    document.getElementById(
        "writeModal"
    );

const savePostBtn =
    document.getElementById(
        "savePostBtn"
    );

const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );

if (writePostBtn) {

    writePostBtn.addEventListener(
        "click",
        () => {

            const password =
                prompt(
                    "관리자 비밀번호"
                );

            if (
                password !==
                "rustica2026"
            ) {

                alert(
                    "비밀번호 오류"
                );

                return;
            }

            document.getElementById(
                "postCategory"
            ).selectedIndex = 0;

            document.getElementById(
                "postTitleInput"
            ).value = "";

            document.getElementById(
                "postContentInput"
            ).value = "";

            writeModal.classList.add(
                "open"
            );

        }
    );

}

if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        () => {

            writeModal.classList.remove(
                "open"
            );

        }
    );

}

if (savePostBtn) {

    savePostBtn.addEventListener(
        "click",
        () => {

            const category =
                document.getElementById(
                    "postCategory"
                ).value;

            const title =
                document.getElementById(
                    "postTitleInput"
                ).value;

            const content =
                document.getElementById(
                    "postContentInput"
                ).value;

            if (
                !title ||
                !content
            ) {
                return;
            }

            const postId = Date.now();

            fetch(
                "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify({
                        type: "post",
                        postId: postId,
                        category: category,
                        title: title,
                        content: content,
                        views: 0
                    })
                }
            );

            writeModal.classList.remove(
                "open"
            );

            setTimeout(() => {

                location.reload();

            }, 1000);

        }
    );

}

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {
            renderPosts();
        }
    );

}

renderPosts();