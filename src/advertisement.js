import React, {Component} from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    height: '500px',
    width: '750px',
    color: '#fff',
    lineHeight: '160px',
    background: 'white',
    boxShadow: '4px 4px 2px 1px lightgrey',
};


class Advertisement extends Component {

    render() {
        return (
            <Carousel
                autoplay='true'
                effect="fade">
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ margin:'auto', height:500, width:750}} src='https://i.ytimg.com/vi/FIVz3BnrgpQ/maxresdefault.jpg' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ margin:'auto', height:500, width:750}} src='https://www.verywellmind.com/thmb/91ollS72WwJiJxn1XFn_dZFV39o=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/adhd-symptoms-4157281-dc701c45c36f40bfa03e7a429d19cf3d.png' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ margin:'auto', height:500, width:750}} src='https://www.verywellmind.com/thmb/-lMyofOfBriG5RHP1yvMuSJVYzY=/1100x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/living-well-with-adhd-20480-69c5bb787f484cada76474420048e204.png' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ margin:'auto', height:500, width:750}} src='https://www.verywellmind.com/thmb/l9ECioxE46X4wFdve-UX31BUFoI=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/adhd-treatment-4157278_FINAL-848b0cfc4d0b42a0b66c3d2ca894e9dd.png' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ margin:'auto', height:500, width:750}} src="https://www.verywellhealth.com/thmb/YxW1s1Ak-5TVeraIc5p2DN1HWGQ=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/adhd-attention-deficit-hyperactivity-disorder-included-definition-symptoms-traits-causes-treatment-5084784_final-bc92546bc9df465ea7f13fc423c2085b.jpg" />
                    </h3>
                </div>
            </Carousel>
        );
    }
}

export default Advertisement;