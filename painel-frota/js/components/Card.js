export function Card({
  title = "",
  content = "",
  actions = ""
}){

  return `
    <section class="card">

      <h2 style="position:relative; text-align:center;">

        ${title}

        ${
          actions
          ? `<div class="card-actions">${actions}</div>`
          : ""
        }

      </h2>

      ${content}

    </section>
  `;
}
