//global variables
const BASE_URL = "http://localhost:3000"
const ramenu = document.querySelector("#ramen-menu")
const detail = document.querySelector("#ramen-detail")
const rImage = detail.querySelector(".detail-image")
const rName = detail.querySelector(".name")
const rRestaurant = detail.querySelector(".restaurant")
const rating = document.querySelector("#rating-display")
const comment = document.querySelector("#comment-display")
const rForm = document.querySelector('#new-ramen')



//start-up routine
document.addEventListener("DOMContentLoaded", () => {
    fetch(BASE_URL + "/ramens")
    .then(res => res.json())
    .then(data => data.forEach(ramen => {
        ramenu.innerHTML += `<img id="${ramen.id}" src="${ramen.image}">`
    }))
    ramenu.addEventListener("click", getRamenDetails)
    rForm.addEventListener("submit", newRamen)
})

function getRamenDetails(e) {
    fetch(BASE_URL + `/ramens/${e.target.id}`)
    .then(res => res.json())
    .then(data => {
        rImage.src = data.image
        rName.innerText = data.name
        rRestaurant.innerText = data.restaurant
        rating.innerText = data.rating
        comment.innerText = data.comment

    })
}

function newRamen(e) {
    e.preventDefault();
    let newName = e.target["new-name"].value
    let newRes = e.target["new-restaurant"].value
    let newImg = e.target["new-image"].value
    let newRating = e.target["new-rating"].value
    let newComment = e.target["new-comment"].value

    fetch(BASE_URL + "/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: newName,
            restaurant: newRes,
            image: newImg,
            rating: parseInt(newRating),
            comment: newComment
         })
    })
    .then(res => res.json())
    .then(ramen => {
        ramenu.innerHTML += `<img id="${ramen.id}" src="${ramen.image}">`
    })
    rForm.reset()
}