import classes from './errorAlert.module.scss'

export default function ErrorAlert(props) {
  const { children } = props

  return (<div className={classes.alert}>{children}</div>)
}
