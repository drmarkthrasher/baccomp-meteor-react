import React, { Component } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangeDirective, RangesDirective,
    Inject, Annotations, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-circulargauge';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Legend, Category,
    Tooltip, DataLabel, Zoom, Crosshair, LineSeries, Selection, DateTime} from '@syncfusion/ej2-react-charts';
import moment from 'moment';

import history from '../routes/history';
import MainNavigationBar from './MainNavigationBar';

enableRipple(false);

class GaugeTester extends Component {


    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            gaugevalue: .0,
            gender: "Male",
            age: 21,
            weight: 200,
            data: []    
        }

        myvar='';
        flag=false;


    }

    
    componentWillMount() {

        // this.setState({ data: 
        //     [{month: "Jan", sales:"35"},
        //     {month: "Feb", sales:"28"},
        //     {month: "Mar", sales:"34"},
        //     {month: "Apr", sales:"32"},
        //     {month: "May", sales:"40"},
        //     {month: "Jun", sales:"32"},
        //     {month: "Jul", sales:"35"},
        //     {month: "Aug", sales:"55"},
        //     {month: "Sep", sales:"38"},
        //     {month: "Oct", sales:"30"},
        //     {month: "Nov", sales:"25"},
        //     {month: "Dec", sales:"32"},
        // ]
        // });

        var time=new Date();

        var time1=time.setHours(6);
        var time2=time.setHours(7);
        var time3=time.setHours(8);

        this.setState({ data:
            [{time: time1, bac:0.05},
            {time: time2, bac:0.06},
            {time: time3, bac:0.04}]
        })


        //this is command for adding to array in state
        // this.setState({data: [...this.state.data, {month:"Junk",sales:50}]});
       

        
    }
     
        


    componentDidMount() {

        Meteor.call('drinks.find',(err,res) => {
            const drinks=res;
            this.setState({ drinks });
            

            //use this to loop through and get drink info
            drinks.forEach( function(drink) {
                // console.log(drink.description);
            })
        })

        Meteor.call('profiles.find',(err,res) => {
            this.setState({
                gender: res.gender,
                age: res.age,
                weight: res.weight
            })
        })


        

        this.onStartBACCalc();


    }

    componentWillUnmount() {
        clearInterval(myvar);
    }
    
    

    onStartBACCalc(e) {

        const self=this;
        
        var inittime=moment();

        var drinksessioncutoff= new Date();
        drinksessioncutoff.setHours(drinksessioncutoff.getHours()-8);
        

        flag ? (clearInterval(myvar), flag=false) :  myvar = Meteor.setInterval(function () {
            flag=true;

            var currenttime=moment();
            var startdrinking=0;
            var totalalcoholconsumed=0;

            //calculate alcohol consumed (grams)
            // grams = oz * 29.6 ml/oz * alcohol/100 * 0.789 (spec gravity)
            
            console.log(drinksessioncutoff);
 

            self.state.drinks.forEach( function(drink) {
                var m=moment();
                var day=drink.day;
                var month=drink.month;
                var year=drink.year;
                var hour=drink.hour;
                var minute=drink.minute;
                m.set({date:day,month:month,year:year,hour:hour,minute:minute})
                
                //hours ago
                var timelapsed=moment.duration(currenttime-m)/1000/60/60;
                var thisdrinkalcohol=drink.volume*29.6*drink.alcohol/100*0.789
                

                //eliminate drinks that were drank more than 8 hours ago...
                if(timelapsed>8){
                    timelapsed=0;
                    thisdrinkalcohol=0;
                }
                    

                if(timelapsed>startdrinking)
                    startdrinking=timelapsed;

                totalalcoholconsumed+=thisdrinkalcohol;

                //duration in minutes...
                console.log("Time since in minutes "+moment.duration(currenttime-m)/1000/60);

            }) 

            console.log("Time since started drinking in hours "+startdrinking);
            console.log("Total alchohol consumed is "+totalalcoholconsumed+" grams");

            //bac=alcohol(grams)/(body weight(grams)*r)*100
            //r=0.55 females and 0.68 for males

            self.state.gender=="Male" ? r=0.68 : r=0.55;
            
            var bodyweight=self.state.weight/2.205*1000;  //convert weight from lbs to grams
            bac=totalalcoholconsumed/bodyweight/r*100-0.015*startdrinking;
            console.log("Bac is " +bac);

            self.setState({ 
                gaugevalue: bac
            })

        }, 1000)

    }


    handleBackButton() {
        history.push('/dashboard');
    }

    handleChartButton() {
        clearInterval(myvar);
        history.push('/bacchart');
    }

    

    render() {
        return (

            <div className="page-content">

            <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

            <button className="btn info" onClick={this.handleChartButton.bind(this)}>Time Chart</button>

            <div className='screenbackground'>
            
            <h2 className="addspaceabovex2"></h2>

            
                
                <CircularGaugeComponent >
                <Inject services={[ Annotations ]}/>
                    <AxesDirective>
                        <AxisDirective 
                            lineStyle = {{
                            width: 3,
                            color: 'black'
                            }} 
                            minimum={0}
                            maximum={.24}
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
                                <RangeDirective start={0.06} end={0.08}
                                    color='yellow'
                                    radius='60%'>
                                </RangeDirective>
                                <RangeDirective start={0.08} end={0.24}
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

            </div>
        );
    }
}

export default GaugeTester;