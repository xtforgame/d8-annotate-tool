/* eslint-disable no-underscore-dangle, no-param-reassign */
import Azldi from 'azldi';

import EventEmitter from './EventEmitterEx';
import Rect from './shapes/Rect';
import Path from './shapes/Path';
import Image from './shapes/Image';
// import Set from './shapes/Set';

import Builtin from './extensions/Builtin';

function makeid() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
export default class SdaPaper {
  constructor(options = {}, ...rest) {
    this.createUID = makeid;
    this.layoutOrientation = options.layoutOrientation || 'rtl'; // 'rtl': left-to-right, 'ttd': top-to-bottom
    this.rphPaperElem = options.rphPaperElem;
    this.rphPaper = Raphael(...rest); // eslint-disable-line no-undef

    // https://stackoverflow.com/questions/22300062/svg-and-parent-height-of-svg-different
    this.rphPaper.canvas.style.display = 'block';

    this.shapeMap = {};
    this.extensions = new Azldi();
    this.ext = {};
    this.extensionClasses = [Builtin];

    this.events = new EventEmitter();
    this.internalEvents = new EventEmitter();
  }

  init() {
    this.setupExtensions();
    this.internalEvents.addGlobalListener(this.globalInternalListener);
    this.events.addGlobalListener(this.globalListener);
  }

  globalListener = (...args) => {
    this.internalEvents.emit(...args);
  }

  globalInternalListener = (...args) => {
    // console.log('GlobalListener :', ...args);
  }

  setupExtensions() {
    this.extensions.register(this.extensionClasses);
    this.extensions.digest({
      onCreate: ({ result, classInfo: { name } }) => {
        this.ext[name] = result;
      },
      appendArgs: {
        builtin: [this],
      },
    });
    this.extensions.run('init', []);
  }

  setupExtensionsForShape(shape, options = {}) {
    if (options.managed !== false) {
      this.shapeMap[shape.uid] = shape;
    }
    /* const insts = */ this.extensions.run('createExtensionForShape', [shape, options], {
      onResult: ({ result, classInfo: { name } }) => {
        if (result) {
          shape.ext[name] = result;
        }
      },
      appendArgs: {},
    });
    // insts.forEach((inst, i) => {
    //   if (inst) {
    //     shape.ext[this.extensionClasses[i].$name] = inst;
    //   }
    // });
    shape.init();
    // console.log('shape.ext :', shape.ext);
  }

  rect(args, options = {}, eventOptions = {}) {
    const shape = new Rect(this, options.uid || this.createUID(), args, options);
    this.setupExtensionsForShape(shape);
    this.events.emit('onShapeCreate', {
      shape,
    }, eventOptions);
    return shape;
  }

  path(args, options = {}, eventOptions = {}) {
    const shape = new Path(this, options.uid || this.createUID(), args, options);
    this.setupExtensionsForShape(shape);
    this.events.emit('onShapeCreate', {
      shape,
    }, eventOptions);
    return shape;
  }

  image(args, options = {}, eventOptions = {}) {
    const shape = new Image(this, options.uid || this.createUID(), args, options);
    this.setupExtensionsForShape(shape);
    this.events.emit('onShapeCreate', {
      shape,
    }, eventOptions);
    return shape;
  }

  // set(args, options = {}) {
  //   const shape = new Set(this, options.uid || this.createUID(), args, options);
  //   this.setupExtensionsForShape(shape);
  //   return shape;
  // }

  setSize(width, height, eventOptions = {}) {
    this.rphPaper.setSize(width, height);
    this.internalEvents.emit('onSizeChange', { width, height }, eventOptions);
  }

  findShapeByUid(uid) {
    return this.shapeMap[uid];
  }

  destroyExtensionsForShape(shape, options) {
    const appendArgs = {};
    Object.keys(shape.ext).forEach((key) => {
      appendArgs[key] = [shape, shape.ext[key], options];
    });
    this.extensions.run('destroyExtensionForShape', [], {
      // onResult: ({ result, classInfo: { name } }) => {
      //   if (result) {
      //     shape.ext[name] = result;
      //   }
      // },
      appendArgs,
    });
    shape.ext = {};
  }

  removeShape(shape) {
    if (!shape.removed) {
      this.destroyExtensionsForShape(shape);
    }
    if (this.shapeMap[shape.uid]) {
      delete this.shapeMap[shape.uid];
    }
  }

  remove() {
    Object.keys(this.shapeMap).forEach((uid) => {
      if (this.shapeMap[uid]) {
        this.shapeMap[uid].remove();
      }
    });
    this.extensions.run('destroy');
    this.events.removeGlobalListener(this.globalListener);
    this.internalEvents.removeGlobalListener(this.globalInternalListener);
    this.rphPaper.remove();
  }
}
