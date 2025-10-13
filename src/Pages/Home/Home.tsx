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
  const [packageName, setPackageName] = useState("Growth Starter");
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
            <span className="home__bubble-label">JUST Y.</span>
            <p className="home__bubble-text">
              Say hello to your next-generation React components.
            </p>
          </div>
        </AnimatedOutline>
      </section>

      <section className="home__intro">
        <div className="home__hero-content">
          <div className="home__badge">Component marketplace</div>
          <h1 className="home__title">Components from $2. Pay only for what ships.</h1>
          <p className="home__subtitle">
            Choose the UI pieces you actually need, request quick tweaks to border radius or brand colors,
            and receive a ready-to-ship kit in minutes. No bundles, no subscriptions—just the essentials on your terms.
          </p>
          <div className="home__actions">
            <Button size="large" onClick={() => navigate("/shop")}>
              Build your kit
            </Button>
            <Button size="small" onClick={() => navigate("/shop")}>
              Browse components
            </Button>
          </div>
          <div className="home__metrics">
            <div className="home__metric">
              <span className="home__metric-value">From $2</span>
              <span className="home__metric-label">per component</span>
            </div>
            <div className="home__metric">
              <span className="home__metric-value">40+</span>
              <span className="home__metric-label">ready-to-use blocks</span>
            </div>
            <div className="home__metric">
              <span className="home__metric-value">24h</span>
              <span className="home__metric-label">turnaround delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home__section">
        <TitleBlock title="How it works" />
        <div className="home__grid">
          <FormLayout
            title="Choose the essentials"
            description="Select only the foundations you need—CTA buttons, form inputs, toggles, and more."
            width="100%"
            maxWidth="100%"
          >
            <CheckBox
              name="landing-buttons"
              value="buttons"
              label="Buttons & CTAs"
              checked={selectedComponents.buttons}
              onChange={handleComponentToggle("buttons")}
            />
            <CheckBox
              name="landing-forms"
              value="forms"
              label="Form elements"
              checked={selectedComponents.forms}
              onChange={handleComponentToggle("forms")}
            />
            <CheckBox
              name="landing-analytics"
              value="analytics"
              label="Analytics overlays"
              checked={selectedComponents.analytics}
              onChange={handleComponentToggle("analytics")}
            />
          </FormLayout>

          <FormLayout
            title="Make it yours"
            description="Rename components, adjust border radius and accent colors, and preview copy before you pay."
            width="100%"
            maxWidth="100%"
          >
            <Input
              type="text"
              placeholder="Name your kit"
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
            />
            <Switch
              name="auto-updates"
              label="Auto-sync updates"
              checked={autoUpdatesEnabled}
              onChange={setAutoUpdatesEnabled}
            />
          </FormLayout>

          <FormLayout
            title="Export & deliver"
            description="Receive production-ready assets and code snippets tuned to your stack."
            actions={
              <Button size="small" onClick={() => navigate("/shop")}>
                View pricing
              </Button>
            }
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              Each component comes with usage notes, tokens, and responsive
              states so your team can ship faster.
            </p>
          </FormLayout>
        </div>
      </section>

      <section className="home__section">
        <TitleBlock title="Why teams choose us" />
        <div className="home__pillars">
          <FormLayout
            title="Transparent pricing"
            description="Components start at $2 and scale with the checklist you build."
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              See the full price before checkout and add extras only when you need them—no bundles or hidden tiers.
            </p>
          </FormLayout>
          <FormLayout
            title="Styling tweaks included"
            description="Border radius and primary colors come configured for your brand."
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              Tell us the corner radius and accent color you want, and we deliver polished variants so your team can drop them straight in.
            </p>
          </FormLayout>
          <FormLayout
            title="Launch-ready handoff"
            description="Usage notes and responsive states ship with every component."
            width="100%"
            maxWidth="100%"
          >
            <p className="home__text">
              Each kit includes interaction specs, breakpoints, and best practices so designers and engineers stay aligned.
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
              Build a kit that matches your roadmap—no bundles, no lock-in, just
              the building blocks you actually use.
            </span>
          }
          actions={
            <Button size="large" onClick={() => navigate("/shop")}>
              Start selecting components
            </Button>
          }
        >
          <TitleBlock title="Ready when you are" />
        </FormLayout>
      </section>
    </div>
  );
};

export default Home;
