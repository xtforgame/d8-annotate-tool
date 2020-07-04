/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';
import EventEmitter from '../EventEmitterEx';

/*
  change: {
    callArgs: [...],
    state: {},
    redo: <func>,
    undo: <func>,
    sequence: <sequence>,
  }
*/

/*
  sequence: {
    changes: [<change>],
  }
*/

/*
  cmdResult = {
    change: <change>,
  }
*/

export default class CommandManager extends SdaExtension {
  static $name = 'commandManager';

  static $type = 'extension';

  static $inject = ['builtin'];

  constructor({ paper }) {
    super();
    this.paper = paper;
    this.cmds = {};
    this.currentSequenceIndex = -1;
    this.changeSequences = [];
    this.events = new EventEmitter();
  }

  // ========================================

  withNewSequence(name, cb = () => undefined) {
    const sequence = { name, changes: [] };
    if (this.currentSequenceIndex + 1 < this.changeSequences.length) {
      // discard changes
      this.changeSequences = this.changeSequences.slice(0, this.currentSequenceIndex + 1);
    }
    this.changeSequences.push(sequence);
    this.currentSequenceIndex++;
    cb(sequence);
    this.events.emit('onSequenceChange', {
      type: 'add',
      sequence,
      sequences: this.changeSequences,
      sequenceIndex: this.currentSequenceIndex,
      currentIndex: this.currentSequenceIndex,
    });
    return sequence;
  }

  addChange(change, sequence) {
    change.sequence = sequence;
    sequence.changes.push(change);
  }

  redo(...redoArgs) {
    if (this.currentSequenceIndex + 1 < this.changeSequences.length) {
      const sequence = this.changeSequences[this.currentSequenceIndex + 1];
      sequence.changes.map(
        change => (change.state = change.redo({ ...change, redoArgs, isRedoing: true }))
      );
      this.currentSequenceIndex++;
      this.events.emit('onSequenceChange', {
        type: 'redo',
        sequence,
        sequences: this.changeSequences,
        sequenceIndex: this.currentSequenceIndex,
        currentIndex: this.currentSequenceIndex,
      });
    }
  }

  undo(...undoArgs) {
    if (this.currentSequenceIndex !== -1) {
      const sequence = this.changeSequences[this.currentSequenceIndex];
      [...sequence.changes].reverse().map(
        change => (change.state = change.undo({ ...change, undoArgs, isUndoing: true }))
      );
      this.currentSequenceIndex--;
      this.events.emit('onSequenceChange', {
        type: 'undo',
        sequence,
        sequences: this.changeSequences,
        sequenceIndex: this.currentSequenceIndex + 1,
        currentIndex: this.currentSequenceIndex,
      });
    }
  }

  setCommandToIndex(index) {
    if (index < this.currentSequenceIndex) {
      while (index < this.currentSequenceIndex) {
        this.undo();
      }
    } else {
      while (index > this.currentSequenceIndex) {
        this.redo();
      }
    }
  }

  addCommand = (commandName, func) => {
    this.cmds[commandName] = (args = [], options = {}) => {
      // const sequence = options.sequence || this.withNewSequence(commandName);
      const cmdResult = func(args, options);
      const { change } = cmdResult;
      if (change) {
        const withSequenceCb = (sequence) => {
          change.state = change.state || {};
          change.callArgs = [...args];
          change.callOptions = { ...options };
          this.addChange(change, sequence);
          // this.undo();
          // this.redo();
        };
        if (options.sequence) {
          withSequenceCb(options.sequence);
        } else {
          this.withNewSequence(commandName, withSequenceCb);
        }
      }
      this.events.emit('onCommandRun', {
        commandName,
        args,
        options,
        cmdResult,
      });
      return cmdResult;
    };
  }

  // ========================================

  globalListener = (eventName, data, eventOptions) => {
    // console.log('eventName, data, eventOptions :', eventName, data, eventOptions);
  }

  init() {
    this.paper.events.addGlobalListener(this.globalListener);
  }

  createExtensionForShape(injectedResult, shape, options) {
    return {
      // getStateChanges: () => this.changeSequences,
    };
  }

  destroyExtensionForShape(injectedResult, shape, extensionForShape, options) {
  }

  destroy() {
    this.paper.events.removeGlobalListener(this.globalListener);
  }
}
