console.log('Write your code here');
const url = 'http://localhost:3000/current-exhibits'
let exhbCopy = {}

const form = getElement('#comment-form')
const commentsSection = getElement('#comments-section')
const ticketBtn = getElement('#buy-tickets-button')
const exhbTitle = getElement('#exhibit-title')
const exhbImage = getElement('#exhibit-image')
const ticketsCount = getElement('#tickets-bought')
const exhbDescription = getElement('#exhibit-description')

// getExhibits().then(data => console.log(data))
getExhibits().then(data => {
  renderExhbDetails(data[0])
  addTicketCountListener()
  handleForm()
})

function getExhibits(){
  return fetch(url)
  .then(res => res.json())
}

function updateExhibit(upData){
  console.log(url + `/${upData.id}`)
  console.log(upData)
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(upData)
  }
  return fetch(url + `/${upData.id}`, options)
  .then(res => res.json())
}

function renderExhbDetails(exhb){
  exhbCopy = exhb

  exhbTitle.textContent = exhb.title
  exhbImage.src = exhb.image
  exhbDescription.textContent = exhb.description
  ticketsCount.textContent = exhb.tickets_bought + ' Tickets Bought'
  
  showComments(exhb.comments)
}

function showComments(comments){
  commentsSection.innerHTML = ""
  comments.forEach(comment => addComment(comment))
}

function addComment(comment) {
  const pElement = createElement('p')
  pElement.textContent = comment
  commentsSection.append(pElement)
}

function handleForm(){
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    pushComment(e.target['comment-input'].value)
    form.reset()// e.target[0].value
  })
}

function pushComment(comment){
  exhbCopy.comments.push(comment)
  
  updateExhibit(exhbCopy).then(upData => {
    console.log("res data: ", upData)
    renderExhbDetails(upData)
  })
}

function addTicketCountListener(){
  ticketBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addTicketCount()
  })
}

function addTicketCount() {
  exhbCopy.tickets_bought++
  getElement('#tickets-bought').textContent = exhbCopy.tickets_bought + ' Tickets Bought'

  updateExhibit(exhbCopy).then(upData => {
    console.log("res data: ", upData)
    renderExhbDetails(upData)
  }) //renderExhbDetails(data)
}

function getElement(el){
  return document.querySelector(el)
}
function createElement(el){
  return document.createElement(el)
}