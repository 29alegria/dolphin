/*---------- hamburger-menu ---------- */
// const hamburger = document.querySelector(".js_hamburger");
// const navigation = document.querySelector(".js_navigation");
// const body = document.querySelector(".js_body");

// hamburger.addEventListener("click", () => {
//   hamburger.classList.toggle("is-active");
//   navigation.classList.toggle("is-active");
//   body.classList.toggle("is-active");
// });

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".js_hamburger");
  const navigation = document.querySelector(".js_navigation");
  const body = document.querySelector(".js_body");

  // ハンバーガーメニューの開閉
  const toggleMenu = () => {
    const isActive = hamburger.classList.toggle("is-active");
    navigation.classList.toggle("is-active");
    body.classList.toggle("is-active");

    if (isActive) {
      // メニューを開いた場合は外部クリックを監視
      document.addEventListener("click", closeMenuOnOutsideClick);
    } else {
      // メニューを閉じた場合は外部クリック監視を解除
      document.removeEventListener("click", closeMenuOnOutsideClick);
    }
  };

  // 外部クリックでメニューを閉じる
  const closeMenuOnOutsideClick = (e) => {
    if (!navigation.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  };

  // メニューを閉じる処理
  const closeMenu = () => {
    hamburger.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");

    // 外部クリック監視を解除
    document.removeEventListener("click", closeMenuOnOutsideClick);
  };

  // ハンバーガーボタンのクリックイベント
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // ハンバーガークリック時に外部クリックイベントを発火させない
    toggleMenu();
  });

  // メニュー内部をクリックしても外部クリックイベントを発火させない
  navigation.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});


/*---------- header-submenu ----------*/ 
// document.addEventListener("DOMContentLoaded", () => {
//   const navItem = document.querySelector(".l_header-nav_item:nth-child(3)"); // 3つ目のl_header-nav_item
//   const navLink = document.querySelector(".l_header-nav_item:nth-child(3) > .l_header-nav_link"); // 会社情報リンク
//   const subNavList = document.querySelector(".l_header-nav_item:nth-child(3) .l_header-subnav_list"); // サブメニュー

//   // 初期状態を設定
//   subNavList.style.height = "0";
//   subNavList.style.overflow = "hidden";
//   subNavList.style.transition = "height 0.3s ease, margin-top 0.05s ease"; // 高さアニメーションの設定
//   navItem.style.transition = "padding 0.05s ease"; // 高さアニメーションの設定

//   navLink.addEventListener("click", (e) => {
//     e.preventDefault(); // デフォルトのリンク動作を防止
//     e.stopPropagation(); // 他のクリックイベントへの影響を防ぐ

//     // サブメニューの開閉を切り替え
//     if (subNavList.style.height === "0px") {
//       // subNavList.style.height = `${subNavList.scrollHeight}px`; // 高さを設定
//       subNavList.classList.add("is-open"); // クラス追加 (margin-topを適用)
//       subNavList.style.height = "250px";
//       navItem.classList.add("is-open"); // 開いている状態のクラスを追加
//     } else {
//       subNavList.style.height = "0"; // 高さを0に設定して閉じる
//       subNavList.addEventListener(
//         "transitionend",
//         () => {
//           if (subNavList.style.height === "0px") {
//             // 少し遅れて margin-top をリセット
//             requestAnimationFrame(() => {
//               subNavList.classList.remove("is-open");
//               navItem.classList.remove("is-open"); // クラスを削除
//             });
//           }
//         },
//         { once: true }
//       );
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const navItem = document.querySelector(".l_header-nav_item:nth-child(3)"); // 3つ目のl_header-nav_item
  const navLink = document.querySelector(".l_header-nav_item:nth-child(3) > .l_header-nav_link"); // 会社情報リンク
  const subNavList = document.querySelector(".l_header-nav_item:nth-child(3) .l_header-subnav_list"); // サブメニュー

  // 初期状態を設定
  subNavList.style.height = "0";
  subNavList.style.overflow = "hidden";
  subNavList.style.transition = "height 0.3s ease, margin-top 0.05s ease"; // 高さアニメーションの設定
  navItem.style.transition = "padding 0.05s ease"; // 高さアニメーションの設定

  // サブメニューを開く/閉じる処理
  const toggleSubMenu = () => {
    if (subNavList.style.height === "0px") {
      subNavList.classList.add("is-open"); // クラス追加 (margin-topを適用)
      subNavList.style.height = "250px"; // 高さを設定
      navItem.classList.add("is-open"); // 開いている状態のクラスを追加
    } else {
      closeSubMenu();
    }
  };

  // サブメニューを閉じる処理
  const closeSubMenu = () => {
    subNavList.style.height = "0"; // 高さを0に設定して閉じる
    subNavList.addEventListener(
      "transitionend",
      () => {
        if (subNavList.style.height === "0px") {
          // 少し遅れて margin-top をリセット
          requestAnimationFrame(() => {
            subNavList.classList.remove("is-open");
            navItem.classList.remove("is-open"); // クラスを削除
          });
        }
      },
      { once: true }
    );
  };

  // サブメニュー開閉のトリガー設定
  navLink.addEventListener("click", (e) => {
    e.preventDefault(); // デフォルトのリンク動作を防止
    e.stopPropagation(); // 他のクリックイベントへの影響を防ぐ
    toggleSubMenu();
  });

  // サブメニュー外をクリックした際に閉じる
  document.addEventListener("click", (e) => {
    if (!navItem.contains(e.target)) {
      closeSubMenu();
    }
  });
});


/*----------- topへ戻るボタン --------*/
// ページトップ要素を取得
const pageTop = document.querySelector(".js_page-top");

// ウィンドウのスクロールイベントを処理する
//ウィンドウがスクロールされるたびに指定された関数が実行される
window.addEventListener("scroll", function() {
  // 現在のスクロール位置がウィンドウの高さを超えたかどうかを確認
  if (window.pageYOffset > window.innerHeight) {
    // スクロールがウィンドウの高さよりも大きい場合、ページトップ要素に is_activeクラスを追加する
    //（rightが-120px⇒24pxつまり出現する）
    pageTop.classList.add("is-active");
  } else {
    // スクロールがウィンドウの高さよりも小さい場合、ページトップ要素から is_active クラスを削除する
    //（rightが24x⇒-120pxつまり、消える）
    pageTop.classList.remove("is-active");
  }
});

// ページトップ要素がクリックされたときの処理を定義する
pageTop.addEventListener("click", function() {
  // ページをトップにスクロールするアニメーション
  window.scrollTo({
    top: 0,//トップに戻る
    behavior: "smooth" // スムーズなスクロール
  });
}); 


