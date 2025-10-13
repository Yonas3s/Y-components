import { useEffect, useMemo, useState, type ChangeEvent } from "react";
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
import "./Shop.css";

const Shop = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [progress, setProgress] = useState(45);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const lowPrice = "$2 per component";
  const mediumPrice = "$3 per component";
  const largePrice = "$4 per component";
  const selectedCount = useMemo(
    () => Object.values(checkedItems).filter(Boolean).length,
    [checkedItems]
  );

  return (
    <section className="shop">
      <Header selectedCount={selectedCount} />
      <TitleBlock title="Starter pack" />
      <div className="grid">
        <FormLayout>
          <PriceTag value={lowPrice} />
          <Button>Button</Button>
          <CheckBox
            name="feature-buttons"
            value="button"
            label="Button"
            checked={Boolean(checkedItems["feature-buttons"])}
            onChange={handleCheckBoxChange("feature-buttons")}
          />
        </FormLayout>

        <FormLayout>
          <PriceTag value={lowPrice} />
          <Input type="text" placeholder="Placeholder" />
          <CheckBox
            name="feature-inputs"
            value="input"
            label="Input"
            checked={Boolean(checkedItems["feature-inputs"])}
            onChange={handleCheckBoxChange("feature-inputs")}
          />
        </FormLayout>

        <FormLayout>
          <PriceTag value={lowPrice} />
          <CheckBox
            name="I agree"
            value="I agree"
            label="I agree"
            checked={false}
            onChange={() => undefined}
          />
          <CheckBox
            name="checkbox"
            value="checkbox"
            label="Checkbox"
            checked={Boolean(checkedItems["Checkbox"])}
            onChange={handleCheckBoxChange("Checkbox")}
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
          <CheckBox
            name="toggle button"
            value="toggle button"
            label="Toggle button"
            checked={Boolean(checkedItems["toggle button"])}
            onChange={handleCheckBoxChange("toggle button")}
          />
        </FormLayout>
      </div>
      <TitleBlock title="Adjustments" />
      <div className="grid">
        <FormLayout>
          <PriceTag value={mediumPrice} />
          <Stepper value={quantity} onChange={setQuantity} min={1} max={12} />
          <CheckBox
            name="Stepper"
            value="Stepper"
            label="Stepper"
            checked={Boolean(checkedItems["Stepper"])}
            onChange={handleCheckBoxChange("Stepper")}
          />
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
          <CheckBox
            name="Slider"
            value="Slider"
            label="Slider"
            checked={Boolean(checkedItems["Slider"])}
            onChange={handleCheckBoxChange("Slider")}
          />
        </FormLayout>
        <FormLayout>
          <PriceTag value={largePrice} />
          <Button size="small" onClick={() => setIsModalOpen(true)}>
            Preview modal
          </Button>
          <CheckBox
            name="Modal"
            value="Modal"
            label="Modal"
            checked={Boolean(checkedItems["Modal"])}
            onChange={handleCheckBoxChange("Modal")}
          />
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
    </section>
  );
};

export default Shop;
