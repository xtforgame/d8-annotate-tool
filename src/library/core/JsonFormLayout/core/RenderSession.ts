/* eslint-disable no-param-reassign */
import { IFieldLink, IInputLinker, IlHost } from '~/utils/InputLinker/core/interfaces';

export default class RenderSession<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> {
  parent : RenderSession<FieldLink, LinkerType> | void;
  name : any;
  linker : LinkerType;
  host : IlHost;
  state : string;
  options : any;
  prevRenderSession : RenderSession<FieldLink, LinkerType> | void;
  [s : string] : any;

  constructor(
    parent : RenderSession<FieldLink, LinkerType> | void,
    name : any,
    linker : LinkerType,
    host : IlHost,
    options : any = {},
  ) {
    this.parent = parent;
    this.name = name;
    this.linker = linker;
    this.host = host;
    this.state = 'rendering';
    this.prevRenderSession = options.prevRenderSession;
  }

  beforeRender() {
    // console.log('RenderSession.beforeRender()');
    if (this.host.props.rsBeforeRender) {
      this.host.props.rsBeforeRender(this);
    }
  }

  afterRender() {
    // console.log('RenderSession.afterRender()');
    if (this.host.props.rsAfterRender) {
      this.host.props.rsAfterRender(this);
    }
  }
}

export type RsEventHandler<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (rs : RenderSession<FieldLink, LinkerType>) => any;

export type RsBeforeRender<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = RsEventHandler<FieldLink, LinkerType>;

export type RsAfterRender<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = RsEventHandler<FieldLink, LinkerType>;
