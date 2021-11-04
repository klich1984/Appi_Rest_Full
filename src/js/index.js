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
	option = '',
	idForm = 0

// Add event click a document
d.addEventListener('click', (e) => {
	// if the event is a button to create
	if (e.target.matches('#btn-create')) {
		$description.value = ''
		$price.value = ''
		$stock.value = ''
		// active modal, recomendade for Bootstrap
		$modalArticle.show()
		// option to know if we are going to create or edit
		option = 'create'
	}

	// if the event is a button to delete, an article will be deleted
	if (e.target.matches('.btn-erase')) {
		handlerDelete(e)
	}

	// if the event is a button to edit, an article will be edited
	if (e.target.matches('.btn-edit')) {
		handlerEdit(e)
	}
})

// // Add event the form
// $form.addEventListener('submit', (e) => {
// 	e.preventDefault()
//   console.log('hiciste clic');
// 	if (option === 'create') {
// 		console.log('Vamos a crear un articulo')
// 	}
// 	if (option === 'edit') {
// 		console.log('Vamos a editar un articulo')
// 	}
// 	// Close modal
// 	$modalArticle.hide()
// })

// Add event submit a document
d.addEventListener('submit', (e) => {
	if (e.target.matches('form')) {
		e.preventDefault()
		if (option === 'create') {
			// console.log('Vamos a crear un articulo')
			fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					description: description.value,
					price: price.value,
					stock: stock.value,
				})
			})
				.then((response) => response.json())
				.then((data) => {
					const newArticle = []
					newArticle.push(data)
					getShow(newArticle)
				})
		}
		if (option === 'edit') {
			console.log('Vamos a editar un articulo')
			fetch(URL + idForm, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					description: description.value,
					price: price.value,
					stock: stock.value,
				})
			})
      .then( response => response.json() )
      .then( response => location.reload() )
		}
		// Close modal
		$modalArticle.hide()
	}
})

// Procces Delete article
const handlerDelete = (e) => {
	const row = e.target.parentNode.parentNode,
		id = row.firstElementChild.innerHTML
	// code of the alertify framework
	alertify.confirm(
		'This is a confirm dialog.',
		function () {
			// console.log(`${URL}${id}`);
			fetch(URL + id, {
				method: 'DELETE',
			})
				.then((response) => response.json())
				.then(() => location.reload()) // Reload the app
			// alertify.success('Ok')
		},
		function () {
			alertify.error('Cancel')
		}
	)
}

// Procces Edit article
const handlerEdit = (e) => {
	// Select all row of the table and save each value in a variable
	const row = e.target.parentNode.parentNode,
		descriptionForm = row.children[1].innerHTML,
		priceForm = row.children[2].innerHTML,
		stockForm = row.children[3].innerHTML
	idForm = row.children[0].innerHTML
	// console.log(idForm, descriptionForm, priceForm, stockForm)

	$description.value = descriptionForm
	$price.value = priceForm
	$stock.value = stockForm
	// option to know if we are going to create or edit
	option = 'edit'
	// Active modal whit bootstrap
	$modalArticle.show()
}

// Procces Show articles
const getShow = (articles) => {
	// $fragment = d.createDocumentFragment()
	// console.log('articulos: ', articles)
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

// Method erase
