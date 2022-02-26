'use strict';
(function () {

  var arrSign = ['-', '+', '/', '*', 'x'],
      arr = [],
      result = 0,
      printCalcul = '',
      arrSort = void 0,
      strSign = void 0,
      error = void 0,
      value = document.querySelector('.value span'),
      ele = document.querySelectorAll('.touche__box-item > span'),
      equal = document.querySelector('.sign-equal'),
      clear = document.querySelector('.clear-item  span');

  
  for (var i = 0; i < ele.length; i++) {
    ele[i].addEventListener('click', function (e) {
      var cible = e.target.innerHTML === '_' ? cible = '-' : e.target.innerHTML;
     
      arr.push(cible);
      
      printCalcul += cible;
      value.innerHTML = printCalcul;
      e.preventDefault();
    });
  }
  clear.addEventListener('click', function (e) {
    value.innerHTML = 'value';
    arr.splice(0, arr.length);
    printCalcul = '';
    value.classList.remove('value');
    e.preventDefault();
  });

  error = function error(strSignMessage) {
    value.innerHTML = 'err with sign ' + strSignMessage;
    value.classList.add('error');
  };

  equal.addEventListener('click', function (e) {
    result = 0;
    strSign = arr.join('');
    
    arrSort = strSign.match(/(\d+)|\D/g); 
    for (var _i = 0, l = arrSort.length; _i < l; _i++) {
      var current = arrSort[_i],
          prev = arrSort[_i - 1],
          next = arrSort[_i + 1];
      prev = prev !== undefined && arrSign.indexOf(prev) === -1 ? parseInt(prev, 10) : '';
      next = next !== undefined && arrSign.indexOf(next) === -1 ? parseInt(next, 10) : '';
      
      if (arrSign.indexOf(current) >= 0) {
        if (current === '+') {
          if (_i === 1) {
            
            result = prev + next;
            
          } else if (_i > 1) {
            result += next;
            
          } else if (_i === 0) {
            error('+');
            break;
          }
        }
        if (current === '-') {
          if (_i === 1) {
            
            result = prev - next;
            
          } else if (_i > 1) {
            result -= next;
            
          } else if (_i === 0) {
            error('-');
            break;
          }
        }
        if (current === 'x') {
          if (_i === 1) {
            
            result += prev * next;
          } else if (_i > 1) {
            result *= next;
            
          } else if (_i === 0) {
            error('*');
            break;
          }
        }
        if (current === '/') {
          if (_i === 1) {
            
            result += prev / next;
          } else if (_i > 1) {
            result /= next;
          } else if (_i === 0) {
            error('/');
            break;
          }
        }
      }
    }
    if (!value.classList.contains('error')) {
      value.innerHTML = result;
    }
    e.preventDefault();
  }); 
})(); 
 