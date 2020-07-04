/* eslint-disable no-underscore-dangle, no-param-reassign */
import { EventEmitter } from 'events';
import SdaExtension from '../SdaExtension';

const dark = {
  styles: {
    background: {
      fill: 'transparent',
      stroke: '#ffffff', // '#9999ff',
    },
    main: {
      'stroke-width': 1,
      stroke: '#ff00ff', // '#9999ff',
    },
    port: {
      init: {
        fill: '#00ffff',
        stroke: '#ffffff',
        r: 4, // 0,
      },
      normal: {
        fill: '#00ffff',
        stroke: '#ffffff',
        r: 4,
      },
      connecting: {
        fill: '#ffff00',
        stroke: '#ffffff',
        r: 6,
      },
      accepting: {
        fill: '#00ff00',
        stroke: '#ffffff',
        r: 6,
      },
      approaching: {
        fill: '#ff0000',
        stroke: '#ffffff',
        r: 6,
      },
    },
    portLines: {
      type01: {
        normal: {
          'stroke-width': 2,
          'stroke-dasharray': '--..',
          'stroke-linecap': 'round',
          'arrow-end': 'classic-wide-long',
          stroke: '#ffffff',
        },
        dragging: {
          'stroke-width': 2,
          'stroke-dasharray': '--..',
          'stroke-linecap': 'round',
          stroke: '#ffffff',
        },
        connected: {
          'stroke-width': 2,
          'stroke-dasharray': '',
          'stroke-linecap': 'round',
          stroke: '#ffffff',
        },
        selected: {
          stroke: '#00ffff',
        },
        disabled: {
          stroke: '#AAAAAA',
        },
        invalid: {
          stroke: '#ff0000',
        },
      },
      outer: {
        'stroke-width': 16,
        'stroke-linecap': 'round',
        stroke: 'transparent',
      },
    },
    optionGear: {
      fill: '#ffffff',
      stroke: '#000000',
    },
    optionButton: {
      fill: 'transparent',
      stroke: 'transparent',
      cursor: 'pointer',
    },
    optionTargetBBox: {
      'stroke-width': 1,
      'stroke-dasharray': '- ',
      'stroke-linecap': 'round',
      // fill: 'transparent',
      stroke: '#ffffff',
    },
    selected: {
      'stroke-width': 1,
      stroke: '#00ffff',
    },
    disabled: {
      'stroke-width': 1,
      fill: '#333333',
      stroke: '#AAAAAA',
    },
    invalid: {
      'stroke-width': 1,
      stroke: '#ff0000',
    },
  },
};

const light = {
  styles: {
    background: {
      fill: 'transparent',
      stroke: '#000000', // '#9999ff',
    },
    main: {
      'stroke-width': 1,
      stroke: '#ff00ff', // '#9999ff',
    },
    port: {
      init: {
        fill: '#00ffff',
        stroke: '#ffffff',
        r: 4, // 0,
      },
      normal: {
        fill: '#00ffff',
        stroke: '#ffffff',
        r: 4,
      },
      connecting: {
        fill: '#ffff00',
        stroke: '#ffffff',
        r: 6,
      },
      accepting: {
        fill: '#00ff00',
        stroke: '#ffffff',
        r: 6,
      },
      approaching: {
        fill: '#ff0000',
        stroke: '#ffffff',
        r: 6,
      },
    },
    portLines: {
      type01: {
        normal: {
          'stroke-width': 2,
          'stroke-dasharray': '--..',
          'stroke-linecap': 'round',
          'arrow-end': 'classic-wide-long',
          stroke: '#ffffff',
        },
        dragging: {
          'stroke-width': 2,
          'stroke-dasharray': '--..',
          'stroke-linecap': 'round',
          stroke: '#ffffff',
        },
        connected: {
          'stroke-width': 2,
          'stroke-dasharray': '',
          'stroke-linecap': 'round',
          stroke: '#ffffff',
        },
      },
      outer: {
        'stroke-width': 16,
        'stroke-linecap': 'round',
        stroke: 'transparent',
      },
    },
    optionGear: {
      fill: '#000000',
      stroke: '#ffffff',
    },
    optionButton: {
      fill: 'transparent',
      stroke: 'transparent',
      cursor: 'pointer',
    },
    optionTargetBBox: {
      'stroke-width': 1,
      'stroke-dasharray': '- ',
      'stroke-linecap': 'round',
      // fill: 'transparent',
      stroke: '#000000',
    },
    selected: {
      'stroke-width': 1,
      stroke: '#00ffff',
    },
    disabled: {
      'stroke-width': 1,
      fill: '#AAAAAA',
      stroke: '#333333',
    },
    invalid: {
      'stroke-width': 1,
      stroke: '#ff0000',
    },
  },
};

export default class ThemeProvider extends SdaExtension {
  static $name = 'themeProvider';

  static $type = 'extension';

  static $inject = ['builtin'];

  constructor({ paper }) {
    super();
    this.paper = paper;
    this.themes = {
      dark,
      light,
    };
    this.events = new EventEmitter();
  }

  init() {
  }

  getTheme = () => this.themes.dark;

  createExtensionForShape(injectedResult, shape, options) {
    return {
      getTheme: this.getTheme,
      events: this.events,
    };
  }

  destroyExtensionForShape(injectedResult, shape, extensionForShape, options) {
  }

  destroy() {
  }
}
