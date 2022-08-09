
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


//HEADER
const tabs = $$('.tab-item')
const panes = $$('.tab-pane')
const tabActive= $('.tab-item.active')
const line = $('.tabs .line')

line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'

tabs.forEach((tab, index) => {
    const pane = panes[index]
    tab.onclick = function(){
        $('.tab-item.active').classList.remove('active')
        this.classList.add('active')

        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'
        
        $('.tab-pane.active').classList.remove('active')
        pane.classList.add('active')
    }
})

const menu = $('.mobile-i')
const tabMenu = $('.tabs')
const tabsMenu = $$('.tab-item')
function menuMobile(){
    tabMenu.classList.toggle('showmenu')
    Array
        .from(tabsMenu)
        .forEach(closeMenu)

    function closeMenu(element) {
        element.addEventListener('click', function(){
            tabMenu.classList.remove('showmenu')
        })
    }
    
}

//SLIDE SHOW
const items = $$('.picture-img');
const itemCount = items.length;
const nextItem = $('.next');
const previousItem = $('.previous');
let count = 0;

function showNextItem() {
    items[count].classList.remove('activeimg');

    if(count < itemCount - 1) {
        count++;
    } else {
        count = 0;
    }

    items[count].classList.add('activeimg');
}

function showPreviousItem() {
    items[count].classList.remove('activeimg');

    if(count > 0) {
        count--;
    } else {
        count = itemCount - 1;
    }

    items[count].classList.add('activeimg');
}

function keyPress(e) {
    e = e || window.event;
  
    if (e.keyCode == '37') {
        showPreviousItem();
    } else if (e.keyCode == '39') {
        showNextItem();
    }
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);
document.addEventListener('keydown', keyPress);

// SHAKE PICTURE
const forestDiv = $('.forest-div')
const forestImg = $('.img-forest')
function shakePic(){
    forestImg.classList.add('shake');
}

//STICKY MOBILE MENU
window.onscroll = function() {stickyFunction()}
const header =$('.tab-header')
const sticky = header.offsetTop

function stickyFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
}


//MODAL
/* Mở và đóng modal */
const buyBtns = $$('.js-buy-ticket')
const modal = $('.js-modal')
const modalClose = $('.js-modal-close')
const modalContainer = $('.js-modal-container')
function showBuyTickets(){
    modal.classList.add('open')
}

for(const buyBtn of buyBtns ){
    buyBtn.addEventListener('click',showBuyTickets)
}

function hideBuyTickets(){
    modal.classList.remove('open')
}

modalClose.addEventListener('click', hideBuyTickets)

modal.addEventListener('click', hideBuyTickets)

modalContainer.addEventListener('click', function(event){
    event.stopPropagation()
})

//PRODUCT IMG 
function showImgItem01(id){
    const image = document.getElementById(id).getElementsByTagName('img')[0].getAttribute('src')
    const itemImg = document.getElementById('itemimg-album01')
    itemImg.src= image;
}
function showImgItem02(id){
    const image = document.getElementById(id).getElementsByTagName('img')[0].getAttribute('src')
    const itemImg = document.getElementById('itemimg-album02')
    itemImg.src= image;
}
function showImgItem03(id){
    const image = document.getElementById(id).getElementsByTagName('img')[0].getAttribute('src')
    const itemImg = document.getElementById('itemimg-album03')
    itemImg.src= image;
}
function showImgItem04(id){
    const image = document.getElementById(id).getElementsByTagName('img')[0].getAttribute('src')
    const itemImg = document.getElementById('itemimg-album04')
    itemImg.src= image;
}

//PRODUCT QUANTITY BUTTON
function plusQuantity(id){
    const itemValue = document.getElementById(id).nextElementSibling
    const number = Number.parseInt(itemValue.value)
    const newNum = number + 1 
    itemValue.value = newNum
}

function miniusQuantity(id){
    const itemValueMinius = document.getElementById(id).previousElementSibling
    const numberMinius = Number.parseInt(itemValueMinius.value)
    const newNumMinius = numberMinius - 1
    const minValue = 1 
    if(newNumMinius <= 1){
        itemValueMinius.value = minValue
    }else{
        itemValueMinius.value = newNumMinius
    }
    
}

//Alert
function alertMess(){
    alert('Vui lòng đăng nhập')
}

function alertLogin(){
    alert('Phần chức năng này chưa viết, nào viết sẽ đăng nhập được. Cảm ơn ^^')
}


