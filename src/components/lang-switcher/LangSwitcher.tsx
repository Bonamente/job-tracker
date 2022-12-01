import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StyledLangSwitcher from './StyledLangSwitcher';

type LangSwitcherProps = {
  currentLang: string;
  changeLang: (lng: string) => void;
};

const LangSwitcher: React.FC<LangSwitcherProps> = ({
  currentLang,
  changeLang,
}) => {
  const { t } = useTranslation();
  const [isSwitched, setSwitched] = useState(currentLang !== 'en');

  const handleClick = () => {
    setSwitched(!isSwitched);

    if (isSwitched) {
      changeLang('en');
    } else {
      changeLang('ru');
    }
  };

  return (
    <StyledLangSwitcher>
      <button
        className="lang-switch-btn btn"
        aria-label={t('buttons.change_lang') as string}
        type="button"
        onClick={handleClick}
      >
        {isSwitched ? 'ru' : 'en'}
      </button>
    </StyledLangSwitcher>
  );
};

export default LangSwitcher;
