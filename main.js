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
    
    <div class="sub-layout">
        <div class="sub-sidebar">
            <!-- 只保留遗传系统这一个导航项 -->
            <div class="sub-nav-item active" data-sub="ck3-genetics">
                <span class="nav-icon">●</span>
                <span>Crusader Kings III's Genetic System</span>
            </div>
        </div>
        
        <!-- 必须的内容容器 -->
        <div class="sub-content">
            <!-- id使用文章缩写命名，语义清晰且符合HTML规范 -->
            <div class="sub-page" id="ck3-genetics" style="display:block;">
                <p>So this game's genetic system is simple and useful.</p>
                <p>It doesn't use real Mendelian genetic laws. Instead, it uses an equal per-inheritance independent probability system, where traits are only visibly inherited from the child's parents.</p>
                <p>Here's how it works:</p>
                <p>Each gene position has two slots: primary and secondary.</p>
                <p>When inheritance occurs, the program first determines which parent the primary gene will come from. Then it uses a 75%/25% probability split to choose whether this gene is inherited from that parent's corresponding primary or secondary slot. The secondary gene then comes from the other parent, and the same process repeats.</p>
                <p>The advantage of this solution is that players can simply choose the traits they want, and their children will have a chance to inherit them. It's better than catching a random person on the street and hoping they carry the recessive gene you want.</p>
                <p>龙生龙，凤生凤。</p>
                
                <img src="images/ck3.png" alt="gdc" class="content-img" />
            </div>
        </div>
    </div>
`,
    paints: `
        <h2>Paints</h2>
        <p>I guess I will put some paints on here.</p>
        
        <!-- 已替换为侧边栏式子导航布局 -->
        <div class="sub-layout">
            <div class="sub-sidebar">
                <div class="sub-nav-item active" data-sub="paintA">
                    <span class="nav-icon">●</span>
                    <span>Paint A</span>
                </div>
                <div class="sub-nav-item" data-sub="paintB">
                    <span class="nav-icon">●</span>
                    <span>Paint B</span>
                </div>
                <!-- 可以在这里继续添加更多子导航项 -->
                <!--
                <div class="sub-nav-item" data-sub="paintC">
                    <span class="nav-icon">●</span>
                    <span>Paint C</span>
                </div>
                -->
            </div>
            <div class="sub-content">
                <div class="sub-page" id="paintA" style="display:block;">
                    <p>crab,haha.</p>
                    <img src="images/crabman.png" alt="Paint A 示例" class="content-img" />
                </div>
                <div class="sub-page" id="paintB" style="display:none;">
                    <p>这里是 Paint B 的系列作品。</p>
                    <img src="images/paint-b-demo.jpg" alt="Paint B 示例" class="content-img" />
                </div>
                <!-- 对应添加更多子页面内容 -->
                <!--
                <div class="sub-page" id="paintC" style="display:none;">
                    <p>这里是 Paint C 的系列作品。</p>
                </div>
                -->
            </div>
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

        /* ========== 已替换为侧边栏式子导航样式 ========== */
        .sub-layout {
            display: flex;
            gap: 30px;
            margin-top: 20px;
        }

        .sub-sidebar {
            width: 180px;
            border-right: 1px solid ${COLOR.line};
            padding-right: 20px;
        }

        .sub-nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            margin-bottom: 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.25s ease;
            color: rgb(90, 79, 71);
        }

        .sub-nav-item .nav-icon {
            font-size: 8px;
            color: ${COLOR.line};
            transition: all 0.25s ease;
        }

        .sub-nav-item.active {
            background: rgba(140, 109, 92, 0.1);
            color: ${COLOR.theme};
            font-weight: 500;
        }

        .sub-nav-item.active .nav-icon {
            color: ${COLOR.theme};
            transform: scale(1.5);
        }

        .sub-nav-item:hover:not(.active) {
            background: rgba(212, 197, 184, 0.2);
        }

        .sub-content {
            flex: 1;
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
            
            /* 移动端响应式：子导航改为横向 */
            .sub-layout {
                flex-direction: column;
                gap: 20px;
            }
            
            .sub-sidebar {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid ${COLOR.line};
                padding-right: 0;
                padding-bottom: 15px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .sub-nav-item {
                margin-bottom: 0;
                padding: 8px 12px;
            }
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
        // 兼容原有的按钮和新的侧边栏导航项
        if (e.target.classList.contains('sub-tab-btn') || e.target.classList.contains('sub-nav-item')) {
            const allSubBtns = document.querySelectorAll('.sub-tab-btn, .sub-nav-item');
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

function initCanvasAnimation() {
    // ====================== 【常量配置】 ======================
    const CANVAS_CONFIG = {
        SHAPE_TYPES: {
            CIRCLE: 0,
            TRIANGLE: 1,
            RECT: 2,
            HEXAGON: 3,   // 正六边形
            DIAMOND: 4    // 菱形
        },
        SHAPE_COUNT: 22,
        BASE_SIZE: 20,
        RANDOM_SIZE_RANGE: 40,
        SHAPE_SCALE: 1,
        MOVE_SPEED_COEFF: 1.2,
        ROTATE_SPEED_COEFF: 0.02,
        STROKE_STYLE: 'rgba(255,255,255,0.3)',
        STROKE_WIDTH: 1.5
    };

    // ====================== 【图形顶点常量】 ======================
    const hFactor = Math.sqrt(3) / 2;
    const SHAPE_VERTICES = {
        RECT: [
            { x: -1, y: -1 },{ x: 1, y: -1 },
            { x: 1, y: 1 },{ x: -1, y: 1 }
        ],
        TRIANGLE: [
            { x: 0,    y: -hFactor * 2/3 },
            { x: -1,   y:  hFactor * 1/3 },
            { x: 1,    y:  hFactor * 1/3 }
        ],
        HEXAGON: (()=>{
            const pts=[];
            for(let i=0;i<6;i++){
                const a = (Math.PI/3)*i - Math.PI/2;
                pts.push({x:Math.cos(a),y:Math.sin(a)});
            }
            return pts;
        })(),
        DIAMOND: [
            {x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}
        ]
    };

    // ====================== 【颜色组（可无限增加）】 ======================
    const colorGroups = [
        // 组 0：暖色调
        [
            'rgba(200, 0, 0, 1)',
            'rgba(220, 80, 0, 1)',
            'rgba(220, 180, 0, 1)',
            'rgba(230, 100, 160, 1)',
            'rgba(180, 60, 30, 1)',
            'rgba(240, 120, 30, 1)',
            'rgba(180, 0, 0, 1)',
            'rgba(250, 210, 90, 1)'
        ],
        // 组 1：冷色调
        [
            'rgba(0, 80, 200, 1)',
            'rgba(0, 130, 160, 1)',
            'rgba(70, 0, 180, 1)',
            'rgba(0, 150, 80, 1)',
            'rgba(20, 60, 140, 1)',
            'rgba(80, 180, 210, 1)',
            'rgba(100, 0, 200, 1)',
            'rgba(0, 100, 100, 1)'
        ]
        // 可继续添加更多组
    ];

    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width, height;

    class Shape {
        constructor() { this.reset(); }
        reset() {
            // 类型范围现在为 0~4（5种）
            this.type = Math.floor(Math.random() * 5);
            this.size = (CANVAS_CONFIG.BASE_SIZE + Math.random() * CANVAS_CONFIG.RANDOM_SIZE_RANGE) * CANVAS_CONFIG.SHAPE_SCALE;
            this.x = this.size + Math.random() * (width - this.size * 2);
            this.y = this.size + Math.random() * (height - this.size * 2);
            this.vx = (Math.random() - 0.5) * CANVAS_CONFIG.MOVE_SPEED_COEFF;
            this.vy = (Math.random() - 0.5) * CANVAS_CONFIG.MOVE_SPEED_COEFF;

            const groupIndex = Math.floor(Math.random() * colorGroups.length);
            const selectedGroup = colorGroups[groupIndex];
            this.color = selectedGroup[Math.floor(Math.random() * selectedGroup.length)];

            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * CANVAS_CONFIG.ROTATE_SPEED_COEFF;
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
            ctx.strokeStyle = CANVAS_CONFIG.STROKE_STYLE;
            ctx.lineWidth = CANVAS_CONFIG.STROKE_WIDTH;
            ctx.beginPath();

            if (this.type === CANVAS_CONFIG.SHAPE_TYPES.CIRCLE) {
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            } else {
                let verts;
                switch(this.type){
                    case CANVAS_CONFIG.SHAPE_TYPES.TRIANGLE: verts = SHAPE_VERTICES.TRIANGLE; break;
                    case CANVAS_CONFIG.SHAPE_TYPES.RECT: verts = SHAPE_VERTICES.RECT; break;
                    case CANVAS_CONFIG.SHAPE_TYPES.HEXAGON: verts = SHAPE_VERTICES.HEXAGON; break;
                    case CANVAS_CONFIG.SHAPE_TYPES.DIAMOND: verts = SHAPE_VERTICES.DIAMOND; break;
                }
                verts.forEach((p, i)=>{
                    const px = p.x * this.size;
                    const py = p.y * this.size;
                    i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
                });
                ctx.closePath();
            }

            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }

    const shapes = [];
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < CANVAS_CONFIG.SHAPE_COUNT; i++) {
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
                    a.x += moveX; a.y += moveY;
                    b.x -= moveX; b.y -= moveY;

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

// ========== 初始化 ==========
createStyle();
renderPage();
bindEvent();
bindSubTabEvents();
initCanvasAnimation();
