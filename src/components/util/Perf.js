/**
 * 
 */
import {
  InfluxDB,
  FieldType
} from 'influx';
import os from 'os';
import {
  influxDbConfig,
  metricsSwitchOn
} from 'app.config';

const urlInflux = new InfluxDB(Object.assign({}, influxDbConfig, {
  schema: [
    {
      measurement: 'response_times',
      tags: [
        'host',
        'url',
        'component'
      ],
      fields: {
        db: FieldType.STRING,
        value: FieldType.FLOAT,
        tag: FieldType.STRING,
        metrics_name: FieldType.STRING
      }
    }
  ]
}));

const componentInflux = new InfluxDB(Object.assign({}, influxDbConfig, {
  schema: [
    {
      measurement: 'update_times',
      tags: [
        'host',
        'url',
        'component'
      ],
      fields: {
        db: FieldType.STRING,
        value: FieldType.FLOAT,
        tag: FieldType.STRING,
        metrics_name: FieldType.STRING
      }
    }
  ]
}));

export default {
  perfKeys: {},
  start(key) {
    this.perfKeys[key] = window.performance.now();
  },
  stop(key) {
    const cost = window.performance.now() - this.perfKeys[key];
    return cost.toFixed(2);
  },
  writeInflux(urlOrg, componentOrg, value) {
    if (!metricsSwitchOn) {
      return;
    }
    const influx = urlOrg ? urlInflux : componentInflux;
    const measurement = urlOrg ? 'response_times' : 'update_times';

    const url = urlOrg || 'component_update';
    const component = componentOrg || 'request';
    influx.writePoints([
      {
        measurement,
        tags: {
          host: os.hostname(),
          url,
          component
        },
        fields: {
          value,
          metrics_name: `fe.${url ? 'url' : 'component'}.time`
        }
      }
    ]);
  }
};
