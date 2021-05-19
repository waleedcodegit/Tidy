import React from 'react';
import './admin.css'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import Axios from 'axios';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  Dividers: {
    backgroundColor: '#C2F0FC',
    height: '1px'
  },
  Expanders: {
    color: '#FFFFFF',
    //107595
  },
  ListItemstyles: {

    color: '#FFFFFF',
    fontSize: '14px',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular'
  },

  sidebarheads: {

    fontFamily: 'Poppins-Regular',
    fontWeight: 'bolder',



  },
  sidebarchilds: {

    fontFamily: 'Poppins-Regular',
    // fontWeight: 'bold',
    color: '#81f5ff',
    fontSize: '13px',
    marginLeft: '15px !important',
    marginBottom: '0px !important'

  },
  icon_img:{
    width:'20px',
    height:'20px',
    display:'inline !important',
    margin:'0' 
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% )`,
      marginLeft: drawerWidth,
      backgroundColor: '#fff',
      height: '80px',
      borderBottom: '1px solid #3282b8'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: '80px',
    //  backgroundImage:"url('http://localhost:8000/images/bgsidebar15.jpg')",
    backgroundColor: '#34495e',
    border: '1px solid #34495e'
    // C2F0FC
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Sidebar(props) {
  const [display, setdisplay] = React.useState(true);
  const [permissions, setdPermissions] = React.useState([]);
  const [user, setuser] = React.useState([]);
  const [check, setcheck] = React.useState(true);
  const logout = () =>{
    window.localStorage.setItem('sop256skikl','');
    window.location.reload();
  }
  const senderdata = {
    token: window.localStorage.getItem('sop256skikl')
  }
  if (check) {
    setcheck(false);
    Axios.post('/api/admin_check_auth', senderdata).then(res => {
      console.log(res);
      if (res.data.status == 200) {

        setdPermissions(res.data.user[0].permissions[0]);
        console.log(res.data.user[0].permissions[0]);
        setuser(res.data.user);
        setdisplay(true);
      } else {
        props.history.push('/AdminLogin');
      }
    })
  }
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [show, setShow] = React.useState(0);


  const sidebarchildhandler = (par) => {
      if(show == par){
        setShow(0);
      }else{
        setShow(par)
      }
  }
  const drawer = (
    <div>



      <List className={classes.sidebarheads}>
        {
          permissions.dashboard == 1?
            <>
              <ListItem button component={Link} to="/adminpanel/Dashboard">

                <ListItemText >
                  <h6 className={classes.ListItemstyles}><img className={classes.icon_img} src="/images/dashboard.png"></img>  Dashboard</h6>
                </ListItemText>
              </ListItem>
              <Divider className={classes.Dividers} />
            </>
            : null
        }





        

        {
          permissions.products == 1 ?
            <>
              <ListItem button onClick={() => sidebarchildhandler(1)}   >

                <ListItemText > <h6 className={classes.ListItemstyles}><img className={classes.icon_img} src="/images/box.png"></img>  Products</h6></ListItemText>
                {show == 1 ?
                  <ExpandLess className={classes.Expanders} /> :
                  <ExpandMore className={classes.Expanders} />
                }


              </ListItem>
              {show == 1 ?
                <List

                >
                                    <ListItem button component={Link} to="/adminpanel/ProductLists">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Product List</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/AddProducts">
                    <ListItemText ><h6 className={classes.sidebarchilds}> Add New Product</h6></ListItemText>
                  </ListItem>

                  <ListItem button component={Link} to="/adminpanel/ManageCategory">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Categories</h6></ListItemText>
                  </ListItem>
                  {/* <ListItem button component={Link} to="/adminpanel/ManageSubCategory">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Sub Categories</h6></ListItemText>
                  </ListItem> */}
                  <ListItem button component={Link} to="/adminpanel/shipping">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Shipping</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/discounts">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Discounts</h6></ListItemText>
                  </ListItem>
                </List> :
                ''
              }
              <Divider className={classes.Dividers} />
            </>
            : null
        }
{
          permissions.customers == 1   ?
            <>
              <ListItem button onClick={() => sidebarchildhandler(2)}  >

                <ListItemText>
                  <h6 className={classes.ListItemstyles}>
                  <img className={classes.icon_img} src="/images/customer.png"></img>  Retail Customers</h6></ListItemText>
                {show == 2 ?
                  <ExpandLess className={classes.Expanders} /> :
                  <ExpandMore className={classes.Expanders} />
                }


              </ListItem>
              {show == 2?
                <div className={classes.sidebarchilds}>


                  {/* <ListItem button component={Link} to="/adminpanel/NewUser" >
            <ListItemText ><h6 className={classes.sidebarchilds}>New Custpmer</h6></ListItemText>
            </ListItem> */}

                  <ListItem button component={Link} to="/adminpanel/Orders">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Customer Orders</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/Cutomers">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Customer List</h6></ListItemText>
                  </ListItem>

                </div> :
                ''
              }

              <Divider className={classes.Dividers} />
            </>
            : null
        }

        {/* {
          permissions.categories ?
            <><ListItem button onClick={() => sidebarchildhandler(6)}  >

              <ListItemText > <h6 className={classes.ListItemstyles}><i className="fas fa-school"></i>Manage Categories</h6></ListItemText>
              {show6 ?
                <ExpandLess className={classes.Expanders} /> :
                <ExpandMore className={classes.Expanders} />
              }


            </ListItem>

              {show6 ?
                <List

                >
                  <ListItem button component={Link} to="/adminpanel/ManageCategory">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Manage Categories</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/ManageSubCategory">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Manage sub Categories</h6></ListItemText>
                  </ListItem>

                </List> :
                ''
              }
              <Divider className={classes.Dividers} />
            </>
            : null
        } */}



        {/* {
          permissions.orders ?
            <> <ListItem button onClick={() => sidebarchildhandler(1)}   >

              <ListItemText > <h6 className={classes.ListItemstyles}><i className="fas fa-school"></i>  Manage Orders</h6></ListItemText>
              {show4 ?
                <ExpandLess className={classes.Expanders} /> :
                <ExpandMore className={classes.Expanders} />
              }


            </ListItem>
              {show1 ?
                <List

                
                  {/* <ListItem button component={Link} to="/adminpanel/NewClass">
         <ListItemText ><h6 className={classes.sidebarchilds}>New Order</h6></ListItemText>
         </ListItem>   
                  <ListItem button component={Link} to="/adminpanel/Orders">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Order Lists</h6></ListItemText>
                  </ListItem>

                </List> :
                ''
              }
              <Divider className={classes.Dividers} /></>
            : null
        } */}

        {/* {
          permissions.distributors == 1  ?
            <><ListItem button onClick={() => sidebarchildhandler(3)}   >

              <ListItemText > <h6 className={classes.ListItemstyles}><img className={classes.icon_img} src="/images/distribution.png"></img>  Distributors</h6></ListItemText>
              {show == 3 ?
                <ExpandLess className={classes.Expanders} /> :
                <ExpandMore className={classes.Expanders} />
              }


            </ListItem>
              {show == 3 ?
                <List

                >
                   <ListItem button component={Link} to="/adminpanel/DistributorLists">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Distributor List</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/ADDNewDistributor">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Add New Distributor</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/distributor-orders">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Distributor Orders</h6></ListItemText>
                  </ListItem>

                </List> :
                ''
              }
              <Divider className={classes.Dividers} /></>
            : null
        } */}
        {/* {
          permissions.permissions ?
            <><ListItem button onClick={() => sidebarchildhandler(9)}  >

              <ListItemText >
                <h6 className={classes.ListItemstyles}> <i className="fas fa-cog"></i> Manage Permissions </h6></ListItemText>
              {show9 ?
                <ExpandLess className={classes.Expanders} /> :
                <ExpandMore className={classes.Expanders} />
              }


            </ListItem>
              {show9 ?
                <List

                >
                  <ListItem button component={Link} to="/adminpanel/ManageRoles">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Manage Roles</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/ManageAdminAccounts">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Manage Admin Accounts</h6></ListItemText>
                  </ListItem>
                </List> :
                ''
              }
              <Divider className={classes.Dividers} /></>
            : null
        } */}
        {
          permissions.reports == 1  ?
            <><ListItem button onClick={() => sidebarchildhandler(4)}  >

              <ListItemText >
                <h6 className={classes.ListItemstyles}> <img className={classes.icon_img} src="/images/business-report.png"></img> Reports </h6></ListItemText>
              {show == 4 ?
                <ExpandLess className={classes.Expanders} /> :
                <ExpandMore className={classes.Expanders} />
              }


            </ListItem>
              {show == 4 ?
                <List

                >
                  <ListItem button component={Link} to="/adminpanel/customer-sales-report">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Retail Customer Sales</h6></ListItemText>
                  </ListItem>
                  {/* <ListItem button component={Link} to="/adminpanel/distributor-sales-report">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Distributors Sales</h6></ListItemText>
                  </ListItem> */}
                  <ListItem button component={Link} to="/adminpanel/customer-order-report">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Retail Customer Orders</h6></ListItemText>
                  </ListItem>
                  {/* <ListItem button component={Link} to="/adminpanel/distributor-orders-report">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Distributors Orders</h6></ListItemText>
                  </ListItem> */}
                </List> :
                ''
              }
              <Divider className={classes.Dividers} /></>
            : null
        }
        
            <><ListItem button onClick={() => sidebarchildhandler(6)}  >

              <ListItemText >
                <h6 className={classes.ListItemstyles}> <img className={classes.icon_img} src="/images/automation.png"></img> Website Settings </h6></ListItemText>
              {show == 6 ?
                <ExpandLess className={classes.Expanders} /> :
                <ExpandMore className={classes.Expanders} />
              }


            </ListItem>
              {show == 6 ?
                <List

                >
                  <ListItem button component={Link} to="/adminpanel/slider-images">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Slider Images</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/promotional-image">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Promotional Image</h6></ListItemText>
                  </ListItem>
                  {/* <ListItem button component={Link} to="/adminpanel/GenralSettings">
                    <ListItemText ><h6 className={classes.sidebarchilds}>General Settings</h6></ListItemText>
                  </ListItem> */}
                  {/* <ListItem button component={Link} to="/adminpanel/loyalty-points">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Loyalty Points</h6></ListItemText>
                  </ListItem> */}
                </List> :
                ''
              }
              <Divider className={classes.Dividers} /></>
            
        
        <ListItem button onClick={() => sidebarchildhandler(7)}  >

          <ListItemText >
            <h6 className={classes.ListItemstyles}> <img className={classes.icon_img} src="/images/user.png"></img> User & Permissions</h6></ListItemText>
          {show == 7 ?
            <ExpandLess className={classes.Expanders} /> :
            <ExpandMore className={classes.Expanders} />
          }


        </ListItem>
        {show == 7 ?
          <List

          >
            {/* <ListItem button>
              <ListItemText ><h6 className={classes.sidebarchilds}>{user[0].username}</h6></ListItemText>
            </ListItem> */}
            <ListItem button component={Link} to="/adminpanel/ManageAdminAccounts">
              <ListItemText ><h6 className={classes.sidebarchilds}> Users</h6></ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/adminpanel/AddNewUser">
              <ListItemText ><h6 className={classes.sidebarchilds}> Add New User</h6></ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/adminpanel/ManageRoles">
                <ListItemText ><h6 className={classes.sidebarchilds}> Role Permissions</h6></ListItemText>
            </ListItem>
            
            {/* <ListItem button >
              <ListItemText  ><h6 className={classes.sidebarchilds}>Log-Out</h6></ListItemText>
            </ListItem> */}
          </List> :
          ''
        }
          <Divider className={classes.Dividers} />
        <ListItem button onClick={() => logout(5)}  >

      <ListItemText >
        <h6 className={classes.ListItemstyles}> <i className="fas fa-sign-out-alt"></i> Log Out </h6></ListItemText>
      </ListItem>

      </List>
    </div>
  );

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'white' }}>
      {
        display ?
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton >
                <Typography variant="h6" noWrap>

                  <h2 style={{ color: 'black', fontWeight: 'normal', fontFamily: 'poopinmediumt', fontSize: '25px', marginLeft: '10px' }} >
                    <span>
                    Tidy Home Vendor
                    </span> <span></span> </h2>
                </Typography>
              </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
            <main id="adminpanel" className={classes.content}>
              <div className={classes.toolbar} />
              
              
            </main>
          </div>
          :
          <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%' }}>
            <div className="spinner-border  ml-2 spinner_format"  role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>

      }

    </div>
  );
}


export default Sidebar;
