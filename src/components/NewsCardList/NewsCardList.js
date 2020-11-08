import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  return (
    <div className="card-list">
      <NewsCard
        loggedIn={false}
        imageSrc="https://www.culture.ru/storage/images/f36899754e771a8e7d10e27420de4301/92ffc1f2a05eaa1f3188aa93b1a0ec51.jpeg"
        date="3 ноября, 2020"
        title="Национальное достояние – парки"
        text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система
          национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе fsgssgsdgsgsdgsgsfgsfg."
        source="ЛЕНТА.РУ"
        marked={true}
        keyWord="Фотографияcccccccccccc"
        savedNews={ props.savedNews }
        src="https://zen.yandex.ru/"
      />

      <NewsCard
        loggedIn={true}
        imageSrc="https://4.404content.com/1/44/24/655760344080451142/fullsize.jpg"
        date="3 ноября, 2020"
        title="Лесные огоньки: история одной фотографии"
        text="Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного
        из местных чудес природы."
        source="Медуза"
        marked={false}
        keyWord="Природа"
        savedNews={ props.savedNews}
        src="https://zen.yandex.ru/"
      />

      <NewsCard
        loggedIn={true}
        imageSrc="https://avatars.mds.yandex.net/get-zen_doc/245342/pub_5cebfb6700a94000b0d339ee_5ced1aeaaa79be00af411d33/scale_1200"
        date="3 ноября, 2020"
        title="«Первозданная тайга»: новый фотопроект Игоря Шпиленка"
        text="Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
          В этот раз он отправился в Двинско-Пинежскую тайгу, где..."
        source="РИА"
        marked={false}
        keyWord="Природа"
        savedNews={ props.savedNews }
        src="https://zen.yandex.ru/"
      />

      { props.savedNews &&
        <>
          <NewsCard
            loggedIn={true}
            imageSrc="https://avatars.mds.yandex.net/get-zen_doc/245342/pub_5cebfb6700a94000b0d339ee_5ced1aeaaa79be00af411d33/scale_1200"
            date="3 ноября, 2020"
            title="«Первозданная тайга»: новый фотопроект Игоря Шпиленка"
            text="Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
              В этот раз он отправился в Двинско-Пинежскую тайгу, где..."
            source="РИА"
            marked={false}
            keyWord="Природа"
            savedNews={ props.savedNews }
            src="https://zen.yandex.ru/"
          />

          <NewsCard
            loggedIn={true}
            imageSrc="https://avatars.mds.yandex.net/get-zen_doc/245342/pub_5cebfb6700a94000b0d339ee_5ced1aeaaa79be00af411d33/scale_1200"
            date="3 ноября, 2020"
            title="«Первозданная тайга»: новый фотопроект Игоря Шпиленка"
            text="Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
              В этот раз он отправился в Двинско-Пинежскую тайгу, где..."
            source="РИА"
            marked={false}
            keyWord="Природа"
            savedNews={ props.savedNews }
            src="https://zen.yandex.ru/"
          />
        </>
      }
    </div>
  )
}

export default NewsCardList;
