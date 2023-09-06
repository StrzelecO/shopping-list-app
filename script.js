let searchInput;
let showNewProductPanelBtn;
let removeAllBtn;
let addNewProductBtn;
let closeNewProductPanelBtn;

let newProductPanel;
let info;
let ulListconst;

let nameInput;
let categoryInput;

let checkedBtn;
let removeBtn;

let iconClassCategory;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	searchInput = document.querySelector('.searchEngine');
	showNewProductPanelBtn = document.querySelector('.fa-plus');
	removeAllBtn = document.querySelector('.fa-trash-can-arrow-up');
	addNewProductBtn = document.querySelector('.add-new');
	closeNewProductPanelBtn = document.querySelector('.close');

	newProductPanel = document.querySelector('.new-product-panel');
	info = document.querySelector('.info');
	ulList = document.querySelector('ul');

	nameInput = document.querySelector('.name');
	categoryInput = document.querySelector('.category');

	checkedBtn = document.querySelectorAll('.check-btn');
	removeBtn = document.querySelectorAll('.remove-btn');
};

const prepareDOMEvents = () => {
	showNewProductPanelBtn.addEventListener('click', showNewProductPanel);
	closeNewProductPanelBtn.addEventListener('click', hideNewProductPanel);
	removeAllBtn.addEventListener('click', removeAllProducts);
	addNewProductBtn.addEventListener('click', checkInputs);
	searchInput.addEventListener('keyup', searchProduct);
	ulList.addEventListener('click', productOperation);
};

const showNewProductPanel = () => {
	newProductPanel.style.display = 'flex';
};

const hideNewProductPanel = () => {
	newProductPanel.style.display = 'none';
	nameInput.value = '';
	categoryInput.value = '0';
	info.textContent = '';
};

const checkInputs = () => {
	if (nameInput.value == '' || categoryInput.value == '0') {
		info.textContent = 'You have to fill all fields';
		info.style.color = 'tomato';
	} else {
		addNewProduct();
	}
};

const setIconCategory = () => {
	switch (categoryInput.value) {
		case 'food and drink':
			iconClassCategory = 'fa-utensils';
			break;
		case 'clothes and shoes':
			iconClassCategory = 'fa-socks';
			break;
		case 'hygiene':
			iconClassCategory = 'fa-pump-soap';
			break;
		case 'electronics':
			iconClassCategory = 'fa-plug';
			break;
		case 'entertainment':
			iconClassCategory = 'fa-film';
			break;
		case 'other':
			iconClassCategory = 'fa-money-bill';
			break;
	}
};

const addNewProduct = () => {
	setIconCategory();
	const newProduct = document.createElement('li');
	const iconAndNameDiv = document.createElement('div');
	const p = document.createElement('p');
	const i = document.createElement('i');
	iconAndNameDiv.classList.add('icon-name');

	i.classList.add('fa-solid');
	i.classList.add(iconClassCategory);
	i.textContent = ' - ';

	p.classList.add('product-name');
	p.textContent = `${nameInput.value}`;

	iconAndNameDiv.append(i, p);

	const btnsDiv = document.createElement('div');
	btnsDiv.classList.add('product-btns');
	btnsDiv.innerHTML = `
    <button class="check-btn"><i class="fa-solid fa-check"></i></button>
    <button class="remove-btn"><i class="fa-solid fa-xmark"></i></button>`;

	newProduct.append(iconAndNameDiv, btnsDiv);
	ulList.append(newProduct);

	hideNewProductPanel();
};

const removeAllProducts = () => {
	hideNewProductPanel();
	info.textContent = 'There are no products on the list...';
	ulList.textContent = '';
};

const searchProduct = () => {
	const allProducts = document.querySelectorAll('.product-name');
	allProducts.forEach(p => {
		const match = new RegExp(searchInput.value, 'i').test(p.textContent);

		if (!match) {
			p.closest('li').style.display = 'none';
		} else {
			p.closest('li').style.display = 'flex';
		}
	});
};

const markDone = e => {
	const icon = e.target;
	icon.parentElement.style.cursor = 'unset';
	icon.style.color = 'rgb(40, 145, 40)';
	icon.style.scale = '.8';
	icon.classList.remove('active');
	const productName =
		icon.parentElement.parentElement.parentElement.firstElementChild
			.lastElementChild;
	productName.classList.add('checked');
};

const removeProduct = e => {
	e.target.closest('li').remove();
};

const productOperation = e => {
	if (e.target.classList.contains('fa-check')) {
		markDone(e);
	}
	if (e.target.classList.contains('fa-xmark')) {
		removeProduct(e);
	}
};

document.addEventListener('DOMContentLoaded', main);
