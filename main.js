// ========== 配色配置 暖色调至上主义 ==========
const COLOR = {
    bg: "#F9F5F0",
    sidebarBg: "#EFE6DD",
    mainText: "#2D2A26",
    subText: "#4A4540",
    theme: "#8C6D5C",
    line: "#D4C5B8"
};

// 页面菜单配置
const menuList = [
    { id: "home", name: "首页" },
    { id: "about", name: "关于我" },
    { id: "note", name: "学习笔记" },
    { id: "works", name: "作品合集" }
];

// 各页面内容配置
const pageContent = {
    home: `
        <h2>首页</h2>
        <p>至上主义极简博客，克制留白，暖调干净风格。</p>
        <p>整站由原生 JavaScript 动态渲染，无多余冗余代码。</p>
        <div class="line"></div>
        <p>设计理念：少即是多，剥离一切无效装饰。</p>
    `,
    about: `
        <h2>关于我</h2>
        <p>喜欢前端、原生JS、极简设计与整洁代码风格。</p>
        <p>习惯用原生手写页面，拒绝臃肿框架。</p>
    `,
    note: `
        <h2>学习笔记</h2>
        <p>JavaScript / TypeScript / 前端布局随笔。</p>
        <p>GitHub Pages 静态网站部署经验记录。</p>
    `,
    works: `
        <h2>作品合集</h2>
        <p>极简风格个人网页、静态博客、交互小页面。</p>
        <p>全部采用原生 JS + 纯手写布局。</p>
    `
};

// ========== 创建全局样式 ==========
function createStyle() {
    const style = document.createElement("style");
    style.textContent = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: ${COLOR.bg};
            color: ${COLOR.mainText};
            font-family: system-ui, -apple-system, sans-serif;
        }
        .wrap { display: flex; min-height: 100vh; }

        .sidebar {
            width: 230px;
            background: ${COLOR.sidebarBg};
            padding: 50px 15px;
            border-right: 1px solid ${COLOR.line};
        }
        .sidebar-title {
            font-size: 20px;
            color: ${COLOR.theme};
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 12px;
            border-bottom: 2px solid ${COLOR.line};
        }
        .nav-btn {
            display: block;
            width: 100%;
            padding: 13px 0;
            margin: 6px 0;
            border: none;
            background: transparent;
            color: #5A4F47;
            font-size: 15px;
            cursor: pointer;
            border-radius: 4px;
            transition: 0.25s;
        }
        .nav-btn.active {
            background: ${COLOR.theme};
            color: #fff;
        }
        .nav-btn:hover:not(.active) {
            background: ${COLOR.line};
            color: #fff;
        }

        .main {
            flex: 1;
            padding: 60px 70px;
        }
        .page { display: none; }
        .page.show { display: block; }
        .page h2 {
            color: ${COLOR.theme};
            margin-bottom: 25px;
            border-left: 4px solid #BFA998;
            padding-left: 12px;
        }
        .page p {
            line-height: 1.9;
            color: ${COLOR.subText};
            margin-bottom: 16px;
        }
        .line {
            width: 80px;
            height: 1px;
            background: ${COLOR.line};
            margin: 35px 0;
        }

        @media (max-width:768px) {
            .wrap { flex-direction: column; }
            .sidebar { width: 100%; }
            .main { padding: 30px 20px; }
        }
    `;
    document.head.appendChild(style);
}

// ========== 渲染页面结构 ==========
function renderPage() {
    // 外层容器
    const wrap = document.createElement("div");
    wrap.className = "wrap";

    // 侧边栏
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    const title = document.createElement("div");
    title.className = "sidebar-title";
    title.innerText = "MY BLOG";
    sidebar.appendChild(title);

    // 渲染菜单按钮
    menuList.forEach((item, index) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn" + (index === 0 ? " active" : "");
        btn.dataset.id = item.id;
        btn.innerText = item.name;
        sidebar.appendChild(btn);
    });

    // 主内容区
    const main = document.createElement("main");
    main.className = "main";

    // 渲染每个页面
    menuList.forEach(item => {
        const page = document.createElement("div");
        page.className = "page" + (item.id === "home" ? " show" : "");
        page.id = item.id;
        page.innerHTML = pageContent[item.id];
        main.appendChild(page);
    });

    wrap.appendChild(sidebar);
    wrap.appendChild(main);
    document.body.appendChild(wrap);
}

// ========== 页面切换逻辑 ==========
function bindEvent() {
    const btns = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            // 清除选中
            btns.forEach(b => b.classList.remove("active"));
            pages.forEach(p => p.classList.remove("show"));

            // 激活当前
            btn.classList.add("active");
            const id = btn.dataset.id;
            document.getElementById(id).classList.add("show");
        });
    });
}

// ========== 入口执行 ==========
(function init() {
    createStyle();
    renderPage();
    bindEvent();
})();
