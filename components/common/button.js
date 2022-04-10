import Link from 'next/link'

import classes from './button.module.scss'

export default function Button(props) {
  const { url, children } = props

  return (
    <Link href={url}>
      <a className={classes.btn}>{children}</a>
    </Link>
  )
}
