import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import AlgoliaLogo from './AlgoliaLogo'
import Icon from './Icon'

const githubLink = 'https://github.com/jschr/vscodethemes'
const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  'Preview themes from the VSCode marketplace',
)}&via=_jschr&url=${encodeURIComponent(
  'https://vscodethemes.com',
)}&hashtags=vscode`

const Footer: React.SFC<{}> = () => (
  <div className={classes.footer}>
    <div className={classes.links}>
      <a className={classes.link} href={githubLink}>
        <Icon className={classes.icon} icon="github" />View on Github
      </a>
      <a className={classes.link} href={twitterLink} target="_blank">
        <Icon className={classes.icon} icon="twitter" /> Share on Twitter
      </a>
    </div>
    <AlgoliaLogo />
  </div>
)

const classes = {
  footer: css({
    width: '100%',
    borderTop: `1px solid ${theme.colors.inputBorder}`,
    marginTop: em(theme.gutters.lg),
    padding: `${em(theme.gutters.md)} ${em(theme.container.gutter)}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    [theme.breakpoints.pageMin]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.inputBorder,
    },
  }),
  links: css({
    order: 0,
    display: 'flex',
    [theme.breakpoints.pageMin]: {
      order: 1,
      marginTop: em(theme.gutters.md),
    },
  }),
  icon: css({
    marginRight: em(theme.gutters.xs),
  }),
  link: css({
    fontSize: em(theme.fontSizes.sm),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.textMuted,
    cursor: 'pointer',
    textDecoration: 'none',
    ':first-child': {
      marginRight: em(theme.gutters.md),
    },
    ':hover': {
      color: theme.colors.text,
    },
  }),
}

export default Footer
