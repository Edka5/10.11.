const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input'); // поле ввода минимального веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле ввода максимального веса 
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const filterClearButton = document.querySelector('.filterClear__btn'); // кнопка сброса фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления 

minWeightInput.value = 0; 
maxWeightInput.value = 0;

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розовый", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "оранжевый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => { 


  fruitsList.innerHTML = null; 
  
  for (let i = 0; i < fruits.length; i++) { 
        
    let divIndex = document.createElement('div');
    divIndex.className = 'fruit__info';
    divIndex.textContent = 'index # ' + i;

    let divKind = document.createElement('div');
    divKind.className = 'fruit__info';
    divKind.textContent = 'kind: ' + fruits[i].kind;

    let divColor = document.createElement('div');
    divColor.className = 'fruit__info';
    divColor.textContent = 'color: ' + fruits[i].color;

    let divWeight = document.createElement('div');
    divWeight.className = 'fruit__info';
    divWeight.textContent = 'weight (кг): ' + fruits[i].weight;
    
    let divMain = document.createElement('div');
    divMain.className = 'fruit__info';
    divMain.appendChild(divIndex);
    divMain.appendChild(divKind);
    divMain.appendChild(divColor);
    divMain.appendChild(divWeight);

    let li_block = document.createElement('li');
    switch(fruits[i].color) {
      case 'красный': li_block.className = 'fruit__item fruit_red'; break
      case 'оранжевый': li_block.className = 'fruit__item fruit_orange'; break
      case 'желтый': li_block.className = 'fruit__item fruit_yellow'; break
      case 'зеленый': li_block.className = 'fruit__item fruit_green'; break
      case 'бледно-зеленый': li_block.className = 'fruit__item fruit_chartreuse_green'; break
      case 'ярко-зеленый': li_block.className = 'fruit__item fruit_spring_green'; break
      case 'голубой': li_block.className = 'fruit__item fruit_cyan'; break
      case 'лазурный': li_block.className = 'fruit__item fruit_azure'; break
      case 'синий': li_block.className = 'fruit__item fruit_blue'; break
      case 'фиолетовый': li_block.className = 'fruit__item fruit_violet'; break
      case 'пурпурный': li_block.className = 'fruit__item fruit_magenta'; break
      case 'розовый': li_block.className = 'fruit__item fruit_rose'; break
    } 
    li_block.innerHTML = divMain.innerHTML;
    fruitsList.appendChild(li_block);
  }
};

archiveArr = fruits.slice(); 
display(); 

/*Перемешивание*/

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  controlArr = fruits.slice();
  while (fruits.length > 0) {
 
    numRandom = Math.floor(Math.random()*fruits.length);
    result.push(fruits[numRandom]);
    fruits.splice(numRandom, 1);
  }
  fruits = result;
  
  if (JSON.stringify(fruits) === JSON.stringify(controlArr)) {
    alert('Старый и новый массивы совпадают!!! Поворите перемешивание!!!');
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*Фильтрация*/

const filterFruits = () => {  
  let result = [];
 
  if (parseInt(minWeightInput.value) == 0 && parseInt(maxWeightInput.value == 0)) {  
    alert('Параметры фильтрации заданы некорректно!!!');
    return fruits;
  } 
  if (parseInt(minWeightInput.value) < 0 || parseInt(maxWeightInput.value < 0)) {
    alert('Вес фруктов не может быть отрицательным!!!');
    return fruits;
  } 
  if (parseInt(maxWeightInput.value) < parseInt(minWeightInput.value)) {
    alert('Максимальный вес не может быть меньше минимального веса!!!');
    return fruits;
  } 
    
    for (let i = 0; i < fruits.length; i++) {
      if ((fruits[i].weight >= parseInt(minWeightInput.value)) && (fruits[i].weight <= parseInt(maxWeightInput.value))) {
        result.push(fruits[i]); 
      }
    }
    fruits = result; 
};

const filterFruitsClear = () => {
fruits = [];
fruits = archiveArr.slice();
minWeightInput.value = 0;
maxWeightInput.value = 0;
}

filterButton.addEventListener('click', () => { 
  fruits = archiveArr.slice(); 
  filterFruits();
  display();
});

filterClearButton.addEventListener('click', () => { 
  filterFruitsClear();
  display();
});

/*Сортировка*/
let sortKind = 'bubbleSort'; 
let sortTime = '-'; 

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

let priority = ['розовый', 'пурпурный', 'фиолетовый', 'синий', 'лазурный', 'голубой', 'ярко-зеленый', 'бледно-зеленый', 'зеленый', 'желтый', 'оранжевый','красный']; // инициализация массива priority, который является эталоном приоритета цветов

let start, end; 

const comparation = (fruits1, k) => {
  return (fruits1.color === priority[k]) ? true : false;
};

function renameColorNum(arr) {
  for (c = 0; c < arr.length; c++) {
    switch(arr[c].color) { 
      case 'красный': arr[c].color = 11; break
      case 'оранжевый': arr[c].color = 10; break
      case 'желтый': arr[c].color = 9; break
      case 'зеленый': arr[c].color = 8; break
      case 'бледно-зеленый': arr[c].color = 7; break
      case 'ярко-зеленый': arr[c].color = 6; break
      case 'голубой': arr[c].color = 5; break
      case 'лазурный': arr[c].color = 4; break
      case 'синий': arr[c].color = 3; break
      case 'фиолетовый': arr[c].color = 2; break
      case 'пурпурный': arr[c].color = 1; break
      case 'розовый': arr[c].color = 0; break
    }
  }
};

function renameNumColor(arr) {
  for (c = 0; c < arr.length; c++) { 
    switch(arr[c].color) {
      case 0 : arr[c].color = 'розовый'; break
      case 1 : arr[c].color = 'пурпурный'; break
      case 2 : arr[c].color = 'фиолетовый'; break
      case 3 : arr[c].color = 'синий'; break
      case 4 : arr[c].color = 'лазурный'; break      
      case 5 : arr[c].color = 'голубой'; break
      case 6 : arr[c].color = 'ярко-зеленый'; break
      case 7 :arr[c].color = 'бледно-зеленый'; break
      case 8 : arr[c].color = 'зеленый'; break
      case 9 : arr[c].color = 'желтый'; break
      case 10 : arr[c].color = 'оранжевый'; break
      case 11 : arr[c].color = 'красный'; break
    }
  }
};


function swap(items, firstIndex, secondIndex){ 
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right) { 
  let pivot = items[Math.floor((right + left) / 2)].color,
      i = left,
      j = right;
  while (i <= j) {
      while (items[i].color < pivot) {
          i++;
      }
      while (items[j].color > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
}

function bubbleSort(arr, comparation) { 
  const n = arr.length;
  for (let k = 0; k < priority.length; k++){ 
  
    for (let i = 0; i < n-1; i++) {  
      
       for (let j = 0; j < n-1-i; j++) {  
          
          if (comparation(arr[j], k)) {   
              // делаем обмен элементов
              let temp = arr[j+1]; 
              arr[j+1] = arr[j]; 
              arr[j] = temp; 
            }
          }
      }
  }                    
};


function quickSort(items, left, right) { 
  let index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
}

  sortChangeButton.addEventListener('click', () => { 
    sortKind = (sortKind === 'bubbleSort') ? 'quickSort' : 'bubbleSort';
    sortKindLabel.textContent = sortKind;
});

function sort(typeSort) { 
  switch (typeSort) {
    case 'bubbleSort' : 
      bubbleSort(fruits, comparation);
    break;
    case 'quickSort' :
      renameColorNum(fruits);
      quickSort(fruits, 0, (fruits.length - 1));
      renameNumColor(fruits);
    break;
  }
}

sortActionButton.addEventListener('click', () => { 
  start = new Date().getTime(); 
  sort(sortKind);  
  end = new Date().getTime();
  sortTime = `${end - start} ms`;
  sortTimeLabel.textContent = sortTime;
  display();  
});

/*Добавить фрукт*/

addActionButton.addEventListener('click', () => {
  
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '' || parseInt(weightInput.value) < 0) { 
    alert('Не все поля заполнены (или в поле WEIGHT отрицательное значение)!!!');    
  } else {
  
    fruits.push({kind: kindInput.value, color: colorInput.value, weight: parseInt(weightInput.value)});  
  }

  kindInput.value = null; 
  colorInput.value = null;
  weightInput.value = null;
  archiveArr = fruits.slice();
  display();
});