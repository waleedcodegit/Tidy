import Axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { img_baseurl } from '../../Configs/Api';
import toast from 'react-hot-toast';

class ListReviews extends Component {

    constructor(props){
        super(props);
        this.state = {
            review: []
        }
    }

    componentDidMount(){
        Axios.get(`/api/review`).then(res=>{
            console.log(res);
            if(res.data.status = 200){
                this.setState({
                    review:res.data.review
                })
            }
        })
    }

    deleteReview(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-review',data).then(res=>{
            toast.success('Review Delete Successfully',{position: "bottom-center"});
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Successfully Deleted',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
            this.componentDidMount();
        })
    }

    

    render() { 
        return ( 
            <div id="page-content">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Reviews</h3>
                        </div>
                        <div className="panel-body">
                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Reviewer Name</th>
                                        <th>Designation</th>
                                        <th>Comment</th>
                                        <th>Rating</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            this.state.review.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        
                                                        <td>{data.name}</td>
                                                        <td>{data.designation}</td>
                                                        <td>{data.comment}</td>
                                                        <td>{data.rating}</td>
                                                        <td><img src={img_baseurl+data.image} style={{width:'100px'}}></img></td>
                                                        <td>{data.status == 0 ?'Discarded':'Published'}</td>
                                                         
                                                        
                                                        <td>
                                                        <Link to={`/admin/edit-review/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                        <td><button onClick={this.deleteReview.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                                    this.state.review.length == 0 ? 
                                                    <tr><td colSpan="5">No records founded</td></tr>:null
                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
         );
    }
}
 
export default ListReviews;