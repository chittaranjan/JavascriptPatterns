
var Singleton = (function() {
  var instance;

  function createInstance() {
    var object = {

    };
    return object;
  }

  return {
    getInstance : function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();


function run() {

  //Singleton.createInstance();

  var instance1 = Singleton.getInstance();
  var instance2 = {
  };
  var comparision = (instance1 === instance2);
  console.log("Same instance ? :" + comparision);
}

run();


function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function (j)  { // the j parametric variable is the i passed in on invocation of this IIFE​
            return function () {
                return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array​
            } () // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.​
        } (i); // immediately invoke the function passing the i variable as a parameter​
    }
    return theCelebrities;
}

var actionCelebs = [
  { "name":"Stallone", "id":0},
  { "name":"Cruise", "id":0},
  { "name":"Willis", "id":0}
];
var actionCelebsWithID = celebrityIDCreator(actionCelebs);
var StalloneWithID = actionCelebsWithID[0];
console.log(StalloneWithID.name + ":" + StalloneWithID.id);

var CruiseWithID = actionCelebsWithID[1];
console.log(CruiseWithID.name + ":" + CruiseWithID.id);

//Anonymous Function
//IIFE
(function() {
  var a = 5;
  var b = 6;
  console.log(a+b);
})();

(function(a, b) {
  console.log(a+b);
})(5, 6);

//Closure
//Function level Scope : Variables definced within a function is not accessible outside of it.
//Lexical Scoping : Functions run  in the scope they are defined in; not in the scope they are executed in

var toReturn;
(function() {
  var a = 5;
  var b = 6;

  toReturn = function() {
    return a+b;
  };
})();

console.log(toReturn()); //toReturn will be executed within the outer Anonymous function scope, in which its defined in


var adder = function(total) {
  var innerFunction  = function(add) {
    total += add;
    console.log(total);
  };
  return innerFunction;
}(1); //Outer function invoked with parameter 1, will return innerFunction, which will be assigned to adder
adder(5); //When adder() is called, the innerFunction gets involed actually and it still holds the parameters defined in the scope of outer annonymous function
adder(5); //Which is nothing but Lexical Scoping


//Mutability of Objects
//In Js, Everything is an object (except for 3 primitive datatypes)
//And all objects are mutable

function displayError() {
  displayError.numTimesExecuted++; //Functon mutated
}
displayError.numTimesExecuted = 0;

for (var count =0; count <11; count++) {
  displayError();
}

console.log(displayError.numTimesExecuted);



const user = {
  firstName: "Sebastian",
  lastName: "McKenzie",
  getFullName: () => {
    // whoops! `this` doesn't actually reference `user` here
    return this.firstName + " " + this.lastName;
  },
  // use the method shorthand in objects
  getFullName2() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(user.getFullName2());


//Until Arroe function in ECMA Script 2015, every function defined its own 'this' value
//and that proved to be annoying with an OO style of programming

function Person() {
  var currentObject = this;
  currentObject.age = 0;
  this.age = 0;

  setInterval(function() {
    currentObject.age++;
    console.log("Age in Anonymous Function:"+ currentObject.age);
  }, 1000)

  setInterval( () => {
    this.age++;
    console.log("Age in Arrow Function:" + this.age);
  }, 1000);
}

var p = new Person();
