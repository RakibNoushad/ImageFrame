//DOM Stored in Variable
let frameDOM =document.querySelector(".imageFrame"),
contentDOM = document.querySelector(".content"),
fullDOM = document.querySelector(".fullContent");

//Variable declaration
var width=6, height=2,flag=1, total, left=100, topp=50, size=150;
var screenWidth = 1100, currSWidth, maxWidth, element, styleObj, contHeight;

//Calculate current width of full content
function currentWidth(){
    var styleObj = window.getComputedStyle(fullDOM),
    curr_width = styleObj.getPropertyValue('width');
    maxWidth = parseInt(curr_width);
}

//Get current Height of content
function contentHeight(){
    var paraDOM = document.querySelector(".para"),
    styleP = window.getComputedStyle(paraDOM);
    curr_height = styleP.getPropertyValue('height');
    contHeight = parseInt(curr_height);
}

//initial state
currentWidth();
responsiveFull();

//responsive design
function responsiveFull(){
    function responsiveDo(x) {
        if (x.matches && currSWidth!==screenWidth) { 
            //For Small size screen
            width = 6+ (screenWidth-currSWidth)/100,
            size = maxWidth/width;
            height = Math.ceil((contHeight+50)/size);
            contentReady(width, height, size);
        }
        else if(currSWidth===screenWidth)
        {
            //Default size for Desktop/Laptop
            width = 6;
            height = 2;
            size = maxWidth/width;
            contentReady(width, height, size);
        }
    }

    //Current window size
    for(var i=screenWidth;i>=0;i-=100)
    {
        var x = window.matchMedia("(max-width: " + i + "px)");
        currSWidth = i;

        contentHeight();
        currentWidth();
        responsiveDo(x)
        x.addListener(responsiveDo)
    }
}

//Responsive while resizing browser
$(window).on('resize', responsiveFull);

//load image
function contentReady(width, height, size){
    frameDOM.innerHTML = "";
    flag =1;
    total=2*(width+height);

    for(var i=0; i<total; i++)
    {
        //load Image from files
        frameDOM.insertAdjacentHTML("afterbegin", "<div class=\"image\" data-index=\"" + i + "\" style=\"width: " + size + "px; height: " + size + "px; left: " + left + "px; top: " + topp + "px; display: block; position: absolute;\"> <img src=\"photos/" + i%54 + ".jpg\" > </div>");

        //left top measurement
        if(flag<width)
        {
            left+=size;
        }
        else if(flag<=(width+height))
        {
            topp+=size;
        }
        else if(flag<(2*width+height))
        {
            left-=size;
        }
        else topp-=size;

        flag++;
    }

    //content positioning
    contentDOM.style.left = left+size + "px";
    contentDOM.style.top = topp+size + "px";
    contentDOM.style.height = height*size + "px";
    contentDOM.style.width = (width-2)*size + "px";
    fullDOM.style.height = (height+2)*size + "px";
}

//animation
let adjacent, index;
setInterval(animation, 1500);

function animation(){
    //genarating random number
    adjacent = (Math.random()*10)<5? -1: 1;
    index = Math.floor(Math.random()*total);

    //Corner case handling
    if(adjacent === -1 && index === 0)
       adjacent = total-1;
 
    //select two photo for swap
    var dataDOM= document.querySelector("[data-index=\"" + index + "\"]")
    var dataSDOM = document.querySelector("[data-index=\"" + (index+adjacent)%total + "\"]")

    //Swaping image attribute
    var temp = dataDOM.style.left;
    dataDOM.style.left = dataSDOM.style.left;
    dataSDOM.style.left = temp;

    temp= dataDOM.style.top;
    dataDOM.style.top = dataSDOM.style.top;
    dataSDOM.style.top = temp;

    //swaping data index
    temp = (index+adjacent)%total;
    dataSDOM.setAttribute('data-index', '100');
    dataDOM.setAttribute('data-index', temp);
    document.querySelector("[data-index='100']").setAttribute('data-index', index);

    //slide animation
    dataDOM.classList.add('slideAnimation');
    dataSDOM.classList.add('slideAnimation');
}