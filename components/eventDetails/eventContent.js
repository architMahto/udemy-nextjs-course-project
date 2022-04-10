import classes from './eventContent.module.scss';

export default function EventContent(props) {
  const { children } = props
  return (
    <section className={classes.content}>
      {children}
    </section>
  );
}
