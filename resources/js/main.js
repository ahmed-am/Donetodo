// Variables



var animationDiv= document.getElementById('animationDiv');

var addButton= document.getElementById('add');


var removeSVG= '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var checkSVG = ' <?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><circle  cx=11 cy=11 class="noFill" stroke="rgb(47, 167, 77)" r="10" width="23" height="23"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

var itemTextBox = document.getElementById('item')
var countTextBox = document.getElementById('count');


completedList= document.getElementById('completed');
todoList = document.getElementById('todo');


// Core Functions


addButton.addEventListener('click', function(){
    addItem(itemTextBox.value,countTextBox.value);
});

itemTextBox.addEventListener('keydown', KeyboardEvent => {
    if(KeyboardEvent.key=="Enter")
    {
        addItem(itemTextBox.value,countTextBox.value);
    }
})

countTextBox.addEventListener('keydown', KeyboardEvent => {
    if(KeyboardEvent.key=="Enter")
    {
        addItem(itemTextBox.value,countTextBox.value);
        itemTextBox.focus();
    }
    
})




document.addEventListener('load',loadStorage());

function loadStorage(){
    
        
    console.log(localStorage.length);

        if(localStorage.length >= 0 && localStorage.length <= 2  /* && localStorage.length<2*/){

            localStorage.lastID=-1;
            //localStorage.taskList='0';
        }
        else{
            
            var taskList =localStorage.taskList.split(',');
                for(var i=0 ; i<taskList.length; i++){
                    
                    //var itemIndex = localStorage.key(i);
                    //var countIndex = localStorage.key(i+1);
                    //console.log(itemIndex);console.log(countIndex);
                    newElement(localStorage.getItem('task'+taskList[i]),localStorage.getItem('task'+taskList[i]+'Count'),taskList[i]);
                    

                }
                

              
                
            
        }
    
}

function addItemStorage(item,itemCount){

      
    if(!localStorage.taskList){
        localStorage.taskList = (parseInt(localStorage.lastID)+1);
    }
    else {
        localStorage.taskList = localStorage.taskList+ ',' + (parseInt(localStorage.lastID)+1);
    }
    
    
    
    localStorage.setItem('task'+(parseInt(localStorage.lastID)+1),item);
    localStorage.setItem('task'+(parseInt(localStorage.lastID)+1)+'Count',itemCount);
    localStorage.lastID = parseInt(localStorage.lastID)+1;
  
    console.log(localStorage.lastID);


    

}

function updateStorageItemCount(taskNumber,count)
{
    console.log(taskNumber);
    localStorage.setItem('task'+taskNumber+'Count',count);
}

function deleteStorageItem(taskNumber){
    localStorage.removeItem('task'+taskNumber);
    localStorage.removeItem('task'+taskNumber+'Count');
    
    if(localStorage.taskList[0] == taskNumber){
        
        localStorage.taskList = localStorage.taskList.replace(taskNumber+',' , ''); //incase of first item
        
    }
    else if(localStorage.taskList.length>1)
        localStorage.taskList = localStorage.taskList.replace(','+taskNumber ,''); //incase of last or middle item
    else{
        localStorage.removeItem('taskList'); //incase of only item
        
    }

    //localStorage.lastID = parseInt(localStorage.lastID)-1; will cause an error if an item other than last is removed :) 
}

function addItem(itemValue,itemCount){
    
    
    if(itemValue){
        newElement(itemValue,itemCount);
        
        itemTextBox.value="";
        countTextBox.value="1";
        }
        
        document.getElementById('add').classList.toggle("rotate");
        addAnimation();
        setTimeout(function() {
            DOMCleaner(animationDiv);
            
         }, 500);

         addItemStorage(itemValue,itemCount);
        
        
        
}





function fade(element){
    element.classList.remove('invisible');
    
}



function checkItem(){
    checkButton = this;
    checkAnimateDiv = this.children[1];
    checkElement = this.parentElement.parentElement;
    console.log('click');

    if(!(checkElement.classList.contains('checked'))){
        console.log('in');
        if(checkElement.children[1] != null && checkElement.children[1].id=='countDiv'){ //checks if count exists
                var countElement= checkElement.children[1];
                var count = parseInt(countElement.innerText);
                count--;
                updateStorageItemCount(checkElement.getAttribute('task'),count);
                if(count>1){
                    countElement.innerText=count;
                    countElement.classList.add('animate');
                    setTimeout(function() {
                        countElement.classList.remove('animate');
                        
                    }, 300);
                }
                else
                    countElement.remove();
           }
           else{
                checkElement.classList.add('checked');
                checkAnimation(checkAnimateDiv);
                
                //checkElement.classList.add('invisible');
                
                setTimeout(function() {
                completedList.appendChild(checkElement);
                deleteStorageItem(checkElement.getAttribute('task'));
                
                }, 100);

                setTimeout(function() {
                    DOMCleaner(checkAnimateDiv);

                    
                }, 500);
        }
        
    }
    else{
        checkElement.classList.remove('checked');
        deleteAnimation(checkElement);
        todoList.prepend(checkElement);
        setTimeout(function() {
            DOMCleaner(checkAnimateDiv);
            
        }, 500);

    }
    
    

}



function DOMCleaner(item){
    
    if(item.id=='animationDiv'){
        while(item.lastChild.tagName.toLowerCase()=='div')
            item.lastChild.remove();
    }

    else{

    
        while (item.firstChild) {
            //item.removeChild(item.firstChild);
            
            if(item.firstChild)
                item.firstChild.remove();
        }
    }

      
}

function removeItem(){
    deleteElement = this.parentElement.parentElement;
    deleteElement.classList.add('deleted');
    deleteAnimation(deleteElement);

    setTimeout(function() {
            deleteElement.remove();
            deleteStorageItem(deleteElement.getAttribute('task'));
    }, 500);
    
    
}



function newElement(value,count, taskNumber=-1){
    
    
    

    var item = document.createElement('li');
    item.innerHTML=value;
    item.classList.add('invisible');
    
    
    var buttonsDiv= document.createElement('div');
    buttonsDiv.classList.add('buttons');

    var deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML= removeSVG;

    deleteButton.addEventListener('click', removeItem);

    


    var checkButton = document.createElement('button');
    checkButton.classList.add('checkButton');
    checkButton.innerHTML= checkSVG;

    var checkAnimateDiv = document.createElement('div');
    checkAnimateDiv.id="checkAnimateDiv";
    checkButton.appendChild(checkAnimateDiv);

    checkButton.addEventListener('click',checkItem);
    
    
    

    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(checkButton);
    

    item.appendChild(buttonsDiv);
    if(taskNumber==-1)
        item.setAttribute('task',(parseInt(localStorage.lastID)+1));
    else
        item.setAttribute('task',taskNumber);

    if(count>1){
        var countDiv= document.createElement('div');
        countDiv.id= "countDiv";
        countDiv.innerText=count;
        item.appendChild(countDiv);
    }
    

    todoList.prepend(item);
    
    setTimeout(function() {
        fade(item);
    }, 100);
    

}



// Visual 



/* Add Button Animation */
function addAnimation(){
    const Burst1 = new mojs.Burst ({
        parent: animationDiv,
        top: '50%',
        left: '50%', 
        radius: {0: 80},
        count: 8,
        children: {
            shape: 'circle',
            fill: {'red':'blue'},
            strokeWidth: 1,
            duration: 600,
            stroke: {'red':'blue'}
        }
    });


    const Burst2 = new mojs.Burst ({
        parent: animationDiv,
        top: '50%',
        left: '50%', 
        radius: {0: 100},
        count: 4,
        children: {
            shape: 'rect',
            fill: 'white',
            strokeWidth: 1,
            duration: 300,
            stroke: 'white'
        }
    });



    const circle1= new mojs.Shape ({
        radius: {0:40},
        parent: animationDiv,
        fill: 'none',
        stroke: 'white',
        strokeWidth:15,
        duration: 300,
        opacity: {1: 0}
    });

    const circle2= new mojs.Shape ({
        radius: {0:50},
        parent: animationDiv,
        fill: 'none',
        stroke: 'red',
        strokeWidth:5,
        duration: 400,
        opacity: {1: 0}
    });


    const circle3= new mojs.Shape ({
        radius: {0:60},
        parent: animationDiv,
        fill: 'none',
        stroke: 'blue',
        strokeWidth:5,
        duration: 500,
        opacity: {1: 0}
    });

    const circle4= new mojs.Shape ({
        radius: {0:70},
        parent: animationDiv,
        fill: 'white',
        
        stroke: 'white',
        strokeWidth:5,
        duration: 600,
        opacity: {1: 0}
    });

    const timeline = new mojs.Timeline ({
        
        repeat: 0
    }).add(circle4,circle1,circle2,circle3,Burst1,Burst2);

    timeline.play();
}


/* Delete item animation */

function checkAnimation(checkItem){
    const circle1 = new mojs.Shape({
        radius: {0:1000},
        parent: checkItem,
        fill:'#7bef28',
        stroke: 'white',
        strokeWidth: 10,
        duration:500,
        opacity:{1:0}
    });

    const circle2 = new mojs.Shape({
        radius: {0:200},
        parent: checkItem,
        fill: 'none', 
        stroke: 'white',
        strokeWidth: 30,
        duration:300,
        opacity:{1.7:0}
    });

    const circle3 = new mojs.Shape({
        radius: {0:400},
        parent: checkItem,
        fill: 'none', 
        stroke: '#230e5780',
        strokeWidth: 10,
        duration:400,
        opacity:{1:0}
        
    });



    

    const timelineX = new mojs.Timeline ({
        repeat: 0,
        
    }).add(circle1,circle2,circle3);

    timelineX.play();
    
    
}


function deleteAnimation(deleteItem){
    /* LEFT SIDE */
    const swirlR1 = new mojs.ShapeSwirl({
    parent: deleteItem,
    top: '100%',
    left: '0%',
    fill:           'rgba(255,255,255,1)',
    y:              { 0: -100 },
    radius:         30,
    swirlSize:      5,
    swirlFrequency: 1, 
    duration:       500,
    direction:       -1,
    degreeShift: 90
    });
    const swirlR2 = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '0%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -85 },
        radius:         25,
        swirlSize:      5,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: 70
    });
    const swirlR3 = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '0%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -70 },
        radius:         20,
        swirlSize:      5,
        swirlFrequency: 1, 
        duration:       1000,
        direction:       -1,
        degreeShift: 50
    });

    const swirlL1 = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '0%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -100 },
        radius:         30,
        swirlSize:      30,
        swirlFrequency: 1, 
        duration:       1000,
        direction:       -1,
        degreeShift: -90
    });
    const swirlL2 = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '0%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -85 },
        radius:         30,
        swirlSize:      30,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: -10
    });
    const swirlL3 = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '0%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -70 },
        radius:         30,
        swirlSize:      30,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: -30
    });



    /* RIGHT SIDE */
    const swirlR1B = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '100%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -100 },
        radius:         30,
        swirlSize:      5,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: -90
    });
    const swirlR2B = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '100%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -85 },
        radius:         25,
        swirlSize:      5,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: -70
    });
    const swirlR3B = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '100%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -70 },
        radius:         20,
        swirlSize:      5,
        swirlFrequency: 1, 
        duration:       1000,
        direction:       -1,
        degreeShift: -50
    });

    const swirlL1B = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '100%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -100 },
        radius:         30,
        swirlSize:      30,
        swirlFrequency: 1, 
        duration:       1000,
        direction:       -1,
        degreeShift: 90
    });
    const swirlL2B = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '100%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -85 },
        radius:         30,
        swirlSize:      30,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: 10
    });
    const swirlL3B = new mojs.ShapeSwirl({
        parent: deleteItem,
        top: '100%',
        left: '100%',
        fill:           'rgba(255,255,255,1)',
        y:              { 0: -70 },
        radius:         30,
        swirlSize:      30,
        swirlFrequency: 1, 
        duration:       500,
        direction:       -1,
        degreeShift: 30
    });

    const timeline = new mojs.Timeline;

    timeline.add(swirlR1,swirlR2,swirlR3,swirlL1,swirlL2,swirlL3,swirlR1B,swirlR2B,swirlR3B,swirlL1B,swirlL2B,swirlL3B);

    timeline.play();
}

