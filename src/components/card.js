import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom"

const styles = ({
    root: {
    },
    action_area: {
        minHeight: 180
    },
    media: {
        height: 200,
    },
    nav_link: {
        textDecoration: "none"
    }
})
class CustomCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { classes, abstract, kicker, image, cardlink } = this.props
        return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title="Contemplative Reptile"
                        />
                        <CardContent className={classes.action_area}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {kicker}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {abstract}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
        )

    }
}

export default withStyles(styles)(CustomCard)