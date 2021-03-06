import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class ExclusionBanner extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      displayed: true
    };
  }

  handleClose = () => {
    this.setState({ displayed: false });
  }

  render() {
    return (
      <div className="exclusion-banner banner" style={{display: this.state.displayed ? 'block' : 'none'}}>
        <FontAwesome className="close-button" name="close" onClick={this.handleClose} />

        <div className="exclusion-banner__description">
          <strong><FontAwesome name="exclamation-circle" /> TAKE NOTICE:</strong> This summary is not intended
          for patients who are undergoing <b>end-of-life care</b> (hospice or palliative) or <b>active cancer
          treatment</b>.
        </div>
      </div>
    );
  }
}
