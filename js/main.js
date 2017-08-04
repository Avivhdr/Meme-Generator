'use strict';
//globals

var gState;
var gOurDetails;
var gImgs;
var gTextUp;
var gTextDown;
var hamburgerEl = document.querySelector('.mobile-header-container');
var $headerMobile = $('.moblie');
var $headerDesktop = $('.desktop');

// init
$(document).ready(function() {
    //data init 
    gState = {
        isHeaderOpen: false,
        currImg: '',
        isMemeOpen: false,
        isImgByUrl: false,

    };
    gTextUp = {
        font: '"Comic Sans MS", cursive, sans-serif',
        text: '',
        align: 'center',
        isBold: false,
        fontSize: 25,
        color: '#ffffff',
        isShadow: false
    }
    gTextDown = {
        font: '"Comic Sans MS", cursive, sans-serif',
        text: '',
        align: 'center',
        isBold: false,
        fontSize: 25,
        color: '#ffffff',
        isShadow: false
    }
    initData();
    storeKeyWords();
    renderKeywords();
    //decide what will be the header that show to the user on the stat
    initHeader();
    renderOurDetails();
    renderImgForColDisplay();

    // get reference to dom and render the memes img 
    var $imgContainer = $('.container');
    $imgContainer.html(renderImg());

    //initialize swiper for our details   
    var ourDetailsSwiper = new Swiper('#swiper_container_our_details', {
        direction: 'horizontal',
        loop: true,
        speed: 2000,
        spaceBetween: 500,
        nextButton: '#our_details_next',
        prevButton: '#our_details_prev',
        autoplay: 6000,
    });
});

var $rowSecImg = $('.img-section');
var $colSecImg = $('.img-section-colum-display');

function showAtCol() {
    $rowSecImg.hide();
    $colSecImg.show();
}

function showAtRow() {
    $rowSecImg.show();
    $colSecImg.hide();
}

function renderOurDetails() {
    // base element from DOM
    var $containerEl = $('#swiper_our_details');
    var $divEl = $('#clone_item_details');

    gOurDetails.forEach(function(obj) {
        var $cloneEl = $divEl.clone();
        $cloneEl.attr('style', 'display:flex');
        // nessery element in clone 
        var $personImg = $cloneEl.find('.hexagon');
        var $persomName = $cloneEl.find('h2');
        var $personJob = $cloneEl.find('h3');
        var $personDesc = $cloneEl.find('p');
        var $facebookLink = $cloneEl.find('#facebook');
        var $googleLink = $cloneEl.find('#google');
        var $linkedinLink = $cloneEl.find('#linkedin');

        // set propertys
        $personImg.attr('style', 'background-image:url(img/our-img/' + obj.img + '.jpg)');
        $persomName.text(obj.name);
        $personJob.text(obj.job);
        $personDesc.html(obj.desc);
        $facebookLink.attr('href', obj.facebook);
        $googleLink.attr('href', obj.google);
        $linkedinLink.attr('href', obj.linkedin);

        //append element to dom 
        $containerEl.append($cloneEl);
    });

}

function renderImgForColDisplay() {
    // base element from DOM
    var $containerEl = $('#container_img_col');
    var $divEl = $('#clone');

    gImgs.forEach(function(obj) {
        var $cloneEl = $divEl.clone();
        $cloneEl.attr('style', 'display:flex');
        $cloneEl.attr('onclick', 'openImg(' + obj.id + ')');
        $cloneEl.attr('id', 'img-' + obj.id + '');


        // nessery element in clone 
        var $Img = $cloneEl.find('.hexagon');
        var $imgName = $cloneEl.find('#name');
        var $imgCategory = $cloneEl.find('#category');

        // set propertys
        $Img.attr('style', 'background-image:url(img/meme-img/' + obj.id + '.png)');
        $imgName.text(obj.name);
        $imgCategory.text(obj.category);

        //append element to dom 
        $containerEl.append($cloneEl);
    });
}

function renderImg() {
    var strHtml = '';

    gImgs.forEach(function(obj) {
        strHtml += ' <div onclick="openImg(' + obj.id + ')" id="img-' + obj.id + '" class="hexagon hexagon2 clone">' +
            ' <div  class="hexagon-in1"> ' +
            ' <div  class="hexagon-in2" style="background-image: url(img/meme-img/' + obj.id + '.png)"></div>' +
            '</div>' +
            '</div>'
    });
    return strHtml;
}

//decide what will be the header that show to the user
$(window)
    .resize(function() {
    initHeader();
});

function initHeader() {
    if ($(window).width() < 450) {
        $headerDesktop.hide();
        $headerMobile.show();
    } else {
        $headerDesktop.show();
        $headerMobile.hide();
    }
}

// open and close the mobile nav
function toggleNav() {
    $(".hamburger").toggleClass("is-active");
    gState.isHeaderOpen = !gState.isHeaderOpen;
    if (gState.isHeaderOpen) {
        hamburgerEl.style.animation = 'openMoblienNav 1s';
        hamburgerEl.style.display = 'block';
        hamburgerEl.style.width = '37%';
    } else {
        hamburgerEl.style.animation = 'closeMoblienNav 1s';
        hamburgerEl.style.width = '0';
    }
}

$('.search').keyup(function(e) {
    var $userStr = $('.search').val();
    console.log('its work!');
    searchForImg($userStr);
});

function searchForImg(str) {
    gImgs.forEach(function(obj) {
        var isInCategory = obj.category.some(function(text) {
            return text.search(str) !== -1;
        });

        if (isInCategory) {
            $('[id^="img-' + obj.id + '"]').show();
        } else {
            $('[id^="img-' + obj.id + '"]').hide();
        }
    });
    addKeywords(str);
}

var memeMakerEl = document.querySelector('.meme-maker');

function openImg(id) {

    if (id.length > 5) {
        gState.isImgByUrl = true;
    } else {
        gState.isImgByUrl = false;
    }

    memeMakerEl.style.animation = 'openMemesMaker 1s';
    memeMakerEl.style.height = 'auto';
    gState.currImg = id;
    resetInput();
    drawTheCanvas(gState.currImg);
}

function resetInput() {
    $('#text_down').val('');
    $('#text_up').val('');
    gTextUp.text = '';
    gTextDown.text = '';
    gTextUp.color = '#ffffff';
    gTextDown.color = '#ffffff';
    drawTheCanvas(gState.currImg);
}

//hides meme maker section
function closeMemeMaker() {
    gState.isMemeOpen = false;
    memeMakerEl.style.animation = 'closeMemesMaker 1s';
    memeMakerEl.style.height = '0';
    resetInput();
}

//changes text to canvas
function updateText(value, pos, el) {
    switch (value) {
        case 'center':
            makeAlign(pos, value);
            break;
        case 'left':
            makeAlign(pos, value);
            break;
        case 'right':
            makeAlign(pos, value);
            break;
        case 'shadow':
            makeShadow(pos);
            break;
        case 'bold':
            makeBold(pos);
            break;
        case 'plus':
            changeFontSize(pos, value);
            break;
        case 'minus':
            changeFontSize(pos, value);
            break;
        case 'color':
            var newColor = el.value;
            makeColor(pos, newColor);
            break;

        default:
            break;
    }
}

var plusInterval;
var minusInterval;

//toggle shadow to canvas
function makeShadow(pos) {
    if (pos === 'up') {
        gTextUp.isShadow = !gTextUp.isShadow;
    } else {
        gTextDown.isShadow = !gTextDown.isShadow;
    }
    drawTheCanvas(gState.currImg);
}

//changes font size to canvas
function changeFontSize(pos, val) {
    if (pos === 'up') {
        if (val === 'plus') {
            gTextUp.fontSize += 4;
        } else {
            gTextUp.fontSize -= 4;
        }
    } else {
        if (val === 'plus') {
            gTextDown.fontSize += 4;
        } else {
            gTextDown.fontSize -= 4;
        }
    }
    drawTheCanvas(gState.currImg, pos);
}
//changes color to canvas
function makeColor(pos, valColor) {
    if (pos === 'up') {
        gTextUp.color = valColor;
    } else {
        gTextDown.color = valColor;
    }
    drawTheCanvas(gState.currImg, pos);
}

//toggle bold to canvas
function makeBold(pos) {
    if (pos === 'up') {
        gTextUp.isBold = !gTextUp.isBold;
    } else {
        gTextDown.isBold = !gTextDown.isBold;
    }
    drawTheCanvas(gState.currImg, pos);
}

//toggle align to canvas
function makeAlign(pos, valAlign) {
    if (pos === 'up') {
        gTextUp.align = valAlign;
    } else {
        gTextDown.align = valAlign;
    }
    drawTheCanvas(gState.currImg, pos);
}

$("#select-up")
    .change(function() {
        console.log(this.value);
        if (this.value === 'Comic-Sans-MS') {
            gTextUp.font = '"Comic Sans MS", cursive, sans-serif';
        } else {
            gTextUp.font = 'Impact, sans-serif';
        }
        drawTheCanvas(gState.currImg, 'up');
    });

$("#select-down")
    .change(function() {
        console.log(this.value);
        if (this.value === 'Comic-Sans-MS') {
            gTextDown.font = '"Comic Sans MS", cursive, sans-serif';
        } else {
            gTextDown.font = 'Impact, sans-serif';
        }
        drawTheCanvas(gState.currImg, 'down');
    });

$('#text_up')
    .keyup(function(e) {
    var $el = $('#text_up');
    var $userText = $el.val();
    gTextUp.text = $userText;
    drawTheCanvas(gState.currImg);
});

$('#text_down')
    .keyup(function(e) {
    var $el = $('#text_down');
    var $userText = $el.val();
    gTextDown.text = $userText;
    drawTheCanvas(gState.currImg);
});

var gCtx;
//show image from url input
function imgByUrl() {
    gState.isImgByUrl = true;
    var $urlImg = $('#imgUrl').val();
    gState.currImg = $urlImg;
    openImg($urlImg);
}

function drawTheCanvas(imgId) {
    var image = new Image();
    if (gState.isImgByUrl) {
        image.src = '' + imgId + '';
    } else {
        image.src = './img/meme-img/' + imgId + '.png';
    }

    var $elCanvas = document.getElementById('myCanvas');
    gCtx = $elCanvas.getContext('2d');

    image.onload = function() {
        var width = $elCanvas.width;
        var height = $elCanvas.height;
        gCtx.drawImage(image, 0, 0, width, height);
        gCtx.shadowBlur = 20;
        drawDown(width, height);
        drawUp(width, height);
    }
}

function drawDown(width, height) {
    if (gTextDown.isBold) {
        gCtx.font = 'bold ' + gTextDown.fontSize + 'px ' + gTextDown.font;
    } else {
        gCtx.font = '' + gTextDown.fontSize + 'px ' + gTextDown.font;
    }
    if (gTextDown.isShadow) {
        gCtx.shadowColor = '#ffffff';
    } else {
        gCtx.shadowColor = '#000000';
    }

    gCtx.textAlign = gTextDown.align;
    gCtx.fillStyle = gTextDown.color;
    var heightPosition = height - 10;
    gCtx.fillText(gTextDown.text, (width / 2), heightPosition);
}

function drawUp(width, height) {
    if (gTextUp.isBold) {
        gCtx.font = 'bold ' + gTextUp.fontSize + 'px ' + gTextUp.font;
    } else {
        gCtx.font = '' + gTextUp.fontSize + 'px ' + gTextUp.font;
    }
    if (gTextUp.isShadow) {
        gCtx.shadowColor = '#ffffff';
    } else {
        gCtx.shadowColor = '#000000';
    }
    gCtx.textAlign = gTextUp.align;
    gCtx.fillStyle = gTextUp.color;
    gCtx.fillText(gTextUp.text, (width / 2), (gTextUp.fontSize / 1.4));
}

var canvas = document.querySelector('#myCanvas');

//download canvas
function downloadImg(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}

//submit user details in local storage
function contactUs() {

    var name = document.querySelector("#formName");
    var mail = document.querySelector("#formMail");
    var subject = document.querySelector("#formSubject");
    var msg = document.querySelector("#formMsg");
    var time = Date.now();

    var log = {
        time: time,
        name: name.value,
        mail: mail.value,
        subject: subject.value,
        msg: msg.value
    }

    var msgs = getStorage('log');

    if (msgs === null) msgs = {};
    msgs[time] = log;
    setStorage('log', msgs);
}

$('#getInTouchForm').submit(function() {
    contactUs();
    document.contactForm.reset();
    return false;
});
