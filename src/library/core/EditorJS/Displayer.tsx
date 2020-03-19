// https://github.com/stfy/react-editor.js
import React from 'react';
import Divider from '@material-ui/core/Divider';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';

export const CeBlock = (props: any) => {
  const { children } = props;
  return (
    <div className="ce-block">
      <div className="ce-block__content">
        {children}
      </div>
    </div>
  );
};

export const CeBlockHeader = (props: any) => {
  const { block: { data: { text, level } } } = props;
  const Component : any = `h${level}`;
  return (
    <Component className="ce-header">
      {text}
    </Component>
  );
};

export const CeBlockParagraph = (props: any) => {
  const { block: { data: { text } } } = props;
  return (
    <div
      className="ce-paragraph cdx-block"
      dangerouslySetInnerHTML={{__html: text}}
    />
  );
};

export const CeBlockList = (props: any) => {
  const { block: { data: { items } } } = props;
  return (
    <ul className="cdx-block cdx-list cdx-list--unordered">
      {
        items.map((item, i) => (
          <li
            key={i}
            className="cdx-list__item"
            dangerouslySetInnerHTML={{__html: item}}
          />
        ))
      }
    </ul>
  );
};

export const CeBlockImage = (props: any) => {
  const { block: { data: {
    file: { url },
    caption,
    withBorder,
    stretched,
    withBackground,
  } } } = props;
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

  return (
    <div className={className}>
      <div
        className="image-tool__image"
        style={{
          position: 'relative',
        }}
      >
        <img
          className="image-tool__image-picture"
          src={url}
        />
        <div className="image-tool__caption" style={{
          position: 'absolute',
          bottom: 0,
          textAlign: 'center',
          width: '100%',
          color: 'white',
          background: 'rgba(0, 0, 0, 0.7)',
        }}>
          {caption}
        </div>
      </div>
    </div>
  );
};

export const CeBlockLink = (props: any) => {
  const { block: { data: {
    link,
    meta: {
      image: {
        url,
      },
      title,
      description,
    },
  } } } = props;

  return (
    <div className="link-tool">
      <a className="link-tool__content link-tool__content--rendered" target="_blank" rel="nofollow noindex noreferrer" href={link}>
        <div className="link-tool__image" style={{ backgroundImage: `url('${url}')` }} />
        <div className="link-tool__title">{title}</div>
        <p className="link-tool__description">{description}</p>
        <span className="link-tool__anchor">{link}</span>
      </a>
    </div>
  );
};

export const CeBlockDelimiter = (props: any) => {
  return (
    <div className="ce-delimiter cdx-block" />
  );
};

export interface WrapperProps {
  data: OutputData;
}

export default (props: WrapperProps) => {
  const { data: { blocks } } = props;
  return (
    <div className="codex-editor codex-editor--narrow">
      <div className="codex-editor__redactor">
        {
          blocks.map((block : any, i) => {
            let content : any = null;
            switch (block.type) {
              case 'header': {
                content = (
                  <CeBlockHeader block={block} />
                );
                break;
              }
              case 'paragraph': {
                content = (
                  <CeBlockParagraph block={block} />
                );
                break;
              }
              case 'list': {
                content = (
                  <CeBlockList block={block} />
                );
                break;
              }
              case 'delimiter': {
                content = (
                  <CeBlockDelimiter block={block} />
                );
                break;
              }
              case 'image': {
                content = (
                  <CeBlockImage block={block} />
                );
                break;
              }
              case 'link': {
                content = (
                  <CeBlockLink block={block} />
                );
                break;
              }
              default:
                break;
            }
            return (
              <CeBlock key={i}>
                {content}
              </CeBlock>
            );
          })
        }
      </div>
    </div>
  );
};
