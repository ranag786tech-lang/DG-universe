const features = [];
let rotationAngle = 0;

async function init() {
    const response = await fetch('features.json');
    const data = await response.json();
    features.push(...data);

    createStars();
    createNodes();
    animateNodes();
}

function createStars() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 200;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) star.y = 0;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function createNodes() {
    const grid = document.getElementById('nexus-grid');
    grid.innerHTML = '';

    features.forEach((feature, index) => {
        const node = document.createElement('div');
        node.className = 'node';
        node.innerText = feature.key;
        node.id = 'node-' + feature.key;
        node.onclick = () => showInfo(feature);
        grid.appendChild(node);
    });
}

function animateNodes() {
    const nodes = document.querySelectorAll('.node');
    if (!nodes.length || !features.length) {
        requestAnimationFrame(animateNodes);
        return;
    }
    const radius = 350;

    rotationAngle += 0.002; // Orbit speed

    nodes.forEach((node, index) => {
        const angle = (index / features.length) * Math.PI * 2 + rotationAngle;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        node.style.left = `calc(50% + ${x}px - 20px)`;
        node.style.top = `calc(50% + ${y}px - 20px)`;

        // Slight perspective scaling
        const scale = 1 + Math.sin(angle) * 0.2;
        node.style.transform = `scale(${scale})`;
        node.style.zIndex = Math.round(scale * 10);
        node.style.opacity = 0.5 + (scale - 0.8);
    });

    requestAnimationFrame(animateNodes);
}

function showInfo(feature) {
    document.getElementById('info-title').innerText = feature.name;
    document.getElementById('info-ceremonial').innerText = feature.ceremonial;
    document.getElementById('info-technical').innerText = feature.technical;
    document.getElementById('info-panel').classList.remove('hidden');
}

function closeInfo() {
    document.getElementById('info-panel').classList.add('hidden');
}

window.onresize = () => {
    const canvas = document.getElementById('stars');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};

init();
