const CANNED_TWEET = {
  created: {
    date: new Date(2015, 7, 8),
    human: 'Aug 8 2015'
  },

  author: {
    name: 'Joe Schmoe',
    handle: '@mrjoeschmoe',
    url: 'http://example.com',
    numFollowers: 1083,
    avatar: 'http://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg'
  },

  tweet: 'Authentic four dollar toast disrupt. Pour-over swag blog, art party stumptown seitan cray. Kickstarter pork belly 3 wolf moon selfies cray',
  isReply:true
};
/* I left Canned Tweet in this form without moving it directly into the vue instance as I figured you guys want to kind of simulate pulling the data from somewhere. Normally you'd be querying against an api. */

/* create selectors for dialog elements */
var dialog = document.querySelector('dialog');
var dialogClose = document.querySelector('dialog button');


var app = new Vue({
  el: '#tweet-list',
  data: {
    feed:[] //feed stores all of the tweets and their data
  },
  beforeMount(){
    this.initShortcutsDialog();//setup modal
    this.loadSample(); //add canned tweet to feed before vue renders
  },
  computed:{
    isNotTweetless:function(){
      //check if more than 1 tweet exists, if true, button stays visible.
      if(this.feed.length > 0){
        return false;
      }
      else{
        return true;
      }
    }
  },
  methods:{
    loadSample:function(){
      this.feed.push(CANNED_TWEET); //add canned tweet to feed
    },
    addTweet:function(){
      app.loadSample(); //add canned tweet to feed
    },
    removeLastTweet:function(){
      this.feed.pop(); //remove last tweet from feed
    },
    initShortcutsDialog:function(){
      /* setting up dialog element for keyboard shortcuts */
      dialogPolyfill.registerDialog(dialog);
      dialogClose.addEventListener("click",function(e){
        dialog.close();
      },false);
    },
    openShortcuts:function(){
      dialog.showModal();
    }
  },

})

//keyboard shortcuts, because moving a mouse is tedious.
document.onkeydown = keydown;
function keydown(evt){
  if (!evt) evt = event;
  if (evt.ctrlKey && evt.keyCode==78){ //CTRL+N
    app.addTweet();
  }
  else if (evt.ctrlKey && evt.keyCode==90){ //CTRL+Z
    if(app.isNotTweetless){
      console.error("Sorry, but you can't delete tweets that don't exist!");
    }
    else{
      app.removeLastTweet();
    }
    
  }
  else if (evt.ctrlKey && evt.keyCode==72){ //CTRL+H
    // Show the dialog with kbd shortcuts if it's not already open
    if (!dialog.open){
      dialog.showModal();
    } else{
      dialog.close();
    }
  }
}
