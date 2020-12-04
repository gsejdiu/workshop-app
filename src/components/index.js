import React from 'react';
import { withStyles } from "@material-ui/styles"
import Grid from '@material-ui/core/Grid';
import Header from "./header"

const styles = {};


class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes,children} = this.props
    return (
      <div>
        <Grid container justify="center">
          <Grid item lg={12}>
            <Header />
          </Grid>
          <Grid item lg={10}>
            {children}
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default withStyles(styles)(Index);
