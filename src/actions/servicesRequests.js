// TODO: clean up compatibility-driven mess

function computeAttrs(label, ram, cpus = 1) {
  return {
    id: 'compute',
    short_type: 'compute',
    label: label,
    publishable: true,
    mappings: {
      ram: ram,
      cpus: cpus // to be removed in future versions,
    }
  };
}

function meteringAttrs(
  metered = false,
  label = 'Metering Policy',
  tokens = 2,
  perTimeUnit = 'hour',
  publishable = true,
  notificationInterval = 900
) {
  if (metered)
    return {
      id: 'metering',
      short_type: 'metering',
      label,
      publishable,
      mappings: {
        tokens,
        perTimeUnit,
        notificationInterval,
      },
    }
  // if not metered, return empty obj
  return {}
}

function agreementProtocolAttrs(isBlockchain = false, blockchainName="bluehorizon", blockchainType = "ethereum") {
  if (isBlockchain) {
    return {
      "id": "agreementprotocol",
      "short_type": "agreementprotocol",
      "label": "Agreement Protocols",
      "publishable": true,
      "mappings": {
        "protocols": [
          {
            "Citizen Scientist": [
              {
                "name": "bluehorizon",
                "type": "ethereum"
              }
            ]
          }
        ]
      }
    }
  } else {
    return {
      "id": "agreementprotocol",
      "short_type": "agreementprotocol",
      "label": "Agreement Protocols",
      "publishable": true,
      "mappings": {
        "protocols": [
          {
            "Basic": []
          }
        ]
      }
    }
  }
}

export function purpleairService(deviceHostname, metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/airpollution-device-api',
    sensor_name: 'airpollution',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
          MTN_PURPLE_AIR_SENSOR_NAME: deviceHostname,
          HZN_PURPLE_AIR_SENSOR_NAME: deviceHostname
        }
      },
      {...computeAttrs('PurpleAir (air pollution sensing)', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}

// this is a compatibility thing
export function locationService(usegps, metered = false, ram) {
  const obj = {
    sensor_url: 'https://bluehorizon.network/documentation/location-device-api',
    sensor_name: 'location',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
        }
      },
      {...computeAttrs('Device location', ram)},
    ]
  };

  return obj;
}

export function cputempService(metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/cputemp-device-api',
    sensor_name: 'cputemp',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
          MTN_CPU_TEMP: 'true',
          HZN_CPU_TEMP: 'true'
        }
      },
      {...computeAttrs('CPU temperature', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}

export function citygramService(description, email, name, password, metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/citygram-device-api',
    sensor_name: 'citygram',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
        }
      },
      {
        id: 'private_data',
        short_type: 'mapped',
        label: 'private_data',
        publishable: false,
        mappings: {
          HZN_CG_EMAIL: email,
          HZN_CG_PASS: password,
          HZN_CG_RSDNAME: name,
          HZN_CG_RSDDESC: description
        }
      },
      {...computeAttrs('NYU Citygram (noise pollution analysis)', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}

export function pwsService(wugname, model, type, metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/pws-device-api',
    sensor_name: 'pws',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
          MTN_WUGNAME: wugname,
          MTN_PWS_MODEL: model,
          MTN_PWS_ST_TYPE: type,
          HZN_WUGNAME: wugname,
          HZN_PWS_MODEL: model,
          HZN_PWS_ST_TYPE: type
        }
      },
      {...computeAttrs('Personal Weather Station', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}

export function netspeedService(targetServer, metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/netspeed-device-api',
    sensor_name: 'netspeed',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
          MTN_TARGET_SERVER: targetServer,
          HZN_TARGET_SERVER: targetServer
        }
      },
      {...computeAttrs('Netspeed (network quality testing)', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}

export function sdrService(metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/sdr-device-api',
    sensor_name: 'sdr',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
        }
      },
      {...computeAttrs('Software Defined Radio', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}

export function auralService(sendAudio, metered = false, ram) {
  return {
    sensor_url: 'https://bluehorizon.network/documentation/aural-device-api',
    sensor_name: 'aural',
    attributes: [
      {
        id: 'app - compat',
        short_type: 'mapped',
        label: 'app - compat',
        publishable: true,
        mappings: {
          SEND_AUDIO: sendAudio,
        },
      },
      {...computeAttrs('Aural Audio Classification', ram)},
      {...meteringAttrs(metered)},
    ]
  };
}