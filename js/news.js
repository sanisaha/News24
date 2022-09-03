
const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayNewsCategory(data.data.news_category))
    }
    catch (error) {
        console.log(error);
    }
}
const displayNewsCategory = categories => {
    const newsCategory = document.getElementById("news-category");
    categories.forEach(category => {
        const newButton = document.createElement("button");
        newButton.classList.add("btn");
        newButton.setAttribute("id", `${category.category_id}`);
        newButton.innerText = `${category.category_name}`;
        newButton.onclick = function () {
            toggleSpinner(true);
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
    const newsInfo = document.getElementById("itemNumber");
    newsInfo.innerText = "";
    if (details.length > 0) {
        newsInfo.innerText = `${details.length} items have been found in this sesction`
    } else {
        newsInfo.innerText = `No news available in this section`
    }
    details.sort((a, b) => b.total_view - a.total_view);
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ``;
    details.forEach(detail => {
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
                            <p class = "d-inline">${detail.author.name ? detail.author.name : "author name unavailable"} <span class = "ms-5">${detail.total_view ? detail.total_view : "total views unavialable"}</span><button href="" onclick = "getDetails('${detail._id}')" type="button" class = "btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">more details</button><p>
                            
                            
                    </div>
                </div>
        `;
        newsList.appendChild(newDetail);
    });
    toggleSpinner(false);
}
const getDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayInfo(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}
const displayInfo = news => {
    const newsDetail = document.getElementById("newsDetail");
    newsDetail.innerText = ``;
    const newsDetailContainer = document.getElementById("news-information");
    newsDetailContainer.innerText = "";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <ul>
    <li>Author Name: ${news.author.name ? news.author.name : "author name unavailble"}</li>
    <li>Total View: ${news.total_view ? news.total_view : "total viewer number missing"}</li>
    <li>Rating: ${news.rating.number}</li>
    <li>Published Date: ${news.published_date ? news.published_date : "published date not available"}
    </li>
    </ul>
    <img src = "${news.thumbnail_url}"></img>
    `;
    newsDetailContainer.appendChild(newDiv);
}

const toggleSpinner = isLoading => {
    const displaySpinner = document.getElementById("loading");
    if (isLoading) {
        displaySpinner.classList.remove("d-none");
    }
    else {
        displaySpinner.classList.add("d-none");
    }

}
