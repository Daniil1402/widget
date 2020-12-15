const NEWS = [
  {
    title: "Убийство",
    author: "Яндекс",
    date: "06.12.2020",
    time: "14:22",
    link:
      "https://yandex.ru/news/story/Na_protestnykh_akciyakh_v_Minske_nachalis_zaderzhaniya--a0dbbb1ff14b113dce78c8bcad41645c?fan=1&from=main_portal&lang=ru&lr=2&mlid=1607274628.glob_225.a0dbbb1f&msid=1607275297.11479.85817.566551&persistent_id=121466049&stid=3Bu49DJaRkvUotaeOhrG&t=1607274628&utm_medium=topnews_news&utm_source=morda_desktop",
    id: 0,
  },
  {
    title: "Пожар",
    author: "ВК",
    date: "04.12.2020",
    time: "22:22",
    link:
      "https://yandex.ru/news/story/Na_Dvorcovoj_ploshhadi_startovalo_svetovoe_shou_v_chest_Dnej_EHrmitazha--b5866981fead61affaebdbd9d7a04ccd?lang=ru&rubric=Saint_Petersburg&wan=1&stid=3OA_WiFrNij3fPvUb0Xa&t=1607274846&persistent_id=120403434",
    id: 1,
  },
  {
    title: "Коровавирус",
    author: "ВК",
    date: "01.11.2020",
    time: "10:00",
    link:
      "https://yandex.ru/news/story/Na_Dvorcovoj_ploshhadi_startovalo_svetovoe_shou_v_chest_Dnej_EHrmitazha--b5866981fead61affaebdbd9d7a04ccd?lang=ru&rubric=Saint_Petersburg&wan=1&stid=3OA_WiFrNij3fPvUb0Xa&t=1607274846&persistent_id=120403434",
    id: 2,
  },
  {
    title: "Коровавирус",
    author: "ВК",
    date: "02.11.2020",
    time: "10:00",
    link:
      "https://yandex.ru/news/story/Na_Dvorcovoj_ploshhadi_startovalo_svetovoe_shou_v_chest_Dnej_EHrmitazha--b5866981fead61affaebdbd9d7a04ccd?lang=ru&rubric=Saint_Petersburg&wan=1&stid=3OA_WiFrNij3fPvUb0Xa&t=1607274846&persistent_id=120403434",
    id: 3,
  },
];

const NewsWidget = (function (news) {
  let isWidgetOpen = false;

  function createStyle() {
    const styleForWidget = document.createElement("style");
    styleForWidget.textContent =
      ".widget__button {background: #33b93a; width: 80px; height: 80px; border-radius: 40px; border: 5px solid #a1d8a4; position: fixed; bottom: 50px; right: 50px; text-align: center; vertical-align: middle; font-family: Montserrat-Bold, sans-serif; color: #ffffff; font-size: 30px; padding-top: 15px; cursor: pointer; transition: .3s; } .widget {width: 300px;height: 400px;background: #ffffff;border-radius: 10px;overflow: hidden; position: fixed; bottom: 150px; right: 50px; box-shadow: 0px 0px 21px 0px rgba(113, 206, 118, 0.38); } .widget .widgetTop { display: flex; justify-content: space-between; align-items: center; padding-right: 10px; padding-left: 15px; background: #33b93a; width: 100%; height: 40px; } .widget .widgetTop .widgetTop__title h5 { font-family: Montserrat-Bold, sans-serif; color: #ffffff; font-size: 23px; } .widget .widgetTop .widgetTop__close { cursor: pointer; transition: .3s; } .widget .widgetTop .widgetTop__close:hover { filter: invert(15%); transition: .3s; } .widget .widgetMain { display: flex; flex-direction: column; align-items: center; padding-top: 15px; height: 360px; overflow-y: scroll; } .widget .widgetMain .widgetNews { background: #ece4e4; width: 270px; margin-bottom: 10px; padding: 5px; } .widget .widgetMain .widgetNews .widgetNews__top { display: flex; justify-content: space-between; margin-bottom: 10px; } .widget .widgetMain .widgetNews .widgetNews__middle { margin-bottom: 10px; } .widget .widgetMain .widgetNews .widgetNews__bottom {display: flex; align-items: center; justify-content: space-between; padding-right: 10px; font-family: Montserrat-Regular, sans-serif; color: #867171; font-size: 15px; }";
    document.body.appendChild(styleForWidget);
  }

  const widgetButton = document.createElement("div");

  function createButton() {
    widgetButton.classList.add("widget__button");
    widgetButton.textContent = `${news.length}`;
    widgetButton.setAttribute("onmouseover", "this.style.boxShadow='0px 0px 21px 0px rgba(51, 185, 58, 1)'; this.style.border='5px solid #33b93a'; this.style.transition='.3s';");
    widgetButton.setAttribute("onmouseout", "this.style.boxShadow='none'; this.style.border='5px solid #a1d8a4'; this.style.transition='.3s';");
    document.body.appendChild(widgetButton);
  }

  const widgetBar = document.createElement("div");

  function createWidget() {
    widgetBar.classList.add("widgetBar");

    const markupWidget = `
      <div class="widget">
              <div class="widgetTop">
                <div class="widgetTop__title">
                  <h5>Новости</h5>
                </div>
                <div class="widgetTop__close"><img src="https://i.ibb.co/mqSs2f8/close.png alt=""/></div>
              </div>
            </div>
      `;

    widgetBar.innerHTML = markupWidget;
  }

  function createNew(obj) {
    const markupNews = `<div class="widgetNews">
        <div class="widgetNews__top">
          <div class="widgetNews__title">${obj.title}</div>
          <div class="widgetNews__author">${obj.author}</div>
        </div>
        <div class="widgetNews__middle"><a class="widgetNews__link" href="${obj.link}">Подробнее</a></div>
        <div class="widgetNews__bottom">
          <div class="widgetNews__date">${obj.date + " " + obj.time}</div>
        </div>
      </div>`;
    return markupNews;
  }

  function renderNews() {
    const widget = widgetBar.querySelector(".widget");
    const widgetMain = document.createElement("div");
    widgetMain.classList.add("widgetMain");
    for (let i = 0; i < news.length; i++) {
      let markupNews = createNew(news[i]);
      widgetMain.innerHTML += markupNews;
    }
    widget.appendChild(widgetMain);
  }

  function checkedNew() {
    let pointer = event.target.closest(`.widgetNews`);
    if (pointer) {
      pointer.style = "opacity: 0.4;";
    }
  }

  function deleteWidget() {
    const widget = widgetBar.querySelector(".widget");
    widget.remove();
    isWidgetOpen = false;
    widgetBar.removeEventListener("click", checkedNew);
  }

  function openWidget() {
    widgetButton.addEventListener("click", function () {
      if (!isWidgetOpen) {
        createWidget();
        isWidgetOpen = true;
        const widgetClose = widgetBar.querySelector(".widgetTop__close");
        widgetClose.addEventListener("click", deleteWidget);
        renderNews();
        document.body.appendChild(widgetBar);
        widgetBar.addEventListener("click", checkedNew);
      } else {
        deleteWidget();
      }
    });
  }

  function init() {
    createStyle();
    createButton();
    openWidget();
  }

  init();
})(NEWS);
