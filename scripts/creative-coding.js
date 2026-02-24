const canvasContainer = document.getElementById("cc-canvas");

if (canvasContainer) {
  const sketch = p => {
    p.setup = () => {
      const { width, height } = canvasContainer.getBoundingClientRect();
      p.createCanvas(width, height).parent(canvasContainer);
      p.noFill();
      p.strokeWeight(1.5);
    };

    p.windowResized = () => {
      const { width, height } = canvasContainer.getBoundingClientRect();
      p.resizeCanvas(width, height);
    };

    p.draw = () => {
      p.background(248);

      const cx = p.width * 0.5;
      const cy = p.height * 0.5;
      const t = p.frameCount * 0.015;

      for (let i = 0; i < 5; i++) {
        const radius = p.width * (0.15 + i * 0.08);
        p.stroke(0, 150 - i * 20);
        p.beginShape();
        for (let a = 0; a <= p.TWO_PI + 0.02; a += 0.08) {
          const wobble = p.sin(a * 3 + t + i) * 12 + p.cos(a * 5 - t) * 8;
          const x = cx + (radius + wobble) * p.cos(a);
          const y = cy + (radius + wobble) * p.sin(a);
          p.vertex(x, y);
        }
        p.endShape();
      }
    };
  };

  new p5(sketch);
}
