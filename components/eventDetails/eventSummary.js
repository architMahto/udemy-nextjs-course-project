import classes from './eventSummary.module.scss';

export default function LogisticsItem(props) {
  const { title } = props

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
