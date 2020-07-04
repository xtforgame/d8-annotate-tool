/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';

class SelectionGroup {
  constructor(selectionManager, groupName, options = {}) {
    this.selectionManager = selectionManager;
    this.paper = this.selectionManager.paper;
    this.name = groupName;
    this.id = this.paper.createUID();

    this.selection = [];
    this.selectables = [];

    this.getSelectables = (() => [...this.selectables]);

    this.paper.events.emit('onSelectablesChange', {
      groupName: this.name,
      prevSelectables: [],
      selectables: this.selectables,
    }, {});
  }

  getSelectables = () => this.selectables;

  addSelectables = (shapes, eventOptions = {}) => {
    const prevSelectables = this.selectables;
    this.selectables = [...this.selectables, ...shapes];
    this.paper.events.emit('onSelectablesChange', {
      groupName: this.name,
      prevSelectables,
      selectables: this.selectables,
    }, eventOptions);
  };

  setSelectables = (shapes, eventOptions = {}) => {
    const prevSelectables = this.selectables;
    this.selectables = [...shapes];
    this.paper.events.emit('onSelectablesChange', {
      groupName: this.name,
      prevSelectables,
      selectables: this.selectables,
    }, eventOptions);
  };

  removeSelectables = (s, eventOptions = {}) => {
    let shapes = s;
    if (!Array.isArray(shapes)) {
      shapes = [s];
    }

    const newSelectables = [...this.selectables];
    const newSelection = [...this.selection];
    let shouldUpdateSelectables = false;
    let shouldUpdateSelection = false;
    const result = shapes.map((shape) => {
      let retval;
      const index = newSelectables.findIndex(sh => sh.id === shape.id);
      if (index !== -1) {
        shouldUpdateSelectables = true;
        const shape = newSelectables[index];
        retval = shape;
        newSelectables.splice(index, 1);

        const selectedId = newSelection.indexOf(shape);
        if (selectedId !== -1) {
          shouldUpdateSelection = true;
          newSelection.splice(selectedId, 1);
        }
      }
      return retval;
    });
    if (shouldUpdateSelection) {
      this.setSelection(newSelection, eventOptions);
    }
    if (shouldUpdateSelectables) {
      this.setSelectables(newSelectables, eventOptions);
    }
    return result;
  };

  getSelection = () => this.selection;

  setSelection = (selection = [], eventOptions = {}) => {
    this.selection.map(i => i.setSelected(false));
    this.selection = [];
    this.selection.push(...selection);
    this.selection.map(i => i.setSelected());
    console.log('selection :', this.selection);
    this.paper.events.emit('onSelectionChange', { selection: [...this.selection] }, eventOptions);
    this.paper.events.emit('onSelectedIdsChange', { selectedIds: this.selection.map(s => s.id) }, eventOptions);
  }

  isSelected(shape) {
    return this.getSelection().includes(shape);
  }

  setSelectionByIds(ids = [], eventOptions = {}) {
    const selection = [];
    this.getSelectables().forEach((shape) => {
      if (ids.includes(shape.id)) {
        selection.push(shape);
        shape.toFront();
      }
    });
    this.setSelection(selection, eventOptions);
  }
}

export default class SelectionManager extends SdaExtension {
  static $name = 'selectionManager';

  static $type = 'extension';

  static $inject = ['builtin'];

  constructor({ paper }, options = {}) {
    super();
    this.paper = paper;
    this.groupsById = {};
    this.groupsByName = {};
  }

  createGruop(...args) {
    const newGruop = new SelectionGroup(this, ...args);
    this.groupsById[newGruop.id] = newGruop;
    this.groupsByName[newGruop.name] = newGruop;
  }

  setCurrentGroup = groupName => (this.currentGroupName = groupName);

  tryGetGroup = groupName => this.groupsByName[groupName || this.currentGroupName];

  getGroup = (groupName) => {
    const group = this.tryGetGroup(groupName);
    if (!group) {
      throw new Error(`Selection group not found ('${groupName}')`);
    }
    return group;
  };

  getSelectables = groupName => this.getGroup(groupName).getSelectables();

  addSelectables = (shapes, groupNames, eventOptions) => {
    let s = shapes;
    let gns = groupNames;
    if (!s) {
      throw new Error('No shapes provided');
    }
    if (!groupNames) {
      throw new Error('No groupNames provided');
    }
    if (!Array.isArray(s)) {
      s = [s];
    }
    if (!Array.isArray(gns)) {
      gns = [gns];
    }
    gns.map(groupName => this.getGroup(groupName).addSelectables(s, eventOptions));
  };

  setSelectables = (
    shapes, groupName, eventOptions
  ) => this.getGroup(groupName).setSelectables(shapes, eventOptions);

  removeSelectables = (
    shapes, groupName, eventOptions
  ) => this.getGroup(groupName).removeSelectables(shapes, eventOptions);

  getSelection = groupName => this.getGroup(groupName).getSelection();

  setSelection = (
    selection = [], groupName, eventOptions
  ) => this.getGroup(groupName).setSelection(selection, eventOptions);

  isSelected = (shape, groupName) => this.getGroup(groupName).isSelected(shape);

  setSelectionByIds = (
    ids = [], groupName, eventOptions
  ) => this.getGroup(groupName).setSelectionByIds(ids, eventOptions)

  // ========================================

  init() {}

  destroy() {}
}
