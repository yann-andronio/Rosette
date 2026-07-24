/**
 * Utilitaire d'impression pour l'application Rosette.
 * Imprime tout élément HTML via un iframe masqué tout en conservant
 * l'intégralité des styles CSS (Tailwind, CSS tokens, balises style/link) de la page.
 */
export const printElement = (element: HTMLElement | null) => {
  if (!element) return

  const printContents = element.innerHTML
  if (!printContents) return

  // Récupération de tous les styles (Tailwind, main.css, etc.)
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((el) => el.outerHTML)
    .join('\n')

  // Nettoyage d'une ancienne iframe si présente
  const existingIframe = document.getElementById('print-iframe-helper')
  if (existingIframe) existingIframe.remove()

  // Création de l'iframe masquée
  const iframe = document.createElement('iframe')
  iframe.id = 'print-iframe-helper'
  iframe.style.position = 'fixed'
  iframe.style.top = '-9999px'
  iframe.style.left = '-9999px'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument || iframe.contentWindow?.document
  if (!doc) return

  doc.open()
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Impression</title>
        ${styles}
        <style>
          @page {
            margin: 1.5cm 1cm;
            size: A4;
          }
          body {
            margin: 0;
            padding: 1rem;
            background: white !important;
            color: #111827 !important;
            font-family: 'Inter', system-ui, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 1rem;
          }
          th, td {
            border: 1px solid #d1d5db !important;
            padding: 8px 12px !important;
            font-size: 0.875rem !important;
          }
          th {
            background-color: #895256 !important;
            color: white !important;
            font-weight: 600 !important;
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `)
  doc.close()

  // Exécution de l'impression une fois le contenu et styles chargés
  setTimeout(() => {
    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()
    setTimeout(() => iframe.remove(), 1000)
  }, 250)
}
