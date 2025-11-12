import { useEffect, useState, type ChangeEvent } from "react";
import Button from "../../Shared/Components/Button/Button";
import CheckBox from "../../Shared/Components/CheckBox/CheckBox";
import FormLayout from "../../Shared/Components/FormLayout/FormLayout";
import TitleBlock from "../../Shared/Components/TitleBlock/TitleBlock";
import Header from "../../Shared/Sections/Header/Header";
import Input from "../../Shared/Components/Input/Input";
import Switch from "../../Shared/Components/Switch/Switch";
import Stepper from "../../Shared/Components/Stepper/Stepper";
import Slider from "../../Shared/Components/Slider/Slider";
import Modal from "../../Shared/Components/Modal/Modal";
import PriceTag from "../../Shared/Components/PriceTag/PriceTag";
import MetricCard, {
  type MetricCardProps,
} from "../../Shared/Components/MetricCard/MetricCard";
import CircularChartCard, {
  type ChartDatum,
} from "../../Shared/Components/CircularChartCard/CircularChartCard";
import "./Shop.css";

const ANALYTICS_SAMPLE_DATA: ChartDatum[] = [
  { id: "essentials", label: "UI foundations", value: 48, color: "#805AFF" },
  { id: "commerce", label: "Commerce flows", value: 32, color: "#3BA5FF" },
  { id: "marketing", label: "Marketing blocks", value: 22, color: "#FF7A5F" },
  { id: "analytics", label: "Analytics widgets", value: 18, color: "#2DD4BF" },
];

const METRIC_SAMPLE = [
  {
    id: "orders",
    title: "Orders today",
    caption: "vs. previous day",
    value: "1 248",
    deltaLabel: "+12%",
    deltaTone: "positive" as const,
    sparklineData: [42, 48, 44, 60, 58, 66, 64],
  },
  {
    id: "conversion",
    title: "Conversion rate",
    caption: "last 7 days",
    value: "4.8%",
    deltaLabel: "-0.6%",
    deltaTone: "negative" as const,
    sparklineData: [5.4, 5.1, 4.9, 5.2, 4.8, 4.9, 4.7],
    sparklineColor: "#FF7A5F",
  },
];

const METRIC_PRODUCT_PREVIEW: MetricCardProps = {
  title: "Revenue pulse",
  caption: "rolling 7 days",
  value: "$12.4k",
  deltaLabel: "+8%",
  deltaTone: "positive",
  sparklineData: [9.8, 10.5, 10.2, 11.1, 11.6, 12.8, 12.4],
  sparklineColor: "#5D85FF",
};

const Shop = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [progress, setProgress] = useState(45);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shop:checkedItems");
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, boolean>;
        if (parsed["I agree"]) {
          delete parsed["I agree"];
        }
        setCheckedItems(parsed);
      }
    } catch (error) {
      console.error("Failed to restore selections", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shop:checkedItems", JSON.stringify(checkedItems));
    } catch (error) {
      console.error("Failed to persist selections", error);
    }
  }, [checkedItems, isHydrated]);

  const handleCheckBoxChange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setCheckedItems((prev) => {
        const next = {
          ...prev,
          [id]: checked,
        };

        if (isHydrated) {
          try {
            localStorage.setItem("shop:checkedItems", JSON.stringify(next));
          } catch (error) {
            console.error("Failed to persist selections", error);
          }
        }

        return next;
      });
    };

  const lowPrice = "200₽ за компонент";
  const mediumPrice = "300₽ за компонент";
  const largePrice = "400₽ за компонент";
  const analyticsPrice = "500₽ за компонент";
  return (
    <section className="shop">
      <Header />
      <TitleBlock title="Starter pack" />
      <div className="grid">
        <FormLayout>
          <PriceTag value={lowPrice} />
          <Button>Button</Button>
        </FormLayout>

        <FormLayout>
          <PriceTag value={lowPrice} />
          <Input type="text" placeholder="Placeholder" />
        </FormLayout>

        <FormLayout>
          <PriceTag value={lowPrice} />
          <CheckBox
            name="agreement"
            value="agreement"
            label="I agree"
            checked={isAgreementChecked}
            onChange={(event) => setIsAgreementChecked(event.target.checked)}
          />
        </FormLayout>
      </div>
      <TitleBlock title="Toggle" />
      <div className="grid">
        <FormLayout>
          <PriceTag value={mediumPrice} />
          <Switch
            name="feature-toggle"
            label="Enable kit updates"
            checked={isToggleEnabled}
            onChange={setIsToggleEnabled}
          />
        </FormLayout>
      </div>
      <TitleBlock title="Analytics overlays" />
      <div className="grid">
        <FormLayout
          className="shop__analytics-card"
          width="100%"
          maxWidth="460px"
        >
          <PriceTag value={analyticsPrice} />
          <CircularChartCard
            title="Component allocation"
            data={ANALYTICS_SAMPLE_DATA}
            centerLabel="Components"
            valueFormatter={(value) => `${value}`}
            width="100%"
            maxWidth="100%"
          />
        </FormLayout>
      </div>
      <TitleBlock title="Metric insights" />
      <div className="grid">
        <FormLayout
          className="shop__metric-product"
          width="100%"
          maxWidth="360px"
        >
          <PriceTag value={mediumPrice} />
          <MetricCard
            title={METRIC_PRODUCT_PREVIEW.title}
            caption={METRIC_PRODUCT_PREVIEW.caption}
            value={METRIC_PRODUCT_PREVIEW.value}
            deltaLabel={METRIC_PRODUCT_PREVIEW.deltaLabel}
            deltaTone={METRIC_PRODUCT_PREVIEW.deltaTone}
            sparklineData={METRIC_PRODUCT_PREVIEW.sparklineData}
            sparklineColor={METRIC_PRODUCT_PREVIEW.sparklineColor}
            ariaLabel={`${METRIC_PRODUCT_PREVIEW.title}: ${METRIC_PRODUCT_PREVIEW.value}`}
          />
        </FormLayout>
      </div>
      <TitleBlock title="Adjustments" />
      <div className="grid">
        <FormLayout>
          <PriceTag value={mediumPrice} />
          <Stepper value={quantity} onChange={setQuantity} min={1} max={12} />
        </FormLayout>
        <FormLayout>
          <PriceTag value={mediumPrice} />
          <Slider
            min={0}
            max={32}
            step={2}
            value={progress}
            onChange={setProgress}
          />
        </FormLayout>
        <FormLayout>
          <PriceTag value={largePrice} />
          <Button size="small" onClick={() => setIsModalOpen(true)}>
            Preview modal
          </Button>
        </FormLayout>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Save your kit"
        primaryLabel="Save selection"
        onPrimaryClick={() => setIsModalOpen(false)}
        secondaryLabel="Not now"
        onSecondaryClick={() => setIsModalOpen(false)}
      >
        <p>
          Keep the current selection so you can pick up customisation later.
          We’ll store the components, presets, and tokens you’ve chosen so far.
        </p>
        <p>Next time you open the builder, everything will be right where you left it.</p>
      </Modal>
      <p className="shop__version">y4bits kit builder v0.1</p>
    </section>
  );
};

export default Shop;
