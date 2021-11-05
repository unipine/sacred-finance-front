import { useTranslation } from "react-i18next";

const Title = () => {
  const { t } = useTranslation();

  return (
    <div >
      <h1 className='title-container'>{t("Privacy is sacred.")}</h1>
      <p className='title-sub-container'>{t("Pool funds for secure, anonymous transactions.")}</p>
    </div>
  )
}

export default Title
