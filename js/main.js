// 장바구니 관련
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')
// const basketEl = document.querySelector('header .basket-starter .basket')
basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()   // window 객체 까지 전파되는것을 멈춤
  if(basketEl.classList.contains('show')) {
    hideBasket()
  }else {
    showBasket()
  }
})
//basket 클릭이벤트에도 이벤트 버블링이 발생하지 않도록 설정
basketEl.addEventListener('click',function (event) {
  event.stopPropagation()
})
//화면을 클릭했을때 이벤트 추가
window.addEventListener('click', function() {
  hideBasket()
})
//show 클래스가 추가되어 basket을 보여주는 함수
function showBasket () {
  basketEl.classList.add('show')
}
//show 클래스가 제거되어 basket을 숨기는 함수
function hideBasket () {
  basketEl.classList.remove('show')
}
// 검색 
const headerEl = document.querySelector('header')
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchshadowEl = searchWrapEl.querySelector('.shadow')

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchshadowEl.addEventListener('click', hideSearch)
function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
}