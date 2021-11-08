import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: []
        }
    }

    componentDidMount() {
        Axios.post('/api/payments_list', { headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res => {
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    payment: res.data.payment
                })
            }
        })
    }
    deleteCustomer(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-customer',data).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
            })
            this.componentDidMount();
        })
    }



    render() {
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Payments List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Name</th>
                                            <th>Charge Id</th>
                                            <th>Customer Strip Id</th>
                                            {/* <th>Payment Id</th> */}
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.payment.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.name}</td>
                                                        <td>{JSON.parse(data.stripe_response).id}</td>
                                                        <td>{data.customer_stripe_id}</td>
                                                        <td>{data.amount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.payment.length == 0 ? 
                                            <tr><td colSpan="7">No records founded</td></tr>:null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Payments;