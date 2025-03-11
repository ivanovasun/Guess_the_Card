// добавление атрибута src для массива изображений
export function insertImg(imgObj, img, statment) {
    imgObj.arr.forEach((item) => {
        item.src = img;
    });
    if (statment) {
        imgObj.imgLeft.style.left = 'calc((var(--index) * 9.5) / 2)';
        imgObj.imgRight.style.right = 'calc((var(--index) * 8.7) / 2)';
    } else {
        imgObj.imgLeft.style.left = 'calc((var(--index) * 9.9) / 15)';
        imgObj.imgRight.style.right = 'calc((var(--index) * 9.9) / 15)';
    }
}

//функция закрытия попапа по клавише Esc
export function handleEventKeyUp(evt, dialogPopup, callback) {
    if (evt.key === 'Escape') {
        dialogPopup.close();
        callback;
    }
}

//функция закрытия попапа при нажатии на крестик
export function handleCloseClickBtn(dialogPopup, callback) {
    dialogPopup.close();
    callback;
}