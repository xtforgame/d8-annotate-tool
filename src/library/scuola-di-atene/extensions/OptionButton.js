/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';

const buttonSize = 20;
const buttonSpace = 8;

export default class OptionButton extends SdaExtension {
  static $name = 'optionButton';

  static $type = 'extension';

  static $inject = ['builtin', 'themeProvider'];

  constructor({ paper }, themeProvider) {
    super();
    this.paper = paper;
    this.rphPaper = this.paper.rphPaper;
    this.themeProvider = themeProvider;
    this.target = null;
  }

  init() {
    this.optionButton = this.paper.rect(
      [0, 0, buttonSize, buttonSize],
      { id: 'optionButton' }
    );

    this.optionGear = this.paper.path(
      ['M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z'],
      { id: 'optionGear' }
    );

    this.optionTargetBBox = this.paper.rect(
      [0, 0, 0, 0],
      { id: 'optionTargetBBox' }
    );
    this.onThemeChange();

    this._updateOptionButton();

    this.paper.events.addListener('onSelectionChange', this.onSelectionChange);
    this.paper.events.addListener('onComponentMove', this.onComponentMove);
    this.optionButton.click(() => {
      this.paper.events.emit('onOptionButtonClick', { ext: this, target: this.target });
    });
  }

  getAnchorNode = () => this.optionButton.rphRef.node;

  onThemeChange = (_theme) => {
    const theme = _theme || this.themeProvider.getTheme();
    if (this.optionButton) {
      this.optionButton.attr(theme.styles.optionButton);
      this.optionGear.attr(theme.styles.optionGear);
      this.optionTargetBBox.attr(theme.styles.optionTargetBBox);
    }
  }

  _updateOptionButton() {
    this.paper.events.emit('onOptionButtonTargetChange', { ext: this, target: this.target });
    if (this.target) {
      this.optionTargetBBox.toFront();
      this.optionGear.toFront();
      this.optionButton.toFront();
      const {
        x, y, width, height,
      } = this.target.getBBox();

      this.optionTargetBBox.attr({
        x: x - buttonSpace,
        y: y - buttonSpace,
        width: width + (buttonSpace * 2),
        height: height + (buttonSpace * 2),
      });
      this.optionTargetBBox.show();

      this.optionGear.attr({ transform: ['t', x + width + buttonSpace, y - buttonSpace - buttonSize] });
      this.optionGear.show();

      this.optionButton.attr({ x: x + width + buttonSpace, y: y - buttonSpace - buttonSize });
      this.optionButton.show();
    } else {
      this.optionGear.hide();
      this.optionButton.hide();
      this.optionTargetBBox.hide();
    }
  }

  updateOptionButton(shape) {
    if (this.target === shape) {
      this._updateOptionButton();
    }
  }

  onSelectionChange = ({ selection }) => {
    [this.target] = selection;
    this._updateOptionButton();
  }

  onComponentMove = ({ shape }) => {
    this.updateOptionButton(shape)
  }

  destroy() {
    this.paper.events.removeListener('onSelectionChange', this.onSelectionChange);
    this.paper.events.removeListener('onComponentMove', this.onComponentMove);
    if (this.optionButton) {
      this.optionGear.remove();
      this.optionGear = null;
      this.optionButton.remove();
      this.optionButton = null;
      this.optionTargetBBox.remove();
      this.optionTargetBBox = null;
    }
  }
}
