import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class InclusionBanner extends Component {
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
      <div className="inclusion-banner banner" style={{display: this.state.displayed ? 'block' : 'none'}}>
        <FontAwesome className="close-button" name="close" onClick={this.handleClose} />

        <div className="inclusion-banner__description">
          <strong><FontAwesome name="exclamation-circle" /> WARNING:</strong> This summary is designed for patients
          who meet at least one of the following inclusion criteria:

          <ul>
            <li>Has a condition likely to indicate chronic pain</li>
            <li>Has an active opioid medication in the last 180 days</li>
            <li>Has an active adjuvant analgesic medication in the last 180 days</li>
          </ul>
        </div>

        <div className="inclusion-banner__tag banner warning-inside">
          This patient does not meet any of these inclusion criteria.
        </div>
      </div>
    );
  }
}
