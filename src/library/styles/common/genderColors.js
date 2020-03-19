import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import amber from '@material-ui/core/colors/amber';

export default theme => ({
  unknownColor: {
    backgroundColor: grey[400],
  },
  femaleColor: {
    backgroundColor: pink[400],
  },
  maleColor: {
    backgroundColor: blue[400],
  },
  otherColor: {
    backgroundColor: amber[400],
  },
});
