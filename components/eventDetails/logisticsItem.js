import classes from './logisticsItem.module.scss';

export default function LogisticsItem(props) {
  const { icon: Icon, children } = props

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}
