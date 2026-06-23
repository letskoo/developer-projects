const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwzSdk4687OctJXQIkdaV2icxW5jWXM3sZOEJ16w96GwH_6Oz7OPbcY5rLjAh96d_nm/exec";

const params =
    new URLSearchParams(
        location.search
    );

const editId =
    params.get("id");

if (editId) {

    fetch(
        `${SCRIPT_URL}?action=getProjects`
    )
        .then(r => r.json())
        .then(projects => {

            const project =
                projects.find(
                    p =>
                        String(p.projectId) ===
                        String(editId)
                );

            if (!project) {
                return;
            }

            document.getElementById(
                "projectType"
            ).value =
                project.type;

            document.getElementById(
                "thumbnail"
            ).value =
                project.thumbnail || "";

            document.getElementById(
                "title"
            ).value =
                project.title || "";

            document.getElementById(
                "shortDescription"
            ).value =
                project.shortDescription || "";

            document.getElementById(
                "fullDescription"
            ).value =
                project.fullDescription || "";

            document.getElementById(
                "link"
            ).value =
                project.link || "";

            document.getElementById(
                "version"
            ).value =
                project.version || "";

            document.getElementById(
                "category"
            ).value =
                project.category || "";

        });

}

document
    .getElementById(
        "saveProjectBtn"
    )
    .addEventListener(
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

            const projectType =
                document.getElementById(
                    "projectType"
                ).value;

            const thumbnail =
                document.getElementById(
                    "thumbnail"
                ).value;

            const title =
                document.getElementById(
                    "title"
                ).value;

            const shortDescription =
                document.getElementById(
                    "shortDescription"
                ).value;

            const fullDescription =
                document.getElementById(
                    "fullDescription"
                ).value;

            const link =
                document.getElementById(
                    "link"
                ).value;

            const version =
                document.getElementById(
                    "version"
                ).value;

            const category =
                document.getElementById(
                    "category"
                ).value;

            if (
                !title ||
                !fullDescription
            ) {

                alert(
                    "필수값 입력"
                );

                return;

            }

            fetch(
                SCRIPT_URL,
                {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify({

                        type:
                            editId
                                ? "updateProject"
                                : "project",

                        projectId:
                            editId ||
                            Date.now(),

                        projectType,

                        thumbnail,

                        title,

                        shortDescription,

                        fullDescription,

                        link,

                        version,

                        category

                    })
                }
            );

            alert(
                "프로젝트 저장 완료"
            );

            setTimeout(
                () => {

                    location.href =
                        "projects.html";

                },
                1000
            );

        }
    );