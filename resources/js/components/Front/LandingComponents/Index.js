import React, { Component } from 'react';
import Slider from './Slider';
import Reviews from './Reviews';
import HowCleaningWorks from './HowCleaningWorks';
import ModrenCleaning from './ModernCleaning';
import OntheGo from './OntheGo';
import Beyouownboss from './BeyourOwnBoss';

class Index extends Component {
    render() {
        return (
            <div>
                <Slider {...this.props} ></Slider>
                <Reviews></Reviews>
                <ModrenCleaning></ModrenCleaning>
                <Beyouownboss></Beyouownboss>
                <OntheGo></OntheGo>
                <HowCleaningWorks></HowCleaningWorks>
            </div>
        );
    }
}

export default Index;