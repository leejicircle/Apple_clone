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
const headerMenuEl = [...headerEl.querySelectorAll('ul.menu > li')] //... 전개연산자 | li태그들을 배열로 관리
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchshadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchshadowEl.addEventListener('click', hideSearch)
function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  delaysetting(headerMenuEl.reverse())
  delaysetting(searchDelayEls)
 
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
  
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  delaysetting(headerMenuEl.reverse())
  delaysetting(searchDelayEls.reverse())
  searchDelayEls.reverse()
  
  searchInputEl.value = ''
}
// function Menudelay (){
//   this.forEach (function(el, index) {
//     el.style.transitionDelay = index * .4 / headerMenuEl.length + 's'
//   })
// }
// function searchDelay () {
//   searchDelayEls.forEach(function (el,index) {
//     el.style.transitionDelay = index * .4 / headerMenuEl.length + 's'
//   })
// }    아래 delay setting 함수로 함치기
function delaysetting (elements) {
  elements.forEach(function(el, index) {
      el.style.transitionDelay = index * .4 /elements.length +'s'
  })

}

// 요소의 가시성 관창
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach (function (el) {
  io.observe(el)
})