//targeting 
const inputName = document.getElementById('inputName');
const inputTxt = document.getElementById('inputTxt');
const submitBtn = document.getElementById('submitBtn');
const tweetCommentsOl = document.getElementById('tweetCommentsOl');
const massage = document.getElementById('massage');
const search = document.getElementById('search');
const noTweet = document.querySelector('#noTweet')


class Tweets {
    constructor(id, name, text) {
        this.id = id;
        this.name = name;
        this.text = text;
    }
}

class UI {
    creatLi({id,name,text}) {
        const li = document.createElement('li');
        li.className = 'card my-3';
        li.id = `tweet-1`
        li.innerHTML = `
              <div class="card-body">
              <h5 class="card-title heading-title"><span></span> ${name}</h5>
                <p class="card-text">${text}</p>
                <input type="hidden" id="${id}">
                <button id="delete" class="btn btn-danger float-right deleteBtn">Delete</button>
               </div>
            `
        tweetCommentsOl.appendChild(li);
        inputName.value = '';
        inputTxt.value = '';
        
    };
//alarting with bootstrap 
    alarting(massage,value){
        const alart = document.querySelector('#alart')
        const h4= document.querySelector('#title')
        const div =document.createElement('div');
        div.className=`alert alert-${value} text-center`;
        div.innerText = massage;
        alart.insertBefore(div,h4)
        setTimeout(() => {
            div.remove()
        }, 3000)
    }

}



//addtoLocalStorage

class Store{
    static localStore(tweet){
        let tweets;
        if(localStorage.getItem('tweets')===null){
            tweets=[]
        }else{
            tweets = JSON.parse(localStorage.getItem('tweets'))
        }
        tweets.push(tweet)
        localStorage.setItem('tweets',JSON.stringify(tweets))
    }

    //catch item
    static getTweet(){
        let tweets;
        if(localStorage.getItem('tweets')===null){
            tweets=[]
            
        }else{
            tweets = JSON.parse(localStorage.getItem('tweets'))
        }
        return tweets;
    }

    static displyingUi(){
        let tweet = Store.getTweet();
        tweet.forEach(element => {
            const ui = new UI()
            ui.creatLi(element)
        });
    }
    
    //delete from localStorage
    static delete(id){
        let tweet = Store.getTweet();
        tweet.forEach((ele,index)=>{
            if(ele.id === id){
                tweet.splice(index,1)
            }
            localStorage.setItem('tweets',JSON.stringify(tweet))
        })
    }

}
window.addEventListener('DOMContentLoaded',Store.displyingUi)

//submit button work
submitBtn.addEventListener('click', function () {
const ui =new UI()
    if (inputName.value === '' || inputTxt.value === '') {
        ui.alarting('Fill the necessary input','danger')  

    } else {
        const id =tweetCommentsOl.querySelectorAll('li').length;
        const tweet = new Tweets( id,inputName.value,inputTxt.value)
        ui.creatLi(tweet); 
        Store.localStore(tweet) 
        ui.alarting('tweet added successfully','success')   
        if(id > -1){
            noTweet.style.display = 'none'
        }else{
            noTweet.style.display = 'block'
        }
    };
})


//deleting data from user interface
tweetCommentsOl.addEventListener('click',function deleting(e){
 if(e.target.id==='delete'){
       e.target.parentElement.parentElement.remove()
       const id = Number(e.target.previousElementSibling.id);
       Store.delete(id)
       const ui = new UI();
       ui.alarting('tweet deleted successfully','success')   
   } 
})


//search tweet
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
