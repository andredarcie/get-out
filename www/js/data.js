function Data(){

  this.set = function (key, value){
    localStorage.setItem(key, value);
  };

  this.get = function (key){
    if (this.itemExists(key))
      return localStorage.getItem(key);

    return null;
  };

  this.remove = function (key){
    localStorage.removeItem(key);
  };

  // Empty all keys out of the storage.
  this.clear = function (){
    localStorage.clear();
  };

  this.key = function (i){
    localStorage.key(i);
  };

  this.itemExists = function (key){
    if(localStorage.getItem(key) === null)
      return false;

    return true;
  };

}
