import React, {Component} from "react";
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core/styles";

import contentStyles from '../../../auth-layout/content.styles';

import styles from './styles';

import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';

import cancel from '../../../../assets/images/cancel.png';

import {createItem} from "../../../../store/actions/item";


class CreateItem extends Component {
    state = {
        item: {
            name: '',
            picture: '',
            gross: 0,
            average: 0,
            movies: 0,
            total_gross: 0,
            rank: 0
        },
        createItemProcessing: false,
        errors: {}
    };

    handleChange = event => {
        let item = this.state.item;
        if (event.target.name === 'gross' || event.target.name === 'total_gross' || event.target.name === 'average'|| event.target.name === 'movies' || event.target.name === 'rank') {
            item[event.target.name] = Number(event.target.value);
        } else {
            item[event.target.name] = event.target.value;
        }
        this.setState({
            ...this.state,
            item
        });
    }


    itemValidation = () => {
        let error = false;
        let errors = {
            ...this.state.errors
        };
        // eslint-disable-next-line
        for (let eachitem in this.state.item) { 
            error = false;
            if (!this.state.item[eachitem] && eachitem !== 'itemImage' && eachitem!=='createItemProcessing') {
                error = true;
            }
            errors[eachitem] = error;
        }
        this.setState({
            ...this.state,
            errors: {
                ...errors
            }
        });
        if (!Object.keys(errors).some(each => errors[each])) {
            return true;
        } else {
            return false;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            if(this.props.data.itemAPIData.itemCreated){
                this.setState({
                    item: {
                        name: '',
                        picture: '',
                        gross: 0,
                        rank: 0,
                        total_gross: 0,
                        movies: 0,
                        average: 0
                    },
                    errors: {},
                    createItemProcessing: false
                });
                this.props.close();
            }   
        }
    }

    componentWillUnmount() {}

    saveHandler = () => {
        
        if (this.itemValidation()) {
            let composer ={...this.state.item};
            delete composer.name;
           let itemPayload = {
               name: this.state.item.name,
               '__v': 0,
               composer: composer
           };
            this
                .props
                .createItem(itemPayload);
            this.setState({
                ...this.state,
                createItemProcessing: true
            });
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Paper className={classes.rightPaper}>
                    <Button onClick={this.props.close} className={classes.cancel}>
                        <img src={cancel} alt="Cancel"/>
                    </Button>
                    <h2 className={classes.title}>
                        Add Item
                    </h2>
                    <p className={classes.description}>
                        Item
                    </p>
                    <TextField
                        id="menu-name"
                        label="Item Name"
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        name="name"
                        value={this.state.item.name || ''}
                        onChange={this.handleChange}
                        error={this.state.errors.name
                        ? true
                        : false}/>
                    
                    <p className={classes.description}>
                        Composer
                    </p>
                    <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                            <TextField
                                id="picture"
                                label="Picture"
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                name="picture"
                                value={this.state.item.picture || ''}
                                onChange={this.handleChange}
                                error={this.state.errors.picture
                                ? true
                                : false}/>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="gross"
                                label="Gross"
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                name="gross"
                                
                                
                                value={this.state.item.gross || ''}
                                onChange={this.handleChange}
                                error={this.state.errors.gross
                                ? true
                                : false}/>

                        </Grid>
                        
                        </Grid>
                        <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="average"
                                label="Average"
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                name="average"
                                
                                
                                value={this.state.item.average || ''}
                                onChange={this.handleChange}
                                error={this.state.errors.average
                                ? true
                                : false}/>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="movies"
                                label="Movies"
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                name="movies"
                                
                                
                                value={this.state.item.movies || ''}
                                onChange={this.handleChange}
                                error={this.state.errors.movies
                                ? true
                                : false}/>

                        </Grid>
                       
                        </Grid>
                        <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="total_gross"
                                label="Total Gross"
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                name="total_gross"
                                
                                
                                value={this.state.item.total_gross || ''}
                                onChange={this.handleChange}
                                error={this.state.errors.total_gross
                                ? true
                                : false}/>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="rank"
                                label="Rank"
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                name="rank"
                                
                                
                                value={this.state.item.rank || ''}
                                onChange={this.handleChange}
                                error={this.state.errors.rank
                                ? true
                                : false}/>

                        </Grid>
                    </Grid>
                  
                    
                    <div className={classes.actionContainer}>
                        <Button
                            size="large"
                            color="primary"
                            variant="outlined"
                            className={classes.customMargin}
                            onClick={this.saveHandler}
                            disabled={this.state.createItemProcessing}
                            disableFocusRipple={this.state.createItemProcessing}
                            >
                            Save
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {data: state};
};

const mapDispatchToProps = dispatch => {
    return {
        createItem: (payload) => dispatch(createItem(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles((theme) => ({
    ...styles(theme),
    ...contentStyles(theme)
}), {withTheme: true})(CreateItem));
