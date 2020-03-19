import LayoutBase from '~/core/FormLayouts/LayoutBase';

export default class EditableLayoutBase extends LayoutBase {
  static getDerivedStateFromProps(props, prevState) {
    const { isEditing } = props;
    if (!!isEditing !== !!prevState.isEditing) {
      const nextState = {
        ...prevState,
        isEditing,
      };
      return prevState.resetInputLinker(props, nextState);
    }
    return null;
  }
}
