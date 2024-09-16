function MatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    const letters =
        "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKL?:!@#%#*(&*!!@MNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ".split(
            ""
        );
    const fontSize = 15; // Tamanho da fonte fixo em pixels
    const columns = 15;
    const canvasSize = { width: window.innerWidth, height: window.innerHeight };
    const columnWidth = Math.floor(canvasSize.width / columns);
    const drops = Array.from({ length: columns }, (_, i) => ({
        x: i * columnWidth,
        y: Math.floor(Math.random() * -canvasSize.height),
        speed: Math.random() * 2 + 1,
        length: Math.floor(Math.random() * 20) + 1,
    }));

    function resizeCanvas() {
        canvasSize.width = window.innerWidth;
        canvasSize.height = window.innerHeight;
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
    }

    function draw() {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        ctx.fillStyle = "#6F62A5";
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((drop) => {
            for (let j = 0; j < drop.length; j++) {
                const opacity = j / drop.length;
                ctx.fillStyle = `rgba(111, 98, 165, ${opacity})`;
                const text = letters[Math.floor(Math.random() * letters.length)];
                const x = drop.x;
                const y = drop.y + j * fontSize;
                ctx.fillText(text, x, y);
            }

            drop.y =
                drop.y >= canvasSize.height
                    ? -drop.length * fontSize
                    : drop.y + drop.speed;
        });
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const intervalId = setInterval(draw, 20);

    return () => clearInterval(intervalId);
}

MatrixRain();