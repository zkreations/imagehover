const loadScript = (src) => new Promise((resolve, reject) => {
  let script = document.createElement('script')
  script.src = src
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

const copied = (button) => {
  let restore = button.innerText

  button.innerText = "Copied!"
  setTimeout(function () {
    button.innerText = restore
  }, 2000);
}

const copyCode =  (clipboard, blocks) => {
  blocks.forEach(function (el) {
    const button = el.querySelector(".copy-name")

    button.onclick = () => {
      clipboard.writeText(button.innerText).then(function () {
        copied(button)
      });
    }
  });
}


const blocks = document.querySelectorAll(".column")

if (navigator && navigator.clipboard) {
  copyCode(navigator.clipboard, blocks)
} else {
  loadScript('https://cdn.jsdelivr.net/npm/clipboard-polyfill@3/dist/main/clipboard-polyfill.min.js')
    .then(() => {
      copyCode(clipboard, blocks)
    })
    .catch(console.error)
}