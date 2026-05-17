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
    { id: "home", name: "Home" },
    { id: "about", name: "About Me" },
    { id: "note", name: "Note" },
    { id: "paints", name: "Paints" },
    { id: "works", name: "Works" }
];

// 各页面内容配置（已集成子界面与图片）
const pageContent = {
    home: `
        <h2>Homepage</h2>
        <p>Is a blog about paint and some cg or math things I guess.</p>
        <p>Trust me,I will up date this often.</p>
        <div class="line"></div>
        <p>设计理念：少即是多，剥离一切无效装饰。</p>
    `,
    about: `
        <h2>About Me</h2>
        <p>Is 2026.5.17 now,I just insomina.</p>
        <p>Since I have no things to do so I build this blog to record somethings.</p>
        <p>Hope things can lucky.</p>
    `,
    note: `
        <h2>Note</h2>
        <p>JavaScript / TypeScript / 前端布局随笔。</p>
        <p>GitHub Pages 静态网站部署经验记录。</p>
    `,
    paints: `
        <h2>Paints</h2>
        <p>I guess I will put some paints on here.</p>
        <!-- 子界面标签按钮 -->
        <div class="sub-tabs">
            <button class="sub-tab-btn active" data-sub="paintA">Paint A</button>
            <button class="sub-tab-btn" data-sub="paintB">Paint B</button>
        </div>
        <!-- 子界面内容区 -->
        <div class="sub-page" id="paintA" style="display:block;">
            <p>这里是 Paint A 的系列作品。</p>
            <img src="images/paint-a-demo.jpg" alt="Paint A 示例" class="content-img" />
        </div>
        <div class="sub-page" id="paintB" style="display:none;">
            <p>这里是 Paint B 的系列作品。</p>
            <img src="images/paint-b-demo.jpg" alt="Paint B 示例" class="content-img" />
        </div>
    `,
    works: `
        <h2>Works</h2>
        <p>Work work,Okie dokie.</p>
        <p>Our work never over.</p>
        <img src="images/work-demo.jpg" alt="工作示例" class="content-img" />
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

        /* 子标签样式 */
        .sub-tabs { margin: 20px 0; }
        .sub-tab-btn {
            background: transparent;
            border: 1px solid ${COLOR.line};
            color: #5A4F47;
            padding: 6px 16px;
            margin-right: 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: 0.25s;
        }
        .sub-tab-btn.active {
            background: ${COLOR.theme};
            color: #fff;
            border-color: ${COLOR.theme};
        }
        .sub-tab-btn:hover:not(.active) {
            background: ${COLOR.line};
            color: #fff;
        }
        .sub-page { margin-top: 16px; }

        /* 图片样式 */
        .content-img {
            display: block;
            max-width: 100%;
            height: auto;
            margin: 20px 0;
            border-radius: 6px;
            border: 1px solid ${COLOR.line};
            box-shadow: 2px 4px 12px rgba(139, 109, 93, 0.15);
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
    const wrap = document.createElement("div");
    wrap.className = "wrap";

    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    const title = document.createElement("div");
    title.className = "sidebar-title";
    title.innerText = "MY BLOG";
    sidebar.appendChild(title);

    menuList.forEach((item, index) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn" + (index === 0 ? " active" : "");
        btn.dataset.id = item.id;
        btn.innerText = item.name;
        sidebar.appendChild(btn);
    });

    const main = document.createElement("main");
    main.className = "main";

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

// ========== 主菜单切换逻辑 ==========
function bindEvent() {
    const btns = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            pages.forEach(p => p.classList.remove("show"));

            btn.classList.add("active");
            const id = btn.dataset.id;
            document.getElementById(id).classList.add("show");
        });
    });
}

// ========== 子界面切换逻辑（事件委托） ==========
function bindSubTabEvents() {
    const main = document.querySelector('.main');
    main.addEventListener('click', (e) => {
        if (e.target.classList.contains('sub-tab-btn')) {
            // 切换按钮激活状态
            const allSubBtns = document.querySelectorAll('.sub-tab-btn');
            allSubBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // 切换子内容显示
            const subId = e.target.dataset.sub;
            document.querySelectorAll('.sub-page').forEach(sp => {
                sp.style.display = 'none';
            });
            const targetSub = document.getElementById(subId);
            if (targetSub) targetSub.style.display = 'block';
        }
    });
}

// ========== 入口执行 ==========
(function init() {
    createStyle();
    renderPage();
    bindEvent();        // 主页面切换
    bindSubTabEvents(); // 子界面切换
})();
