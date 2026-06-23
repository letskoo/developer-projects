// console.log("projects.js loaded");

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec";

const grid =
    document.getElementById(
        "projectGrid"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const uploadBtn =
    document.getElementById(
        "uploadProjectBtn"
    );

let projects = [];

if (uploadBtn) {

    uploadBtn.addEventListener(
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

            location.href =
                "project-upload.html";

        }
    );

}

function renderProjects(type) {

    grid.innerHTML = "";

    const filtered =
        type === "all"
            ? projects
            : projects.filter(
                p => p.type === type
            );

    filtered.forEach(project => {

        const card =
            document.createElement(
                "a"
            );

        card.className =
            "project-card";

        card.href =
            `project.html?id=${project.projectId}`;

        card.innerHTML = `
            <img
                src="${project.thumbnail}"
                style="
                    width:100%;
                    height:160px;
                    object-fit:cover;
                    border-radius:12px;
                    margin-bottom:12px;
                "
            >

            <h3>
                ${project.title}
            </h3>

            <p>
                ${project.shortDescription}
            </p>
        `;

        grid.appendChild(
            card
        );

    });

}

fetch(
    `${SCRIPT_URL}?action=getProjects`
)
    .then(r => r.json())
    .then(data => {

        projects =
            data;

        renderProjects(
            "all"
        );

    });

filterButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                b =>
                    b.classList.remove(
                        "active"
                    )
            );

            btn.classList.add(
                "active"
            );

            renderProjects(
                btn.dataset.type
            );

        }
    );

});