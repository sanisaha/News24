
const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
}
const displayNewsCategory = categories => {
    const newsCategory = document.getElementById("news-category");
    categories.forEach(category => {
        const newButton = document.createElement("button");
        newButton.classList.add("btn");
        newButton.classList.add("btn-info");
        newButton.setAttribute("id", `${category.category_id}`);
        newButton.innerText = `${category.category_name}`;
        newButton.onclick = function () {
            const url = `https://openapi.programming-hero.com/api/news/category/${category.category_id}`;
            fetch(url)
                .then(res => res.json())
                .then(data => displayDetails(data.data))
        };
        newsCategory.appendChild(newButton);
    })
};
loadNews();

const displayDetails = details => {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ``;
    details.forEach(detail => {
        console.log(detail);
        const newDetail = document.createElement("div");
        newDetail.classList.add("card");
        newDetail.innerHTML = `
        <div class="row">
                    <div class="col-md-4">
                        <img src= "${detail.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${detail.title}</h5>
                            <p class="text-ellipsis card-text">${detail.details}</p>
                            <img src = "${detail.author.img}" class="d-inline small rounded-circle"></img>
                            <p class = "d-inline">${detail.author.name} <span class = "ms-5">${detail.total_view}</span><button class = "mx-5">more</button><p>
                            
                            
                    </div>
                </div>
        `;
        newsList.appendChild(newDetail);
    });
}
