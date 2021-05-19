import React from 'react';
import Axios from 'axios';
import Main from '../Admin/Container/main';
import './Css/admin.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            display: false
        }
    }
    
    componentDidMount() {
        let senderData = {
            token: window.localStorage.getItem('testapistring'),
        }
        
        Axios.post('/api/check-auth-admin', senderData).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    display: true
                })
            } else {
                this.props.history.push('/admin-login'); 
            }
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.display ? 
                    <Main></Main>
                    : 
                    <div className="spinner-border text-light ml-2" style={{width:'25px',height:'25px'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                }
            </div>
        );
    }
}

export default Index;

