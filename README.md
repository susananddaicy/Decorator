# ES6

ES6 

https://leanpub.com/understandinges6/read#leanpub-auto-introduction

http://es6.ruanyifeng.com/#docs/let

http://exploringjs.com/es6/ch_destructuring.html


# Decorator（适用类和类的方法，不能用于函数）需要Babel支持

## 类的修饰
```
@test
class A  {
}
function test (target) {
  target.b = '1';
}
A.b // '1'
```

### 带参数
```
@test(true)
class A  {
}
function test (bool) {
  return function (target) {
     target.b = bool;
  }
}
A.b // true
```

## 类的方法的修饰
此时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，即类的实例（这不同于类的修饰，那种情况时target参数指的是类本身）；第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。

```
class Person {
  @readonly
  name () {

  }    
}

function readonly(target, name, descriptor) {
  // descriptor 是name方法的描述对象，具体描述对象可以参考 http://javascript.ruanyifeng.com/stdlib/attributes.html文章
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}
```

```
class Math {
 @log
 add (a,b) {
  return a+b;
 }
}

function log(target,name,descriptor){
  var oldValue = descriptor.value;
  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };
  return descriptor;
}

```

## core-decorators.js
core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器
@autobind
@readonly
@override
@deprecate (别名@deprecated)
@suppressWarnings

