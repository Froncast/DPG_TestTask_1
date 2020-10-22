const form = document.querySelector('.form')

const formValidate = formData => {
	const invalidFields = []
	const rules = {
		name: {
			pattern: new RegExp(`(^[а-яё -]{3,50})$`, 'ig')
		},
		company: {
			pattern: new RegExp(`(^[а-яёa-z-\s]{3,50})$`, 'ig')
		},
		email: {
			pattern: new RegExp('[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}', 'ig')
		},
		message: {
			pattern: new RegExp('(^[а-яё -]{10,250})$', 'ig')
		}
	}

	formData.forEach((val, key) => {
		if (rules[key]) {
			if (!val.match(rules[key].pattern)) {
				invalidFields.push(key);
			}
		}

		if (key === 'subject' && val.length > 0) {
			const pattern = new RegExp(`(^[а-яёa-z -]{3,50})$`, 'ig')
			if (!pattern.test(val)) invalidFields.push(key)
		}

		if (key === 'phone' && val.length > 0) {
			const pattern = /^((8|\+7)[\-]?)?(\(?\d{3}\)?[\-]?)?[\d\-]{7,10}$/g
			if (!pattern.test(val)) invalidFields.push(key)
		}
	})

	return invalidFields;
}

form.addEventListener('submit', e => {
	e.preventDefault()
	const { target } = e
	const formData = new FormData(target)
	const fields = target.querySelectorAll('input, textarea')
	const formObj = {}

	fields.forEach(elem => elem.classList.remove('not-valid'))

	formData.forEach((val, key) => {
		formObj[key] = val
	})
	const invalidFields = formValidate(formData)
	if (invalidFields !== 0) {
		invalidFields.forEach(key => {
			target.querySelector(`input[name="${key}"], textarea[name="${key}"]`).classList.add('not-valid')
		})
	}

	const checkbox = target.querySelector('input[type="checkbox"]')
	if (checkbox) {
		if (!checkbox.checked) {
			target.querySelector(`label[for="${checkbox.getAttribute('id')}"]`).classList.add('not-valid-checkbox')
		} else {
			target.querySelector(`label[for="${checkbox.getAttribute('id')}"]`).classList.remove('not-valid-checkbox')
		}
	}
})

form.addEventListener('click', e => {
	const { target } = e
	if (target.matches('input') && target.closest('.not-valid') && target.value.length <= 0 || target.matches('textarea') && target.closest('.not-valid') && target.value.length <= 0) {
		target.classList.remove('not-valid')
	}
})