// Создаем константу для добавления сообщений в процессе игры
const textField = document.getElementById("information")
// Очищаем localStorage, чтобы удалить число из предыдущей игры
localStorage.removeItem('random')

// Функция, отвечающая за создание четырехзначного числа с разными цифрами
function RandomNumber() {
  let outNumber = [];
  while (outNumber.length < 4) {
    const number = Math.floor(1 + Math.random() * 9); // Получение рандомного числа от 1 до 9
    if (!outNumber.find(el => el === number)) {
      outNumber.push(number)
    }
  }
  return outNumber
}

// Действия по нажатии кнопки "Начать игру": очищение поля с сообщениями и поле ввода, запуск функции RandomNumber и запись рандомного числа в localStorage
document.getElementById("start-button").onclick = function() {
  textField.innerHTML = ''
  inputText.value = ''
  const numb = RandomNumber()
  localStorage.setItem('random', numb);
}

// Функция сравнения заданного числа с тем, что ввел игрок и вывода количества совпавших цифр
function BullsCows(number, myNumber) {
  let bulls = 0
  let cows = 0
  const arr1 = ('' + number).split(',')
  const arr2 = ('' + myNumber).split('')
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j] === arr1[i] && (j !== i)) {
        cows += 1
      } else if ((arr2[j] === arr1[i]) && (j === i)) {
        bulls += 1
      }
    }
    if (bulls === 4) {
      return `Ваше число: ${myNumber}<br/> Число угадано!`
    }
  }

  return `Ваше число: ${myNumber}<br/> Быки: ${bulls} <br/>Коровы: ${cows}`
}

const inputText = document.getElementById("input")

// Действия по нажатии кнопки "Отправить": обработка ошибок и запуск функции BullsCows
document.getElementById("submit-button").onclick = function() {
  const numb = localStorage.getItem('random');
  let div = document.createElement('div');
  div.style.marginTop = "16px"
  const regex = /[^0-9\.]/
  const mark = regex.test(inputText.value)
  let text = ""
  if(!mark && inputText.value.length === 4 && numb !== null ) {
    text = BullsCows(numb, inputText.value)
  } else if (numb === null) {
    text = `Некорректный запрос: Нажмите кнопку "Начать игру"`
    div.style.color = "red"
  } else if (!mark && inputText.value.length !== 4) {
    text = "Некорректный запрос: вводить 4 цифры!"
    div.style.color = "red"
  } else {
    text = "Некорректный запрос: вводить только число!"
    div.style.color = "red"
  }
  div.innerHTML = text
  textField.appendChild(div)
}
