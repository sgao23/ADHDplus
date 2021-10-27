import React, {Component} from 'react';
import './gallery.css';

class Gallery extends Component {
    render() {
        return (
            <div className='scrolling'>
                <ul className='scrolling-content'>
                    <li><img src='https://www.kidsinthehouse.com/sites/default/files/adhd-kids-help.jpg' /></li>
                    <li><img src='https://post.healthline.com/wp-content/uploads/2020/09/adhd-history_thumb.jpg' /></li>
                    <li><img src='https://www.rinamed.net/wp-content/uploads/2021/05/5.jpg' /></li>
                    <li><img src='https://i2.wp.com/www.additudemag.com/wp-content/uploads/2016/11/Parent_Discipline_Discipline-without-regret-tips-for-parents_Article_2519_mother-scold-daugther_ts_503188776-3.jpg?resize=1280%2C720px&ssl=1' /></li>
                    <li><img src='https://3erc1e4bvanrdzas82cngnw1-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/mum_At_doctors_770.jpg' /></li>
                    <li><img src='https://d33ljpvc0tflz5.cloudfront.net/dims3/MMH/798ddcb/2147483647/strip/true/crop/6508x3641+0+687/resize/715x400!/quality/75/?url=https%3A%2F%2Fd26ua9paks4zq.cloudfront.net%2F9c%2F45%2Faa274a7a419b939b87dff1424201%2Fgettyimages-1152682435.jpg' /></li>
                    <li><img src='https://www.kidsinthehouse.com/sites/default/files/adhd-kids-help.jpg' /></li>
                    <li><img src='https://post.healthline.com/wp-content/uploads/2020/09/adhd-history_thumb.jpg' /></li>
                    <li><img src='https://www.rinamed.net/wp-content/uploads/2021/05/5.jpg' /></li>
                    <li><img src='https://i2.wp.com/www.additudemag.com/wp-content/uploads/2016/11/Parent_Discipline_Discipline-without-regret-tips-for-parents_Article_2519_mother-scold-daugther_ts_503188776-3.jpg?resize=1280%2C720px&ssl=1' /></li>
                </ul>

            </div>
        );
    }
}

export default Gallery;