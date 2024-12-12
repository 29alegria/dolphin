/*---------- hamburger-menu ---------- */
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



// エントリーフォームの住所
// document.addEventListener('DOMContentLoaded', () => {
//   const postalCodeInput = document.getElementById('postal-code');
//   const prefectureSelect = document.getElementById('prefecture');
//   const cityInput = document.getElementById('city');
//   const autoInputButton = document.querySelector('.entry_form_button');

//   autoInputButton.addEventListener('click', () => {
//     console.log('ボタンがクリックされました');
//   });

//   autoInputButton.addEventListener('click', async () => {
//     // 郵便番号の取得と整形
//     const postalCode = postalCodeInput.value.trim().replace(/[^\d]/g, '');

//     // 郵便番号が7桁でない場合はエラー
//     if (postalCode.length !== 7) {
//       alert('郵便番号は7桁で入力してください。');
//       return;
//     }

//     try {
//       // APIリクエスト
//       const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
//       const data = await response.json();

//       // 住所情報の取得と入力
//       if (data.results && data.results.length > 0) {
//         const result = data.results[0];
        
//         // 都道府県の自動選択
//         const prefecture = result.address1;
//         const prefectureOption = Array.from(prefectureSelect.options).find(
//           option => option.text === prefecture
//         );
        
//         if (prefectureOption) {
//           prefectureSelect.value = prefectureOption.value;
//         } else {
//           alert(`都道府県「${prefecture}」が見つかりません。`);
//           return;
//         }

//         // 市区町村・番地の自動入力
//         cityInput.value = result.address2 + result.address3;
//       } else {
//         alert('該当する住所が見つかりませんでした。');
//       }
//     } catch (error) {
//       console.error('住所検索中にエラーが発生しました:', error);
//       alert('住所の取得に失敗しました。もう一度お試しください。');
//     }
//   });
// });


// // フォーム全体エラー管理
// document.querySelector(".contact_form").addEventListener("submit", (event) => {
//   event.preventDefault();
  
//   // 入力フィールドを取得
//   const nameInput = document.getElementById("name");
//   const nameError = document.getElementById("name_error");

//   // 名前の必須チェック
//   if (!nameInput.value.trim()) {
//     nameError.textContent = "お名前を入力してください。"; // エラーメッセージを設定
//     nameError.style.display = "block"; // メッセージを表示
//   } else {
//     nameError.textContent = ""; // メッセージをクリア
//     nameError.style.display = "none"; // メッセージを非表示
//   }


//   const nameKanaInput = document.getElementById("name-kana");
//   const nameKanaError = document.getElementById("name-kana_error");

//   // 名前の必須チェック
//   if (!nameKanaInput.value.trim()) {
//     nameKanaError.textContent = "お名前(フリガナ)を入力してください。"; // エラーメッセージを設定
//     nameKanaError.style.display = "block"; // メッセージを表示
//   } else {
//     nameKanaError.textContent = ""; // メッセージをクリア
//     nameKanaError.style.display = "none"; // メッセージを非表示
//   }


//   const telInput = document.getElementById("tel");
//   const telError = document.getElementById("tel_error");

//   // 電話番号の必須チェック
//   if (!telInput.value.trim()) {
//     telError.textContent = "電話番号を入力してください。"; // エラーメッセージを設定
//     telError.style.display = "block"; // メッセージを表示
//   } else {
//     telError.textContent = ""; // メッセージをクリア
//     telError.style.display = "none"; // メッセージを非表示
//   }


//   const mailInput = document.getElementById("mail");
//   const mailError = document.getElementById("mail_error");

//   // メールアドレスの必須チェック
//   if (!mailInput.value.trim()) {
//     mailError.textContent = "メールアドレスを入力してください。"; // エラーメッセージを設定
//     mailError.style.display = "block"; // メッセージを表示
//   } else {
//     mailError.textContent = ""; // メッセージをクリア
//     mailError.style.display = "none"; // メッセージを非表示
//   }

//   const radioButtons = document.querySelectorAll('input[name="content"]');
//   const radioErrorMessage = document.getElementById("radio_error");

//   // 選択状態の確認
//   const isSelected = Array.from(radioButtons).some(radio => radio.checked);

//   if (!isSelected) {
//     // エラーメッセージを表示
//     radioErrorMessage.style.display = "block";
//   } else {
//     // エラーメッセージを非表示
//     radioErrorMessage.style.display = "none";
//   }


//   const textareaInput = document.getElementById("textarea");
//   const textareaError = document.getElementById("textarea_error");

//   // テキストエリアの必須チェック
//   if (!textareaInput.value.trim()) {
//     textareaError.textContent = "自由項目を入力してください。"; // エラーメッセージを設定
//     textareaError.style.display = "block"; // メッセージを表示
//   } else {
//     textareaError.textContent = ""; // メッセージをクリア
//     textareaError.style.display = "none"; // メッセージを非表示
//   }

//   // プライバシーポリシーチェック
//   const privacyCheckbox = document.querySelector(".contact_form_privacy");
//   const errorMessage = document.querySelector(".privacy-error-message");

//   // チェックされていない場合
//   if (!privacyCheckbox.checked) {
//     event.preventDefault(); // フォーム送信を防ぐ
//     errorMessage.style.display = "block"; // エラーメッセージを表示
//     return;
//   }

//   // チェックされている場合
//   errorMessage.style.display = "none"; // エラーメッセージを非表示

//   console.log("フォームが送信されました");
// });


/*---------- top_kvスライドショー ----------*/

const slideshow = new Swiper(".js_slideshow", {
  speed: 3000,
  effect: "fade",
  pagination: {
    el: ".swiper-pagination_slideshow",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next_slideshow",
    prevEl: ".swiper-button-prev_slideshow",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});

/*---------- top_serviceスライドイン----------*/
const topServiceItems = document.querySelectorAll(".js_top_service");
topServiceItems.forEach(function (item ,idx) {
  gsap.from(item, {
    x: (idx + 1) % 2 == 0 ? "100%" : "-100%",
    autoAlpha: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item,
      start: "top center",
    },
    stagger: {
      each: 2.0,
      from: "start",
    },
  });
});


/*---------- top_section-titleスライドイン----------*/
const topSectionTitleItems = document.querySelectorAll(".js_section-title")
topSectionTitleItems.forEach(function (item) {
  gsap.from(item, {
    y: 100,
    autoAlpha: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item,
      // start: "top center",
    },
  });
});