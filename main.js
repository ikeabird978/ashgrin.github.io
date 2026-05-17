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

// ========== 创建全局样式 ==========
function createStyle() {
    const style = document.createElement("style");
    style.textContent = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: ${COLOR.bg};
            color: ${COLOR.mainText};
            font-family: system-ui, -apple-system, sans-serif;
            position: relative; /* 为定位 canvas 提供参照 */
            overflow-x: hidden;
        }
        .wrap { display: flex; min-height: 100vh; }

        .sidebar {
            width: 230px;
            background: ${COLOR.sidebarBg};
            padding: 50px 15px;
            border-right: 1px solid ${COLOR.line};
            position: relative;
            z-index: 1; /* 保证在 canvas 上方 */
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
            position: relative;
            z-index: 1; /* 保证在 canvas 上方 */
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

        /* Canvas 背景层 */
        #bgCanvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;       /* 最底层 */
            pointer-events: none; /* 鼠标穿透 */
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

// ========== Canvas 背景动画 ==========
function initCanvasAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    // 暖色系颜色池
    const colors = [
        'rgba(140,109,92,0.3)',   // theme
        'rgba(191,169,152,0.3)',  // 浅棕
        'rgba(212,197,184,0.3)',  // line
        'rgba(239,230,221,0.3)',  // sidebarBg
        'rgba(139,109,93,0.25)',
        'rgba(90,79,71,0.2)'     // 深暖灰
    ];

    // 几何体类
    class Shape {
        constructor() {
            this.reset();
        }
        reset() {
            // 随机形状类型：0 圆形，1 三角形，2 矩形
            this.type = Math.floor(Math.random() * 3);
            // 随机半径/边长 20~60
            this.size = 20 + Math.random() * 40;
            // 随机位置（避开边缘）
            this.x = this.size + Math.random() * (width - this.size * 2);
            this.y = this.size + Math.random() * (height - this.size * 2);
            // 随机速度
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            // 随机颜色
            this.color = colors[Math.floor(Math.random() * colors.length)];
            // 随机旋转角度（仅矩形和三角形使用）
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.rotationSpeed;

            // 边界反弹
            if (this.x - this.size < 0) {
                this.x = this.size;
                this.vx *= -1;
            } else if (this.x + this.size > width) {
                this.x = width - this.size;
                this.vx *= -1;
            }
            if (this.y - this.size < 0) {
                this.y = this.size;
                this.vy *= -1;
            } else if (this.y + this.size > height) {
                this.y = height - this.size;
                this.vy *= -1;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (this.type === 0) {
                // 圆形
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            } else if (this.type === 1) {
                // 三角形
                const h = this.size * Math.sqrt(3) / 2;
                ctx.moveTo(0, -h * 2/3);
                ctx.lineTo(-this.size, h * 1/3);
                ctx.lineTo(this.size, h * 1/3);
                ctx.closePath();
            } else {
                // 矩形（正方形）
                ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
            }
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }

    const shapes = [];
    const SHAPE_COUNT = 20; // 几何体数量

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 初始化几何体
    for (let i = 0; i < SHAPE_COUNT; i++) {
        shapes.push(new Shape());
    }

    // 碰撞检测与响应（基于包围圆）
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
                    // 将两个物体推开避免重叠
                    const angle = Math.atan2(dy, dx);
                    const overlap = minDist - dist;
                    const moveX = Math.cos(angle) * overlap * 0.5;
                    const moveY = Math.sin(angle) * overlap * 0.5;
                    a.x += moveX;
                    a.y += moveY;
                    b.x -= moveX;
                    b.y -= moveY;

                    // 简单弹性交换速度分量（沿碰撞法线方向）
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
    bindEvent();        // 主页面切换
    bindSubTabEvents(); // 子界面切换
    initCanvasAnimation(); // 背景动画
})();
