const TAG = "myTag";

function log(message){
  console.log(TAG,message);
}


module.exports= log;
module.exports.tag= TAG;