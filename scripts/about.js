let sleepIntervalId = null;

function typeHTML(el, html, speed = 30, callback) {
  el.innerHTML = '';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const nodes = Array.from(temp.childNodes);

  let nodeIndex = 0;

  function typeNode(node, parent, done) {
    if (node.nodeType === Node.TEXT_NODE) {
      let i = 0;
      const text = node.textContent;

      function typeChar() {
        if (i < text.length) {
          parent.appendChild(document.createTextNode(text[i]));
          i++;
          setTimeout(typeChar, speed);
        } else {
          done();
        }
      }

      typeChar();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = document.createElement(node.tagName);
      for (const attr of node.attributes) {
        clone.setAttribute(attr.name, attr.value);
      }
      parent.appendChild(clone);

      const children = Array.from(node.childNodes);
      let childIndex = 0;

      function typeChildren() {
        if (childIndex < children.length) {
          typeNode(children[childIndex], clone, () => {
            childIndex++;
            typeChildren();
          });
        } else {
          done();
        }
      }

      typeChildren();
    }
  }

  function typeNext() {
    if (nodeIndex < nodes.length) {
      typeNode(nodes[nodeIndex], el, () => {
        nodeIndex++;
        typeNext();
      });
    } else if (callback) {
      callback();
    }
  }

  typeNext();
}

function startSleepTyping(startTime) {
  const sleepEl = document.getElementById('extra-text');
  if (!sleepEl) return;

  const elapsed = Math.floor((Date.now() - startTime) / 60);
  sleepEl.textContent = 'j'.repeat(elapsed);

  clearInterval(sleepIntervalId);
  sleepIntervalId = setInterval(() => {
    sleepEl.textContent += 'j';
  }, 60);
}

function typeAllParagraphs() {
  const preCursor = document.querySelector('.cursor');
  if (preCursor) preCursor.remove();

  const paragraphs = Array.from(document.querySelectorAll('#type p'));
  const htmls = paragraphs.map(p => p.innerHTML);

  paragraphs.forEach(p => p.classList.add('hidden'));

  let i = 0;
  function next() {
    if (i >= paragraphs.length) {
      setTimeout(() => {
        window.startTime = Date.now();
        startSleepTyping(window.startTime);
      }, 600);
      return;
    }

    const p = paragraphs[i];
    p.innerHTML = '';
    p.classList.remove('hidden');

    typeHTML(p, htmls[i], 17, () => {
      i++;
      next();
    });
  }

  next();
}

window.addEventListener('DOMContentLoaded', () => {
  if (!document.body || document.body.id !== 'about') return;

  const video = document.getElementById('about-video');
  let alreadyTyped = false;

  const triggerTyping = () => {
    if (alreadyTyped) return;
    alreadyTyped = true;
    typeAllParagraphs();
  };

  if (!video) {
    triggerTyping();
    return;
  }

  video.play().catch(() => {});
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= 4) {
      triggerTyping();
    }
  });
  video.addEventListener('error', triggerTyping, { once: true });

  setTimeout(triggerTyping, 5000);
});
