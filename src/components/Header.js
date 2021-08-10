import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { saveImageUrl } from '../redux/actions';

class Header extends Component {
  hashCreate() {
    const { email, saveImage } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    saveImage(url);
    return url;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img
          src={ this.hashCreate() }
          data-testid="header-profile-picture"
          alt="Foto do perfil"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  saveImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveImage: (url) => dispatch(saveImageUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
