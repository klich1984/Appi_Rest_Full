const d = document,
	$tbody = d.querySelector('tbody'),
	$modal = d.getElementById('modal-article'),
	$modalArticle = new bootstrap.Modal($modal),
	$form = d.querySelector('form'),
	$description = d.getElementById('description'),
	$price = d.getElementById('price'),
	$stock = d.getElementById('stock'),
	$buttonCreate = d.getElementById('btn-create'),
	URL = 'http://localhost:3000/api/articulos/'

let results = '',
	option = ''

d.addEventListener('click', (e) => {
	// if the event is a button to create
	if (e.target.matches('#btn-create')) {
		$description.value = ''
		$price.value = ''
		$stock.value = ''
		// recomendade for Bootstrap
		$modalArticle.show()
		// option to know if we are going to create or edit
		option = 'crear'
	}
})

// Show articles
const getShow = (articles) => {
	// $fragment = d.createDocumentFragment()
  console.log('articulos: ', articles);
	articles.forEach((article) => {
		results += `
    <tr>
      <td>${article.id}</td>
      <td>${article.description}</td>
      <td>${article.price}</td>
      <td>${article.stock}</td>
      <td class="text-center">
        <a class="btn-edit btn btn-primary">Editar</a>
        <a class="btn-erase btn btn-danger">Borrar</a>
      </td>
  </tr>
    `
	})
  $tbody.innerHTML = results
}

// Petition the articles
fetch(URL)
	.then((response) => response.json())
	.then((data) => getShow(data))
	.catch((error) => {
		let msg = error.statusText || 'Ocurrio el siguiente error'
		console.log(`Error: ${error.status}: ${msg} ${error}`)
	})
