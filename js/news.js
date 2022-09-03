
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
        <div class="row g-0">
                    <div class="col-md-4">
                        <img src= "${detail.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${detail.title}</h5>
                            <p class="text-ellipsis card-text">${detail.details}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
        `;
        newsList.appendChild(newDetail);
    });
}
