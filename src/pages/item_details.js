import React from 'react';
import { withStyles } from "@material-ui/styles"
import Grid from '@material-ui/core/Grid';
import Card from '../components/card'
import Index from "../components/index"
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = {
    root: {
        marginTop: 20,
        marginBottom: 20
    },
    card: {
        marginTop: 40,
        padding: 10
    },
    image: {
        width: "80%",
        align: "center",
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    typo_margin: {
        marginTop: 20,
        fontAlign: 'center'
    },
    copyright: {
        textAlign: 'right',
        fontSize: 12,
        display: 'block',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 300,
    },
    kicker: {
        textAlign: 'center',
        fontSize: 18,
        display: 'block',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 200,
        marginTop: 40,
    }
};



// https://kraken.condenastdigital.de/api/content/item/5f22b8cbf4e55667ea825d01

class Mode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: null
        };

    }

    componentDidMount() {
        const kraken_url = `https://kraken.condenastdigital.de/api/content/item/` + this.props.match.params.id
        fetch(kraken_url)
            .then(result => result.json())
            .then(result => {
                this.setState({ items: result })
            });
    }

    render() {
        let { classes } = this.props
        let { items } = this.state
        return (
            <div>
                <Index>
                    <span className={classes.kicker}>{(items) ? items.item.content.kicker : <Skeleton/>}</span>
                    <Typography variant="h4" align="center">{(items) ? items.item.content.title :  <Skeleton/>}</Typography>
                    { items? (
                        <img className={classes.image} src={items.item.teaser.media.image[0].url}></img>
                    )
                    :(
                        <Skeleton width="100%" height="500px">
                            <div>.</div>
                        </Skeleton>
                    )
                    }
                    <span className={classes.copyright}>{(items) ? '@'+items.item.teaser.media.image[0].custom.copyright :  <Skeleton/>}</span>

                    <pre>{JSON.stringify(this.state.items, undefined, 2)}</pre>
                </Index>

            </div>
        )
    }
}

export default withStyles(styles)(Mode);