document.addEventListener("DOMContentLoaded", function () {

    const characterList = document.querySelector(".character-list");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    const cards = document.querySelectorAll(".character-card");

    let currentIndex = 0;


    // 1枚分移動する距離
    function getScrollAmount() {

        const card = cards[0];

        if (!card) {
            return 0;
        }

        const cardStyle = window.getComputedStyle(card);

        const cardWidth = card.offsetWidth;

        // CSSの gap = 30px
        const gap = parseInt(
            window.getComputedStyle(characterList).gap
        ) || 30;

        return cardWidth + gap;
    }


    // 次へ
    nextButton.addEventListener("click", function () {

        currentIndex++;

        // 最後まで行ったら最初に戻る
        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }

        characterList.scrollTo({
            left: currentIndex * getScrollAmount(),
            behavior: "smooth"
        });

    });


    // 前へ
    prevButton.addEventListener("click", function () {

        currentIndex--;

        // 最初より前に行ったら最後へ
        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }

        characterList.scrollTo({
            left: currentIndex * getScrollAmount(),
            behavior: "smooth"
        });

    });

});

/* =========================
スクロール登場演出
========================= */

const scrollElements = document.querySelectorAll(".scroll-fade");

const scrollObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                scrollObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

scrollElements.forEach(function(element) {

    scrollObserver.observe(element);

});


/* =========================
NEWS 6件ずつページ切り替え
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const newsList =
        document.getElementById("newsList");

    const prevButton =
        document.getElementById("newsPrev");

    const nextButton =
        document.getElementById("newsNext");

    const pageNumber =
        document.getElementById("newsPageNumber");


    // NEWSページ以外では何もしない

    if (
        !newsList ||
        !prevButton ||
        !nextButton ||
        !pageNumber
    ) {
        return;
    }


    // NEWSを取得

    const newsItems =
        Array.from(
            newsList.querySelectorAll(
                ".news-page-item"
            )
        );


    // 1ページに表示するNEWS数

    const itemsPerPage = 6;


    // 現在のページ

    let currentPage = 0;


    // ページ数

    const totalPages =
        Math.ceil(
            newsItems.length /
            itemsPerPage
        );


    // NEWSを表示する関数

    function showNewsPage(page) {

        currentPage = page;


        newsItems.forEach(
            function (item, index) {

                const start =
                    currentPage *
                    itemsPerPage;

                const end =
                    start +
                    itemsPerPage;


                if (
                    index >= start &&
                    index < end
                ) {

                    item.style.display = "flex";

                } else {

                    item.style.display = "none";

                }

            }
        );


        // ページ番号

        pageNumber.textContent =
            (currentPage + 1)
            + " / "
            + totalPages;


        // 前へボタン

        prevButton.disabled =
            currentPage === 0;


        // 次へボタン

        nextButton.disabled =
            currentPage === totalPages - 1;


        // アニメーション

        newsList.classList.remove(
            "news-changing"
        );


        void newsList.offsetWidth;


        newsList.classList.add(
            "news-changing"
        );

    }


    // 前へ

    prevButton.addEventListener(
        "click",
        function () {

            if (currentPage > 0) {

                showNewsPage(
                    currentPage - 1
                );

            }

        }
    );


    // 次へ

    nextButton.addEventListener(
        "click",
        function () {

            if (
                currentPage <
                totalPages - 1
            ) {

                showNewsPage(
                    currentPage + 1
                );

            }

        }
    );


    // 最初のページを表示

    showNewsPage(0);

});


document.addEventListener("DOMContentLoaded", function () {

    const romanNames =
        document.querySelectorAll(".roman-glitch-name");

    const tvNoise =
        document.getElementById("tv-noise");

    const romanImage =
        document.getElementById("roman-image");

    const secretProfile =
        document.getElementById("roman-secret-profile");


    // ろまんのページではない場合は何もしない
    if (
        romanNames.length === 0 ||
        !tvNoise
    ) {
        return;
    }


    // クリック回数
    let romanClickCount = 0;

    // クリック判定用タイマー
    let romanClickTimer = null;


    // ろまんの名前
    romanNames.forEach(function (romanName) {

        romanName.addEventListener("click", function () {


            /* =========================
               クリック回数を増やす
            ========================= */

            romanClickCount++;


            /* =========================
               2秒以内に3回
               2秒経ったらリセット
            ========================= */

            clearTimeout(romanClickTimer);

            romanClickTimer = setTimeout(function () {

                romanClickCount = 0;

            }, 2000);


            /* =========================
               振動・ノイズ演出
               1回目でも2回目でも3回目でも発生
            ========================= */


            // いったんリセット
            tvNoise.classList.remove("active");

            document.body.classList.remove(
                "roman-glitch-active"
            );

            if (romanImage) {

                romanImage.classList.remove(
                    "roman-image-glitch"
                );

            }


            // アニメーション再起動
            void tvNoise.offsetWidth;

            void document.body.offsetWidth;


            if (romanImage) {

                void romanImage.offsetWidth;

            }


            // ノイズ開始
            tvNoise.classList.add("active");


            // 画面をガタつかせる
            document.body.classList.add(
                "roman-glitch-active"
            );


            // 画像もバグらせる
            if (romanImage) {

                romanImage.classList.add(
                    "roman-image-glitch"
                );

            }


            /* =========================
               3回目だった場合
            ========================= */

            if (romanClickCount >= 3) {

                // カウントをリセット
                romanClickCount = 0;

                clearTimeout(romanClickTimer);


                /* =====================
                   隠しプロフィール表示
                ===================== */

                if (secretProfile) {

                    setTimeout(function () {

                        secretProfile.classList.add(
                            "show"
                        );


                        // 隠しプロフィールまでスクロール
                        secretProfile.scrollIntoView({

                            behavior: "smooth",

                            block: "center"

                        });

                    }, 650);

                }

            }


            /* =========================
               0.6秒後に演出終了
            ========================= */

            setTimeout(function () {

                tvNoise.classList.remove("active");

                document.body.classList.remove(
                    "roman-glitch-active"
                );


                if (romanImage) {

                    romanImage.classList.remove(
                        "roman-image-glitch"
                    );

                }

            }, 600);

        });

    });

});