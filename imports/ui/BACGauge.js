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
        timerID='';
        flag=false;

        currentBAC=0;



    }

    componentWillMount() {

        Meteor.call('profiles.find',(err,res) => {
            this.setState({
                gender: res.gender,
                age: res.age,
                weight: res.weight
            })
        }) 

        Meteor.call('drinks.find',(err,res) => {
            const drinks=res;
            this.setState({ drinks });
            

            //use this to loop through and get drink info
            drinks.forEach( function(drink) {
                // console.log(drink.description);
            })

            

            this.prepareBACChart();

        })
        
       
    }
     
        


    componentDidMount() {

        //interval is 60000 (or 60 sec...1 min)
        timerID=setInterval(() => this.prepareBACChart(),60000);


    }

    componentWillUnmount() {
        clearInterval(timerID);
    }
    
    
    prepareBACChart() {
        console.log("It is now time to prepare drinks for chart...")

        var time = new Date();
        var drinksessionstart=new Date();
        drinksessionstart.setHours(drinksessionstart.getHours()-8);
        console.log("Drink Session Start is "+drinksessionstart);

        var presenttime=new Date();

        datejson=[{"time":drinksessionstart,"bac":0.0}];

        //timestep is 1 minute, 
        var timestep = 1;

        //reset BAC level
        currentBAC=0.;

        for(time = drinksessionstart; time<presenttime; time.setMinutes(time.getMinutes()+timestep)){
                
            

            for (var drink of this.state.drinks){

                if( drink.date.getYear()==time.getYear()
                    &&drink.date.getMonth()==time.getMonth()
                    &&drink.date.getDate()==time.getDate()
                    &&drink.date.getHours()==time.getHours()
                    &&drink.date.getMinutes()==time.getMinutes()){

                    console.log(drink.description+" has same time at "+drink.date.getHours()+" "+drink.date.getMinutes());
                
                    this.computeBACIncrease(drink);

                    newtime=JSON.stringify(time);
                    newtime=new Date(JSON.parse(newtime));
                
                    // console.log("Push from drink match loop");
                    datejson.push({"time":newtime,"bac":currentBAC})
                   
                
                }

                
            }

            //alcohol getting metabolized by body (0.015%/hour)
            currentBAC=currentBAC-(0.015/60);
            if(currentBAC<0) currentBAC=0;
            
            //for some reason, must convert time to string and then back to Date
            newtime=JSON.stringify(time);
            newtime=new Date(JSON.parse(newtime));

            // console.log("New time is "+newtime);
            datejson.push({"time":newtime,"bac":currentBAC});

        }  //end of time loop

        //format for decimal place
        currentBAC=currentBAC.toFixed(3);
        
        this.setState({ data: datejson,
            gaugevalue: currentBAC})
        
        
        
    }

    computeBACIncrease(drink){
        

        var thisdrinkalcohol=drink.volume*29.6*drink.alcohol/100*0.789;
        console.log(thisdrinkalcohol);

        this.state.gender=="Male" ? r=0.68 : r=0.55;
        var bodyweight=this.state.weight/2.205*1000;  //convert weight from lbs to grams
        bacincrease=thisdrinkalcohol/bodyweight/r*100;
        console.log(bacincrease);

        currentBAC=currentBAC+bacincrease;
        
        
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
        clearInterval(timerID);
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

                <p  className="secondaryfont">Current BAC % is {this.state.gaugevalue}</p>

            </div>

            </div>
        );
    }
}

export default GaugeTester;