const languageBtn =
    document.getElementById("languageBtn");

const currentLanguage =
    localStorage.getItem("language") || "en";

const textData = {
    en: {
        button: "한국어",

        navAbout: "ABOUT",
        navProjects: "PROJECTS",
        navDonate: "DONATE",

        heroTitle: "Welcome to Developer Projects",
        heroText: "Free projects, applications and experiments.",
        aboutTitle: "About",
        aboutText: "This website is a collection of projects, apps, and tools created by Developer Projects. Each project is available for free use, and you can support their development by reporting bugs, suggesting ideas, or making donations.",

        missionTitle: "Why I Build",
        missionText: "I enjoy creating useful tools, sharing them with people, and improving them through feedback.",

        communityTitle: "Community & Feedback",
        communityText: "Feel free to use any project, report bugs, suggest ideas, or support future development.",

        navCommunity: "COMMUNITY",

        communityPageTitle: "Community",

        communityPageText:
            "Development updates, feedback, roadmap and announcements will be shared here.",

        searchPlaceholder:
            "Search posts...",

        writePostButton:
            "Write Post",

        boardNo:
            "No",

        boardCategory:
            "Category",

        boardTitle:
            "Title",

        boardDate:
            "Date",

        boardViews:
            "Views",

        projectsPageTitle: "Projects",
        projectsPageText: "Browse free projects, applications and tools.",

        donatePageTitle: "Donate",
        donatePageText: "Support future development, free tools, and community projects.",

        donateSupportTitle: "Support This Project",

        kakaoPayTitle: "KakaoPay",

        kakaoPayText:
            "Scan the QR code to support Developer Projects.",

        paypalTitle: "🌎 PayPal",

        paypalText:
            "Support Developer Projects from anywhere in the world.",

        paypalButton:
            "Donate with PayPal",

        donateSectionTitle: "Support the Projects",
        donateSectionText: "If these projects are useful to you, your support helps keep them growing.",

        footerTitle:
            "Developer Projects",
        footerText:
            "Building useful software, sharing ideas, and learning together.",

        footerYoutube:
            "YouTube",
    },

    ko: {
        button: "English",

        navAbout: "소개",
        navProjects: "프로젝트",
        navDonate: "후원",

        heroTitle: "디벨로퍼 프로젝트에 오신 것을 환영합니다",
        heroText: "무료 프로젝트, 애플리케이션, 실험 도구를 제공합니다.",
        aboutTitle: "소개",
        aboutText: "이 웹사이트는 Developer Projects에서 만든 프로젝트, 앱, 도구들을 모아둔 공간입니다. 각 프로젝트는 무료로 사용할 수 있으며, 버그 제보, 아이디어 제안, 후원 등으로 개발을 지원할 수 있습니다.",

        missionTitle: "왜 만드는가",
        missionText: "유용한 도구를 만들고, 사람들과 공유하며, 피드백을 통해 발전시키는 것을 좋아합니다.",

        communityTitle: "커뮤니티와 피드백",
        communityText: "자유롭게 사용하고, 버그를 제보하고, 아이디어를 제안하거나, 후원으로 개발을 응원할 수 있습니다.",

        navCommunity: "커뮤니티",

        communityPageTitle: "커뮤니티",

        communityPageText:
            "개발 진행 상황, 업데이트, 피드백, 로드맵 및 공지사항을 공유합니다.",

        searchPlaceholder:
            "게시글 검색...",

        writePostButton:
            "글쓰기",

        boardNo:
            "번호",

        boardCategory:
            "카테고리",

        boardTitle:
            "제목",

        boardDate:
            "작성일",

        boardViews:
            "조회수",

        projectsPageTitle: "프로젝트",
        projectsPageText: "무료 프로젝트, 애플리케이션, 도구들을 둘러보세요.",

        donatePageTitle: "후원",
        donatePageText: "무료 프로젝트와 커뮤니티 개발이 계속될 수 있도록 후원해주세요.",

        donateSupportTitle: "프로젝트 후원하기",

        kakaoPayTitle: "카카오페이",

        kakaoPayText:
            "QR 코드를 스캔하여 Developer Projects를 후원할 수 있습니다.",

        paypalTitle: "🌎 페이팔",

        paypalText:
            "전 세계 어디에서나 Developer Projects를 후원할 수 있습니다.",

        paypalButton:
            "PayPal로 후원하기",

        donateSectionTitle: "프로젝트 후원하기",
        donateSectionText: "이 프로젝트들이 도움이 되었다면, 후원은 앞으로의 개발을 이어가는 데 큰 힘이 됩니다.",

        footerTitle:
            "디벨로퍼 프로젝트",
        footerText:
            "유용한 소프트웨어를 만들고, 아이디어를 공유하며, 함께 성장합니다.",

        footerYoutube:
            "유튜브",
    }
};

function applyLanguage() {

    const data =
        textData[currentLanguage];

    if (languageBtn) {
        languageBtn.textContent =
            data.button;
    }

    const navAbout =
        document.getElementById("navAbout");

    if (navAbout) {
        navAbout.textContent =
            data.navAbout;
    }

    const navProjects =
        document.getElementById("navProjects");

    if (navProjects) {
        navProjects.textContent =
            data.navProjects;
    }

    const navDonate =
        document.getElementById("navDonate");

    if (navDonate) {
        navDonate.textContent =
            data.navDonate;
    }

    const heroTitle =
        document.getElementById("heroTitle");

    if (heroTitle) {
        heroTitle.textContent =
            data.heroTitle;
    }

    const heroText =
        document.getElementById("heroText");

    if (heroText) {
        heroText.textContent =
            data.heroText;
    }

    const aboutTitle =
        document.getElementById("aboutTitle");

    if (aboutTitle) {
        aboutTitle.textContent =
            data.aboutTitle;
    }

    const aboutText =
        document.getElementById("aboutText");

    if (aboutText) {
        aboutText.textContent =
            data.aboutText;
    }

    const missionTitle =
        document.getElementById("missionTitle");

    if (missionTitle) {
        missionTitle.textContent =
            data.missionTitle;
    }

    const missionText =
        document.getElementById("missionText");

    if (missionText) {
        missionText.textContent =
            data.missionText;
    }

    const communityTitle =
        document.getElementById("communityTitle");

    if (communityTitle) {
        communityTitle.textContent =
            data.communityTitle;
    }

    const communityText =
        document.getElementById("communityText");

    if (communityText) {
        communityText.textContent =
            data.communityText;
    }

    const navCommunity =
        document.getElementById("navCommunity");

    if (navCommunity) {
        navCommunity.textContent =
            data.navCommunity;
    }

    const communityPageTitle =
        document.getElementById(
            "communityPageTitle"
        );

    if (communityPageTitle) {
        communityPageTitle.textContent =
            data.communityPageTitle;
    }

    const communityPageText =
        document.getElementById(
            "communityPageText"
        );

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.placeholder =
            data.searchPlaceholder;
    }

    const writePostBtn =
        document.getElementById("writePostBtn");

    if (writePostBtn) {
        writePostBtn.textContent =
            data.writePostButton;
    }

    const boardNo =
        document.getElementById("boardNo");

    if (boardNo) {
        boardNo.textContent =
            data.boardNo;
    }

    const boardCategory =
        document.getElementById("boardCategory");

    if (boardCategory) {
        boardCategory.textContent =
            data.boardCategory;
    }

    const boardTitle =
        document.getElementById("boardTitle");

    if (boardTitle) {
        boardTitle.textContent =
            data.boardTitle;
    }

    const boardDate =
        document.getElementById("boardDate");

    if (boardDate) {
        boardDate.textContent =
            data.boardDate;
    }

    const boardViews =
        document.getElementById("boardViews");

    if (boardViews) {
        boardViews.textContent =
            data.boardViews;
    }

    if (communityPageText) {
        communityPageText.textContent =
            data.communityPageText;
    }

    const donateSectionTitle =
        document.getElementById("donateSectionTitle");

    if (donateSectionTitle) {
        donateSectionTitle.textContent =
            data.donateSectionTitle;
    }

    const donateSectionText =
        document.getElementById("donateSectionText");

    if (donateSectionText) {
        donateSectionText.textContent =
            data.donateSectionText;
    }

    const footerTitle =
        document.getElementById("footerTitle");

    if (footerTitle) {
        footerTitle.textContent =
            data.footerTitle;
    }
    const footerText =
        document.getElementById("footerText");

    if (footerText) {
        footerText.textContent =
            data.footerText;
    }

    const footerYoutube =
        document.getElementById("footerYoutube");

    if (footerYoutube) {
        footerYoutube.textContent =
            data.footerYoutube;
    }

    const projectsPageTitle =
        document.getElementById("projectsPageTitle");

    if (projectsPageTitle) {
        projectsPageTitle.textContent =
            data.projectsPageTitle;
    }

    const projectsPageText =
        document.getElementById("projectsPageText");

    if (projectsPageText) {
        projectsPageText.textContent =
            data.projectsPageText;
    }

    const donatePageTitle =
        document.getElementById("donatePageTitle");

    if (donatePageTitle) {
        donatePageTitle.textContent =
            data.donatePageTitle;
    }

    const donatePageText =
        document.getElementById("donatePageText");

    if (donatePageText) {
        donatePageText.textContent =
            data.donatePageText;
    }

    const donateSupportTitle =
        document.getElementById("donateSupportTitle");

    if (donateSupportTitle) {
        donateSupportTitle.textContent =
            data.donateSupportTitle;
    }

    const kakaoPayTitle =
        document.getElementById("kakaoPayTitle");

    if (kakaoPayTitle) {
        kakaoPayTitle.textContent =
            data.kakaoPayTitle;
    }

    const kakaoPayText =
        document.getElementById("kakaoPayText");

    if (kakaoPayText) {
        kakaoPayText.textContent =
            data.kakaoPayText;
    }

    const paypalTitle =
        document.getElementById("paypalTitle");

    if (paypalTitle) {
        paypalTitle.textContent =
            data.paypalTitle;
    }

    const paypalText =
        document.getElementById("paypalText");

    if (paypalText) {
        paypalText.textContent =
            data.paypalText;
    }

    const paypalButton =
        document.getElementById("paypalButton");

    if (paypalButton) {
        paypalButton.textContent =
            data.paypalButton;
    }

    if (donatePageText) {
        donatePageText.textContent =
            data.donatePageText;
    }

}

applyLanguage();

if (languageBtn) {

    languageBtn.addEventListener("click", () => {

        const nextLanguage =
            currentLanguage === "en" ? "ko" : "en";

        localStorage.setItem(
            "language",
            nextLanguage
        );

        location.reload();

    });

}