import React, {Component} from "react";
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core/styles";

import styles from "./styles";

import contentStyles from '../../../auth-layout/content.styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import addMenuIcon from '../../../../assets/images/add.png';
import DeleteIcon from '@material-ui/icons/Delete';

import CreateItem from '../create-item';

import { getItemList, removeItem, refreshDataList } from "../../../../store/actions/item";

class Item extends Component {
    state = {
        right: false, 
        paginationList: [
            1,2,3,4,5
        ], 
        itemList: {
            data: [], 
            skip: 0, 
            limit: 0, 
            total: 0
        }
    };

    toggleDrawer = (side, open) => () => {
        this.setState({[side]: open});
        if(!open){
            this.props.getItemList(this.state.itemList.skip, this.state.itemList.limit);
        }
    };

    componentDidMount() {
        this.props.getItemList(this.state.itemList.skip, this.state.itemList.limit);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            if(this.props.data.itemAPIData.itemList.data){
                    let totalPages = Math.ceil(this.props.data.itemAPIData.itemList.total/10);
                    let paginationList = [];
                    totalPages = totalPages>5? 5: totalPages;
                    for(let i=1;i<=totalPages;i++){
                        paginationList.push(i);
                    }    
                
                this.setState({
                    ...this.state, 
                    itemList: this.props.data.itemAPIData.itemList,
                    paginationList: this.state.paginationList[this.state.paginationList.length-1]<5 ? paginationList: this.state.paginationList
                });
            }

            if(this.props.data.itemAPIData.itemDeleted){
                this.props.getItemList(this.state.itemList.skip, this.state.itemList.limit);
                this.props.refreshDataList();
            }
        }
    }

    componentWillUnmount() {}

    goToPage = (event) => {
        let skip = (Number(event.target.textContent)-1)*10;
        this.props.getItemList(skip, this.state.itemList.limit);

    };

    prevPage = (event)=>{
        let firstPage = this.state.paginationList[0];
        if(firstPage>1){
            let pageList = [...this.state.paginationList];
            pageList.pop();
            pageList = [(firstPage-1), ...pageList];
            this.setState({
                ...this.state, 
                paginationList: pageList
            });
            this.props.getItemList(((firstPage-2)*10), this.state.itemList.limit);
        }
    }

    nextPage = ()=>{
        let lastPage = this.state.paginationList[this.state.paginationList.length-1];
        let pageList = [...this.state.paginationList];
        pageList.shift();
        pageList.push(lastPage+1);

        this.setState({
            ...this.state, 
            paginationList: pageList
        });

        this.props.getItemList((lastPage*10), this.state.itemList.limit);
    }

    removeItem = (itemId)=>{
        this.props.removeItem(itemId);
    }

    render() {
        const {classes} = this.props;
        const itemList = this.state.itemList.data;

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                        <Button
                            className={classes.right}
                            variant="outlined"
                            size="large"
                            onClick={this.toggleDrawer('right', true)}><img src={addMenuIcon} alt="Add Icon"/>Add Item</Button>
                        <Typography component="p">
                            <span className={classes.pageHeader}>
                                {this.props.data.literalsReducer.ItemManagement.PageHeader}
                            </span>
                            <span className={classes.pageDescription}>
                                {this.props.data.literalsReducer.ItemManagement.PageDescription}
                            </span>
                        </Typography>
                        <Drawer
                            anchor="right"
                            open={this.state.right}
                        >
                            <div tabIndex={0} role="button">
                                <CreateItem close={this.toggleDrawer('right', false)}></CreateItem>
                            </div>
                        </Drawer>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                       
                        <Paper
                            style={{
                            marginTop: '13px'
                        }}>
                            <Grid container>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeader}>Name</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Picture</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Gross</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Average</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Movies</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Total Gross</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Rank</TableCell>
                                            <TableCell className={classes.tableHeader} align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {itemList.map(item => {
                                            return item.composer ? (
                                            <TableRow key={item._id}>
                                                <TableCell component="th" scope="row">
                                                    {item.name+ '(Composer Name)' || ''}
                                                </TableCell>
                                                <TableCell align="right">{item.composer.picture || ''}</TableCell>
                                                <TableCell align="right">{item.composer.gross || ''}</TableCell>
                                                <TableCell align="right">{item.composer.average || ''}</TableCell>
                                                <TableCell align="right">{item.composer.movies || ''}</TableCell>
                                                <TableCell align="right">{item.composer.total_gross || ''}</TableCell>
                                                <TableCell align="right">{item.composer.rank || ''}</TableCell>
                                                <TableCell align="right" onClick={()=>this.removeItem(item._id)}><IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="small" />
        </IconButton></TableCell>
                                            </TableRow>
                                        ): item.actor ? (<TableRow key={item._id}>
                                            <TableCell component="th" scope="row">
                                                    {item.name+ '(Actor Name)' || ''}
                                                </TableCell>
                                                <TableCell align="right">{item.actor.picture || ''}</TableCell>
                                                <TableCell align="right">{item.actor.gross || ''}</TableCell>
                                                <TableCell align="right">{item.actor.average || ''}</TableCell>
                                                <TableCell align="right">{item.actor.movies || ''}</TableCell>
                                                <TableCell align="right">{item.actor.total_gross || ''}</TableCell>
                                                <TableCell align="right">{item.actor.rank || ''}</TableCell>
                                                <TableCell align="right" onClick={()=>this.removeItem(item._id)}><IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="small" />
        </IconButton></TableCell> </TableRow>): item.director ? (
            <TableRow key={item._id}>
            <TableCell component="th" scope="row">
                    {item.name + '(Director Name)' || ''}
                </TableCell>
                <TableCell align="right">{item.director.picture || ''}</TableCell>
                <TableCell align="right">{item.director.gross || ''}</TableCell>
                <TableCell align="right">{item.director.average || ''}</TableCell>
                <TableCell align="right">{item.director.movies || ''}</TableCell>
                <TableCell align="right">{item.director.total_gross || ''}</TableCell>
                <TableCell align="right">{item.director.rank || ''}</TableCell>
                <TableCell align="right" onClick={()=>this.removeItem(item._id)}><IconButton aria-label="delete" className={classes.margin}>
<DeleteIcon fontSize="small" />
</IconButton></TableCell> </TableRow>
        ): item.producer ? (
            <TableRow key={item._id}>
            <TableCell component="th" scope="row">
                    {item.name+ '(Producer Name)' || ''}
                </TableCell>
                <TableCell align="right">{item.producer.picture || ''}</TableCell>
                <TableCell align="right">{item.producer.gross || ''}</TableCell>
                <TableCell align="right">{item.producer.average || ''}</TableCell>
                <TableCell align="right">{item.producer.movies || ''}</TableCell>
                <TableCell align="right">{item.producer.total_gross || ''}</TableCell>
                <TableCell align="right">{item.producer.rank || ''}</TableCell>
                <TableCell align="right" onClick={()=>this.removeItem(item._id)}><IconButton aria-label="delete" className={classes.margin}>
<DeleteIcon fontSize="small" />
</IconButton></TableCell> </TableRow>
        ): item.screenwriter ? ( <TableRow key={item._id}>
            <TableCell component="th" scope="row">
                    {item.name+ '(Screen Writer Name)' || ''}
                </TableCell>
                <TableCell align="right">{item.screenwriter.picture || ''}</TableCell>
                <TableCell align="right">{item.screenwriter.gross || ''}</TableCell>
                <TableCell align="right">{item.screenwriter.average || ''}</TableCell>
                <TableCell align="right">{item.screenwriter.movies || ''}</TableCell>
                <TableCell align="right">{item.screenwriter.total_gross || ''}</TableCell>
                <TableCell align="right">{item.screenwriter.rank || ''}</TableCell>
                <TableCell align="right" onClick={()=>this.removeItem(item._id)}><IconButton aria-label="delete" className={classes.margin}>
<DeleteIcon fontSize="small" />
</IconButton></TableCell> </TableRow>): (<TableRow key={item._id}>
            <TableCell component="th" scope="row">
                    {item.name + '(Cinematographer Name)' || ''} 
                </TableCell></TableRow>);
                                    })
                                    }
                                    </TableBody>
                                </Table>
                                <div style={{width: '100%', padding: '20px',textAlign: 'end'}}>
                                <div className={classes.pagination}>
                                            <div onClick={this.prevPage} className={this.state.paginationList[0] === 1? classes.disabled : ''}>&laquo;</div>
                                            {
                                                this.state.paginationList.map((page)=>(<div key={page+'pg'} onClick={this.goToPage}>{page}</div>))
                                            }
                                            <div onClick={this.nextPage} className={this.state.paginationList[this.state.paginationList.length-1] === 1? classes.disabled : ''}>&raquo;</div>
                                        </div>   
                                    </div>
                                        
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {data: state};
};

const mapDispatchToProps = dispatch => {
    return {
        getItemList: (skip, limit, searchKey) => dispatch(getItemList(skip, limit, searchKey)),
        removeItem: (itemId)=> dispatch(removeItem(itemId)), 
        refreshDataList: ()=> dispatch(refreshDataList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles((theme) => ({
    ...styles(theme),
    ...contentStyles(theme)
}), {withTheme: true})(Item));
