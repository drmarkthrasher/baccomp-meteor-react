import React, { Component } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangeDirective, RangesDirective,
    Inject, Annotations, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-circulargauge';


enableRipple(false);

class GaugeTester extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gaugevalue: .03         
        }

        myvar='';
        flag=false;
    }

    onStartBACCalc(e) {
        
        this.setState({ 
            gaugevalue: this.state.gaugevalue+.01
        })
        
        flag ? (clearInterval(myvar), flag=false) :  myvar = Meteor.setInterval(function () {
        var date = new Date();
        flag=true;
        console.log("Function is running");
        }, 1000)

    }

    onDoSomething(e){
        console.log("Code can be added here...");

    }

    render() {
        return (
            <div className='screenbackground'>
                <h1>Put some text in here!</h1>
                <ButtonComponent cssClass='e-success' onClick={this.onDoSomething.bind(this)}>Click Me </ButtonComponent>
                <button style={{margin: 20}} className="button"
                onClick={this.onStartBACCalc.bind(this)}>Start/Stop BAC</button>
                <CircularGaugeComponent >
                <Inject services={[ Annotations ]}/>
                    <AxesDirective>
                        <AxisDirective 
                            lineStyle = {{
                            width: 3,
                            color: 'black'
                            }} 
                            minimum={0}
                            maximum={.3}
                            background = 'rgba(0,128,128,0.3)'
                            majorTicks={{
                                interval: .02,
                                color:'green',
                                height:10,
                                width: 3,
                                position: 'Inside',
                                offset: 5
                            }}
                            minorTicks={{
                                interval: .01,
                                color:'green',
                                height:10,
                                width: 3,
                                position: 'Inside',
                                offset: 5
                            }}
                            labelStyle={{
                                font: {
                                    color: '#659dbd',
                                    size: '20px',
                                    fontWeight: 'Bold',
                                },
                                format: 'n2'
                            }}
                            
                            >
                            <RangesDirective>
                                <RangeDirective start={0} end={0.06}
                                    color='green'
                                    radius='60%'>
                                </RangeDirective>
                                <RangeDirective start={0.06} end={0.1}
                                    color='yellow'
                                    radius='60%'>
                                </RangeDirective>
                                <RangeDirective start={0.1} end={0.3}
                                    color='red'
                                    radius='60%'>
                                </RangeDirective>
                            </RangesDirective>
                            <PointersDirective>
                                <PointerDirective value={this.state.gaugevalue}
                                    animation={{
                                        enable: true,
                                        duration: 1500
                                    }}
                                    pointerWidth={10}
                                    color='black'
                                    cap={{
                                        radius:10,
                                        color: 'silver',
                                        border: {
                                            color: 'grey'
                                        }
                                    }}
                                    needleTail={{
                                        length:'25%',
                                        color: 'black'
                                    }}>
                                </PointerDirective>
                                <PointerDirective value={.2} 
                                    type='Marker'
                                    markerShape='InvertedTriangle'
                                    radius='100%'
                                    markerHeight={15}
                                    markerWidth={15}
                                    color='blue'>
                                </PointerDirective>
                            </PointersDirective>
                            <AnnotationsDirective>
                                    <AnnotationDirective content='<div><h2>BAC %</h2></div>'  angle={180}>
                                    </AnnotationDirective>
                            </AnnotationsDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>



            </div>
        );
    }
}

export default GaugeTester;