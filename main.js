// ========== 配色配置 暖色调至上主义（已改为rgb/rgba，背景半透明） ==========
const COLOR = {
    bg: "rgba(249, 245, 240, 0.5)",          // 原 #F9F5F0，透明度0.5
    sidebarBg: "rgba(239, 230, 221, 0.5)",    // 原 #EFE6DD，透明度0.5
    mainText: "rgb(45, 42, 38)",              // #2D2A26
    subText: "rgb(74, 69, 64)",               // #4A4540
    theme: "rgb(140, 109, 92)",               // #8C6D5C
    line: "rgb(212, 197, 184)"                // #D4C5B8
};

// 页面菜单配置
const menuList = [
    { id: "home", name: "Home" },
    { id: "about", name: "About Me" },
    { id: "note", name: "Note" },
    { id: "paints", name: "Paints" },
    { id: "works", name: "Works" }
];

// 各页面内容配置
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
        <div class="sub-tabs">
            <button class="sub-tab-btn active" data-sub="paintA">Paint A</button>
            <button class="sub-tab-btn" data-sub="paintB">Paint B</button>
        </div>
        <div class="sub-page" id="paintA" style="display:block;">
            <p>crab,haha.</p>
            <img src="images/crabman.png" alt="Paint A 示例" class="content-img" />
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

// ========== 创建全局样式（全部改用rgb/rgba，无模糊） ==========
function createStyle() {
    const style = document.createElement("style");
    style.textContent = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: ${COLOR.bg};
            color: ${COLOR.mainText};
            font-family: system-ui, -apple-system, sans-serif;
            position: relative;
            overflow-x: hidden;
        }
        .wrap { display: flex; min-height: 100vh; }

        .sidebar {
            width: 230px;
            background: ${COLOR.sidebarBg};
            padding: 50px 15px;
            border-right: 1px solid ${COLOR.line};
            position: relative;
            z-index: 1;
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
            color: rgb(90, 79, 71);       /* 原 #5A4F47 */
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
            position: relative;
            z-index: 1;
            background: rgba(249, 245, 240, 0.35);
            /* 模糊已移除 */
        }
        .page { display: none; }
        .page.show { display: block; }
        .page h2 {
            color: ${COLOR.theme};
            margin-bottom: 25px;
            border-left: 4px solid rgb(191, 169, 152);  /* 原 #BFA998 */
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
            color: rgb(90, 79, 71);
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

        /* Canvas 背景层 */
        #bgCanvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
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
            const allSubBtns = document.querySelectorAll('.sub-tab-btn');
            allSubBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const subId = e.target.dataset.sub;
            document.querySelectorAll('.sub-page').forEach(sp => {
                sp.style.display = 'none';
            });
            const targetSub = document.getElementById(subId);
            if (targetSub) targetSub.style.display = 'block';
        }
    });
}

// ========== Canvas 背景动画（至上主义风格，含粉色） ==========
function initCanvasAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    // 至上主义颜色池（包含粉色）
    const colors = [
        'rgba(0, 0, 0, 1)',        // 黑
        'rgba(255, 255, 255, 1)',  // 白
        'rgba(200, 0, 0, 1)',      // 红
        'rgba(0, 80, 200, 1)',     // 蓝
        'rgba(220, 180, 0, 1)',    // 黄
        'rgba(230, 100, 160, 1)',  // 粉
        'rgba(180, 0, 0, 1)',      // 深红
        'rgba(0, 0, 0, 1)'          // 浅黑（微妙对比）
    ];

    class Shape {
        constructor() {
            this.reset();
        }
        reset() {
            this.type = Math.floor(Math.random() * 3); // 0圆 1三角 2矩形
            this.size = 20 + Math.random() * 40;
            this.x = this.size + Math.random() * (width - this.size * 2);
            this.y = this.size + Math.random() * (height - this.size * 2);
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.rotationSpeed;

            if (this.x - this.size < 0) { this.x = this.size; this.vx *= -1; }
            else if (this.x + this.size > width) { this.x = width - this.size; this.vx *= -1; }
            if (this.y - this.size < 0) { this.y = this.size; this.vy *= -1; }
            else if (this.y + this.size > height) { this.y = height - this.size; this.vy *= -1; }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; // 白色描边增强对比
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            if (this.type === 0) {
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            } else if (this.type === 1) {
                const h = this.size * Math.sqrt(3) / 2;
                ctx.moveTo(0, -h * 2/3);
                ctx.lineTo(-this.size, h * 1/3);
                ctx.lineTo(this.size, h * 1/3);
                ctx.closePath();
            } else {
                ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
            }
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }

    const shapes = [];
    const SHAPE_COUNT = 20;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < SHAPE_COUNT; i++) {
        shapes.push(new Shape());
    }

    function handleCollisions() {
        for (let i = 0; i < shapes.length; i++) {
            for (let j = i + 1; j < shapes.length; j++) {
                const a = shapes[i];
                const b = shapes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = a.size + b.size;
                if (dist < minDist && dist > 0.001) {
                    const angle = Math.atan2(dy, dx);
                    const overlap = minDist - dist;
                    const moveX = Math.cos(angle) * overlap * 0.5;
                    const moveY = Math.sin(angle) * overlap * 0.5;
                    a.x += moveX;
                    a.y += moveY;
                    b.x -= moveX;
                    b.y -= moveY;

                    const nx = dx / dist;
                    const ny = dy / dist;
                    const dvx = a.vx - b.vx;
                    const dvy = a.vy - b.vy;
                    const vn = dvx * nx + dvy * ny;
                    if (vn < 0) {
                        const impulse = 2 * vn;
                        a.vx -= impulse * nx * 0.5;
                        a.vy -= impulse * ny * 0.5;
                        b.vx += impulse * nx * 0.5;
                        b.vy += impulse * ny * 0.5;
                    }
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let shape of shapes) {
            shape.update();
            shape.draw(ctx);
        }
        handleCollisions();
        requestAnimationFrame(animate);
    }
    animate();
}

// ========== 入口执行 ==========
(function init() {
    createStyle();
    renderPage();
    bindEvent();
    bindSubTabEvents();
    initCanvasAnimation();
})();
