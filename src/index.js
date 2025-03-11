import './style/index.css';
import cardFrontSide from './images/card.png';
import cardWinSide from './images/win_card.png';
import imgWin from './images/win.png';
import cardLoseSide from './images/lose_card.png';
import imgLose from './images/lose.png';
import { handleCloseClickBtn, handleEventKeyUp, insertImg } from './scripts/popup';
import { addClass, addClassCard, chooseWinCard,  clearClassCard, removeClass, swipe } from './scripts/cards';

const cardsArray = [...document.querySelectorAll('.card_wrapper')];
const cardImgArray = [...document.querySelectorAll('.card-img')];
const innerArea = document.querySelector('.internal-border');
const cardFirst = innerArea.querySelector('.card_first');
const cardSecond = innerArea.querySelector('.card_second');
const cardThird = innerArea.querySelector('.card_third');
const cardDeck = document.querySelector('.card_deck');
const btnStart = document.querySelector('.btn_start');
const dialogPopup = document.querySelector('#dialog-id');
const popup = dialogPopup.querySelector('.popup');
const popupText = popup.querySelector('.popup-text');
const popupImgArr = [...popup.querySelectorAll('.popup__image')];
const popupImgleft = document.querySelector('.popup__image-left');
const popupImgRight = document.querySelector('.popup__image-right');
const popupCloseBtn = popup.querySelector('.popup__close');
const popupBtnReStart = popup.querySelector('.popup__button');

const cardStatusArray = ['win', 'lose', 'lose'];
const cardsClassesArr = [cardFirst, cardSecond, cardThird];
const cardsAnimatedClassesArr = ['animated_first', 'animated_second', 'animated_third'];
const cardsMoveClassesArr = ['card_first-move', 'card_second-move', 'card_third-move'];
const imgObj = {
    arr: popupImgArr,
    imgLeft: popupImgleft,
    imgRight: popupImgRight,
};

// смена текста у кнопки "начало игры" для улучшения UX
function changeBtnText(text) {
    btnStart.textContent = text;
}

// механика перемешений и перемещений карточек
function cardMoveWork() {
    btnStart.disabled = 'true';
    addClass(cardsClassesArr, cardsMoveClassesArr);
    cardDeck.classList.add('animated_card_deck');
    setTimeout(() => {
        changeBtnText('Показываем призовую карту');
    }, 2000);
    setTimeout(() => {
        changeBtnText('Перемешиваем...');
    }, 4000);
    swipe(cardsArray, 1);
    addClass(cardsClassesArr, cardsAnimatedClassesArr);
    chooseWinCard(cardImgArray, cardStatusArray);
    setTimeout(() => {
        addClassCard(cardImgArray, 'card-img-hover', false)
        changeBtnText('Выберите карту');
        btnStart.classList.add('button_choose-card');
        btnStart.classList.remove('button_initial');
        showChosenCard();
    }, 6900);
}

// слушатель на кнопку "начать игру", чтобы запустить игру
btnStart.addEventListener('click', (e) => {
    if (e.target.classList.contains('button_initial')) {
        cardMoveWork();
    }
});

// механика работы попапа
function popupWork(e) {
    const status = e.target.getAttribute('id');
    if (e.target.classList.contains('card-img')) {
        if (status === 'win') {
            e.target.src = cardWinSide;
            setTimeout(() => {
                popupText.textContent = 'ВЫ ВЫИГРАЛИ!';
                insertImg(imgObj, imgWin, true);
                dialogPopup.showModal();
                btnStart.classList.add('no-pseudo');
                btnStart.classList.add('btn_start-nonactive');
            }, 1200);
        } else {
            e.target.src = cardLoseSide;
            setTimeout(() => { addClassCard(cardImgArray, 'win-card', true)}, 1000);
            setTimeout(() => {
                popupText.textContent = 'ПОПРОБУЙТЕ ЕЩЕ РАЗ!';
                insertImg(imgObj, imgLose, false);
                dialogPopup.showModal();
                btnStart.classList.add('no-pseudo');
                btnStart.classList.add('btn_start-nonactive');
            }, 2000);
        }
        document.addEventListener('keydown', (e) => {
            handleEventKeyUp(e, dialogPopup, resetinfo());
        });
        popupCloseBtn.addEventListener('click', () => {
            handleCloseClickBtn(dialogPopup, resetinfo());
        });
        popupBtnReStart.addEventListener('click', () => {
            dialogPopup.close();
            resetinfo();
            setTimeout(() => {
                cardMoveWork();
            }, 500);
        });
    }
}

// слушатель на клик по карточке, что выбрал игрок
function showChosenCard() {
    if (btnStart.classList.contains('button_choose-card')) {
        innerArea.addEventListener('click', (e) => {
            e.target.classList.add('card_selected')
            popupWork(e);
        });
    }
}

// сброс всех классов и надписей при перезапуске игры
function resetinfo() {
    btnStart.disabled = '';
    changeBtnText('Начать игру');
    removeClass(cardsClassesArr, cardsMoveClassesArr);
    removeClass(cardsClassesArr, cardsAnimatedClassesArr);
    cardDeck.classList.remove('animated_card_deck');
    btnStart.classList.remove('button_choose-card');
    btnStart.classList.add('button_initial');
    btnStart.classList.remove('no-pseudo');
    btnStart.classList.remove('btn_start-nonactive');
    document.removeEventListener('keydown', handleEventKeyUp);
    popupCloseBtn.removeEventListener('click', handleCloseClickBtn);
    clearClassCard(cardImgArray, 'win-card');
    clearClassCard(cardImgArray, 'card_selected');
    clearClassCard(cardImgArray, 'card-img-hover');
    innerArea.removeEventListener('click', (e) => {
        popupWork(e);
    });
    cardImgArray.forEach((item) => {
        item.src = cardFrontSide;
    });
}