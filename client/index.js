const fetch = require("node-fetch");

let newPostSection;
let addNew;
let commentSection;
const blogPost = document.querySelector("#submit")
if(blogPost != null) {
  blogPost.addEventListener("click", savePost);
}

let title;
let text;
let dropdown;
let formElement = []
let newData = []
let blogSection = document.querySelector('.blog-section')
let newP = []
let emojiCheck;
let array;
let newComment;
let uniqueBtn ;
let emojiSent;
let idSent;
let gifyURL;

newComment = document.getElementById("comment")
emojiCheck = document.querySelector("#emojiSelect")
const newPost = document.querySelector("#make-post");
newPostSection = document.querySelector('.new-post')
newCommentSection = document.querySelector('.comment-section')

addNew = document.querySelector('#addNew')
if(addNew != null) {
  addNew.addEventListener('click', showNewPost);
}

addGifForm = document.querySelector('#addGifForm')
gifSearchText = document.querySelector('#gifSearchText')

gifyImage1 = document.querySelector('#gifImg1')
if(gifyImage1 != null) {
  gifyImage1.addEventListener('click', addGif1)
}

gifyImage2 = document.querySelector('#gifImg2')
if(gifyImage2 != null) {
  gifyImage2.addEventListener('click', addGif2)
}

gifyImage3 = document.querySelector('#gifImg3')
if(gifyImage3 != null) {
  gifyImage3.addEventListener('click', addGif3)
}

gifySearchButton = document.querySelector('#gifSearchButton')
if(gifySearchButton != null) {
  gifySearchButton.addEventListener("click", gifySearch);
}


// hideNewPost()
hideCommentSection()
loadBlogs()

function loadBlogs() {
  fetch('http://localhost:3000/blogs')
    .then(r => r.json())
    .then(drawBlogs)
    .catch(console.error())
}

function deleteBlogs() {
  location.reload()
}

function gifySearch(e) {
  const gifyAPIKey = 'qpx6gNTGPO74C8mY6JCzKpMTCiGKxkjC'
  const userSearch = gifSearchText.value;

  fetch(`http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${gifyAPIKey}&limit=3`)
    .then(r => r.json())
    .then(displayGify)
    .catch(console.warn);
};

function displayGify(e) {
  const dataImage = [];
  if(gifyImage1) {
    gifyImage1.setAttribute("src", e.data[0].images.original.url);
    gifyImage1.setAttribute("style", "display: inline;")
  }
  if(gifyImage2) {
    gifyImage2.setAttribute("src", e.data[1].images.original.url);
    gifyImage2.setAttribute("style", "display: inline;")
  }
  if(gifyImage3) {
    gifyImage3.setAttribute("src", e.data[2].images.original.url);
    gifyImage3.setAttribute("style", "display: inline;")
  }
};

function addGif1() {
  gifyURL = gifyImage1.src
  console.log(gifyURL)
}

function addGif2() {
  gifyURL = gifyImage2.src
  console.log(gifyURL)
}

function addGif3() {
  gifyURL = gifyImage3.src
  console.log(gifyURL)
}

function drawBlogs(array) {
    newData = array.blogs
  for (i = 0; i < newData.length; i++){
    if(newPost) {
      newPost.insertAdjacentHTML("afterend", `<section class="post-made">
                                            <h1>${newData[i].title}</h1>
                                            <h4 id="h4Item">${newData[i].text}<h4>
                                            <p>${newData[i].tags}</p>
                                            <img src="${newData[i].gif}" id="img${i}" />
                                            <button type="submit" class="button" id="${i}">View Comments</button>
                                            <label class="emoji-but">
                                                <span id="${i}" class="emoji-info">&#128515;</span>
                                                <p id="react1-${i}">${newData[i].emojis.smiley}</p>
                                            </label>
                                            <label class="emoji-but">
                                                <span id="${i}" class="emoji-info">&#128514;</span>
                                                <p id="react2-${i}">${newData[i].emojis.laugh}</p>
                                            </label>
                                            <label class="emoji-but">
                                                  <span id="${i}" class="emoji-info">&#128546;</span>
                                                  <p id="react3-${i}">${newData[i].emojis.sad}</p>
                                            </label>
                                            <button type="button" id="emojiButton${i}">Send Emoji</button>
                                            </section>`)
    }  
  }
  let  check1Array = document.querySelectorAll(`.emoji-info`)
  if(check1Array != null) {
    for (i=0; i < check1Array.length; i++){
      check1Array[i].addEventListener('click', sendEmojiData)
      const addComment = document.querySelector("#addCommentButton")
      if(addComment != null) {
        addComment.addEventListener("click", postComment)
      }
    }
  }


//load all comments when pressed view comment
let commentBtn = document.querySelectorAll(".button");
// console.log(commentBtn)
if(commentBtn != null) {
  for (i = 0; i < commentBtn.length; i++){
    commentBtn[i].addEventListener("click", loadComments)
  }
}


function loadComments (e) {

  uniqueBtn = e.target.id
  fetch("http://localhost:3000/blogs")
  .then(r => r.json())
  .then(drawComments(uniqueBtn))
  .catch(console.error())

}

function drawComments(Btn){
  let commentArray = document.querySelectorAll('.comment-added')
  console.log(Btn)
  for (i=0; i < commentArray.length; i++) {
    newComment.removeChild(newComment.lastChild)
  }

  showNewComments()

  for (i = 0; i < newData[Btn].comments.length; i++){
          newComment.insertAdjacentHTML("afterbegin", `<section class="comment-added">
                                             <h1>${newData[Btn].comments[i]}</h1>
                                             </section>` )
  }

}
}

//add new comment and post it


function postComment(e) {

const posting = document.getElementById("commentTextbox").value
const newComment = document.querySelector("#comment")
newComment.insertAdjacentHTML("afterbegin", `<section class="comment-added">
                                       <h1>${posting}</h1>
                                       </section>` )
  const options = {
      method: 'POST',
      headers : {
        "ContentType": "application/json"
      },
      body: JSON.stringify(posting)
  };

fetch(`http://localhost:3000/blogs/${uniqueBtn}/comments`, options)
  .then(r => r.json())
  .then(loadComments(uniqueBtn))
  .catch(console.warn)

}




function sendEmojiData(e) {
  emojiSent = e.target.innerText
  idSent = e.target.id
  console.log(emojiSent)
  console.log(idSent)
  if (emojiSent === "😃") {
    emojiSent = "smiley"
  } else if (emojiSent === "😂") {
    emojiSent = "laugh"
  } else if (emojiSent === "😢") {
    emojiSent = "sad"
  }

  fetch(`http://localhost:3000/blogs/${idSent}/emojis/${emojiSent}`)
    .then(r => r.json())
    .then(increaseEmojiCount)
    .catch(console.warn)
}

function increaseEmojiCount(data) {
  let smileyCounter = document.getElementById(`react1-${idSent}`)
  let laughCounter = document.getElementById(`react2-${idSent}`)
  let sadCounter = document.getElementById(`react3-${idSent}`)
  if (emojiSent == "smiley") {
    smileyCounter.textContent = data
  } else if (emojiSent == "laugh") {
    laughCounter.textContent = data
  } else if (emojiSent == "sad") {
    sadCounter.textContent = data
  }
}


function hideNewPost() {
  if(newPostSection) {
      newPostSection.setAttribute('style', 'visibility: hidden;');
  }
}

function hideCommentSection() {
  if(newCommentSection) {
    newCommentSection.setAttribute('style', 'visibility: hidden;');
  }
}

function showNewPost() {
  if(newPostSection) {
    newPostSection.setAttribute('style', 'visibility: visible;');
  }
}

function showNewComments() {
  if(newCommentSection) {
    newCommentSection.setAttribute('style', 'visibility: visible;');
  }
}

function savePost(e){
    e.preventDefault();
    title = document.getElementById("title").value;
    console.log(title)
    text = document.getElementById("blogText").value;
    console.log(text)
    dropdown = document.getElementById("category").value;
    console.log(dropdown)
    if(newPostSection) {
      newPostSection.setAttribute('style', 'visibility: hidden;');
    }


    const data = {title : `${title}`, text : `${text}`, tags : `${dropdown}`, comments : [ ] ,  emojis : {smiley: 0, laugh: 0, sad: 0 }, gif: `${gifyURL}`, key : "" }

    const options = {
        method: 'POST',
        headers : {
          "ContentType": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:3000/blogs/new', options)
    .then(r => r.json())
    .catch(console.warn)
    deleteBlogs()
  }

  module.exports.index = index;

  var index = function(req,res) {
    res.render('index');
  }
