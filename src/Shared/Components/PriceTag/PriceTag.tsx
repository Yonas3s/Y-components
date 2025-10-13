type PriceTagProps = {
  value: string;
  className?: string;
};

const PriceTag = ({ value, className = "" }: PriceTagProps) => {
  const classes = ["form-layout__price"];
  if (className) {
    classes.push(className);
  }

  return <span className={classes.join(" ")}>{value}</span>;
};

export default PriceTag;
