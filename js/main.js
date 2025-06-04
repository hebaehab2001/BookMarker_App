var nameInput = document.getElementById('nameInput');
var urlInput = document.getElementById('urlInput');
var submitbtn = document.getElementById('submitbtn');
var tablerow = document.getElementById('tablerow');
var modalbody =document.getElementById('modalbody');
var bookmarks=[];
var regexname= /^[0-9A-Za-z]{6,16}$/g;
var regexurl= /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/mg;
var validname=false;
var validurl=false;
if (localStorage.getItem('bookmarksDB')) {
    bookmarks=JSON.parse(localStorage.getItem('bookmarksDB'));
    displayBookmark(bookmarks)
}
function isdatavalid() {
    if (validname && validurl) {
        addBookmark()
        nameInput.classList.remove('is-valid');
        urlInput.classList.remove('is-valid');
        modalbody.innerHTML=`<h5 class="text-center">Added Data Succesfully <i class="bi bi-check2-circle text-success fs-4"></i></h5>`;
    }
    else{
        modalbody.innerHTML=`<h5>Site Name or Url is not valid, Please follow the rules below :</h5>
                        <p><i class="bi bi-arrow-right-circle-fill pe-2 text-danger"></i>Site name must contain at least 6 characters</p>
                        <p><i class="bi bi-arrow-right-circle-fill pe-2 text-danger"></i>Site URL must be a valid one</p>`;
        console.log('invalid');
    }
}
function addBookmark() {
        var bookmark={
            pname:nameInput.value,
            url:urlInput.value
        }
        bookmarks.unshift(bookmark);
        console.log(bookmark);
        localStorage.setItem('bookmarksDB',JSON.stringify(bookmarks));
        clearInput();
        displayBookmark(bookmarks);
        
}
function clearInput() { 
    nameInput.value ='';
    urlInput.value ='';
}
function displayBookmark(arrBookmark) {
    var container='';
    for (let i = 0; i < arrBookmark.length; i++) {
        container+=`<tr>
                  <td>${i+1}</td>
                  <td>${arrBookmark[i].pname}</td>
                  <td>
                    <button onclick="visitUrl(${i})" id="visitbtn" type="button" class="btn btn-success">
                      <i class="bi bi-eye-fill pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button onclick="deleteBookmark(${i})" id="deletebtn" type="button" class="btn btn-danger">
                      <i class="bi bi-trash3-fill pe-2"></i>Delete
                    </button>
                  </td>
                </tr>`;
        
    }
    tablerow.innerHTML=container;
}
function visitUrl(index) {
    window.open(bookmarks[index].url);   
}
function deleteBookmark(index) {
    bookmarks.splice(index,1);
    localStorage.setItem('bookmarksDB',JSON.stringify(bookmarks));
    displayBookmark(bookmarks);
}
function isnamevalid(namevalue) {
    if (regexname.test(namevalue)) {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        validname=true;
    }
    else{
        nameInput.classList.remove('is-valid');
        nameInput.classList.add('is-invalid');
        validname=false;
    }
}
function isurlvalid(urlvalue) {
    if (regexurl.test(urlvalue)) {
        urlInput.classList.remove('is-invalid');
        urlInput.classList.add('is-valid');
        validurl=true;
    }
    else{
        urlInput.classList.remove('is-valid');
        urlInput.classList.add('is-invalid');
        validurl=false;
    }
}
