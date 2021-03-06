var target_num = 0;
var new_word = 0;
var review_index = 0;
var all_words = new Array(new Array(),new Array());
var word_collect = new Array();
var review_words = new Array();
var last_word = new Array();
var last_copy = new Array();

function printImg(){
  var collect_btn = document.getElementsByClassName("collect")[0];
  var img = document.createElement("img");
  if(word_collect[target_num] == 1){
    img.src = "../static/img/Collected.png";
    collect_btn.value = 1;
  }
  else{
    img.src = "../static/img/Collecting.png";
    collect_btn.value = 0;
  }
  img.className = "collect_img";
  img.value = word_collect[target_num];
  collect_btn.appendChild(img);
}

function printWord(){ 
  console.log(all_words);
  var word_nums = document.getElementsByClassName("word-nums")[0];
  var studing_words = document.createElement("span");
  var studied_words = document.createElement("span");
  studing_words.innerHTML = "新学：" + (all_words[0].length - 1);
  studied_words.innerHTML = "复习：0";
  studing_words.className = "studing-words"
  studied_words.className = "studied-words"
  word_nums.appendChild(studing_words);
  word_nums.appendChild(studied_words);

   
  var total_word = document.getElementsByClassName("total-word")[0];
  var word = document.createElement("div");
  var meaning = document.createElement("p");
  word.innerHTML = all_words[0][0];
  meaning.innerHTML = all_words[1][0];
  word.className = "word";
  meaning.className = "meaning";
  total_word.appendChild(word);
  total_word.appendChild(meaning);
  last_word.push(target_num);
  printImg();
  target_num++;
}

function updateImg(i){
  var collect_btn = document.getElementsByClassName("collect")[0];
  var img = document.getElementsByClassName("collect_img")[0];
  if(word_collect[i] == 1){
    img.src = "../static/img/Collected.png";
    collect_btn.value = 1;
  }
  else{
    img.src = "../static/img/Collecting.png";
    collect_btn.value = 0;
  }
  img.value = word_collect[i];
}


function updatePage(i){
  if(target_num >= all_words[0].length){
    if(i == 0)
      review_words.push(target_num-1);
    swal("您已经完成本章的学习");
    return;
  }

  last_copy = last_word.slice(0);

  var studing_word = document.getElementsByClassName("studing-words")[0];
  var studied_word = document.getElementsByClassName("studied-words")[0];
  var word_back = document.getElementsByClassName("word-back")[0];
  var word = document.getElementsByClassName("word")[0];
  var meaning = document.getElementsByClassName("meaning")[0];
  var collect_btn_two = document.getElementsByClassName("collect-two")[0];

  if(target_num == 10 && review_index < review_words.length){
    word_back.innerHTML = all_words[0][last_word[last_word.length - 1]];

    word.innerHTML = all_words[0][review_words[review_index]];
    meaning.innerHTML = all_words[1][review_words[review_index]];
    collect_btn_two.value = word_collect[review_words[review_index]];
    updateImg(review_words[review_index]);
    last_word.push(review_words[review_index]);  

    if(i == 1)
      review_words.splice(review_index,1);
    else  
      review_index++;
    
    studing_word.innerHTML = "新学：" + (all_words[0].length - target_num);
    studied_word.innerHTML = "复习：" + (review_words.length - review_index);
  }
  else{
    review_index = 0;
    studing_word.innerHTML = "新学：" + (all_words[0].length - target_num - 1);
    if(i == 0){
      review_words.push(target_num-1);
      studied_word.innerHTML = "复习：" + review_words.length;
    }
    word_back.innerHTML = all_words[0][last_word[last_word.length - 1]];

    word.innerHTML = all_words[0][target_num];
    meaning.innerHTML = all_words[1][target_num];
    last_word.push(target_num);
    updateImg(target_num);
    target_num++;
  }
}

function backClick(){
  if(last_copy.length==0)
    return;

  document.getElementsByClassName("footstrap")[0].style.display="none";
  var footstrap_two = document.getElementsByClassName("footstrap-two")[0];
  var least = last_copy.pop();

  var str= '<form class="collect_form" action="/GoToCollectList" method = "POST">'+
  '<button type = submit class="collect-two" value="" onclick="collectClickTwo()"></button>' +
  '</form>' +
  '<button class="continue" onclick="continueClick()">继续学习</button>';
  footstrap_two.innerHTML = str;

  var studing_word = document.getElementsByClassName("studing-words")[0];
  var studied_word = document.getElementsByClassName("studied-words")[0];
  var word_back = document.getElementsByClassName("word-back")[0];
  var word = document.getElementsByClassName("word")[0];
  var meaning = document.getElementsByClassName("meaning")[0];

  studing_word.innerHTML = "新学：" + (all_words[0].length - target_num - 1);
  studied_word.innerHTML = "复习：" + review_words.length;

  if((last_copy.length-1) < 0)
    word_back.innerHTML = "";
  else
    word_back.innerHTML = all_words[0][last_copy[last_copy.length-1]];

  word.innerHTML = all_words[0][least];
  meaning.innerHTML = all_words[1][least];
}

function continueClick(){
  document.getElementsByClassName("footstrap")[0].style.display="block";
  document.getElementsByClassName("footstrap-two")[0].style.display="none";
  target_num--;
  updatePage(1);
}

function homeClick(){
  
}

function collectClick(){
  var collect_btn = document.getElementsByClassName("collect")[0];
  var img = document.getElementsByClassName("collect_img")[0];
  var word = document.getElementsByClassName("word")[0];
  if(collect_btn.value == 1){
    //取消关注 word.innerHTML
    img.src = "../static/img/Collecting.png";
    collect_btn.value =0;
    word_collect[target_num] == 0;
  } else{
    //进行关注 word.innerHTML
    img.src = "../static/img/Collected.png";
    collect_btn.value =1;
    word_collect[target_num] == 1;
  }
}

function collectClickTwo(){
  var collect_btn_two = document.getElementsByClassName("collect-two")[0];
  var img = document.getElementsByClassName("collect_img")[0];
  var word = document.getElementsByClassName("word")[0];
  if(collect_btn_two.value == 1){
    //取消关注 word.innerHTML
    img.src = "../static/img/Collecting.png";
    collect_btn_two.value =0;
    word_collect[review_words[review_index]] == 0;
  } else{
    //进行关注 word.innerHTML
    img.src = "../static/img/Collected.png";
    collect_btn_two.value =1;
    word_collect[review_words[review_index]] == 1;
  }
}

function confirmClick(){
  var div = document.getElementById('div1');
  var selectBox = document.getElementById('chapters');
  var selectedChapter = selectBox.options[selectBox.selectedIndex].text;
  selectedChapter = selectedChapter - 1;
   
  var data = {"chapter" : selectedChapter};
  senddata = JSON.stringify(data);    
  $.ajax({
    async: false,
    url: "/learn",
    type: "POST",
    data: senddata,
    dataType: "json",
    success: function (redata) {
        var index = 0;
        for(var d in redata.word){
            all_words[0][index] = redata.word[index+1];
            all_words[1][index] = redata.chinese[index+1];
            word_collect[index] = redata.iscollect[index+1];
            index = index + 1;
        }
    }
    })
  var footstrap = document.getElementsByClassName("footstrap")[0];
  div.style.display = "none";
  footstrap.style.display = "block";
  printWord();
 }