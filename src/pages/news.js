import React from 'react';
import { withStyles } from "@material-ui/styles"
import Grid from '@material-ui/core/Grid';
import Card from '../components/card'
import Index from "../components/index"
import mode_service from "../service/news.json"
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';
import { NavLink } from "react-router-dom"
import Chip from '@material-ui/core/Chip';

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
    },
    nav_link: {
        textDecoration: "none",
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    active_card: {
        backgroundColor: '#e3e3e3'
    }
};

class Mode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active_article: null,
            active_item: { control: { uid: -1 } },
            is_open: false,
        }
        this.myRef = React.createRef();
    }


    switchArticle = (item) => {
        let { active_item, is_open } = this.state
        if (item.control.uid == active_item.control.uid) {
            if (is_open) {
                this.setState({ is_open: false })
            }
            else {
                this.setState({ is_open: true })
            }
        }
        else {
            const kraken_url = `https://kraken.condenastdigital.de/api/content/item/` + item.control.uid;
            fetch(kraken_url)
                .then(result => result.json())
                .then(result => {
                    this.setState({ active_article: result, active_item: item, is_open: true });
                    window.scrollTo(0, this.myRef.current.offsetTop);

                });

        }
    }

    render() {
        let { classes, loading = false } = this.props
        let { active_article, active_item, is_open } = this.state
        let upItems = []
        let downItems = []
        let first_part = true
        mode_service.items.forEach(item => {
            if (first_part) {
                upItems.push(item)
            }
            else {
                downItems.push(item)
            }
            if (active_item.control.uid == item.control.uid) {
                first_part = false
            }
        })
        return (
            <div>

                <Index>
                    <Grid className={classes.root} container>
                        {
                            upItems.map(item => {
                                if (item.control.uid == active_item.control.uid) {
                                    return (
                                        <Grid className={classes.card} item lg={3} onClick={() => this.switchArticle(item)}>
                                            <Card classes={{ root: classes.active_card }} kicker={item.teaser.kicker} image={item.teaser.media.image[0].url} abstract={item.teaser.abstract} ></Card>
                                        </Grid>
                                    )
                                }
                                else {
                                    return (
                                        <Grid className={classes.card} item lg={3} onClick={() => this.switchArticle(item)}>
                                            <Card kicker={item.teaser.kicker} image={item.teaser.media.image[0].url} abstract={item.teaser.abstract} ></Card>
                                        </Grid>
                                    )
                                }


                            })
                        }
                        <div ref={this.myRef}></div>
                        {is_open &&
                            <Grid item lg={12}>
                                <span className={classes.kicker}>{(active_article) ? active_article.item.content.kicker : <Skeleton />}</span>
                                <Typography variant="h4" align="center">{(active_article) ? active_article.item.content.title : <Skeleton />}</Typography>
                                {active_article ? (
                                    <img className={classes.image} src={active_article.item.teaser.media.image[0].url}></img>
                                )
                                    : (
                                        <Skeleton width="100%" height="500px">
                                            <div>.</div>
                                        </Skeleton>
                                    )
                                }
                                <span className={classes.copyright}>{(active_article) ? '@' + active_article.item.teaser.media.image[0].custom.copyright : <Skeleton />}</span>
                                <NavLink className={classes.nav_link} to={'item/' + active_item.control.uid}>
                                    <Chip style={{ cursor: 'pointer' }} label="Read the full article" variant="outlined" />
                                </NavLink>
                                <hr></hr>
                            </Grid>
                        }
                        {
                            downItems.map(item => {
                                return (
                                    <Grid className={classes.card} item lg={3} onClick={() => this.switchArticle(item)}>
                                        <Card kicker={item.teaser.kicker} image={item.teaser.media.image[0].url} abstract={item.teaser.abstract} ></Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Index>
            </div>
        )
    }
}

export default withStyles(styles)(Mode);