import "./TitleBlock.css"

type TitleBlockProps = {
  title: string
}

const TitleBlock = ({ title }: TitleBlockProps) => {
  return (
    <section className="title-block">
      <p className="title-block__title">{title}</p>
    </section>
  )
}

export default TitleBlock
