import React from 'react';
import ComposeFormContainer from './containers/compose_form_container';
import NavigationContainer from './containers/navigation_container';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { mountCompose, unmountCompose } from '../../actions/compose';
import { Link } from 'react-router-dom';
import { injectIntl, defineMessages } from 'react-intl';
import SearchContainer from './containers/search_container';
import Motion from '../ui/util/optional_motion';
import spring from 'react-motion/lib/spring';
import SearchResultsContainer from './containers/search_results_container';
import { changeComposing } from '../../actions/compose';

const messages = defineMessages({
  start: { id: 'getting_started.heading', defaultMessage: 'Getting started' },
  home_timeline: { id: 'tabs_bar.home', defaultMessage: 'Home' },
  notifications: { id: 'tabs_bar.notifications', defaultMessage: 'Notifications' },
  public: { id: 'navigation_bar.public_timeline', defaultMessage: 'Federated timeline' },
  community: { id: 'navigation_bar.community_timeline', defaultMessage: 'Local timeline' },
  preferences: { id: 'navigation_bar.preferences', defaultMessage: 'Preferences' },
  logout: { id: 'navigation_bar.logout', defaultMessage: 'Logout' },
});

const mapStateToProps = state => ({
  columns: state.getIn(['settings', 'columns']),
  showSearch: state.getIn(['search', 'submitted']) && !state.getIn(['search', 'hidden']),
});

@connect(mapStateToProps)
@injectIntl
export default class Compose extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    columns: ImmutablePropTypes.list.isRequired,
    multiColumn: PropTypes.bool,
    showSearch: PropTypes.bool,
    intl: PropTypes.object.isRequired,
  };

  componentDidMount () {
    this.props.dispatch(mountCompose());
  }

  componentWillUnmount () {
    this.props.dispatch(unmountCompose());
  }

  onFocus = () => {
    this.props.dispatch(changeComposing(true));
  }

  onBlur = () => {
    this.props.dispatch(changeComposing(false));
  }

  render () {
    const { multiColumn, showSearch, intl } = this.props;

    let header = '';

    if (multiColumn) {
      const { columns } = this.props;
      header = (
        <nav className='drawer__header'>
          <Link to='/getting-started' className='drawer__tab' title={intl.formatMessage(messages.start)} aria-label={intl.formatMessage(messages.start)}><i role='img' className='fa fa-fw fa-asterisk' /></Link>
          {!columns.some(column => column.get('id') === 'HOME') && (
            <Link to='/timelines/home' className='drawer__tab' title={intl.formatMessage(messages.home_timeline)} aria-label={intl.formatMessage(messages.home_timeline)}><i role='img' className='fa fa-fw fa-home' /></Link>
          )}
          {!columns.some(column => column.get('id') === 'NOTIFICATIONS') && (
            <Link to='/notifications' className='drawer__tab' title={intl.formatMessage(messages.notifications)} aria-label={intl.formatMessage(messages.notifications)}><i role='img' className='fa fa-fw fa-bell' /></Link>
          )}
          {!columns.some(column => column.get('id') === 'COMMUNITY') && (
            <Link to='/timelines/public/local' className='drawer__tab' title={intl.formatMessage(messages.community)} aria-label={intl.formatMessage(messages.community)}><i role='img' className='fa fa-fw fa-users' /></Link>
          )}
          {!columns.some(column => column.get('id') === 'PUBLIC') && (
            <Link to='/timelines/public' className='drawer__tab' title={intl.formatMessage(messages.public)} aria-label={intl.formatMessage(messages.public)}><i role='img' className='fa fa-fw fa-globe' /></Link>
          )}
          <a href='/settings/preferences' className='drawer__tab' title={intl.formatMessage(messages.preferences)} aria-label={intl.formatMessage(messages.preferences)}><i role='img' className='fa fa-fw fa-cog' /></a>
          <a href='/auth/sign_out' className='drawer__tab' data-method='delete' title={intl.formatMessage(messages.logout)} aria-label={intl.formatMessage(messages.logout)}><i role='img' className='fa fa-fw fa-sign-out' /></a>
        </nav>
      );
    }

    return (
      <div className='drawer'>
      <img src='https://counter.social/CustomStuff/logotilt-final.png' />
        

        <SearchContainer />

        <div className='drawer__pager'>
          <div className='drawer__inner' onFocus={this.onFocus}>
            <NavigationContainer onClose={this.onBlur} />
            <ComposeFormContainer />
            

            
            
          </div>

          <Motion defaultStyle={{ x: -100 }} style={{ x: spring(showSearch ? 0 : -100, { stiffness: 210, damping: 20 }) }}>
            {({ x }) =>
              <div className='drawer__inner darker' style={{ transform: `translateX(${x}%)`, visibility: x === -100 ? 'hidden' : 'visible' }}>
                <SearchResultsContainer />
              </div>
            }
          </Motion>
            
        </div>

<table width="100%"  border="0" align="center" bordercolor="#484d5d" bgcolor="#484d5d">
<tr>
<td>
<div align="center">
<table width="90%"  border="0" align="center" bordercolor="#484d5d" bgcolor="#484d5d">
  <tr>
    <td height="66"><div align="center">
      <table width='100%'  border='0'>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>We block 100K+ proxies and these nations:</td>
        </tr>
      </table>
    </div>
      <table width='100%'  border='0' align="center">
        <tr>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/russia.png' title='Russia' alt='Russia' width='33' height='33' /></div></td>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/china.png' title='China' alt='China' width='33' height='33' /></div></td>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/iran.png' title='Iran' alt='Iran' width='33' height='33' /></div></td>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/nk.png' title='North Korea' alt='North Korea' width='33' height='33' /></div></td>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/syria.png' title='Syria' alt='Syria' width='33' height='33' /></div></td>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/pakistan.png' title='Pakistan' alt='Pakistan' width='33' height='33' /></div></td>
          <td><div align='center'><img src='https://counter.social/CustomStuff/flags/ukraine.png' title='Ukraine' alt='Ukraine' width='33' height='33' /></div></td>
        </tr>
    </table>
      </td></tr>
</table> 
<table width="90%"  border="0">
  <tr>
    <td colspan="2">Counter.Social is based on open protocols and is compatible with any Mastodon app: </td>
  </tr>
  <tr>
    <td width="50%"><div align="left"><a href="https://play.google.com/store/apps/details?id=com.keylesspalace.tusky&hl=en" target="_blank"><img src="https://counter.social/CustomStuff/gplay.png" border="0" /></a></div></td>
    <td width="50%"><div align="right"><a href="https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200?mt=8" target="_blank"><img src="https://counter.social/CustomStuff/istore.png" border="0" /></a></div></td>
  </tr>
</table>
</div>
</td>
</tr> 
</table>     
       
      </div>
    );
  }

}
