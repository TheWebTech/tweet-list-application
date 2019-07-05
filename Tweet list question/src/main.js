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
  isReply:false
};
/* I left Canned Tweet in this form without moving it directly into the vue instance as I figured you guys want to kind of simulate pulling the data from somewhere. Normally you'd be querying against an api. */


var app = new Vue({
  el: '#tweet-list',
  data: {
    feed:[] //feed stores all of the tweets and their data
  },
  beforeMount(){
    this.loadSample(); //add canned tweet to feed before vue renders
  },
  computed:{
    isNotLastTweet:function(){
      //check if more than 1 tweet exists, if true, button stays visible.
      if(this.feed.length > 1){
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
      this.feed.push(CANNED_TWEET); //add canned tweet to feed
    },
    removeLastTweet:function(){
      this.feed.pop(); //remove last tweet from feed
    },
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
    app.removeLastTweet();
  }
}