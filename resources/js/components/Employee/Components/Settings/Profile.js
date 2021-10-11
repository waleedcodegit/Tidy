import React, {Component} from "react";

class EmpProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            name:'',
            username:'',
            password:'',
            image:''
        }
    }

    // componentDidMount() {
    //     Axios.get(`/api/employee/${this.props.match.params.id}/edit`,{ headers: {
    //         token: window.localStorage.getItem('et')
    //     }}).then(res=>{
    //         if(res.data.status == 200) {
    //             this.setState({
    //                 name: res.data.employee.name,
    //                 username: res.data.employee.username,
    //                 password: res.data.employee.password_string,
    //                 image: res.data.employee.image
    //             })
    //         }
    //     })
    // }

    getName(event){
        this.setState({
            name: event.target.value
        })
    }

    getUsername(event){
        this.setState({
            username: event.target.value
        })
    }

    getPassword(event){
        this.setState({
            password: event.target.value
        })
    }

    getImage(event) {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(images => {
                this.setState({
                    image: images[0]
                })
            }, error => { console.error(error); });
        }
    }

    render(){
        return(
            <section className="section">
                <div className="section-body">
                    <div className="row mt-sm-4">
                        <div className="col-12 col-md-4 col-lg-4">
                            <div className="card author-box">
                                <div className="card-body">
                                    <div className="author-box-center">
                                        <img alt="image"  className="rounded-circle author-box-picture" />
                                        <div className="clearfix" />
                                        <div className="author-box-name">
                                            <a href="#"></a>
                                        </div>
                                        <div className="author-box-job"></div>
                                    </div>
                                    <div className="mb-2 mt-3 text-center">
                                            <div className="text-small font-weight-bold"></div>
                                        </div>
                                    <div className="text-center">
                                        <div className="author-box-description">
                                            <p>
                                                
                                            </p>
                                        </div>
                                        <div className="w-100 d-sm-none"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default EmpProfile;