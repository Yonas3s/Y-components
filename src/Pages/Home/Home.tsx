import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Sections/Header/Header";
import TitleBlock from "../../Shared/Components/TitleBlock/TitleBlock";
import FormLayout from "../../Shared/Components/FormLayout/FormLayout";
import Button from "../../Shared/Components/Button/Button";
import CheckBox from "../../Shared/Components/CheckBox/CheckBox";
import Input from "../../Shared/Components/Input/Input";
import Switch from "../../Shared/Components/Switch/Switch";
import AnimatedOutline from "../../Shared/Components/AnimatedOutline/AnimatedOutline";
import Loader from "../../Shared/Components/Loader/Loader";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [selectedComponents, setSelectedComponents] = useState<Record<string, boolean>>({
    buttons: true,
    forms: true,
    analytics: false,
  });
  const [packageName, setPackageName] = useState("Старт роста");
  const [autoUpdatesEnabled, setAutoUpdatesEnabled] = useState(true);
  const [isIntroLoading, setIsIntroLoading] = useState(true);

  const handleComponentToggle =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setSelectedComponents((prev) => ({
        ...prev,
        [id]: checked,
      }));
    };

  useEffect(() => {
    const timer = setTimeout(() => setIsIntroLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isIntroLoading) {
    return (
      <div className="home home--loading">
        <Loader size={64} speed={0.6} />
      </div>
    );
  }

  return (
    <div className="home">
      <Header />

      <section className="home__hero">
        <AnimatedOutline
          className="home__hero-outline"
          speed={0.2}
          deformIntensity={3.4}
          pulseIntensity={0.5}
          pulseSpeed={1}
          borderColor="rgba(255, 255, 255, 0.35)"
          borderWidth={1}
          padding={70}
        >
          <div className="home__hero-bubble">
            <span className="home__bubble-label">Только Y.</span>
            <p className="home__bubble-text">
              Познакомьтесь с React-компонентами нового поколения.
            </p>
          </div>
        </AnimatedOutline>
      </section>

      <section className="home__intro">
        <div className="home__hero-content">
          <div className="home__badge">Маркетплейс компонентов</div>
          <h1 className="home__title">Компоненты от 200 ₽. Платите только за релиз.</h1>
          <p className="home__subtitle">
            Выбирайте только те UI-блоки, что действительно нужны, просите быстро поправить скругления или брендовые цвета —
            и получайте готовый к поставке набор за считанные минуты. Никаких подписок и бандлов, только нужные детали на ваших условиях.
          </p>
          <div className="home__actions">
            <Button size="large" onClick={() => navigate("/shop")}>
              Собрать набор
            </Button>
            <Button size="small" onClick={() => navigate("/shop")}>
              Посмотреть компоненты
            </Button>
          </div>
          <div className="home__metrics">
            <div className="home__metric">
              <span className="home__metric-value">От 200 ₽</span>
              <span className="home__metric-label">за компонент</span>
            </div>
            <div className="home__metric">
              <span className="home__metric-value">40+</span>
              <span className="home__metric-label">готовых блоков</span>
            </div>
            <div className="home__metric">
              <span className="home__metric-value">24 часа</span>
              <span className="home__metric-label">на поставку</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home__section">
        <TitleBlock title="Как это работает" />
        <div className="home__grid">
          <FormLayout
            title="Выберите базу"
            description="Отметьте только те основы, что нужны: CTA-кнопки, поля форм, тумблеры и многое другое."
            width="100%"
            maxWidth="100%"
          >
            <CheckBox
              name="landing-buttons"
              value="buttons"
              label="Кнопки и CTA"
              checked={selectedComponents.buttons}
              onChange={handleComponentToggle("buttons")}
            />
            <CheckBox
              name="landing-forms"
              value="forms"
              label="Элементы формы"
              checked={selectedComponents.forms}
              onChange={handleComponentToggle("forms")}
            />
            <CheckBox
              name="landing-analytics"
              value="analytics"
              label="Виджеты аналитики"
              checked={selectedComponents.analytics}
              onChange={handleComponentToggle("analytics")}
            />
          </FormLayout>

          <FormLayout
            title="Сделайте под себя"
            description="Переименуйте компоненты, настройте скругления и акцентные цвета и посмотрите копирайт до оплаты."
            width="100%"
            maxWidth="100%"
          >
            <Input
              type="text"
              placeholder="Назовите набор"
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
            />
            <Switch
              name="auto-updates"
              label="Автообновления"
              checked={autoUpdatesEnabled}
              onChange={setAutoUpdatesEnabled}
            />
          </FormLayout>

          <FormLayout
            title="Экспорт и поставка"
            description="Получайте готовые к продакшену ассеты и сниппеты под ваш стек."
            actions={
              <Button size="small" onClick={() => navigate("/shop")}>
                Посмотреть цены
              </Button>
            }
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              Каждый компонент идёт с примечаниями по использованию, токенами и
              адаптивными состояниями, чтобы команда релизила быстрее.
            </p>
          </FormLayout>
        </div>
      </section>

      <section className="home__section">
        <TitleBlock title="Почему нас выбирают команды" />
        <div className="home__pillars">
          <FormLayout
            title="Прозрачная цена"
            description="Компоненты стоят от 200 ₽ и добавляются по мере заполнения чек-листа."
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              Видите финальную стоимость до оплаты и добавляете опции только при необходимости — никаких скрытых тарифов.
            </p>
          </FormLayout>
          <FormLayout
            title="Стили под ключ"
            description="Скругления и основные цвета уже настроены под ваш бренд."
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              Скажите нужный радиус и акцентный цвет — привезём отполированные варианты, которые можно сразу внедрять.
            </p>
          </FormLayout>
          <FormLayout
            title="Готовый к запуску пакет"
            description="С каждой позицией идут гайды и адаптивы."
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              В каждый набор входят спецификации взаимодействий, брейкпоинты и best practices, чтобы дизайнеры и инженеры работали синхронно.
            </p>
          </FormLayout>
        </div>
      </section>

      <section className="home__cta">
        <FormLayout
          align="center"
          width="100%"
          maxWidth="560px"
          description={
            <span>
              Соберите набор под свой roadmap — никаких бандлов и lock-in, только рабочие кубики.
            </span>
          }
          actions={
            <Button size="large" onClick={() => navigate("/shop")}>
              Начать выбирать компоненты
            </Button>
          }
        >
          <TitleBlock title="Готовы, когда будете" />
        </FormLayout>
      </section>
    </div>
  );
};

export default Home;
