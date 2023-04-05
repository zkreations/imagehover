const loadScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

const copied = (content, message) => {
  const text = content.querySelector('.copy-name')

  if (!content) {
    return
  }

  content.classList.add('copied')
  text.innerText = message.action

  // Cancelar el temporizador anterior (si existe)
  if (content.timeoutId) {
    clearTimeout(content.timeoutId)
  }

  // Crear un nuevo temporizador
  content.timeoutId = setTimeout(function () {
    content.classList.remove('copied')
    text.innerText = message.original
    content.timeoutId = null // Limpiar el id del temporizador
  }, 2000)
}

const copyCode = (clipboard, blocks) => {
  blocks.forEach(function (el) {
    const button = el.querySelector('.copy-name')
    const effectName = button.innerText

    button.onclick = () => {
      clipboard.writeText(effectName).then(function () {
        copied(el, {
          action: 'Copied!',
          original: effectName
        })
      })
    }
  })
}

const blocks = document.querySelectorAll('.column')

if (navigator && navigator.clipboard) {
  copyCode(navigator.clipboard, blocks)
} else {
  loadScript('https://cdn.jsdelivr.net/npm/clipboard-polyfill@3/dist/main/clipboard-polyfill.min.js')
    .then(() => {
      // eslint-disable-next-line no-undef
      copyCode(clipboard, blocks)
    })
    .catch(console.error)
}
