/*
    This TS file outlines some of the basic concepts of TS
    and how to set it up in a VS Code environment.
*/
/*
    Explicit Project Mode -
    For any TypeScript project define a "tsconfig.json" file.
    This identifies the project as a TS project, gives the files
    included in the project, the compiler options etc. 
*/
/*
    Build -
    Use  "Ctrl+Shft+B" to invoke the build command.
    Now select between tsc:build & tsc:watch
    tsc:build -> builds the TS project and 
    creates "*.js" and "*.js.map" files.
    tsc:watch -> sets up a watch to trigger a build whenever
    a file in the project is modified.
*/
/*
    Build Tasks -
    Use a "tasks.json" to define tasks to be executed such as
    code formaters/checkers, bundlers etc.
    We shall use it to configure the default build task.
    [Use "option": "watch" to reflect code changes automatically
     in build else, we will have to do explicit build before debug!]
*/
/*
    Launch Debug Settings -
    Use a "launch.json" to specify how an app is launched and
    attached to a debugger.
    [Use "program": "${file}" to point to current file]
*/

class Satrtup{
    public static main(): number{
        console.log("======= BEGIN - Basic TS Language Concepts =========");
        this.demo_iife();
        this.demo_let();
        /*
        this.demo_let_for();
        this.demo_const();
        this.demo_immutable();
        this.demo_multiline_strings();
        this.demo_template_strings();
        this.demo_arrow_function();
        this.demo_arrow_and_this();
        this.demo_destructuring();
        this.demo_for_of_loop();
        this.demo_Map();
        this.demo_Set();
        this.demo_promise();
        this.demo_classes();
        this.demo_interfaces();
        this.demo_decorators();
        this.demo_types();
        this.demo_generics();
        this.demo_type_aliases();
        this.demo_algebraic_types();
        this.demo_modules();
        this.demo_namespaces();
        this.demo_mixins();
        */
        console.log("======= END - Basic TS Language Concepts =========");
        return 0;
    }
    private static demo_iife() {
        /*
            "let" keyword and block scope.
            Uptill ES5 JS only had had 2 scopes -
                1) global scope
                2) function scope
            To overcome this limitation the JS pattern 
            "Immediately Invoked Function (IIFE)" was used.
            In ES6 we have the "let" keyword to specify block scope!
         */
        console.log("**** Demo IIFE keyword");
        function foo(){
            var a = "outer scope";
            if(true){
                var a = "inner scope";
            }
            console.log(a);
        }
        foo();
        // The value of 'a' printed will be "inner scope"
        /* To restrict scope of 'a' within if-block use an 
        immediately invoked function expression to enclose that block
        and give it its own micro function scope! */
        function foo_iife(){
            var a = "outer scope";
            if(true){
                (function(){
                    var a = "inner scope";
                })();
                /*Enclose in a function and invoke immediately */
            }
            console.log(a);
        }
        foo_iife();
        // The value of 'a' printed will be "outer scope"
    }
    private static demo_let() {
        console.log("**** Demo 'let' keyword");
        function foo(){
            var a = "outer scope";
            if(true){
                let a = "inner scope";
            }
            /*The 'let' keyword limits the 'a' variable to block-scope*/
            console.log(a);
        }
        foo();
        // The value of 'a' printed will be "outer scope"
    }
    private static demo_let_for() {
        console.log("**** Demo 'let' in for-loop");
        // Classic closure gotcha in JS prevented by 'let'
        console.log("--- using 'var' with loop variable");
        var closures = [];
        for(var i=0;i<3;i++){
           closures.push(function(){console.log(i);}); 
        }
        closures.forEach(function(func){
            func();
        });
        /* 
            Will print 3 3 3, because 'var i' value has scope 
            outside the closure and its value has been changed to 3
        */
        // correct it using block scope
        console.log("--- using 'let' with loop variable");
        closures.length = 0;
        for(let i=0;i<3;i++){
            closures.push(function(){console.log(i);}); 
        }
        closures.forEach(function(func){
            func();
        });
    }
    private static demo_const() {
        console.log("**** Demo 'const' keyword");
        /* 
        'const' declares the variable as a constant.
        The value has to be initailized on declaration.
        It has a block scope.
        */
        const X = "A";
        // X = 23; wil give a compile time error
        console.log(typeof(X));
    }
    private static demo_immutable() {
        console.log("**** Demo 'Object.freeze()'");
        /* 
        To make an object immutable we can freeze it
        using 'Object'freeze()' method
        */
       //const account = {'name': 'Alan', 'amount': 100.00};
        const account = Object.freeze({'name': 'Alan', 'amount': 100.00});
        // account.amount = 50.00;
        /* 
            changing the property of a frozen object will result in 
            comiple time error
        */
        console.log(account);
    }
    private static demo_multiline_strings() {
        console.log("**** Demo - multi-line strings using '`");
        /* 
        We can declare strings spanning across multiple line
        by using the ` to enclose them. It is similar to 
        using ''' in Python
        */
       const para = `
       The quick brown fox
       jumped over,
       the lazy grey dog`;
       console.log(para);       
    }
    private static demo_template_strings() {
        console.log("**** Demo - template-string OR string-interpolation");
        /* 
        TS can substitute variables in string place-holders. 
        Just like string interploation in Python and Ruby.        
        */
       let name = "Alex";       
       const greet = `Hello ${name}, how are you?`;
       //NOTE: The string literal should be in `` !!!       
       console.log(greet);       
    }
    private static demo_arrow_function() {
        console.log("**** Demo - Fat-Arrow function");
        /* 
        TS/ES6 has introduced an easier notation for representing
        anonymous functions using '=>'. This representation is 
        called fat-arrow fucntions.
        This is exactly same as lambda-fucntions in C# and
        similar to other functional-supporting languages
        */        
        function hof(f){f();};
        //--- Anonymous function to a HOF
        hof(function a(){console.log('Anonymous func!');});
        //--- fat-arrow function
        hof(() => console.log('Fat-arrow func!'));
        //--- returning values
        let prod = (x, y) => x * y;
        console.log(prod(3, 4));
        /* 
        NOTE: For a single line expression we do not have to use
        curly-braces '{}', or the 'return' keyword
        */        
    }
    private static demo_arrow_and_this() {
        console.log("**** Demo - 'this' in Arrow-function");
        /* 
        In JS the 'this' keyword can cause un-intuitive behaviour
        based on the 'calling-context'
        */        
        let obj = {
            name: 'Alex',
            greet: function(){
                console.log(`Hello ${this.name}`);
            }
        };
        obj.greet();
        /*
        Output will be - Hello Alex
        The function is invoked with the object 'obj', 
        therefore the 'this' will point to 'obj'
        */
        let hof = function(f){f();};
        // The hof could be something useful like setTimeout()
        let objx = {
            name: 'Alex',
            greet: function(){
                //hof(function(){console.log(`Hello ${this.name}`)});
                //compile time error in ES6
            }
        };
        objx.greet();
         /*
        Oops - Output will be - Hello undefined
        The anonymous function within the 'hof' is
        getting invoked by the global-object of Node/browser
        which means that golobal-object becomes the 'calling-context'
        of the function invocation and the 'this' keyword points
        to that object
        */
        console.log("--- Arrow-functions bind to 'outer this'!!");
        let objy = {
            name: 'Alex',
            greet: function(){
                hof(() => console.log(`Hello ${this.name}`));
                /*same as -
                function(){console.log(...)}.bind(this);
                 */
            }
        };
        objy.greet();
    }
    private static demo_destructuring() {
        console.log("**** Demo - destructuring OR variable unpacking");
        /* 
        Destructuring as the name implies is a way to unpack
        the elements of objects and arrays to variables in a 
        single step 
        */       
        // Object unpacking
        let obj = {name:'Alex', score:87, doj:new Date(2014,0,10)};
        // destructuring object using attribute names
        const {name:n, doj:d} = obj;
        console.log(`${n} joined on ${d.toDateString()}`);
        
        // destructuring object using attribute shortcut
        const {name, doj} = obj;
        /* 
            The variables 'name' and 'doj' has to be the 
            same as the property names 'name' and 'doj'
        */
        console.log(`${name} joined in the year ${d.getFullYear()}`);

        // Array destructuring
        let students = ['Alex', 'Bob', 'Cathy'];
        const [b,c] = students;
        console.log(`${b} and ${c} are good students.`);
        // Alex and Bob are good students, it unpacks by index

        // Function parameter destructuring
        /* 
            Function parameters can be specified in destructured 
            notation. This is mostly syntactic sugar
         */
        function foo({name, age}){
            console.log(`${name} is ${age} years old.`);
        }
        foo({name:'Alex', age:23});
    }
    private static demo_for_of_loop() {
        console.log("**** Demo - 'for-of' iterator pattern");
        /* 
        Unlike most other languages, in JavaScript the 'for-in'
        loop construct was designed to iterator over the
        'properties' of an object and not the 'elements'
        of a collection. This can lead to unexpected bugs.
        */
        let nums = [1,2,3];
        let sum;
        for(let i in nums){
            sum += i;
        }
        console.log(sum)
        // Oops - gives undefined012
        /*
            Even though it looks like it shoudl work, for-in
            is iterating over the array as an object and taking
            each property and doing string concatenation
        */
        /* 
            TS/ES6 has introduced the 'for-of' loop to implement
            the iterator pattern. This is same as 'foreach-in'
            in C#
        */
       let sum_i = 0;
       for(let i of nums){
           sum_i += i;
       }
       console.log(sum_i);
       // As expected - 6
    }
    private static demo_Map() {
        console.log("**** Demo - 'Map' datastructure");
        /* 
        Traditionaly in ES5 we used objects, to keep
        key-value pairs. Objects in JS are similar to Map/Hash
        datastructures in other languages such as Python/Ruby.

        However objects have some limitations and complications
        when used as hash-tables because they come with 
        prototype inheritance attached, and since it treats 
        keys as properties, it performs key/property lookup
        in the prototype-chain. This is not what we generally intend.
        Also it lacks the handy methods hash-tables have in other languages.
        */
        /*
        In order to make things easier TS/ES6 has introduced a 'Map' 
        datastructure for key-value pairs.
        NOTE: In 'tsconfig.json' the target has to be set to es6
        "target": "es6"
        ES5 target does not support this datastructure!
         */
        // Declaring a map
        let week = new Map([
                ['Mon', 1],
                ['Tue', 2],
                ['Wed', 3]
            ]
        );
        /* 
        NOTE: We can initialize a map with an array of
        key-value pairs
        */
       console.log(week);
       // Add elements to Map Or Set values
       week.set('Thu', 4)
        .set('Fri', 5)
        .set('Sat', 6)
        .set('Sun', 7);
        // Note - 'set' is a chainable method/fluent interface
        // Check exists
        console.log(`Week has Friday = ${week.has('Fri')}`);
        // Get value
        console.log(`Friday is the ${week.get('Fri')}th day`);
        // Delete item
        week.delete('Mon')
        // NOTE: If key does not exist nothing happens

        // Find number of items
        console.log(`This week has ${week.size} days`);

        // Clearing a map 
        week.clear();

        // Looping over a map - using for-of
        let scores = new Map([
            ['Alex', 98],
            ['Bob', 87],
            ['Cathy', 98]
        ]);
        // Loop over keys()
        console.log('The students who took the test are:');
        for(let p of scores.keys()){
            console.log(p);
        }
        // Loop over values()
        console.log('They have scores:');
        for(let s of scores.values()){
            console.log(s);
        }
        // Loop over entries()/key-value pairs
        console.log('Their corresponding scores are:');
        for(let e of scores.entries()){
            console.log(`${e[0]} = ${e[1]}`);
        }
        // using deconstruction
        for(let [n,s] of scores){
            console.log(n, s);
        }
        // NOTE that 'entries()' is a default method in this context
    }
    private static demo_Set() {
        console.log("**** Demo - 'Set' datastructure");
        /* 
        A set datastructure is used to do set operations.
        But in TS/ES6 it is just to hold a unique set of values
        as of now.
        */
        // Declaring a set
        let odds = new Set([1, 3, 5]);
        /* 
        NOTE: We can initialize a set with an array of
        items
        */
        console.log(odds);
        // Add elements
        odds.add(7).add(9);
        // Note - 'add' is a chainable method/fluent interface*
        // Check exists
        console.log(`9 is odd = ${odds.has(9)}`);
        
        // Delete item
        odds.delete(5);
        // NOTE: If key does not exist nothing happens

        // Find number of items
        console.log(`There are ${odds.size} numbers`);

        // Clearing a set 
        odds.clear();

        // Looping over a set - using for-of
        let evens = new Set([2,4,6]);
        let sum = 0;
        for(let e of evens){
            sum += e;
        }
        console.log(sum);
    }
    private static demo_promise() {
        console.log("**** Demo - 'Promises'");
        /*
        Promise is a placeholder for a possible future value
        in computation. It is generally used in asynchronous
        programming as a cleaner alternative to callbacks.
        It is similar to Task<> in C#      
         */
        // Simulator for an HTTP get request - asynchronous operation
        function simRequest(url, cb){
            let data = url.substr(20, 4);
            let err = null;
            setTimeout(()=>{
                cb(data, err);
            }, 2000);
        }
        /* 
        Use the above dummy function to simulate calling 
        a web request and then using that to call a second request
         */
        simRequest("http://mydomain.com/url1",
            (data, err) =>{
                if (err){
                    console.log(`error = ${err}`);
                }
                else{
                    // do something with 'data'
                    simRequest("http://mydomain.com/url2",
                        (data, err) =>{
                            if (err){
                                console.log(`error = ${err}`);
                            }
                            else{
                                // Do something!!
                                console.log(`Web request output = ${data}`);
                            }
                        }
                    );
                }
            }
        );
        /*
        Handling asynchronous operations in this manner leads to
        quite unweildy code that is hard to understand, reason about,
        and maintain. The name given to this sort of nested callback
        scenario is "Callback Hell".
        Also error handling becomes difficult.

        This is where Promises/Futures provide a cleaner approach.
        A Promise wraps up an asynchronous operation and can 
        be chained one after the other to handle complex
        asynchronous scenarios
         */
        /*
        We can create a Promise by using the syntax -
        let myPromise = new Promise((resolve, reject)=>{

        });
        'resolve' and 'reject' are parameters names used by convention
         */
        /* Let us implement the above scenario using Promises */
        function requestPromise(url){
            let promise = new Promise((resolve, reject)=>{
                /* Simulated Request is the asynchronous
                computation wrapped up by the promise */
                simRequest(url, (data, err)=>{
                    if (err){
                        // error results in promise.reject
                        reject(err);
                    }
                    else{
                        // success results in promise.resolve
                        resolve(data);
                    }
                });
            });
            // now return the wrapped up promise
            return promise;
        }
        /* now we can use this in a chained fashion */
        requestPromise("http://mydomain.com/url1")
            .then((data)=>{
                // do something with 'data'
                return data;
                /*
                what we return gets passed into the next
                pipeline
                */
            }).then((data)=>{
                // make next request
                return requestPromise("http://mydomain.com/url2")
            }).then((data) =>{
                console.log(`Web request with Promises = ${data}`);
            }).catch((err) => {
                /*
                Any error in the pipeline will halt the '.then'
                chain and execute the code in the '.catch' method.
                A thrown exception will have the same effect.
                 */
                console.log(`Error = ${err}`);
            });
        /*
        In some situations (while chaining) we may need a 
        resolved/rejected Promise. An immediately resolved/rejected
        Promise can be created using new Promise.resolve()/reject()

        NOTE: If a handler is attcahed to an Promise even after it is 
        resolved/rejected, it gets invoked.
         */

        //===============================================
        console.log(
       `The Rules of Promise handler chaining:
        A) When x is a value (number, string, etc):
        return x is equivalent to return Promise.resolve(x)
        throw x is equivalent to return Promise.reject(x)

        B) When x is a Promise that is already resolved/rejected
        (not pending anymore):
        return x is equivalent to return Promise.resolve(x)
        return x is equivalent to return Promise.reject(x)
        
        C) When x is a Promise that is pending:
        return x will return a pending Promise,
        and it will be evaluated on the subsequent then.`
        );
        //================================================
    }
    private static demo_classes() {
        console.log("**** Demo - Classes");
        /*
        JS is a proototype-based object oriented langauge, which means -
            1) Objects are created using other objects as buleprints/prototypes
            2) Inheritance is achieved through prototype-chain lookup 
        This is different from classical object oriented languages which use
        classes.
        ES6/TS provides an alternate syntax for object orientation that is
        same as classical object oriented langauges. This reduces confusion
        for developers not used to the JS model as well as avoids a lot
        of boilerplate code.

        NOTE: Under the hood the implementation is still the same old 
        prototypal inheritance with constructor functions and prototype-chain.
         */
        // Declaring a class
        class Person {
            protected firstName = '';
            protected lastName = '';
            /* 
            NOTE: access specifiers -
                private, protected. public
            are supported ONLY in TS and NOT in ES6
            */

            // NOTE: keyword 'constructor'
            public constructor (firstName, lastName){
                this.firstName = firstName;
                this.lastName = lastName;
            } 
            // method
            protected name(){
                return `${this.firstName} ${this.lastName}`;
            }
            public greet(){
                console.log(`Hello, I am ${this.name()}`);
            }
        };

        // Create an instance
        let alex = new Person('Alex', 'Bezos');
        alex.greet();
        // Hello, I am Alex Besoz
        
        // Inheriting from a class
        class Student extends Person{
            // NOTE: Uses 'extends' keyword for inheritance
            constructor(firstName, lastName, private Id){
                /*NOTE: constructor initialization pattern -
                if we use the access-specifier in the parameter
                declaration in the constructor it saves us the
                extra code of declaring that variable and 
                setting it's value.
                It is syntactic sugar but saves a lot of
                repetative code.
                */
                super(firstName, lastName);
                // NOTE: 'super' keyword to refer to parent class
            };

            public getId(){
                return this.Id;
            }
        };
        // Create an instance
        let bob = new Student('Bob', 'Fisher', 1001);
        bob.greet();
        // Hello, I am Bob Fisher
        
        // static methods
        class Helper{
            static twice(text){
                return `${text} ${text}`;
            }
        }
        // calling a static method
        console.log(Helper.twice("blah"));
        // blah blah

        // Property geter & setter
        class Employee{
            constructor(private _name: string
            , private _id: number){}

            // getter for 'name'
            public get name(){
                return this._name;
            }
            // setter for 'name'
            public set name(newName: string){
                let oldName = this._name;
                this._name = newName;
                console.log(`${oldName} has changed to ${newName}`);
            }
            // getter for id
            public get id(){
                return this._id;
            }
        }

        let al = new Employee('Allan', 1001);
        console.log(`${al.name} is emloyee ${al.id}`);
        al.name = 'Alice'
        // Use 'name' and 'id' like properties
        console.log(`${al.name} is emloyee ${al.id}`);
    }
    private static demo_interfaces() {
        console.log("**** Demo - Interfaces");
        /*
        Like in traditional object oriented langauges
        TS provides interfaces.
        Unlike many other laguages though, TS interfaces
        allow data/field members and not just methods!
         */    
        // declaring interfaces
        interface Mover{
            distance: number;   // property
            move();             // method             
        }
        // A Runner is a Mover
        class Runner implements Mover{
            constructor(public distance){};
            public move(){
                console.log(`I ran ${this.distance} miles`)
            }
        }
        // A Swimmer is a mover as well
        class Swimmer implements Mover{
            constructor(public distance){}
            public move(){
                console.log(`I swam ${this.distance} meters`);
            }
        }
        let bolt: Mover;
        // variable of type interface
        bolt = new Runner(100);
        bolt.move();
        bolt = new Swimmer(50);
        bolt.move();

        // another interface
        interface Jumper{
            jump(height: number);
            name?: string;
            // NOTE: '?' suffix makes the member optional!!
        }        
        // A Frog jumps and moves - multiple interfaces
        class Frog implements Mover, Jumper{
            constructor(public distance){}
            public move(){
                console.log(`I swam ${this.distance} feet`);
            }
            public jump(height: number){
                console.log(`I jumped ${height} cemtimeters`);
            }
        }
        let prince = new Frog(2);
        prince.move();
        prince.jump(15);
    }
    private static demo_decorators() {
        console.log("**** Demo - Decorators");
        /*
        Decorators are declarative constructs that we can add to
        langauge components (classes, methods, properties, parameters)
        , to give them additional information or behaviour 
        that can be used at run-time.
        This is often used for meta-programming, reflection,
        dependency injection etc. Generally for programs
        that have to deal with objects whose types are not 
        pre-determined. Meta-programming is commonly found in
        framework code.

        May other languages have decorators too -
        C# - Attributes
        Java - Annotations
        Python - Decorators
         */
        
        /*
        Decorators are still under consideration for ES7 and not
        available for ES6. However in TS it is available 
        as an experimental feature.
        NOTE: In tsconfig.json set -
        experimentalDecorators: true
         */
        /*
        A decorator in TS is applied by having an '@' prefix
        and lexically placing it before the thng being decorated.

        The decorator itself is a function. The signature of
        the function depends on teh type of component being
        decorated (classes, methods, properties, parameters).
         */
        console.log("--- A Method decorators")
        /*
        Define a simple function, that conforms to the 
        signature of a 'Method decorator'.
        It just shows the values of the 
        parameters that it gets invoked with.
         */
        function info(target, propertyKey: string
            ,descriptor: PropertyDescriptor): any{
            console.log(`target.constructor = ${target.constructor.name}`);            
            // class Account {..}
            console.log(`propertyKey = ${propertyKey}`);
            // credit - name of the method being decortated
            console.log(`descriptor = ${descriptor}`);
            // Object {value:, writable:true, enumerable:false...}
            console.log(`descriptor.value = ${descriptor.value.name}`);
            // description.value is the property/method
        }
        /*
        Now let us have a method decorator that modifies
        the method to inject logging before and after 
        invocation!
        */
        function log(target, key: string
        , descriptor: PropertyDescriptor): any{
            let orgMethod = descriptor.value;
            // wrap original method in a new method
            let newMethod = function(...args){
                // NOTE: spread operator '...' to get 'args' as array
                // NOTE: DO NOT use arrow/lambda-function !!!               
                try{
                    console.log(`Before calling method ${key}..`);
                    console.log(`.. argument values ${args}..`);
                    return orgMethod.apply(this, args);
                    /* 
                    NOTE: 'this' is the instance of the 'target'
                    object. HOWEVER if we write 'newMethod'
                    as an arrow-function, 'this' will be
                    'undefined' or 'global'!!!
                    */
                }catch(e){
                    console.log(`Error - ${e}`);
                }finally{
                    console.log(`.. After calling ${key}`);
                }                            
            };
            // change descriptor value
            descriptor.value = newMethod;
            return descriptor;
        }
        /* 
        NOTE: When the code is INITIALIZED the decorator
        function is executed. 
        => the'credit' method has been modified now
        */ 
        class Account{
            private _amount = 0;
            constructor(private _name: string
                , private _type: string){
                console.log(`Opening ${_type} account ${_name}`);
            }
            @info
            @log
            /*
            NOTE: We can apply multiple decorators to a method.
            They are applied bottom->up OR Right->Left 
            (function-composition style)
            */
            credit(amt: number): number{
                this._amount += amt;
                return this._amount;
            }
        }
        let curr = new Account('Alex', 'Current');        
        // Let us try invoking 'credit' method now -
        console.log(`Acount balance is ${curr.credit(1000)}`);

        console.log('--- A Property Decorator')
        /*
        Property decorators are very simialr to Method decorators.
        They have the same scope, only their signature is slightly 
        different. It follows the similar pattern.
        */
       /* 
       Define a function that restricts range and 
       make it into a property decorator
       */
       function floor(target, key: string){
           let _val = target[key];
           /* 
           NOTE: 'target' points to the class prototype
           */
           let getter = function(){               
               return _val;
               /*NOTE: 'getter' forms a closure over '_val' */
            };
           let setter = function(val){
               _val = (val < 0) ? 0 : val;
                /*NOTE: 'setter' forms a closure over '_val' */
           };
           /*
           It is the 'closed over' variable '_val' that acts 
           as the backing-field!!!
            */

           Object.defineProperty(target, key, {
               get: getter,
               set: setter,
               enumerable: true,
               configurable: true
           });
       }
       /*
        */
       class Person{
            
            @ceiling(100)
            @floor
            public age = 0;
            constructor(private _name:string){}
            public get name(){
                    return this._name;
            }            
       }
       let al = new Person('Alex');
       al.age = 10;
       console.log(`${al.name} is ${al.age} years old.`);
       al.age = -2;
       console.log(`${al.name} is ${al.age} years old.`)
       // Alex is 0 years old - (decorator floors teh value at 0!)
       
        console.log('--- Decorator with parameters')
        /*
        If we want our decorator to have parameters then we
        need to use a decorator-factory. That just means that
        we will have a higher order function which returns 
        our decorator function. 
        (An hof that returns a function is a function factory).
        
        The reason for this is that the decorator function 
        needs to have a specific signature (target, key,..),
        which means we need a closure of that to have other
        parameters.
        */
       function ceiling(upperLimit: number){
           return function(target, key: string){
                /*NOTE: becuse we are COMPOSING multiple decorators 
                in this example (@ceiling, @log), 
                the code CAN GET COMPLICATED AND ERROR PRONE!!
                */                
                let pd = Object.getOwnPropertyDescriptor(target, key);
                 /*NOTE: We have to make sure we are wrapping and 
                 invoking the existing getter & setter
                 as needed!!!

                 This is a bad practice and means that we should
                 redesign the code.
                */
                let getter = pd.get;
                let orgSetter = pd.set;
                let setter = function(val){                    
                    if(val > upperLimit){
                        console.log(`Age cannot be higher that ${upperLimit}`);
                        val = upperLimit;
                    }                                  
                    /*NOTE: logic refers to the outer scope variable
                    which is the parameter */
                    orgSetter(val);
                    // Finally call original setter!
                }; 
                Object.defineProperty(target, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
           };
       }
       al.age = 120;
       console.log(`${al.name} is ${al.age} years old.`)

       console.log('--- Class Decorator')
        /*
        A class decorator is applied to the whole class and gets
        called with a single parameter which is the 'constructor'
        of the class.

        It has the signature - 
        <TFunction extends Function>(target: TFunction)
        => TFunction | void

        The way to implement this is by returning a new constructor
        function with augmented capability!
        */
       /*A simple example to augment a class with extra interface */
       function entity(name){
            return function <TF extends {new (...args: any[])}>(ctor: TF){
            /*
            NOTE: The wierd syntax of a constrcutor fucntion with 
            generics
             */
                return class extends ctor implements iEntity{
                /*
                NOTE: constructor function and class are equivalent
                , as it should be in JavaScript
                */
                    entityName = name;
                };
            }
       }
       interface iEntity{
           entityName: string;
       }

       @entity("Vehicle")
       class Car{
           constructor(public make: string
            , public model: string){}
       }

       let tt = new Car('Audi', 'TT');
       console.log(tt.entityName);
       // Vehicle - (even though editor shows error!!)

        //Adding extra functionality to constructor
        function logCreate<TF extends {new (...args: any[])}>(ctor: TF){
            // add custom logic
            console.log(`Creating instance of ${ctor.name}`);
        }
        @logCreate
        class Daemon{
            constructor(public id){
                console.log("Daemon - original constructor");
            }
        }
        let d1 = new Daemon(121);
        console.log(d1.id);

        console.log('--- Parameter Decorator')
        /*
        A parameter decorator is used to simply mark a parameter
        with some metadata.
        After this a method decorator can be used to act based 
        on that metadata!
        Parameter decorator has signature like-
        (target: any, key: string, index: number): void 
        */
       const METADATA_KEY = "myMetadataKey";
       function blackList(target: any, key: string, index: number){
           console.log(`'target' = ${target}`);
           // instance
           console.log(`'key' = ${key}`);
           // parameter name
           console.log(`'index' = ${index}`);
           // parameter index
          
           // use some custom metadata container
           if(Array.isArray(target[METADATA_KEY])){
                /*Push to existing array - 
                more than one marked parameter
                */
               target[METADATA_KEY].push(index);
           }
           else{
                /*Add array of index - 
                for first marked parameter
                */
                target[METADATA_KEY] = [index]; 
           }
           /*
           Now all marked params will have their 
           indices pushed in the target[METADATA_KEY] array property
            */
       }
       /* Method decorator to actually do something on
        the marked parameters*/
       function checkEmail(target, key: string, descriptor: PropertyDescriptor){
            let orgMethod = descriptor.value;
            descriptor.value = function(...args){                
                let markedIndices: Array<number> = target[METADATA_KEY];
                console.log(markedIndices);
                for(let i=0; i<args.length; i++){
                   if(markedIndices.indexOf(i) != -1){
                       console.log(`Checking if ${args[i]} is blacklisted...`)
                   }
                }                
                return orgMethod.apply(this, args);
            };
            return descriptor;
       }
       class Comms{
            /* 
            Parameter decorators works only with methods
            not plain functions
            */
           @checkEmail
            sendMessage(sender: string, @blackList to: string, msg: string){
                console.log(`From ${sender} -> To ${to} : ${msg}`);
            }
        }
        let cs = new Comms();
        cs.sendMessage('alex@foo.com', 'bob@bar.com', 'Hola!');
    }
    private static demo_types() {
        console.log("**** Demo - Types");
        /*
        TypeScript provides -
            - static type checking at Transpile time
            - type inference
            - typing is optional though (JavaScript)
        At runtime it is all JavaScript so any reflection
        would not be able to use TS type information directly
         */
        // Basic types
        let a: number;
        let b: boolean = false;
        let c: string;
        a = 22/7;
        console.log(`a: number = ${a}`);
        console.log(`b: boolean = ${b}`);
        c = 'Hola'
        console.log(`c: string = ${c}`);

        // Arrays - [] notation
        let odds: number[] = [1,3,5];
        // Arrays - generics notation
        let evens: Array<number> = [2,4,6];
        console.log(evens.constructor.name);
        // Array
         
        /*
        TS promotes functional programming style of
        having types for functions
         */
        // Function signature
        let binOp: {(a: number, b: number): number};
        binOp = (a,b) => a + b;
        // use 'Function'
        let thrice: Function = (x) => { 3 * x};

        // Enums - enum
        enum Direction{
            up,down,left,right
        }
        let go: Direction = Direction.up;

        // Representing something missing:
        /**
         * null - is a special value to reprsent missing value.
         * It can be assigned to any type
         */
        go = null;
        /**
         * undefined - is a special value which means the variable 
         * was to initialized so far.
         * It can be assigned to any type
         */
        let u: number;
        console.log(`'u' is ${u}`);
        // 'u' is undefined

        /**
         * any - is a special Type which instructs TS to ignore
         * type-checking on that variable.
         * Basically telling it that it can hold any value.
         */
        let v: any;
        v = '2';
        v = 23;
        v = {};
        console.log(`'v' is ${v}`);

        /**
         * void - represents that the function does NOT return
         * anything.
         */
        function show(x: number): void{
            console.log(`value of 'x' is ${x}`);
        }

        console.log("--- Tuple types");
        /**
         * TS provides a convenient type declaration for Tuples,
         * based on JS convention of using arrays -
         * [<type1>, <type2>]
         * Along with value destructuring this make sit 
         * feel like there is first-class support for tuples,
         * even though they are just arrays under the hood!
         */
        let rec1: [string, number];
        rec1 = ['Alex', 233];
        // treating rec1 like a tuple
        let [name, score] = rec1;
        console.log(`${name}'s score is ${score}`);
        /**
         * Type Assertion - Sometimes we can assert the type
         * of a variable, especially if we want to use some
         * members of the type we believe it to be.
         * Similar to type-casting.
         */
        let w: any = [1,2,3,4,5];
        let x: number = (<number[]>w).reduce((p,c)=>p + c, 0);
        // Casting 'w' as Array<number>
        console.log(x);
    }
    private static demo_generics() {
        console.log("**** Demo - Generics");
        /*
        TS provides type-parameters or generics just like
        in Java & C#, using the '<>' notation.
        Using generics enables us to write reusable code
        on a set of data-types that conform to some behaviour.
        We can apply generics on classes, functions, methods.
         */
        function biggest<T>(items: T[]): T{
            let b: T;
            if((items) && (items.length > 0)){            
                b = items[0];
            }
            for(let i of items){
                if(i > b) b = i;
            }
            return b;
        }
        
        let nums = [10, 34.6, 23, 98, 97.7, 97.699];
        console.log(`Largest number = ${biggest<number>(nums)}`);
        let text = ['Hola', 'Amigo', 'Ci', 'Cervante', 'Zoro'];
        console.log(`Greatest word = ${biggest<string>(text)}`);
        // The same function used for number & text

        // Constraints on Generics
        /*
        We can apply constraints on the types that can be assigned to
        the generic parameter using the 'extends' keyword.

        Suppose I want to extend the above function to compare
        a list of items with a 'value' property
         */
        interface Item{
            value: number;
        }
        /*
        Now we can write the above function as -
         */
        function biggest_1<T extends Item>(items: T[]): T{
            let b: T;
            if((items) && (items.length > 0)){            
                b = items[0];
            }
            for(let i of items){
                if(i.value > b.value) b = i;
            }
            return b;
        }
        class Score implements Item{
            constructor(public value: number){}
        }
        class Age implements Item{
            constructor(public value: number){}
        }
        let scores = [new Score(3), new Score(5), new Score(1)
                    , new Score(7), new Score(6)];
        console.log(`Highest score = ${biggest_1<Item>(scores).value}`);
        let ages = [new Age(23), new Age(43), new Age(18)
            , new Age(56), new Age(37)];
        console.log(`Oldest age = ${biggest_1<Item>(ages).value}`);
        
        /*
        Generics in TS is nominal, they work as long as the structure is 
        same even if the type does not explicitly implement
        the interface or extend the class!!
         */
        let invoices = [{value: 200.00}, {value: 123.00}
            , {value: 435.50}, {value: 112.00}];
        console.log(`Highest amoount = ${biggest_1<Item>(invoices).value}`);
    }
    private static demo_type_aliases() {
        console.log("**** Demo - Type aliases");
        /**
         * TS provides type aliases that can be used to
         * name a complex type declaration and reused.
         * This is done using the 'type' keyword this is 
         * similar to Haskell, Scala etc.
         */
        type Callback = (data: any) => void;
        function some_task(cb: Callback){
            cb("Done!");
        }
        some_task((d) => console.log(d));

        // Type alias with generics
        type Factory<T> = (...args: any[]) => T;

        class Car{
            constructor(public make: string
                , public model: string){};
        }
        // Factory method using the type alias
        let carFact: Factory<Car> = (make, model) => {
            return new Car(make, model);
        }
        console.log(carFact('Audi', 'TT'));
    }
    private static demo_algebraic_types() {
        console.log("**** Demo - Algebraic Types");
        /*
        TS provides algebraic types, or the ability to compose
        data-types into new type.
        There are 2 types of possible compositions-
            1) sum types/disjoint unions -
                Think type1 OR type2 composition
            2) product types/intersection -
                Think  type1 AND type2 composition
        This is very common in functional-languages and the concepts
        are based on type-theory.
         */
        console.log('--- Union Type - <type1> | <type2> -');
        // Two types of customers
        enum CustType{
            Individual,
            Corporate
        }
        class IndividualCustomer{
            type: CustType.Individual; 
            firstName: string;
            lasttName: string;
            ssn: number;
        }
        class CoporateCustomer{
            type: CustType.Corporate;
            name: string;
            taxId: number;
        }
        /* If we need a function that works both types
        of customers, we can use a union type - 
        */
       type Customer = IndividualCustomer | CoporateCustomer;
       function customerName(cust: Customer): string{
            switch(cust.type){
                case CustType.Individual:
                    return `${cust.firstName} ${cust.lasttName}`;
                case CustType.Corporate:
                 //return `${cust.firstName} ${cust.lasttName}`;
                 /*TS can evaluate and tell that above properties
                 are not applicable to CorporateCustomer!!
                 It is smart enough to figure that out from 
                 the PROPERTY VALUE we have accessed.
                 */
                    return cust.name;

            }
       }
       let customers: Customer[];
       // customers array - contains both types of customers
       customers = [
           {
               type: CustType.Individual,
               firstName: 'Alex',
               lasttName: 'Bezos',
               ssn: 2345632246878
           },
           {
                type: CustType.Corporate,
                name: 'ACME Co.',
                taxId: 9901234565432
           }
       ];
       customers.forEach((c) => console.log(customerName(c)));
        // Accessing members using union type
        class Developer{
            constructor(public name: string,
                public languages: string){}
        }
        class Tester{
            constructor(public name: string,
                public tools: string){}
        }
        type Resource = Developer | Tester;
        
        let getRes = (): Resource =>{
            return new Tester('John','Selenium');
        };
        let a1: Resource = getRes();
        //console.log(a1.tools);
        /* transpiler wil give error - 
        'tools' is not a property of Resource!!

        Union types - can access only common/intersection
        properties!!
        Though this seems counter-intuitive it makes 
        perfect sense, since the value of a Union type 
        con be only either one of the sub-types. Therefore
        the accessible members via the union-type can 
        only be the commomn subset, untill it resolves to 
        one of the specific sub-types.

        NOTE:Like in the customer example above, if one
        of the properties has a predetermined value that
        can be used to differentiate the sub-type then
        TS will automatically resolve it to the sub-type!!
        */
        // Type-Guards - is another way to resolve the sub-types
        function showSkills(res: Resource){
            let skills;
            if((<Developer>res).languages !== undefined){
                skills = (<Developer>res).languages;
            }
            else if((<Tester>res).tools !== undefined){
                skills = (<Tester>res).tools;
            }

            console.log(`${res.name}'s skills are: ${skills}`);
        }
        let t1 = {name: 'Cathy', tools: 'EggPlant'};
        showSkills(t1);
        console.log('--- Intersection Type - <type1> & <type2> -');
        /**
         * Sometimes we need to take multiple types and compose 
         * into a type with features from all the subtypes.
         */
        class Exam{
            constructor(public examId: string
                    , public score: number){};
        }
        class Student{
            constructor(public name: string
                    , public Id: number){};
        }
        /* Now if we want to objects that hold a
        students exam results -
        */
       type Class = Student & Exam;
       /**
        * To actually compose the object we would need to
        * resort to standard JS to iterate and add the 
        * properties
        */
        function compose<T,U>(obj1: T, obj2: U): T & U{
            let comp = <T & U> {};
            for(let p in obj1){
                comp[p] = obj1[p];
            }
            for(let p in obj2){
                if(!comp.hasOwnProperty(p)){
                    comp[p] = obj2[p];
                }
            }
            return comp;
        }
        let [s, e] = [new Student('Alex', 1001),
                    new Exam('Maths', 89)];
        let c11: Class = compose<Student, Exam>(s,e);
        // Now 'c11' should have student & exam properties
        console.log(c11);
        /**
         * Intersection types - can access UNION set of
        properties of sub-types!!
        Since it is a product-type it has properties
        from all sub-types.
         */
    }
    private static demo_modules() {
        console.log("**** Demo - Modules");
        /*
        JS did not have the concept of modules or namespaces
        for partitioning code, like in other languages such 
        as Java, Python, C#.
        In the browser world if we wish to access elements
        from another JS file, we would have to include that
        in the <script> tag.
        This would bring it into scope, and we still relied 
        on JS patterns (IIFE, {} etc.) to namespace them.

        In Node the JS community created CommonJS library 
        to do this.

        ES6 intoduced standard for imports/exports, but all
        clients have yet to implement this.

        TS uses CommonJS under the hood, and can be configured
        to use other 'module loaders'.

        Expose and access code elements using 'export'
        and 'import'
         */
        // Accessing exported variable expFoo
        console.log(`variable expFoo value = ${expFoo}`);  
        // Accessing default exported variable expFoo
        console.log(`default exported class = ${ExpDF.name}`);                
    }
    private static demo_namespaces() {
        console.log("**** Demo - Modules");
        /*
        A namespace is a way to group code so as 
        to provide some isolation/grouping.
        1) Avoids naming conflicts.
        2) Reduces code in global scope
        3) Helps to logically organize code.
        4) Improves discoverability through named hierarchy.

        It uses the 'namespace' keyword like
        in Java and C#.

        NOTE: when we try splitting namepaces across
        multiple files, it gets very tricky in TS.
        It is better to stick to modules for organizing 
        code.

         */
        let myfoo = new MyNameSpace.Foo();
        console.log(myfoo.constructor.name);    
    }
    private static demo_mixins() {
        console.log("**** Demo - Mixins");
        /*
        TS like many good OOP languages does not support 
        multiple inhertiance.
        
        Mixins - is another way to compose a class
        from some other classes. 
        (composition over inheritance)

        In TS a mixin is a function that takes a class
        and returns another class extending from it
        adding necessary properties/methods
        */
        class Person{
            constructor(public name: string){}
        }
        /**
         * All mixins will need to work with a
         * constructor type. So we declare one -
         * A type alias for a function Contructor<T>
         * where 'T' has a deafult value '{}'.
         * It takes an arbitrary number of 
         * arguments and returns an instance of 'T'
         */
        type Constructor<T = {}> = (...args: any[]) => T;
        /* A mixin function to add job details
        */
        function jobMixin<TBase extends Constructor>(Base: TBase){
            return class extends Base{
                // if required the new class can be named
                private _empId: string;
                constructor(empId, ...args: any[]){
                    super(...args); // NOTE: calls 'super' with '...args'
                    this._empId = empId;                    
                }
                get empId(){
                    return this._empId;
                }
                public role: string;
            }
        }
        // call a mixin to make Person employed
        const Employee = jobMixin(Person);
        console.log(`Employees via Mixin - `);
        let e1 = new Employee(1001, 'Alex');
        console.log(e1);
        // or directly invoke
        let e2 = new (jobMixin(Person))(1002, 'Bob');
        console.log(e2);       
    }
}
// bring expFoo into scope
import {expFoo, expBar} from './expModule';
// import defult-exported item
import ExpDF from './expModule';
/* import ALL exported entities using '*' -
   import * from './myModule'
*/

// Decalring a local namespace
namespace MyNameSpace{
    /* Use export to make it visible
    outside the namespace
    */
    export class Foo{}
} 

Satrtup.main();
