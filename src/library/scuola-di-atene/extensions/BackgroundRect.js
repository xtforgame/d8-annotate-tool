/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';

export default class BackgroundRect extends SdaExtension {
  static $name = 'backgroundRect';

  static $type = 'extension';

  static $inject = ['builtin', 'themeProvider'];

  constructor({ paper }, themeProvider) {
    super();
    this.paper = paper;
    this.rphPaper = this.paper.rphPaper;
    this.themeProvider = themeProvider;
  }

  init() {
    this.detectArea = this.paper.rect(
      [0, 0, this.rphPaper.width, this.rphPaper.height],
      { id: 'bgDetectArea' }
    )
    .toBack();
    this.onThemeChange();

    this.paper.internalEvents.addListener('onSizeChange', this.onSizeChange);
  }

  onThemeChange = (_theme) => {
    const theme = _theme || this.themeProvider.getTheme();
    if (this.detectArea) {
      this.detectArea.attr(theme.styles.background);
    }
  }

  onSizeChange = ({ width, height }) => {
    if (this.detectArea) {
      this.detectArea.attr({
        width,
        height,
      });
    }
  }

  getDetectArea = () => this.detectArea;

  destroy() {
    this.paper.internalEvents.removeListener('onSizeChange', this.onSizeChange);
    if (this.detectArea) {
      this.detectArea.remove();
      this.detectArea = null;
    }
  }
}
