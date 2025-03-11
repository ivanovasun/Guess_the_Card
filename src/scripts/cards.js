// функционал добавления классов из массива в другой массив элементов
export function addClass(cardsCl, animCl) {
    cardsCl.forEach((item, index) => {
        item.classList.add(animCl[index]);
    });
}

// функционал удаления классов из массива с других элементов
export function removeClass(cardsCl, animCl) {
    cardsCl.forEach((item, index) => {
        item.classList.remove(animCl[index]);
    });
}

// логика переверота победной карточки
export function swipe(elemsArray, index) {
    const elems = elemsArray;
    let currentIndex = index;
    elems[currentIndex].classList.add('animated');
    setTimeout(() => {
        elems[currentIndex].style.zIndex = currentIndex;
        elems[currentIndex].querySelector('.card-back').style.zIndex = 1;
    }, 2500);

    setTimeout(() => {
        elems[currentIndex].style.zIndex = 1;
        elems[currentIndex].querySelector('.card-back').style.zIndex = 0;
    }, 3500);
    setTimeout(() => {
        elems[currentIndex].classList.remove('animated');
    }, 4000);
}

// рандомное пермешивание статусов карточек: победа или поражение
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
}

// повторение перемешивания
function repeatShuffle(arr) {
    let newArray = [];
    for (let i = 0; i < 7; i++) {
        newArray = shuffle(arr);
    }
    return newArray;
}

// присвоение карточкам id со статусом
export function chooseWinCard(arr, arrShuffle) {
    const newStatus = repeatShuffle(arrShuffle);
    arr.forEach((item, index) => {
        item.setAttribute('id', `${newStatus[index]}`);
    });
}

// добавление класса в массив элементов
export function addClassCard(arr, clName, statment) {
    arr.forEach((item) => {
        if (statment) {
            if (item.id === 'win') {
                item.classList.add(clName);
            }
        } else {
            item.classList.add(clName);
        }
    });
}

// удаление класса из массив элементов
export function clearClassCard(arr, clName) {
    arr.forEach((item) => {
        if (item.classList.contains(clName)) {
            item.classList.remove(clName);
        }
    });
}