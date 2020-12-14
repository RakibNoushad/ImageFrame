//content ready
let frameDOM =document.querySelector(".imageFrame"),
contentDOM = document.querySelector(".content"),
fullDOM = document.querySelector(".fullContent");

var width=6,height=2,flag=1, total, left=100, topp=50,size=150;
var screenWidth = 1100, currSWidth,maxWidth,element,styleObj,wid;

function currentWidth(){
    var element = document.querySelector(".fullContent"),
    styleObj = window.getComputedStyle(element),
    wid = styleObj.getPropertyValue('width');
    maxWidth = parseInt(wid);
}

//initial state
currentWidth();
responsiveFull();

//responsive design
function responsiveFull(){
    function responsiveDo(x) {
        if (x.matches && currSWidth!==screenWidth) { // If media query matches

            width = 6+ (screenWidth-currSWidth)/100,height = 2+(screenWidth-currSWidth)/100;
            size = maxWidth/width;
            contentReady(width, height, size);
        }
        else if(currSWidth===screenWidth)
        {
            //initial frame
            width = 6;
            height =2;
            size = maxWidth/width;
            contentReady(width, height, size);
        }
    }

    //Screen size measurement
    for(var i=screenWidth;i>=0;i-=100)
    {
        var x = window.matchMedia("(max-width: " + i + "px)");
        currSWidth = i;

        currentWidth();
        responsiveDo(x)
        x.addListener(responsiveDo)
    }
}

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
setInterval(animation, 3000)

function animation(){
    //genarating random number
    adjacent = (Math.random()*10)<5? -1: 1;
    index = Math.floor(Math.random()*total);

    //select two photo for swap
    var dataDOM= document.querySelector("[data-index=\"" + index + "\"]")
    var dataSDOM = document.querySelector("[data-index=\"" + (index+adjacent)%total + "\"]")

    anim();

//swaping image elements and ID
    function anim(){
        var temp = dataDOM.style.left;
        dataDOM.style.left = dataSDOM.style.left;
        dataSDOM.style.left = temp;

        temp= dataDOM.style.top;
        dataDOM.style.top = dataSDOM.style.top;
        dataSDOM.style.top = temp;

        temp = (index+adjacent)%total;
        dataSDOM.setAttribute('data-index', '100');
        dataDOM.setAttribute('data-index', temp);
        document.querySelector("[data-index='100']").setAttribute('data-index', index);
    }
}