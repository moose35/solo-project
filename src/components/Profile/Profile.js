import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

//material-ui imports
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import { Grid, Paper, ButtonBase } from '@material-ui/core/';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Table, TableBody, TableCell, TableHead, TableRow }  from '@material-ui/core/';

class Profile extends Component {

    handleBackButton = (teamroster) => {
        console.log('Back to roster', teamroster);
        this.props.history.push(`/roster/${teamroster}`);
    }

    editSkater = (skaterprofile) => {
        console.log('edit skater clicked', skaterprofile);
        this.props.history.push(`/profile/edit/${skaterprofile}`)
    }

    componentDidMount() {
        // this.getProfile();
        // this.getAttend();
        this.props.dispatch({ type: 'GET_PROFILE', payload: this.props.match.params.profileId });
        this.props.dispatch({ type: 'GET_ATTEND', payload: this.props.match.params.profileId });
    }

    editAttendance = (practice) => {
        console.log('This date clicked', practice)
    }

    deletePractice = (dateid) => {
        console.log('DELETE:', dateid);

        //deletes selected button's skater to remove from redux state and database
        this.props.dispatch({ type: 'DELETE_PRACTICE', payload: dateid });
    }



    render() {
        return (
            <div>
                <button onClick={() => this.handleBackButton(this.props.profileReducer.team_id)}>Back to Roster</button>
                <h3>Profile</h3>
                {this.props.profileReducer.skater_name}
                <br />#{this.props.profileReducer.number}
                <br />Position: {this.props.profileReducer.position}
                <button onClick={() => this.editSkater(this.props.profileReducer.id)}>Edit Skater</button>

                <p>Practice History</p>

                <Paper>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date Attended</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.attendReducer.map(date => (
                                <TableRow key={date.id}>
                                    <TableCell component="th" scope="row">
                                        {date.date}
                                    </TableCell>
                                    <TableCell align="right">{date.attend_type}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"><IconButton onClick={() => this.editAttendance(date.id)} edge="end" aria-label="delete">
                                        <EditIcon fontSize="small" />
                                    </IconButton></TableCell>
                                    <TableCell align="right"><IconButton onClick={() => this.deletePractice(date.id)} edge="end" aria-label="delete">
                                        <DeleteForeverIcon />
                                    </IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <pre>{JSON.stringify(this.props.attendReducer, null, 2)}</pre>
                <pre>{JSON.stringify(this.props.profileReducer, null, 2)}</pre>
                <pre>{JSON.stringify(this.props.match.params, null, 2)}</pre>
            </div>

        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
};
export default withRouter(connect(mapStateToProps)(Profile));
