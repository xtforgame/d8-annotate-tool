export default theme => ({
  mobileContentPlaceholder: {
    height: 0, // 40,
  },
  mobielContainer: {
    width: '100%',
    flex: 1,
    overflowY: 'hidden',
    flexDirection: 'column',
    display: 'flex',
  },
  mobileContent: {
    paddingRight: 8,
    paddingLeft: 8,
    flex: 1,
    height: 1,
    overflowY: 'scroll',
  },
});
