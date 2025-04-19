const pre = document.getElementById("bouncingPre");
let x = 500, y = 60;  // 초기 위치
let dx = 20, dy = 20;    // 속도 (방향)
const speed = 1;       // 속도 조절


const messages = [
  ["",
      " .-''''-.",
      " ( o  o )",
      " (  --  )",
      " /     ╲",
      "(  U  U  )",
      "  ''''''  "
  ].join("\n"), // 줄바꿈 포함된 문자열로 변환

  ["",
      " .-''''-.",
      " ( o  o )",
      "(   --   )",
      " /     ╲",
      "(  U  U  )",
      "  ''''''  "
  ].join("\n"),

  [
      " .-''''-.",
      " ( o  o )",
      " (      )",
      " (  --  )",
      " /     ╲",
      "(  U  U  )",
      "  ''''''  "
  ].join("\n")
];

let currentIndex = 0; // 현재 문장 인덱스

function movePre() {
    console.log("it moved");
    const maxX = window.innerWidth - pre.clientWidth;
    const maxY = window.innerHeight - pre.clientHeight;

    x += dx;
    y += dy;


    
    // 벽에 닿으면 방향 반전
    if (x <= 0 || x >= maxX) dx *= -1;
    if (y <= 0 || y >= maxY) dy *= -1;

    pre.style.left = x + "px";
    pre.style.top = y + "px";

    
    setTimeout(() => requestAnimationFrame(movePre), 500);
}

function changeMessage() {
  currentIndex = (currentIndex + 1) % messages.length;
  pre.textContent = messages[currentIndex]; // 기존 innerHTML → textContent 변경
}

document.addEventListener("DOMContentLoaded", () => {
    movePre();
    setInterval(changeMessage, 500); // 2초마다 문장 변경
});

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      console.log('Print prevented');
  }
});
