import { useState, type ChangeEvent } from "react";
import Button from "../../Shared/Components/Button/Button";
import CheckBox from "../../Shared/Components/CheckBox/CheckBox";
import FormLayout from "../../Shared/Components/FormLayout/FormLayout";
import TitleBlock from "../../Shared/Components/TitleBlock/TitleBlock";
import Header from "../../Shared/Sections/Header/Header";
import Input from "../../Shared/Components/Input/Input";
import Switch from "../../Shared/Components/Switch/Switch";
import Stepper from "../../Shared/Components/Stepper/Stepper";
import Slider from "../../Shared/Components/Slider/Slider";
import "./Shop.css";

const Shop = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [progress, setProgress] = useState(45);

  const handleCheckBoxChange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setCheckedItems((prev) => ({
        ...prev,
        [id]: checked,
      }));
    };

  const priceLabel = "$2 per component";
  const priceLabelMore = "$3 per component";

  return (
    <section className="shop">
      <Header />
      <TitleBlock title="Starter pack" />
      <div className="grid">
        <FormLayout>
          <span className="form-layout__price">{priceLabel}</span>
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
          <span className="form-layout__price">{priceLabel}</span>
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
          <span className="form-layout__price">{priceLabel}</span>
          <CheckBox
            name="I agree"
            value="I agree"
            label="I agree"
            checked={Boolean(checkedItems["I agree"])}
            onChange={handleCheckBoxChange("I agree")}
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
          <span className="form-layout__price">{priceLabelMore}</span>
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
          <span className="form-layout__price">{priceLabelMore}</span>
          <Stepper
            label="Components in bundle"
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={12}
          />
          <CheckBox
            name="Stepper"
            value="Stepper"
            label="Stepper"
            checked={Boolean(checkedItems["Stepper"])}
            onChange={handleCheckBoxChange("Stepper")}
          />
        </FormLayout>
        <FormLayout>
          <span className="form-layout__price">{priceLabelMore}</span>
          <Slider
            label="Border radius preset"
            min={0}
            max={32}
            step={2}
            value={progress}
            onChange={setProgress}
          />
        </FormLayout>
      </div>
    </section>
  );
};

export default Shop;
