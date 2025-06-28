const button = document.querySelector('.header-button');
const menu = document.querySelector('.header-menu');
const menuLinks = document.querySelectorAll('.header-menu-link');

let isVisible = false;
button.addEventListener('click', () => {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    button.classList.add('clicked');

    // 200ms後にクラスを削除
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 200);
  }

  if (!isVisible) {
    menu.classList.remove('hidden');
    requestAnimationFrame(() => {
      menu.classList.add('show');
    });
    button.classList.add('open');
    isVisible = true;
  } else {
    menu.classList.remove('show');
    menu.addEventListener('transitionend', function handler() {
      menu.classList.add('hidden');
      menu.removeEventListener('transitionend', handler);
    });
    button.classList.remove('open');
    isVisible = false;
  }
});

// メニューを閉じる処理（再利用可能にする）
const closeMenu = () => {
  menu.classList.remove('show');
  menu.addEventListener('transitionend', function handler() {
    menu.classList.add('hidden');
    menu.removeEventListener('transitionend', handler);
  });
  button.classList.remove('open');
  isVisible = false;
};

// 各リンクをクリックしたらメニューを閉じる
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});