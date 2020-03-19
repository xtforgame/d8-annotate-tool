"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CeBlockDelimiter = exports.CeBlockLink = exports.CeBlockImage = exports.CeBlockList = exports.CeBlockParagraph = exports.CeBlockHeader = exports.CeBlock = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CeBlock = props => {
  const {
    children
  } = props;
  return _react.default.createElement("div", {
    className: "ce-block"
  }, _react.default.createElement("div", {
    className: "ce-block__content"
  }, children));
};

exports.CeBlock = CeBlock;

const CeBlockHeader = props => {
  const {
    block: {
      data: {
        text,
        level
      }
    }
  } = props;
  const Component = `h${level}`;
  return _react.default.createElement(Component, {
    className: "ce-header"
  }, text);
};

exports.CeBlockHeader = CeBlockHeader;

const CeBlockParagraph = props => {
  const {
    block: {
      data: {
        text
      }
    }
  } = props;
  return _react.default.createElement("div", {
    className: "ce-paragraph cdx-block",
    dangerouslySetInnerHTML: {
      __html: text
    }
  });
};

exports.CeBlockParagraph = CeBlockParagraph;

const CeBlockList = props => {
  const {
    block: {
      data: {
        items
      }
    }
  } = props;
  return _react.default.createElement("ul", {
    className: "cdx-block cdx-list cdx-list--unordered"
  }, items.map((item, i) => _react.default.createElement("li", {
    key: i,
    className: "cdx-list__item",
    dangerouslySetInnerHTML: {
      __html: item
    }
  })));
};

exports.CeBlockList = CeBlockList;

const CeBlockImage = props => {
  const {
    block: {
      data: {
        file: {
          url
        },
        caption,
        withBorder,
        stretched,
        withBackground
      }
    }
  } = props;
  let className = 'cdx-block image-tool image-tool--filled';

  if (withBorder) {
    className += ' image-tool--withBorder';
  }

  if (stretched) {
    className += ' image-tool--stretched';
  }

  if (withBackground) {
    className += ' image-tool--withBackground';
  }

  return _react.default.createElement("div", {
    className: className
  }, _react.default.createElement("div", {
    className: "image-tool__image",
    style: {
      position: 'relative'
    }
  }, _react.default.createElement("img", {
    className: "image-tool__image-picture",
    src: url
  }), _react.default.createElement("div", {
    className: "image-tool__caption",
    style: {
      position: 'absolute',
      bottom: 0,
      textAlign: 'center',
      width: '100%',
      color: 'white',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  }, caption)));
};

exports.CeBlockImage = CeBlockImage;

const CeBlockLink = props => {
  const {
    block: {
      data: {
        link,
        meta: {
          image: {
            url
          },
          title,
          description
        }
      }
    }
  } = props;
  return _react.default.createElement("div", {
    className: "link-tool"
  }, _react.default.createElement("a", {
    className: "link-tool__content link-tool__content--rendered",
    target: "_blank",
    rel: "nofollow noindex noreferrer",
    href: link
  }, _react.default.createElement("div", {
    className: "link-tool__image",
    style: {
      backgroundImage: `url('${url}')`
    }
  }), _react.default.createElement("div", {
    className: "link-tool__title"
  }, title), _react.default.createElement("p", {
    className: "link-tool__description"
  }, description), _react.default.createElement("span", {
    className: "link-tool__anchor"
  }, link)));
};

exports.CeBlockLink = CeBlockLink;

const CeBlockDelimiter = props => {
  return _react.default.createElement("div", {
    className: "ce-delimiter cdx-block"
  });
};

exports.CeBlockDelimiter = CeBlockDelimiter;

var _default = props => {
  const {
    data: {
      blocks
    }
  } = props;
  return _react.default.createElement("div", {
    className: "codex-editor codex-editor--narrow"
  }, _react.default.createElement("div", {
    className: "codex-editor__redactor"
  }, blocks.map((block, i) => {
    let content = null;

    switch (block.type) {
      case 'header':
        {
          content = _react.default.createElement(CeBlockHeader, {
            block: block
          });
          break;
        }

      case 'paragraph':
        {
          content = _react.default.createElement(CeBlockParagraph, {
            block: block
          });
          break;
        }

      case 'list':
        {
          content = _react.default.createElement(CeBlockList, {
            block: block
          });
          break;
        }

      case 'delimiter':
        {
          content = _react.default.createElement(CeBlockDelimiter, {
            block: block
          });
          break;
        }

      case 'image':
        {
          content = _react.default.createElement(CeBlockImage, {
            block: block
          });
          break;
        }

      case 'link':
        {
          content = _react.default.createElement(CeBlockLink, {
            block: block
          });
          break;
        }

      default:
        break;
    }

    return _react.default.createElement(CeBlock, {
      key: i
    }, content);
  })));
};

exports.default = _default;