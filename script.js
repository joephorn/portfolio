const introLines = [
  [{ text: "HEY," }],
  [{ text: "I AM " }, { text: "JOEP", className: "highlight" }, { text: "." }],
  [
    { text: "I DO " },
    { text: "CREATIVE CODING", className: "highlight" },
    { text: "." }
  ],
  [{ text: "WELCOME TO MY PORTFOLIO." }]
];

const introEl = document.getElementById("intro");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runIntro() {
  const charMs = 40;
  const pauseBetweenLines = 1000;

  for (let l = 0; l < introLines.length; l++) {
    const line = introLines[l];

    for (const segment of line) {
      const span = document.createElement("span");

      if (segment.className) {
        span.classList.add(segment.className);
      }

      introEl.appendChild(span);

      for (let i = 0; i < segment.text.length; i++) {
        span.textContent += segment.text[i];
        await wait(charMs);
      }
    }

    if (l < introLines.length - 1) {
      introEl.appendChild(document.createElement("br"));
      await wait(pauseBetweenLines);
    }
  }

  goToHome();
}

function goToHome() {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "work.html";
  }, 2000);
}

runIntro();
