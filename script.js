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

/* =========================
   夜沙暗ろまん 名前クリック演出
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const romanName = document.getElementById("roman-name");
    const tvNoise = document.getElementById("tv-noise");
    const romanImage = document.getElementById("roman-image");

    // ろまんのページではない場合は何もしない
    if (!romanName || !tvNoise) {
        return;
    }

    romanName.addEventListener("click", function () {

        // 連打防止
        if (tvNoise.classList.contains("active")) {
            return;
        }

        /* ノイズ開始 */
        tvNoise.classList.add("active");

        /* 画面をガタつかせる */
        document.body.classList.add(
            "roman-glitch-active"
        );

        /* ろまんの画像もバグらせる */
        if (romanImage) {
            romanImage.classList.add(
                "roman-image-glitch"
            );
        }

        /* 0.6秒後に全部元に戻す */
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

// =========================
// CHARACTER詳細ページへ移動する前に
// 現在のページ番号を保存
// =========================

const characterCards =
    document.querySelectorAll(".character-page-card");

characterCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const currentPage =
            document.getElementById("characterPageNumber")
            ?.textContent;

        if (currentPage) {

            localStorage.setItem(
                "characterReturnPage",
                currentPage
            );

        }

    });

});
