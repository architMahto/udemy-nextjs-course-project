import Link from 'next/link'

import classes from './button.module.scss'

export default function Button(props) {
  const { url, clickHandler, children } = props

  if (url) {
    return (
      <Link href={url}>
        <a className={classes.btn}>{children}</a>
      </Link>
    )
  }

  return (
    <button className={classes.btn} onClick={clickHandler}>
      {children}
    </button>
  )
}
