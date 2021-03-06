import {error} from '../util/msgs.js';
import * as actionTypes from '../constants/actionTypes';
import * as validator from '../util/validation';
import { ANAX_URL_BASE, IP_API_URL_BASE } from '../constants/configuration';

export function deviceFormSubmit(deviceForm) {
  return function(dispatch) {
    // N.B. we leave the registration of the 'location' service to the next page for now; should probably be here in the future
    // TODO: fix the API to accept floats and not strings

    return fetch(`${ANAX_URL_BASE}/attribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'LocationAttributes',
        label: 'Registered Location Facts',
        publishable: false,
        host_only: false,
        mappings: {
          lat: parseFloat(deviceForm.fields.location.latitude),
          lon: parseFloat(deviceForm.fields.location.longitude),
          use_gps: deviceForm.fields.motion.usegps,
          location_accuracy_km: parseFloat(deviceForm.fields.location.location_accuracy_km),
        },
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw error(response, 'Error saving location information in anax.');
      } else {
        return response.json();
      }
    });
  };
}

export function deviceFormSubmitBlockchain(deviceForm) {
  return function(dispatch) {
    let protocols = [{Basic:[]}];
    if (deviceForm.fields.blockchain.usebc) {
      protocols = [
        {
          "Citizen Scientist": [
            {
              "name": "bluehorizon",
              "type": "ethereum",
            },
          ]
        }
      ];
    }
    return fetch(`${ANAX_URL_BASE}/attribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'AgreementProtocolAttributes',
        label: 'Agreement Protocols',
        publishable: true,
        host_only: false,
        mappings: {
          protocols,
        },
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw error(response, 'Error saving Blockchain configuration in anax.');
      } else {
        return response.json();
      }
    });
  }
}

export function deviceFormFieldChange(segment, fieldName, value) {

  return function(dispatch) {
    return dispatch({
      type: actionTypes.DEVICE_FORM_UPDATE,
      segment: segment,
      fieldName: fieldName,
      value: value
    });
  }
}

export function deviceFormMultiFieldChange(segment, updateObj) {
  return function(dispatch) {
    return dispatch({
      type: actionTypes.DEVICE_FORM_MULTI_UPDATE,
      updateObj: updateObj
    });
  }
}
