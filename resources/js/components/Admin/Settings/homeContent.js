import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

class HomeContent extends Component {

    constructor(props){
        super(props);
        this.state = {
            reviews : '',
            modern_lives :'',
            services : '',
            get_leads : '',
            how_cleaning_works : '',
            footer_content : ''
        }
    }

    reviews(e){
        this.setState({
            reviews : e.target.value
        })
    }
    
    modern_lives(e){
        this.setState({
            modern_lives : e.target.value
        })
    }

    services(e){
        this.setState({
            services : e.target.value
        })
    }

    get_leads(e){
        this.setState({
            get_leads : e.target.value
        })
    }

    how_cleaning_works(e){
        this.setState({
            how_cleaning_works : e.target.value
        })
    }

    footer_content(e){
        this.setState({
            footer_content : e.target.value
        })
    }

    componentDidMount(){
        Axios.get(`/api/edit-content`).then(res=>{
            console.log(res);
            if(res.data.status == 200){
                this.setState({
                    reviews : res.data.data.reviews,
                    modern_lives : res.data.data.modern_lives,
                    services : res.data.data.services,
                    get_leads : res.data.data.get_leads,
                    how_cleaning_works : res.data.data.how_cleaning_works,
                    footer_content : res.data.data.footer_content
                })
            }
        })
    }

    save(e){
        e.preventDefault();
        let dataBaseContents = {
            reviews : this.state.reviews,
            modern_lives : this.state.modern_lives,
            services : this.state.services,
            get_leads : this.state.get_leads,
            how_cleaning_works : this.state.how_cleaning_works,
            footer_content : this.state.footer_content,
            id : 1,
        }
        Axios.post(`/api/update-content`, dataBaseContents).then(res=>{
            
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
                    <h4 className="panel-title">Home Content</h4>
                </div>
            <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="price">Reviews:</label>
                                    <textarea
                                        value={this.state.reviews}
                                        onChange={this.reviews.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                    ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Why Choose TidyHome:</label>
                                    <textarea
                                        value={this.state.modern_lives}
                                        onChange={this.modern_lives.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                    ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Be Your Own Boss:</label>
                                    <textarea
                                        value={this.state.services}
                                        onChange={this.services.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                    ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Get Leads:</label>
                                    <textarea
                                        value={this.state.get_leads}
                                        onChange={this.get_leads.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                    ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">How Cleaning Works:</label>
                                    <textarea
                                        value={this.state.how_cleaning_works}
                                        onChange={this.how_cleaning_works.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                    ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Footer Content:</label>
                                    <textarea
                                        value={this.state.footer_content}
                                        onChange={this.footer_content.bind(this)}
                                        style={{height:'300px',width:'100%'}}
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
 
export default HomeContent;