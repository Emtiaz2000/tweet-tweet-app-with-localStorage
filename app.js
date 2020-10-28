//console.log('connected')
//targeting 
const inputName = document.getElementById('inputName');
const inputTxt = document.getElementById('inputTxt');
const submitBtn = document.getElementById('submitBtn');
const tweetCommentsOl = document.getElementById('tweetCommentsOl');
const massage = document.getElementById('massage');
const search = document.getElementById('search');


//get localStorage
let Memory = getLocalStorage();
//getdata from localStorage
function getLocalStorage() {
    let tweets = '';
    if (localStorage.getItem('tweet') === null) {
        tweets = [];

    } else {
        tweets = JSON.parse(localStorage.getItem('tweet'));
    }
    return tweets;
}
//save data to local storage
function saveTweettoLocalStroge(Item) {
    let tweets = '';
    if (localStorage.getItem('tweet') === null) {
        tweets = [];

    } else {
        tweets = JSON.parse(localStorage.getItem('tweet'));

    }
    tweets.push(Item);
    localStorage.setItem('tweet', JSON.stringify(Item))
}



//creat new list and show in display
function creatLi(MemoryItem) {
    if (MemoryItem.length > 0) {
        let li = '';
        massage.innerHTML = ``;
       Array.from(MemoryItem).forEach((ele, index) => {
            li = document.createElement('li');
            li.className = 'card my-3';
            li.id = `tweet-${ele.id}`
            li.innerHTML = `
            
          <div class="card-body">
          <h5 class="card-title heading-title"><span>${ele.id+1}</span> ${ele.name}</h5>
            <p class="card-text">${ele.text}</p>
            <button id="${index}" onclick="deleteing(this.id)" class="btn btn-danger float-right deleteBtn">Delete</button>
           </div>
        `
            tweetCommentsOl.appendChild(li);
        });

    } else {
        massage.innerHTML = `<h4>No tweet to show!</h4>`;
    }
}
creatLi(Memory)

//catch name and tweet from useser

submitBtn.addEventListener('click', function () {
    let id;
    if (Memory.length === 0) {
        id = 0
    } else {
        id = Memory[Memory.length - 1].id + 1;
    }
    if (inputName.value === '' || inputTxt.value === '') {
        alert('please fill the necessary input..');

    } else {
        let tweet = {
            id,
            name: inputName.value,
            text: inputTxt.value
        }
        Memory.push(tweet)
        saveTweettoLocalStroge(tweet)
        tweetCommentsOl.innerHTML = '';
        creatLi(Memory);
        inputName.value = '';
        inputTxt.value = '';
    };
})
//delete the tweet from UI

tweetCommentsOl.addEventListener('click', (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.parentElement.remove();
    }
    /* const id = parseInt(e.target.parentElement.parentElement.id.split("-")[1])
    let OhterLi = tweet.filter((ele) => {
        return ele.id != id;
    })
    localStorage.setItem('tweet', JSON.stringify(OhterLi));
    if (OhterLi.length === 0) location.reload() */

});
//deleting data from local storage
function deleteing(index) {
    let tweets = '';
    if (localStorage.getItem('tweet') === null) {
        tweets = [];

    } else {
        tweets = JSON.parse(localStorage.getItem('tweet'));
    }
    tweets.splice(index, 1);
    localStorage.setItem('tweet', JSON.stringify(tweets))

    creatLi(Memory)
}

//search the tweet
search.addEventListener('keyup', function (e) {
    const searchValue = e.target.value.toLowerCase();
    document.querySelectorAll('.heading-title').forEach((name) => {
        const Name = name.textContent.toLowerCase();
        //console.log(Name)
        if (Name.includes(searchValue)) {
            name.parentElement.parentElement.style.display = 'block';
            massage.innerHTML = ``;
        } else {
            name.parentElement.parentElement.style.display = 'none';
            massage.innerHTML = `<h4>No tweet to show!</h4>`;
        }
    })

})