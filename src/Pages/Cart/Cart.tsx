import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Sections/Header/Header";
import TitleBlock from "../../Shared/Components/TitleBlock/TitleBlock";
import FormLayout from "../../Shared/Components/FormLayout/FormLayout";
import PriceTag from "../../Shared/Components/PriceTag/PriceTag";
import CheckBox from "../../Shared/Components/CheckBox/CheckBox";
import Button from "../../Shared/Components/Button/Button";
import {
  COMPONENT_CATALOG,
  type ComponentCatalogItem,
} from "../../Shared/data/catalog";
import "./Cart.css";

type CheckedMap = Record<string, boolean>;

const CATALOG: ComponentCatalogItem[] = COMPONENT_CATALOG;
const STORAGE_KEY = "shop:checkedItems";

const Cart = () => {
  const [checkedItems, setCheckedItems] = useState<CheckedMap>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CheckedMap;
        if (parsed["I agree"]) {
          delete parsed["I agree"];
        }
        setCheckedItems(parsed);
      }
    } catch (error) {
      console.error("Failed to restore cart state", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch (error) {
      console.error("Failed to persist cart state", error);
    }
  }, [checkedItems, isHydrated]);

  const toggleItem = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setCheckedItems((prev) => {
      const next = {
        ...prev,
        [id]: checked,
      };

      if (isHydrated) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (error) {
          console.error("Failed to persist cart state", error);
        }
      }

      return next;
    });
  };

  const selectedItems = useMemo(
    () => CATALOG.filter((item) => checkedItems[item.id]),
    [checkedItems]
  );

  const selectedCount = selectedItems.length;
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const totalLabel = `$${totalPrice} total`;

  return (
    <section className="cart">
      <Header selectedCount={selectedCount} />
      <TitleBlock title="Your kit" />

      {selectedItems.length ? (
        <>
          <div className="cart__grid">
            {selectedItems.map((item) => (
              <FormLayout key={item.id} align="left" width="100%" maxWidth="360px">
                <div className="cart-item">
                  <div className="cart-item__header">
                    <h3 className="cart-item__title">{item.label}</h3>
                    <PriceTag
                      value={`$${item.price} each`}
                      className="cart-item__price"
                    />
                  </div>
                  <div className="cart-item__controls">
                    <CheckBox
                      name={`cart-${item.id}`}
                      value={item.id}
                      label="Keep in kit"
                      checked={Boolean(checkedItems[item.id])}
                      onChange={toggleItem(item.id)}
                    />
                  </div>
                </div>
              </FormLayout>
            ))}
          </div>

          <div className="cart__summary cart__summary--footer">
            <div className="cart__total-card">
              <div>
                <h3 className="cart__summary-title">Recap</h3>
                <p className="cart__summary-description">
                  {selectedCount} {selectedCount === 1 ? "component" : "components"} ready to ship
                </p>
              </div>
              <div className="cart__summary-actions">
                <div className="cart__total">
                  <span className="cart__total-label">Total</span>
                  <PriceTag value={totalLabel} className="cart__summary-price" />
                </div>
                <Button
                  size="small"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Continue building
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="cart__empty">
          <FormLayout align="center" width="100%" maxWidth="420px">
            <h3 className="cart__empty-title">Your kit is empty</h3>
            <p className="cart__empty-description">
              Head back to the shop and mix only the components you need. Everything stays synced
              with local storage, so your kit travels with you.
            </p>
            <Button size="small" onClick={() => navigate("/shop")}>Return to shop</Button>
          </FormLayout>
        </div>
      )}
    </section>
  );
};

export default Cart;
