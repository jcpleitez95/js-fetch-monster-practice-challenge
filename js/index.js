let pageId = 1
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageId}`)
.then(response => response.json())
.then(data => {
    data.forEach(monster => {
        renderOneMonster(monster)
    })
})

createMonsterForm()

function renderOneMonster(monster) {
    const div = document.querySelector("#monster-container")
    div.classList.add("card")

    let h2 = document.createElement("h2")
    h2.innerText = monster.name

    let p1 = document.createElement("p")
    p1.innerText = `Age: ${monster.age}`

    let p2 = document.createElement("p")
    p2.innerText = `Description: ${monster.description}`

    div.append(h2, p1, p2)
}

function createMonsterForm() {
    const form = document.createElement('form')
    const a = document.createElement('input')
    const b = document.createElement('input')
    const c = document.createElement('input')
    const d = document.createElement('button')

    form.id = 'form'
    a.id = 'name'
    b.id = 'age'
    c.id = 'description'
    d.id = 'create-button'

    a.placeholder = 'Name'
    b.placeholder = 'Age'
    c.placeholder= 'Description'
    d.innerHTML = 'Create'

    form.append(a, b, c, d)
    document.querySelector('#create-monster').append(form)
    form.addEventListener('submit', (event) => {
        event.preventDefault
        postMonster(event)
    })
}

function postMonster(event) {
    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            "name": event.target.name.value,
            "age": event.target.age.value,
            "description": event.target.description.value
        })
    })
    .then(response => response.json())
    .then(monsterObj => renderOneMonster(monsterObj))
}

const forward = document.querySelector('#forward')
const back = document.querySelector('#back')

forward.addEventListener('click', () => {
    pageId++
    monsterPage()
})

back.addEventListener('click', () => {
    if (pageId > 1) {
        pageId--
    }
    else {
        pageId = 1
    }
    monsterPage()
})

function monsterPage() {
    monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ''
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageId}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(monster => {
            renderOneMonster(monster)
        })
    })
}