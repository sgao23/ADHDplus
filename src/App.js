import React, { useState, useEffect, Component } from "react";
import './App.css';
import FacebookLogin from 'react-facebook-login';
import Amplify, { API, graphqlOperation, Interactions, Auth, Hub, Analytics } from 'aws-amplify';
import { Card } from 'react-bootstrap';
import awsconfig from "./aws-exports";
import awsConfig from './aws-exports';
import { Tabs, Input, Form, Button, Layout, Col, Row, Modal } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, RollbackOutlined } from '@ant-design/icons';
import { Chatpop, openForm } from './chatpop';
import Advertisement from './advertisement';
import Gallery from "./gallery";
import { listPatients } from './graphql/queries';
import { IconButton, Paper } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';




{/*
// federation
const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
    localRedirectSignIn,
    productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");

const [
    localRedirectSignOut,
    productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    }
}

Amplify.configure(updatedAwsConfig);

*/}
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

Amplify.configure(awsconfig);
//Analytics.record();

function App() {

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');


    const responseFacebook = (response) => {
        try {
            console.log(response);
            setData(response);
            setPicture(response.picture.data.url);

            if (response.accessToken) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        } catch (e) {
            console.log('FB response error: ', e);
        }

    }




    const [user, setUser] = useState(null);



    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });

        getUser().then(userData => setUser(userData));
    }, []);

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then(userData => userData)
            .catch(() => console.log('Not signed in'));
    }



    // Log func
    const initialFormState = {
        username: '', password: '', email: '', authCode: '', formType: 'signIn'
    }
    const [formState, updateFormState] = useState(initialFormState);
    const { formType } = formState;

    function onChange(e) {
        e.persist()
        updateFormState(() => ({ ...formState, [e.target.name]: e.target.value}))
    }

    async function signUp() {
        const { username, email, password } = formState;
        try {
            await Auth.signUp({ username, password, attributes: { email }});
        } catch (error) {
            console.log('error signing up:', error);
        }
        updateFormState( () => ({ ...formState, formType: "confirmSignUp"}));
    }

    async function home() {
        updateFormState(() => ({...formState, formType: "signUp"}));
    }

    async function confirmSignUp() {
        const { username, authCode } = formState;
        try {
            await Auth.confirmSignUp(username, authCode);
            updateFormState( () => ({ ...formState, formType: "signIn"}));
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    async function signIn() {
        const { username, password } = formState;
        try {
            await Auth.signIn(username, password);
            updateFormState( () => ({ ...formState, formType: "signedIn"}));
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function signOut() {
        try {
            setLogin(false);
            await Auth.signOut();
            updateFormState( () => ({ ...formState, formType: "signUp"}));
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    async function resendConfirmationCode() {
        const { username } = formState;
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }


    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients()
    }, []);

    const fetchPatients = async () => {
        try {
            const patientData = await API.graphql(graphqlOperation(listPatients));

            const patientList = patientData.data.listPatients.items;

            console.log('patients list', patientList);

            setPatients(patientList);
        } catch (error) {

            console.log('error on fetching patients', error);
        }
    };

    return (
        <div className="App">
            <Layout>
                <Header>
                    <Row justify="space-between">
                        <Col>
                            <p style={{ color: "white", fontWeight:'bold', fontSize:36 }}>
                                ADHD+
                            </p>
                        </Col>
                        <Col span={16}>

                        </Col>
                        <Col>
                            {
                                (formType === 'signedIn' || login) &&
                                (<div>
                                    <Button className="info-btn" type="primary" shape="round" onClick={showModal}>My Information</Button>
                                    <Modal title="My Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                                        <Paper variant="outlined" elevation={2} >
                                            <div className="patientCard">
                                                <IconButton aria-label="question">
                                                    <QuestionAnswerIcon />
                                                </IconButton>

                                                <div>
                                                    <div className="firstName"> First Name: Sara </div>
                                                    <div className="lastName"> Last Name: Gao </div>
                                                    <div className="Q1"> Do you tend to avoid or delay getting started on a new important task? </div>
                                                    <div className="Q1Answer"> Never </div>
                                                    <div className="Q2"> Do you find that the majority of your tasks (work/school assignments, etc.) are boring or repetitive, making them difficult to complete? </div>
                                                    <div className="Q2Answer"> Sometimes </div>
                                                </div>
                                            </div>
                                        </Paper>

                                        {/* <p> { patients } </p>

                                                        <div className="patientList">
                                                            <p>testing testing </p>

                                                            { patients.map(patient => {
                                                                return (
                                                                <Paper variant="outlined" elevation={2} >
                                                                    <div className="patientCard">
                                                                        <IconButton aria-label="question">
                                                                            <QuestionAnswerIcon />
                                                                        </IconButton>

                                                                    <div>
                                                                        <div className="firstName">{patient.firstname}</div>
                                                                        <div className="Q1">{"Q1"}</div>
                                                                        <div className="Q2">{"Q2"}</div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="lastName">{patient.lastname}</div>
                                                                        <div className="Q1Answer">{patient.ansone}</div>
                                                                        <div className="Q2Answer">{patient.anstwo}</div>
                                                                    </div>
                                                                    </div>
                                                                </Paper>
                                                                )
                                                            })}
                                                        </div> */}
                                    </Modal>
                                </div>)
                            }

                        </Col>
                        <Col>
                            {
                                login &&
                                <img alt="Profile Picture" src={picture} style={{borderRadius:'50%', marginRight:'20px'}} />
                            }
                            {
                                (formType === 'signedIn' || login) && (
                                    <Button className='logout-button' type="primary" shape='round' icon={<LogoutOutlined />} onClick={signOut} style={{marginRight:'20px'}}>Log Out</Button>
                                )
                            }
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Layout style={{ padding: '24px'}}>

                            {
                                formType === 'signUp' && !login && (
                                    <Row>
                                        <Col span={4}></Col>
                                        <Col span={11}

                                            style={{
                                                height: 500,
                                                width: 800,
                                                overflow: 'visible'
                                            }}
                                        >
                                            <Advertisement />
                                        </Col>


                                        <Col span={5}
                                            className="site-layout-background"
                                            style={{
                                                padding: 18,
                                                marginLeft: 24,
                                                height: 500,
                                                width: 400,
                                                overflow: 'visible'
                                            }}
                                        >
                                            <div>
                                                <Tabs defaultActiveKey="1" type='card' style={{marginTop:'12px'}}>
                                                    <TabPane tab="Sign In" key="1" style={{height: '250px'}}>
                                                        <Form
                                                            name="basic"
                                                            labelCol={{span: 8}}
                                                            wrapperCol={{span: 16}}
                                                            initialValues={{remember: true}}
                                                        >
                                                            <Form.Item
                                                                label="Username"
                                                                name="username"
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Please input your username!'
                                                                }]}
                                                            >
                                                                <input name="username" onChange={onChange}
                                                                       placeholder="username"/>
                                                            </Form.Item>

                                                            <Form.Item
                                                                label="Password"
                                                                name="password"
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Please input your password!'
                                                                }]}
                                                            >
                                                                <input name="password" type="password" onChange={onChange}
                                                                       placeholder="password"/>
                                                            </Form.Item>

                                                            <Form.Item wrapperCol={{offset: 2, span: 22}}>
                                                                <Button type="primary" icon={<LoginOutlined />} htmlType="submit" onClick={signIn}>
                                                                    Log In
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </TabPane>
                                                    <TabPane tab="Sign Up" key="2" style={{height: '250px'}}>
                                                        <Form
                                                            name="basic"
                                                            labelCol={{span: 8}}
                                                            wrapperCol={{span: 16}}
                                                        >
                                                            <Form.Item
                                                                label="Username"
                                                                name="username"
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Please input your username!'
                                                                }]}
                                                            >
                                                                <input name="username" onChange={onChange}
                                                                       placeholder="username"/>
                                                            </Form.Item>

                                                            <Form.Item
                                                                label="Password"
                                                                name="password"
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Please input your password!'
                                                                }]}
                                                            >
                                                                <input name="password" type="password" onChange={onChange}
                                                                       placeholder="password"/>
                                                            </Form.Item>

                                                            <Form.Item
                                                                label="Email"
                                                                name="email"
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Please input your email address!'
                                                                }]}
                                                            >
                                                                <input name="email" onChange={onChange} placeholder="email"/>
                                                            </Form.Item>

                                                            <Form.Item wrapperCol={{offset: 2, span: 22}}>

                                                                <Button type="primary" icon={<UserOutlined />} htmlType="submit" onClick={signUp}>
                                                                    Register your account
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </TabPane>
                                                </Tabs>
                                                <div className="container" style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                                                    <Card style={{width: '300px'}}>
                                                        <Card.Header>
                                                            {!login &&
                                                            <FacebookLogin
                                                                appId="4601041333262045"
                                                                autoLoad={true}
                                                                fields="name,email,picture"
                                                                scope="public_profile,user_friends"
                                                                callback={responseFacebook}
                                                                icon="fa-facebook"/>
                                                            }
                                                        </Card.Header>

                                                    </Card>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={4}></Col>
                                    </Row>

                                )
                            }
                            {
                                formType === 'confirmSignUp' && (
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            padding: 18,
                                            margin: "auto",
                                            height: 480,
                                            width: 400,
                                            overflow: 'visible',

                                        }}
                                    >
                                        <Tabs defaultActiveKey="3" type='card' style={{marginTop:'12px'}}>
                                            <TabPane tab="Confirm Registration" key="3" style={{height: '300px'}}>
                                                <Form                                                >
                                                    <Form.Item
                                                        style={{marginTop:'30px', marginBottom:'70px'}}
                                                        label="Confirmation Code"
                                                        name="authCode"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Field required!'
                                                        }]}
                                                    >
                                                        <input name="authCode" onChange={onChange}
                                                               placeholder="Please check your email"/>
                                                    </Form.Item>
                                                    <Form.Item >

                                                        <Button type="default" htmlType="submit" onClick={resendConfirmationCode}>
                                                            Resend Confirmation Code
                                                        </Button>
                                                    </Form.Item>
                                                    <Form.Item >
                                                        <Button type="primary" icon={<UserOutlined /> } htmlType="submit" onClick={confirmSignUp}>
                                                            Confirm Sign Up
                                                        </Button>
                                                    </Form.Item>
                                                    <Form.Item >
                                                        <Button type="default" icon={<RollbackOutlined />} htmlType="submit" onClick={home}>
                                                            Back
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                        </Tabs>

                                    </Content>
                                )
                            }
                            {
                                formType === 'signIn' && (
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            padding: 18,
                                            margin: "auto",
                                            height: 480,
                                            width: 400,
                                            overflow: 'visible'
                                        }}
                                    >
                                        <div>
                                            <Tabs defaultActiveKey="1" type='card' style={{marginTop:'12px'}}>
                                                <TabPane tab="Sign In" key="1" style={{height: '250px'}}>
                                                    <Form
                                                        name="basic"
                                                        labelCol={{span: 8}}
                                                        wrapperCol={{span: 16}}
                                                        initialValues={{remember: true}}
                                                    >
                                                        <Form.Item
                                                            label="Username"
                                                            name="username"
                                                            rules={[{
                                                                required: true,
                                                                message: 'Please input your username!'
                                                            }]}
                                                        >
                                                            <input name="username" onChange={onChange}
                                                                   placeholder="username"/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Password"
                                                            name="password"
                                                            rules={[{
                                                                required: true,
                                                                message: 'Please input your password!'
                                                            }]}
                                                        >
                                                            <input name="password" type="password" onChange={onChange}
                                                                   placeholder="password"/>
                                                        </Form.Item>

                                                        <Form.Item wrapperCol={{offset: 2, span: 22}}>
                                                            <Button type="primary" icon={<LoginOutlined />} htmlType="submit" onClick={signIn}>
                                                                Log In
                                                            </Button>
                                                        </Form.Item>
                                                    </Form>
                                                </TabPane>
                                            </Tabs>
                                            <div className="container" style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                                                <Card style={{width: '300px'}}>
                                                    <Card.Header>
                                                        {!login &&
                                                        <FacebookLogin
                                                            appId="4601041333262045"
                                                            autoLoad={true}
                                                            fields="name,email,picture"
                                                            scope="public_profile,user_friends"
                                                            callback={responseFacebook}
                                                            icon="fa-facebook"/>
                                                        }
                                                    </Card.Header>

                                                </Card>
                                            </div>
                                        </div>
                                    </Content>
                                )
                            }
                            {
                                (formType === 'signedIn' || login) && (

                                        <Layout style={{alignSelf:'stretch', padding:'10px', overflow: 'visible'}}>
                                            <Content>
                                                <div className='wrapper'>
                                                    {
                                                        (formType === 'signedIn') && <p className='underline-effect' style={{fontWeight:'bold', fontSize:'x-large'}}>Welcome { formState.username }!</p>
                                                    }
                                                    {
                                                        (login) && <h1 className='underline-effect' style={{fontSize:'x-large'}}>Welcome { data.name }!</h1>
                                                    }
                                                </div>


                                                <Content style={{ height:'200px', marginTop:'80px'}}>
                                                    <Gallery />
                                                </Content>

                                                <Content style={{ marginTop:'32px'}}>
                                                    <Row justify="space-between">
                                                        <Col span={8}>

                                                            <img style={{height:240, width:400 }} src="https://c0.wallpaperflare.com/preview/425/31/596/medical-equipment-medicine-lab-hospital.jpg" />
                                                            <p style={{fontSize:'large', fontWeight:'bold', padding:10}}>Elite Focus Clinic, Inc.</p>
                                                            <p style={{fontSize:'small'}}>Mental health service in Los Altos, California</p>
                                                        </Col>

                                                        <Col span={7}>
                                                            <img style={{height:240, width:400 }} src="https://wallpapercave.com/wp/ThAOKju.jpg" />
                                                            <p style={{fontSize:'large', fontWeight:'bold', padding:10}}>Bay Area Adult ADHD</p>
                                                            <p style={{fontSize:'small'}}>Psychotherapist in Redwood City, California</p>
                                                        </Col>

                                                        <Col span={8}>
                                                            <img style={{height:240, width:400 }} src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                                                            <p style={{fontSize:'large', fontWeight:'bold', padding:10}}>Bay Area Clinical Associates</p>
                                                            <p style={{fontSize:'small'}}>Mental health clinic in San Jose, California</p>
                                                        </Col>
                                                    </Row>
                                                </Content>


                                            </Content>
                                            <div className="pop-container" style={{position:'fixed', right:30, bottom:30}}>
                                                <Button className="chat" size='large' type='primary' shape='round' onClick={openForm}>ChatBot</Button>
                                                <Chatpop />
                                            </div>
                                        </Layout>
                                )
                            }


                    </Layout>
                </Layout>

                <Footer style={{backgroundColor:'#001529', color:'gray'}}>
                    Non-Commercial Use. Team PM: Xing
                </Footer>
            </Layout>
        </div>
    )
}

export default App;