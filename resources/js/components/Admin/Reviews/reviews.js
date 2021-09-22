import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';

class ReviewMod extends Component {

    constructor(props){
        super(props);
        this.state = {
        get_name : '',
        get_designation : '',
        get_comment : '',
        get_rating : '',
        get_image : '',
        }
    }

    get_name(e){
        this.setState({
            get_name : e.target.value
        })
    }

    get_designation(e){
        this.setState({
            get_designation : e.target.value
        })
    }

    get_comment(e){
        this.setState({
            get_comment : e.target.value
        })
    }

    get_rating(e){
        this.setState({
            get_rating : e.target.value
        })
    }

    get_image(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        let Configs = {
            headers: {
                token: window.localStorage.getItem('al'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    btn2_prg: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                })
            }
        }
        this.setState({
            loading: true,
        })
        Axios.post('/api/image_upload', formData, Configs).then(res => {

            if (res.data.status == 200) {
                toast.success('Image Uploaded.');
                this.setState({
                    get_image:res.data.url,
                    loading:false
                })
            } else {
                toast.error(res.data.msg);
                this.setState({
                    loading:false
                })
            }
        })

    }


    save(e){
        e.preventDefault();
        let UserReview = {
            get_name : this.state.get_name,
            get_designation : this.state.get_designation,
            get_comment : this.state.get_comment,
            get_rating : this.state.get_rating,
            get_image : this.state.get_image,
        }
        console.log(UserReview);
        Axios.post('/api/create-review', UserReview).then(res=>{
            
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Content Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }) 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                    })
                }
            }
        )}

    render() { 
        return ( 
            <div id="page-content">
                <div className="row">
                <div className="col-sm-12">
                <div className="panel panel-bordered">
                <div className="panel-heading">
                    <h4 className="panel-title">Reviews</h4>
                </div>
            <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Name</label>
                                    <input onChange={this.get_name.bind(this)} type="text" className="form-control"/>
                                   
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Designation</label>
                                    <input onChange={this.get_designation.bind(this)} type="text" className="form-control" />
                                   
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Rating</label>
                                    <input onChange={this.get_rating.bind(this)} type="text" className="form-control" />
                                   
                                </div>
                            </div>

                            <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">User Image</label>
                                        <input onChange={this.get_image.bind(this)} type="file"></input>
                                    </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Comment</label>
                                    <textarea
                                        onChange={this.get_comment.bind(this)}
                                        style={{height:'100px',width:'100%'}}
                                    ></textarea>
                            </div>

                            <div className="panel-footer text-right">
                                <button onClick={this.save.bind(this)} type="submit" className="btn btn-primary">submit</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default ReviewMod;