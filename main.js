function initCanvasAnimation() {
    // ====================== 【核心常量配置区】 ======================
    const CANVAS_CONFIG = {
        SHAPE_TYPES: { CIRCLE: 0, TRIANGLE: 1, RECT: 2 },
        SHAPE_COUNT: 20,
        BASE_SIZE: 20,
        RANDOM_SIZE_RANGE: 40,
        SHAPE_SCALE: 1,        // 全局缩放系数
        MOVE_SPEED_COEFF: 1.2,
        ROTATE_SPEED_COEFF: 0.02,
        STROKE_STYLE: 'rgba(255,255,255,0.3)',
        STROKE_WIDTH: 1.5
    };

    // ====================== 【常量存点：和原版形状完全一致的顶点】 ======================
    // 三角形：严格复刻原版尺寸比例
    const hFactor = Math.sqrt(3) / 2;
    const SHAPE_VERTICES = {
        RECT: [
            { x: -1, y: -1 },
            { x: 1, y: -1 },
            { x: 1, y: 1 },
            { x: -1, y: 1 }
        ],
        TRIANGLE: [
            { x: 0,    y: -hFactor * 2/3 },
            { x: -1,   y:  hFactor * 1/3 },
            { x: 1,    y:  hFactor * 1/3 }
        ]
    };

    // 至上主义颜色池
    const colors = [
        'rgba(0, 0, 0, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(200, 0, 0, 1)',
        'rgba(0, 80, 200, 1)',
        'rgba(220, 180, 0, 1)',
        'rgba(230, 100, 160, 1)',
        'rgba(180, 0, 0, 1)',
        'rgba(0, 0, 0, 1)'
    ];
    // =================================================================

    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width, height;

    class Shape {
        constructor() { this.reset(); }
        reset() {
            this.type = Math.floor(Math.random() * 3);
            this.size = (CANVAS_CONFIG.BASE_SIZE + Math.random() * CANVAS_CONFIG.RANDOM_SIZE_RANGE) * CANVAS_CONFIG.SHAPE_SCALE;
            this.x = this.size + Math.random() * (width - this.size * 2);
            this.y = this.size + Math.random() * (height - this.size * 2);
            this.vx = (Math.random() - 0.5) * CANVAS_CONFIG.MOVE_SPEED_COEFF;
            this.vy = (Math.random() - 0.5) * CANVAS_CONFIG.MOVE_SPEED_COEFF;
            this.color = colors[Math.floor(Math.random() * colors.length)];
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

            // 圆形：保留原生 arc 绘制（原版不变）
            if (this.type === CANVAS_CONFIG.SHAPE_TYPES.CIRCLE) {
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            }
            // 三角/矩形：用常量顶点绘制，实心填充
            else {
                const verts = this.type === CANVAS_CONFIG.SHAPE_TYPES.TRIANGLE ? SHAPE_VERTICES.TRIANGLE : SHAPE_VERTICES.RECT;
                verts.forEach((p, i) => {
                    const px = p.x * this.size;
                    const py = p.y * this.size;
                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                });
                ctx.closePath();
            }

            // 先填充、再描边，保证实心，不是只有线
            ctx.fill();
            //ctx.stroke();
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
