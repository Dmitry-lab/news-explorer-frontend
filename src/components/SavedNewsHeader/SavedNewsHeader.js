import React from 'react';
import Navigation from '../Navigation/Navigation';
import './SavedNewsHeader.css';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const wellcomeInfoEndings = {'1': ['ая', 'ья'], '2': ['ые', 'ьи'] , '3': ['ые', 'ьи'], '4': ['ые', 'ьи']}
  const statisticsEndings = {'1': 'ому', '2': 'м', '3': 'м', '4': 'м', '7': 'ми', '8': 'ми'}

  React.useEffect(() => {
    props.onMobileMenuClose();
  }, [])

  const createWelcomeString = () => {
    let lengthStr = (currentUser.savedNews.length + '').slice(-2);
    lengthStr = (+lengthStr > 20) ? lengthStr.slice(-1) : lengthStr;
    const fistEnding = wellcomeInfoEndings[lengthStr] ? wellcomeInfoEndings[lengthStr][0] :'ых';
    const secondEnding = wellcomeInfoEndings[lengthStr] ? wellcomeInfoEndings[lengthStr][1] : 'ей';
    return `${currentUser.savedNews.length} сохраненн${fistEnding} стат${secondEnding} `
  }

  const createStatisticsSubstr = (number) => {
    let lengthStr = (number + '').slice(-2);
    lengthStr = (+lengthStr > 20) ? lengthStr.slice(-1) : lengthStr;
    const ending = statisticsEndings[lengthStr] ? statisticsEndings[lengthStr] :'ти';
    return `${number}-${ending}`;
  }

  const findFrequentKeywords = () => {
    const keywords = currentUser.savedNews.reduce((prev, item) => {
      prev[item.keyword] = prev[item.keyword] ? prev[item.keyword] + 1 : 1;
      return prev;
    }, {})

    return Object.entries(keywords).sort((a, b) => b[1] - a[1]);
  }

  const createStatisticsString = () => {
    const sortFrequentArr = findFrequentKeywords();

    let resultStr = 'По ключевым словам: ';
    if (sortFrequentArr.length <= 3) {
      sortFrequentArr.forEach((item, index) => {
        resultStr += (index === 0) ? `<strong>${item[0]}<strong/>` : `, <strong>${item[0]}<strong/>`
      })
    } else {
      const others = sortFrequentArr.length - 2;
      const substring = createStatisticsSubstr(others)
      resultStr += `<strong>${sortFrequentArr[0][0]}<strong/>, <strong>${sortFrequentArr[1][0]}<strong/> и ${substring} другим`
    }

    return resultStr;
  }

  return (
    <header className="news-header">
      <Navigation
        lightStyle={true}
        name="Грета"
        {...props}
      />
      <h1 className="news-header__title">Сохраненные статьи</h1>
      <p className="news-header__wellcome-info">{currentUser.name}, у вас {createWelcomeString()}</p>
      <p className="news-header__info" dangerouslySetInnerHTML={{ __html: createStatisticsString() }} />
      <MobileNavigation
        name={props.isLoggedIn ? "Грета" : ""}
        {...props}
      />
    </header>
  )
}

export default SavedNewsHeader;
