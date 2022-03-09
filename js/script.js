const btn = document.getElementById('button')
const wrapper = document.querySelector('.meal')
const mainRow = document.querySelector('.main__row')

const fetchingData = async () => {
	try {
		const res = await fetch(
			'https://www.themealdb.com/api/json/v1/1/random.php',
		)
		const data = await res.json()
		console.log(data.meals[0])
		createMeal(data.meals[0])
	} catch (err) {
		console.error(err)
	}
}
const createMeal = (meal) => {
	let ingredients = []
	for (let i = 1; i < 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
			)
		} else {
			break
		}
	}
	mainRow.style.height = 'auto'
	wrapper.innerHTML = `
    <div class="meal__row">
        <div class="meal__info info">
          <div class="info__image">
            <img src="${meal['strMealThumb']}" alt="">
          </div>
          <div class="info__categories categories">
            <ul class="categories__items">
              ${
								meal['strArea']
									? `<li class="categories__item">Area: 
                      <span>${meal['strArea']}</span>
                    </li>`
									: ''
							}
              ${
								meal['strCategory']
									? `<li class="categories__item">Category: 
                      <span>${meal['strCategory']}</span>
                    </li>`
									: ''
							}
              ${
								meal['strTags']
									? `<li class="categories__item">Tags: 
                      <span>${meal['strTags']}</span>
                    </li>`
									: ''
							}
            </ul>
          </div>
          <div class="info__ingredients ingredients">
            <h3 class="ingredients__title title">
              Ingredients:
            </h3>
            <ul class="ingredients__items ">
              ${ingredients
								.map(
									(ingredient) =>
										`<li class="ingredients__item"> ${ingredient}</li>`,
								)
								.join('')}
            </ul>
          </div>
        </div>
        <div class="meal__recipe recipe">
          ${
						meal['strMeal']
							? `<h2 class="recipe__title">
            ${meal['strMeal']}
              </h2>`
							: ''
					}
          ${
						meal['strInstructions']
							? `  <p class="recipe__instruction">
            ${meal['strInstructions']} 
            </p>`
							: ''
					}
        </div>
      </div>
      <div class="meal__video">
        <h3 class="video__title title">
          Recipe video
        </h3>
        <iframe src="https://www.youtube.com/embed/${meal['strYoutube'].slice(
					-11,
				)}" width="620" height="400" frameborder="0"></iframe>
      </div>
  `
}

btn.addEventListener('click', () => {
	fetchingData()
})
